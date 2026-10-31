const fs = require('fs');
const path = require('path');
const vm = require('vm');

const targetCh = process.argv[2] || 'phy-ch01';

const baseDir = path.resolve(__dirname, '..');
const ctx = { window: {}, document: {}, console: console };
ctx.window = ctx;
vm.createContext(ctx);

const manifestCode = fs.readFileSync(path.join(baseDir, 'data/manifest.js'), 'utf8');
vm.runInContext(manifestCode, ctx);

const phyDir = path.join(baseDir, 'data/physics');
const files = fs.readdirSync(phyDir).filter(f => f.endsWith('.js'));
for (const f of files) {
  const code = fs.readFileSync(path.join(phyDir, f), 'utf8');
  vm.runInContext(code, ctx);
}

const ch = ctx.window.IPE_DATA.chapters[targetCh];
if (!ch) {
  console.log(`Chapter ${targetCh} not found!`);
  process.exit(1);
}

function stripMath(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\$[^\$\n]*?\$/g, '');
}

console.log(`=== Chapter: ${ch.id} (${ch.chapter}) ===`);

const testRegex = /\\[a-zA-Z]+|[xX*]\s*10\^|10\^[-+]?\d+|[A-Za-z0-9]_[A-Za-z0-9]|\b\d+(?:\.\d+)?\s*(?:m\/s|cm|mm|nm|Hz|kHz|MHz|rad\/s|kg\s*m\^-3|V\/m|Tesla|Wb|MeV|eV|pF|nF|uF|uC|nC)\b|\b(?:v|c|f|nu|lambda|mu|R|f_1|f_2|u|R_1|R_2)\s*=\s*[-+]?\d+/g;

// Check formulaSheet
(ch.formulaSheet || []).forEach((fc, idx) => {
  ['symbols', 'units', 'tip'].forEach(f => {
    const val = fc[f] || '';
    const stripped = stripMath(val);
    const m = stripped.match(testRegex);
    if (m) {
      console.log(`[formulaSheet #${idx+1}: ${fc.title}] (${f}) matched: ${[...new Set(m)].join(', ')}`);
      console.log(`   ${val}`);
    }
  });
});

// Check questions
(ch.questions || []).forEach((q, idx) => {
  const issues = [];
  ['question', 'answer'].forEach(f => {
    const val = q[f] || '';
    const stripped = stripMath(val);
    const m = stripped.match(testRegex);
    if (m) {
      issues.push(`(${f}) [${[...new Set(m)].join(', ')}]: ${stripped.slice(0, 100).replace(/\s+/g, ' ')}`);
    }
  });

  if (q.options && Array.isArray(q.options)) {
    q.options.forEach((opt, oIdx) => {
      const stripped = stripMath(opt);
      const m = stripped.match(testRegex);
      if (m) {
        issues.push(`(opt[${oIdx}]) [${[...new Set(m)].join(', ')}]: ${opt}`);
      }
    });
  }

  if (issues.length > 0) {
    console.log(`\n--- Q#${idx+1} [${q.id}] (${q.type}, ${q.marks || ''}) ---`);
    issues.forEach(iss => console.log(`  ${iss}`));
  }
});

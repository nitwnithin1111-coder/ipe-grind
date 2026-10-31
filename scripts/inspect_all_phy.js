const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.resolve(__dirname, '..');
const ctx = { window: {}, document: {}, console: console };
ctx.window = ctx;
vm.createContext(ctx);

const manifestCode = fs.readFileSync(path.join(baseDir, 'data/manifest.js'), 'utf8');
vm.runInContext(manifestCode, ctx);

const phyDir = path.join(baseDir, 'data/physics');
const files = fs.readdirSync(phyDir).filter(f => f.endsWith('.js')).sort();

for (const f of files) {
  const code = fs.readFileSync(path.join(phyDir, f), 'utf8');
  vm.runInContext(code, ctx);
}

function stripMath(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\$[^\$\n]*?\$/g, '');
}

for (let c = 1; c <= 16; c++) {
  const pad = c < 10 ? '0' + c : '' + c;
  const chKey = 'phy-ch' + pad;
  const ch = ctx.window.IPE_DATA.chapters[chKey];
  if (!ch) continue;

  console.log(`\n========================================`);
  console.log(`${chKey}: ${ch.chapter} (${ch.questions ? ch.questions.length : 0} questions)`);
  console.log(`========================================`);

  (ch.formulaSheet || []).forEach((fc, idx) => {
    ['symbols', 'units', 'tip'].forEach(f => {
      const val = fc[f] || '';
      const s = stripMath(val);
      if (/\\[a-zA-Z]+|[xX*×]\s*10\^|10\^[-+]?\d+|[A-Za-z0-9]_[A-Za-z0-9]|\b\d+(?:\.\d+)?\s*(?:m\/s|cm|mm|nm|pm|km\/s|rad\/s|Hz|kHz|MHz|GHz|pF|nF|uF|uC|nC|pC|MeV|keV|eV|Wb|Tesla|Henry|mA|uA)\b/.test(s)) {
        console.log(`  [formulaSheet #${idx+1} ${fc.title}] (${f}): ${val}`);
      }
    });
  });

  (ch.questions || []).forEach((q, idx) => {
    const issues = [];
    ['question', 'answer'].forEach(f => {
      const val = q[f] || '';
      const s = stripMath(val);
      if (/\\[a-zA-Z]+|[xX*×]\s*10\^|10\^[-+]?\d+|[A-Za-z0-9]_[A-Za-z0-9]|\b\d+(?:\.\d+)?\s*(?:m\/s|cm|mm|nm|pm|km\/s|rad\/s|Hz|kHz|MHz|GHz|pF|nF|uF|uC|nC|pC|MeV|keV|eV|Wb|Tesla|mA|uA)\b/.test(s)) {
        issues.push(`(${f}): ${s.slice(0, 120).replace(/\s+/g, ' ')}`);
      }
    });
    (q.options || []).forEach((opt, oIdx) => {
      const s = stripMath(opt);
      if (/\\[a-zA-Z]+|[xX*×]\s*10\^|10\^[-+]?\d+|[A-Za-z0-9]_[A-Za-z0-9]|\b\d+(?:\.\d+)?\s*(?:m\/s|cm|mm|nm|pm|km\/s|rad\/s|Hz|kHz|MHz|GHz|pF|nF|uF|uC|nC|pC|MeV|keV|eV|Wb|Tesla|mA|uA)\b/.test(s)) {
        issues.push(`(opt[${oIdx}]): ${opt}`);
      }
    });
    if (issues.length > 0) {
      console.log(`  Q#${idx+1} [${q.id}]:`);
      issues.forEach(i => console.log(`     ${i}`));
    }
  });
}

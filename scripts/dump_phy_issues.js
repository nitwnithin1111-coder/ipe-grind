const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.resolve(__dirname, '..');
const ctx = { window: {}, document: {}, console: console };
ctx.window = ctx;
vm.createContext(ctx);

vm.runInContext(fs.readFileSync(path.join(baseDir, 'data/manifest.js'), 'utf8'), ctx);

const phyDir = path.join(baseDir, 'data/physics');
const files = fs.readdirSync(phyDir).filter(f => f.endsWith('.js')).sort();
for (const f of files) {
  const code = fs.readFileSync(path.join(phyDir, f), 'utf8');
  vm.runInContext(code, ctx);
}

const chapters = ctx.window.IPE_DATA.chapters;

function stripMath(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\$[^\$\n]*?\$/g, '');
}

const testRegex = /\\[a-zA-Z]+|[xX*]\s*10\^|10\^[-+]?\d+|[A-Za-z0-9]_[A-Za-z0-9]|\b\d+(?:\.\d+)?\s*(?:m\/s|m\/s\^2|cm|mm|nm|km|Hz|kHz|MHz|GHz|rad\/s|kg\s*m\^-3|V\/m|Tesla|Wb|MeV|eV|keV|pF|nF|uF|uC|nC)\b|\b(?:v|c|f|nu|lambda|mu|R|f_1|f_2|u|R_1|R_2)\s*=\s*[-+]?\d+/g;

for (let i = 3; i <= 16; i++) {
  const chKey = 'phy-ch' + String(i).padStart(2, '0');
  const ch = chapters[chKey];
  if (!ch) continue;

  console.log(`\n================== ${chKey}: ${ch.chapter} ==================`);

  (ch.formulaSheet || []).forEach((fc, idx) => {
    ['symbols', 'units', 'tip'].forEach(f => {
      const val = fc[f] || '';
      const stripped = stripMath(val);
      const m = stripped.match(testRegex);
      if (m) {
        console.log(`[FS #${idx} (${fc.title}) -> ${f}]`);
        console.log(`  MATCH: ${[...new Set(m)].join(', ')}`);
        console.log(`  VAL: ${JSON.stringify(val)}`);
      }
    });
  });

  (ch.questions || []).forEach((q, idx) => {
    ['question', 'answer'].forEach(f => {
      const val = q[f] || '';
      const stripped = stripMath(val);
      const m = stripped.match(testRegex);
      if (m) {
        console.log(`[Q #${idx} (${q.id}) -> ${f}]`);
        console.log(`  MATCH: ${[...new Set(m)].join(', ')}`);
        console.log(`  VAL: ${JSON.stringify(val)}`);
      }
    });

    if (q.options) {
      q.options.forEach((opt, oIdx) => {
        const stripped = stripMath(opt);
        const m = stripped.match(testRegex);
        if (m) {
          console.log(`[Q #${idx} (${q.id}) -> options[${oIdx}]]`);
          console.log(`  MATCH: ${[...new Set(m)].join(', ')}`);
          console.log(`  VAL: ${JSON.stringify(opt)}`);
        }
      });
    }

    // check telugu hints for control characters or raw latex
    ['telugu_hint', 'tenglish_hint'].forEach(f => {
      const val = q[f] || '';
      if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(val) || /\\[a-zA-Z]+/.test(stripMath(val))) {
        console.log(`[Q #${idx} (${q.id}) -> ${f} (raw latex / ctrl)]`);
        console.log(`  VAL: ${JSON.stringify(val)}`);
      }
    });
  });
}

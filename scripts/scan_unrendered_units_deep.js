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

const unitRegex = /\b\d+(?:\.\d+)?\s*(?:m\/s|m\/s\^2|cm|mm|nm|km|rad\/s|kg\s*m\^-3|V\/m|Tesla|Wb|MeV|eV|keV|pF|nF|uF|uC|nC|kHz|MHz|GHz|Hz|V|A|W|J|N|g)\b/g;

for (let i = 1; i <= 16; i++) {
  const chKey = 'phy-ch' + String(i).padStart(2, '0');
  const ch = chapters[chKey];
  if (!ch) continue;

  const found = [];
  (ch.questions || []).forEach((q, idx) => {
    ['question', 'answer'].forEach(f => {
      const val = q[f] || '';
      const outside = stripMath(val);
      const m = outside.match(unitRegex);
      if (m) {
        // filter out common English words like 'A' (e.g., '1. A' or 'option A' or 'is A')
        const filtered = m.filter(item => {
          if (item.trim().endsWith('A') && !/\d+\s*A\b/.test(item)) return false;
          return true;
        });
        if (filtered.length > 0) {
          found.push({ id: q.id, field: f, matches: filtered, snippet: outside.slice(0, 100) });
        }
      }
    });
  });

  if (found.length > 0) {
    console.log(`=== ${chKey} (${found.length}) ===`);
    found.forEach(item => {
      console.log(`  [${item.id} -> ${item.field}]: ${item.matches.join(', ')}`);
      console.log(`    "${item.snippet.replace(/\n/g, ' ')}"`);
    });
  }
}

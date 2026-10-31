const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.resolve(__dirname, '..');
const ctx = { window: {}, document: {}, console: console };
ctx.window = ctx;
vm.createContext(ctx);

const manifestCode = fs.readFileSync(path.join(baseDir, 'data/manifest.js'), 'utf8');
vm.runInContext(manifestCode, ctx);

function loadAllChapters(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      loadAllChapters(full);
    } else if (f.endsWith('.js') && f !== 'manifest.js') {
      const code = fs.readFileSync(full, 'utf8');
      vm.runInContext(code, ctx);
    }
  }
}

loadAllChapters(path.join(baseDir, 'data'));
const chapters = ctx.window.IPE_DATA.chapters;

function stripMath(str) {
  if (!str) return '';
  return str.replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\$[\s\S]*?\$/g, '');
}

// Patterns that definitely indicate unrendered scientific / math content
const patterns = [
  { name: 'scientific_notation', regex: /\b\d+(?:\.\d+)?\s*[xX]\s*10\^[-+]?\d+/g },
  { name: 'power_10', regex: /\b10\^[-+]?\d+/g },
  { name: 'caret_power', regex: /\b\d+\^[-+]?\d+|\b[a-zA-Z]\^[-+]?\d+/g },
  { name: 'unit_power', regex: /\b(?:cm\^3|cm\^2|g\/cm\^3|g\s*cm\^-3|mol\^-1|s\^-1|m\/s|m\/s\^2|m\^2|m\^3|kg\s*m\^-3|J\s*K\^-1|cal\s*g\^-1|V\/m|A\/m|W\/m\^2)\b/g },
  { name: 'subscript_var', regex: /\b(?:N_A|K_a|K_b|K_w|K_c|K_p|E_a|P_1|P_2|V_1|V_2|T_1|T_2|R_1|R_2|C_1|C_2|I_1|I_2|lambda_0|mu_0|epsilon_0)\b/g },
  { name: 'raw_latex', regex: /\\(?:frac|times|pm|circ|mu|alpha|beta|gamma|lambda|Delta|delta|theta|omega|pi|approx|le|ge|cdot|sqrt|to|rightarrow)\b/g }
];

const results = [];

for (const [chKey, chData] of Object.entries(chapters)) {
  if (!chData.questions) continue;
  chData.questions.forEach(q => {
    ['question', 'answer'].forEach(field => {
      const text = q[field];
      if (!text) return;
      const outside = stripMath(text);
      for (const p of patterns) {
        const matches = outside.match(p.regex);
        if (matches) {
          results.push({
            chapter: chKey,
            id: q.id,
            field,
            pattern: p.name,
            matches: Array.from(new Set(matches)),
            outsideSnippet: outside.substring(0, 100).replace(/\n/g, ' ')
          });
        }
      }
    });
  });
}

console.log(`Found ${results.length} question/answer issues across chapters.`);
const byChapter = {};
results.forEach(r => {
  byChapter[r.chapter] = (byChapter[r.chapter] || 0) + 1;
});
console.log('Issues by chapter:');
console.log(byChapter);

// Output specific examples
console.log('\nSample question issues:');
results.filter(r => r.field === 'question').slice(0, 15).forEach(r => {
  console.log(`[${r.chapter} - ${r.id}] Pattern: ${r.pattern} -> Matches: ${r.matches.join(', ')}`);
  console.log(`  Snippet: ${r.outsideSnippet}\n`);
});

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

const patterns = [
  { name: 'scientific_notation', regex: /\b\d+(?:\.\d+)?\s*[xX]\s*10\^[-+]?\d+/g },
  { name: 'power_10', regex: /\b10\^[-+]?\d+/g },
  { name: 'unit_power', regex: /\b(?:cm\^3|g\/cm\^3|g\s*cm\^-3|mol\^-1|s\^-1|m\^2|m\^3|kg\s*m\^-3|J\s*K\^-1|cal\s*g\^-1|V\/m|A\/m)\b/g },
  { name: 'subscript_var', regex: /\b(?:N_A|K_a|K_b|K_w|K_c|K_p|E_a|P_1|P_2|V_1|V_2|T_1|T_2|R_1|R_2|C_1|C_2|I_1|I_2|lambda_0|mu_0|epsilon_0)\b/g },
  { name: 'raw_latex', regex: /\\(?:frac|times|pm|circ|mu|alpha|beta|gamma|lambda|Delta|delta|theta|omega|pi|approx|le|ge|cdot|sqrt|to|rightarrow)\b/g },
  { name: 'raw_underscore', regex: /[A-Za-z0-9]_[A-Za-z0-9]/g }
];

let totalIssues = 0;
const issuesByChapter = {};
const sampleList = [];

for (const [chKey, chData] of Object.entries(chapters)) {
  const chIssues = [];
  
  // Check questions
  if (chData.questions) {
    chData.questions.forEach((q, idx) => {
      ['question', 'answer', 'formula'].forEach(field => {
        const text = q[field];
        if (!text) return;
        const outside = stripMath(text);
        for (const p of patterns) {
          const matches = outside.match(p.regex);
          if (matches) {
            chIssues.push({
              qid: q.id || `${chKey}-q${idx+1}`,
              field,
              pattern: p.name,
              matches: matches,
              text: text
            });
            totalIssues += matches.length;
          }
        }
      });
    });
  }

  // Check formula_bank
  if (chData.formula_bank) {
    chData.formula_bank.forEach((f, idx) => {
      ['formula', 'description'].forEach(field => {
        const text = f[field];
        if (!text) return;
        const outside = stripMath(text);
        for (const p of patterns) {
          const matches = outside.match(p.regex);
          if (matches) {
            chIssues.push({
              qid: `formula-${idx+1}`,
              field,
              pattern: p.name,
              matches: matches,
              text: text
            });
            totalIssues += matches.length;
          }
        }
      });
    });
  }

  if (chIssues.length > 0) {
    issuesByChapter[chKey] = chIssues;
    sampleList.push(...chIssues.slice(0, 2).map(x => ({ chKey, ...x })));
  }
}

console.log(`TOTAL UNRENDERED MATH PATTERN MATCHES: ${totalIssues}`);
console.log('--- CHAPTER BREAKDOWN ---');
for (const [ch, list] of Object.entries(issuesByChapter)) {
  console.log(`${ch}: ${list.length} issues`);
}

console.log('\n--- SAMPLE ISSUES ---');
sampleList.slice(0, 10).forEach(s => {
  console.log(`[${s.chKey} | ${s.qid} | ${s.field} | ${s.pattern}]`);
  console.log(`  Matches: ${JSON.stringify(s.matches)}`);
  console.log(`  Snippet: ${s.text.substring(0, 150)}...\n`);
});

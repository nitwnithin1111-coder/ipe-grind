const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.resolve(__dirname, '..');
const katexCode = fs.readFileSync(path.join(baseDir, 'assets/katex/katex.min.js'), 'utf8');

const ctx = { window: {}, document: {}, console: console };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(katexCode, ctx);
const katex = ctx.katex;

// Load manifest
const manifestCode = fs.readFileSync(path.join(baseDir, 'data/manifest.js'), 'utf8');
vm.runInContext(manifestCode, ctx);

// Load only physics chapters
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

console.log(`Loaded ${Object.keys(chapters).length} physics chapters.`);

const checks = [
  { name: 'raw_latex', regex: /\\(?:frac|times|pm|circ|mu|nu|alpha|beta|gamma|lambda|Delta|delta|theta|omega|pi|approx|le|ge|cdot|sqrt|to|rightarrow|varepsilon|epsilon|rho|sigma|tau|phi|psi|chi|eta|kappa|left|right|text|vec|hat)\b/g },
  { name: 'scientific_notation', regex: /\b\d+(?:\.\d+)?\s*[xX*×]\s*10\^?[-+]?\d+/g },
  { name: 'power_10', regex: /\b10\^[-+]?\d+/g },
  { name: 'subscript_var', regex: /\b(?:P_1|P_2|V_1|V_2|R_1|R_2|I_1|I_2|f_1|f_2|T_1|T_2|C_1|C_2|E_1|E_2|B_1|B_2|v_1|v_2|u_1|u_2|m_1|m_2|q_1|q_2|n_1|n_2|lambda_1|lambda_2|r_1|r_2|d_1|d_2|k_1|k_2|A_1|A_2|N_1|N_2|L_1|L_2|w_1|w_2|y_1|y_2|x_1|x_2|epsilon_0|mu_0|N_A|E_a)\b/g },
  { name: 'raw_underscore', regex: /[A-Za-z0-9]_[A-Za-z0-9]/g },
  { name: 'units_with_caret', regex: /\b(?:m\/s\^2|m\^2|m\^3|cm\^3|cm\^2|mm\^2|s\^-1|ms\^-1|kg\s*m\^-3|g\/cm\^3|mol\^-1|J\s*s|N\s*m\^2\/C\^2|C\^2\/N\s*m\^2|T\s*m\s*A\^-1|Wb\/m\^2|V\/m|A\/m|W\/m\^2)\b/g },
  { name: 'common_units_values', regex: /\b\d+(?:\.\d+)?\s*(?:m\/s|cm|mm|nm|pm|km\/s|rad\/s|Hz|kHz|MHz|GHz|pF|nF|uF|uC|nC|pC|MeV|keV|eV|Wb|Tesla|Henry|mA|uA|k\Omega|M\Omega)\b/g },
  { name: 'equals_variables', regex: /\b(?:v|c|f|nu|lambda|mu|R|f_1|f_2|u|v|R_1|R_2)\s*=\s*[-+]?\d+(?:\.\d+)?\s*(?:cm|mm|m|m\/s|Hz|nm)?\b/g }
];

const report = {};

for (const [chKey, chData] of Object.entries(chapters)) {
  report[chKey] = {
    title: chData.chapter,
    totalQuestions: chData.questions ? chData.questions.length : 0,
    issues: []
  };

  const chReport = report[chKey];

  if (chData.questions) {
    chData.questions.forEach((q, idx) => {
      // Check question
      ['question', 'answer', 'formula', 'telugu_hint'].forEach(field => {
        const text = q[field];
        if (!text) return;
        const outside = stripMath(text);
        checks.forEach(c => {
          const m = outside.match(c.regex);
          if (m) {
            chReport.issues.push({
              qid: q.id,
              field,
              check: c.name,
              matches: [...new Set(m)],
              snippet: outside.substring(0, 120).replace(/\s+/g, ' ')
            });
          }
        });
      });

      // Check options
      if (q.options && Array.isArray(q.options)) {
        q.options.forEach((opt, oIdx) => {
          const outside = stripMath(opt);
          checks.forEach(c => {
            const m = outside.match(c.regex);
            if (m) {
              chReport.issues.push({
                qid: q.id,
                field: `options[${oIdx}]`,
                check: c.name,
                matches: [...new Set(m)],
                snippet: opt
              });
            }
          });
        });
      }
    });
  }

  // Check formulaSheet
  if (chData.formulaSheet) {
    chData.formulaSheet.forEach((f, idx) => {
      ['symbols', 'units', 'tip'].forEach(field => {
        const text = f[field];
        if (!text) return;
        const outside = stripMath(text);
        checks.forEach(c => {
          const m = outside.match(c.regex);
          if (m) {
            chReport.issues.push({
              qid: `formulaSheet[${idx}]:${f.title}`,
              field,
              check: c.name,
              matches: [...new Set(m)],
              snippet: outside.substring(0, 120).replace(/\s+/g, ' ')
            });
          }
        });
      });
    });
  }
}

for (const [chKey, chInfo] of Object.entries(report)) {
  console.log(`\n========================================`);
  console.log(`${chKey}: ${chInfo.title} (Questions: ${chInfo.totalQuestions}, Issues flagged: ${chInfo.issues.length})`);
  console.log(`========================================`);
  const byCheck = {};
  chInfo.issues.forEach(i => {
    byCheck[i.check] = (byCheck[i.check] || 0) + 1;
  });
  console.log('Breakdown:', byCheck);
  chInfo.issues.slice(0, 8).forEach(i => {
    console.log(`  [${i.qid} | ${i.field} | ${i.check}] ${i.matches.join(', ')}`);
    console.log(`     "${i.snippet}"`);
  });
}

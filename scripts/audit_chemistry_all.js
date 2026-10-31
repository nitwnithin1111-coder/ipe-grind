const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.resolve(__dirname, '..');
const ctx = { window: {}, document: {}, console: console };
ctx.window = ctx;
vm.createContext(ctx);

// Load manifest
const manifestPath = path.join(baseDir, 'data/manifest.js');
vm.runInContext(fs.readFileSync(manifestPath, 'utf8'), ctx);

// Load all chemistry chapters
for (let i = 1; i <= 15; i++) {
  const numStr = String(i).padStart(2, '0');
  const dir = path.join(baseDir, 'data/chemistry');
  const files = fs.readdirSync(dir).filter(f => f.startsWith('ch' + numStr));
  if (files.length > 0) {
    const code = fs.readFileSync(path.join(dir, files[0]), 'utf8');
    vm.runInContext(code, ctx);
  }
}

const chapters = ctx.window.IPE_DATA.chapters;

function stripMath(str) {
  if (!str) return '';
  // remove $$ ... $$ and $ ... $
  return str.replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\$[^\$\n]*?\$/g, '');
}

const suspiciousPatterns = [
  { name: 'scientific_notation', regex: /\b\d+(?:\.\d+)?\s*[xX]\s*10\^[-+]?\d+/g },
  { name: 'powers_of_ten', regex: /(?<![\$\w])10\^[-+]?\d+/g },
  { name: 'caret_superscript', regex: /[a-zA-Z0-9]\^[-+]?\d+/g },
  { name: 'slash_units', regex: /\b(?:\d+(?:\.\d+)?\s*)?(?:g\/cm\^3|g\/mol|g\/mL|g\/L|kg\/m\^3|mol\/L|mol\/kg|K\s*kg\/mol|K\s*kg\s*mol\^-1|s\^-1|min\^-1)\b/g },
  { name: 'named_units', regex: /\b\d+(?:\.\d+)?\s*(?:pm|Å|cm\^3|cm\^2|g\/cm\^3|mol\^-1|g\/mol)\b/g },
  { name: 'subscript_vars', regex: /\b(?:N_A|K_a|K_b|K_w|K_c|K_p|E_a|P_A|P_B|P_A\^0|P_B\^0|Delta\s*H|Delta\s*V|Delta\s*T|Delta\s*G|Delta\s*S|T_b|T_f|pi\s*=\s*CRT)\b/gi },
  { name: 'raw_latex_cmd', regex: /\\(?:frac|times|pm|circ|mu|alpha|beta|gamma|lambda|Delta|delta|theta|omega|pi|approx|le|ge|cdot|sqrt|to|rightarrow)\b/g },
  { name: 'raw_delta', regex: /\bDelta\s+[A-Za-z]/g }
];

console.log('--- DETAILED CHEMISTRY AUDIT ---');
let grandTotal = 0;
const report = {};

for (let i = 1; i <= 15; i++) {
  const chKey = 'chem-ch' + String(i).padStart(2, '0');
  const ch = chapters[chKey];
  if (!ch) {
    console.log('Chapter not found:', chKey);
    continue;
  }

  const chFindings = [];

  function check(str, label, id) {
    if (!str || typeof str !== 'string') return;
    const stripped = stripMath(str);
    for (const p of suspiciousPatterns) {
      const matches = stripped.match(p.regex);
      if (matches) {
        chFindings.push({ id, label, pattern: p.name, matches: Array.from(new Set(matches)), snippet: stripped.substring(0, 150).replace(/\n/g, ' ') });
      }
    }
  }

  // Check formulaSheet
  if (ch.formulaSheet) {
    ch.formulaSheet.forEach((f, idx) => {
      check(f.symbols, 'formulaSheet[' + idx + '].symbols', 'f' + idx);
      check(f.units, 'formulaSheet[' + idx + '].units', 'f' + idx);
      check(f.tip, 'formulaSheet[' + idx + '].tip', 'f' + idx);
    });
  }

  // Check questions
  if (ch.questions) {
    ch.questions.forEach((q, idx) => {
      check(q.question, 'question', q.id);
      check(q.answer, 'answer', q.id);
      if (q.telugu_hint) check(q.telugu_hint, 'telugu_hint', q.id);
      if (q.tenglish_hint) check(q.tenglish_hint, 'tenglish_hint', q.id);
      if (q.options) {
        q.options.forEach((opt, oIdx) => {
          check(opt, 'options[' + oIdx + ']', q.id);
        });
      }
    });
  }

  grandTotal += chFindings.length;
  report[chKey] = chFindings;
  console.log(`${chKey} (${ch.chapter}): ${chFindings.length} issues`);
}

console.log(`\nGrand total issues across chemistry: ${grandTotal}`);

// Save detailed report to json
fs.writeFileSync(path.join(baseDir, 'scripts/audit_chem_report.json'), JSON.stringify(report, null, 2));
console.log('Wrote scripts/audit_chem_report.json');

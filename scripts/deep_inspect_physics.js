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

const rawLatexRegex = /\\[a-zA-Z]+/g;
const allowedEscapes = new Set(['\\n', '\\t', '\\r', '\\b', '\\f', '\\v']);

const unitRegex = /\b\d+(?:\.\d+)?\s*(?:m\/s|m\/s\^2|cm|mm|nm|km|rad\/s|kg\s*m\^-3|V\/m|Tesla|Wb|MeV|eV|keV|pF|nF|uF|uC|nC|kHz|MHz|GHz|Hz)\b/g;
const sciRegex = /\b\d+(?:\.\d+)?\s*[xX]\s*10\^[-+]?\d+|\b10\^[-+]?\d+/g;
const varSubRegex = /\b[A-Za-z]_[A-Za-z0-9]+\b/g;
const equalsValRegex = /\b(?:v|c|f|nu|lambda|mu|R|f_1|f_2|u|R_1|R_2|n|i|r)\s*=\s*[-+]?\d+/g;

const allIssues = {};

for (let i = 1; i <= 16; i++) {
  const chKey = 'phy-ch' + String(i).padStart(2, '0');
  const ch = chapters[chKey];
  if (!ch) {
    console.log(`Warning: chapter ${chKey} not found`);
    continue;
  }
  const chIssues = [];

  const check = (text, location, objId) => {
    if (!text || typeof text !== 'string') return;

    // Check for weird control characters
    if (/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text)) {
      chIssues.push({ location, objId, type: 'controlChar', text });
    }

    const outside = stripMath(text);

    // 1. Raw latex outside math
    const latexMatches = outside.match(rawLatexRegex);
    if (latexMatches) {
      const bad = latexMatches.filter(m => !allowedEscapes.has(m));
      if (bad.length > 0) {
        chIssues.push({ location, objId, type: 'rawLatex', matches: bad, text: text.substring(0, 120) });
      }
    }

    // 2. Units outside math
    const unitMatches = outside.match(unitRegex);
    if (unitMatches) {
      chIssues.push({ location, objId, type: 'unrenderedUnit', matches: unitMatches, text: text.substring(0, 120) });
    }

    // 3. Sci notation
    const sciMatches = outside.match(sciRegex);
    if (sciMatches) {
      chIssues.push({ location, objId, type: 'sciNotation', matches: sciMatches, text: text.substring(0, 120) });
    }

    // 4. Subscript variables outside math
    const varMatches = outside.match(varSubRegex);
    if (varMatches) {
      chIssues.push({ location, objId, type: 'subscriptVar', matches: varMatches, text: text.substring(0, 120) });
    }

    // 5. equals val
    const eqMatches = outside.match(equalsValRegex);
    if (eqMatches) {
      chIssues.push({ location, objId, type: 'equalsVal', matches: eqMatches, text: text.substring(0, 120) });
    }
  };

  (ch.formulaSheet || []).forEach((fs, idx) => {
    check(fs.symbols, `formulaSheet[${idx}].symbols (${fs.title})`, `fs-${idx}`);
    check(fs.units, `formulaSheet[${idx}].units (${fs.title})`, `fs-${idx}`);
    check(fs.tip, `formulaSheet[${idx}].tip (${fs.title})`, `fs-${idx}`);
  });

  (ch.questions || []).forEach((q, idx) => {
    check(q.question, `q[${idx}].question`, q.id);
    check(q.answer, `q[${idx}].answer`, q.id);
    check(q.telugu_hint, `q[${idx}].telugu_hint`, q.id);
    check(q.tenglish_hint, `q[${idx}].tenglish_hint`, q.id);
    if (q.options) {
      q.options.forEach((opt, oIdx) => check(opt, `q[${idx}].options[${oIdx}]`, q.id));
    }
  });

  allIssues[chKey] = chIssues;
}

console.log('=== DEEP INSPECT RESULTS ===');
let total = 0;
for (const [chKey, issues] of Object.entries(allIssues)) {
  console.log(`${chKey}: ${issues.length} issues`);
  total += issues.length;
  issues.forEach(iss => {
    console.log(`  [${iss.location} | ${iss.objId} | ${iss.type}]: ${iss.matches ? iss.matches.join(', ') : ''}`);
    console.log(`     "${iss.text.replace(/\n/g, ' ')}"`);
  });
}
console.log(`\nTOTAL ISSUES: ${total}`);

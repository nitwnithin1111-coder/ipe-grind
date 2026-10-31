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

console.log("=== Checking ALL raw LaTeX outside math in all chapters ===");
for (let i = 1; i <= 16; i++) {
  const chKey = 'phy-ch' + String(i).padStart(2, '0');
  const ch = chapters[chKey];
  if (!ch) continue;

  const testField = (text, loc) => {
    if (!text) return;
    const outside = stripMath(text);
    // Find backslash followed by letters (excluding \n, \t, etc)
    const matches = outside.match(/\\[a-zA-Z]+/g);
    if (matches) {
      const bad = matches.filter(m => !['\\n', '\\t', '\\r', '\\b'].includes(m));
      if (bad.length > 0) {
        console.log(`[${chKey} | ${loc}] raw LaTeX: ${bad.join(', ')} in: "${text.slice(0, 100)}"`);
      }
    }
    // Find subscripts like x_1
    const subMatches = outside.match(/\b[A-Za-z]_[A-Za-z0-9]+\b/g);
    if (subMatches) {
      console.log(`[${chKey} | ${loc}] subscript: ${subMatches.join(', ')} in: "${text.slice(0, 100)}"`);
    }
  };

  (ch.formulaSheet || []).forEach((fs, idx) => {
    testField(fs.symbols, `fs[${idx}].symbols`);
    testField(fs.units, `fs[${idx}].units`);
    testField(fs.tip, `fs[${idx}].tip`);
  });

  (ch.questions || []).forEach((q, idx) => {
    testField(q.question, `q[${idx}].question`);
    testField(q.answer, `q[${idx}].answer`);
    if (q.options) {
      q.options.forEach((opt, oIdx) => testField(opt, `q[${idx}].options[${oIdx}]`));
    }
  });
}

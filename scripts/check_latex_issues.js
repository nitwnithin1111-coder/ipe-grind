// Detailed check for any remaining un-delimited LaTeX across all chapters
global.window = {};
const path = require('path');
const baseDir = path.resolve(__dirname, '..');
require(path.join(baseDir, 'data/manifest.js'));
const fs = require('fs');

['physics', 'chemistry'].forEach(sub => {
  const dir = path.join(baseDir, 'data', sub);
  fs.readdirSync(dir).forEach(f => {
    if (f.endsWith('.js')) require(path.join(dir, f));
  });
});

const issues = [];
Object.keys(window.IPE_DATA.chapters).forEach(k => {
  const ch = window.IPE_DATA.chapters[k];
  
  (ch.formulaSheet || []).forEach(fc => {
    ['symbols', 'units', 'tip'].forEach(field => {
      const val = fc[field] || '';
      const stripped = val.replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\$[\s\S]*?\$/g, '');
      if (/\\[a-zA-Z]+/.test(stripped)) {
        const matches = stripped.match(/\\[a-zA-Z]+/g);
        issues.push({ type: 'formulaSheet', ch: ch.id, title: fc.title, field, matches, raw: val });
      }
    });
  });

  (ch.questions || []).forEach(q => {
    ['question', 'answer', 'telugu_hint'].forEach(field => {
      const val = q[field] || '';
      const stripped = val.replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\$[\s\S]*?\$/g, '');
      if (/\\[a-zA-Z]+/.test(stripped)) {
        const matches = stripped.match(/\\[a-zA-Z]+/g);
        issues.push({ type: 'question', ch: ch.id, qid: q.id, field, matches, raw: val });
      }
    });
  });
});

console.log('Total remaining issues:', issues.length);
console.log('FormulaSheet issues:', issues.filter(x => x.type === 'formulaSheet').length);
console.log('Question issues:', issues.filter(x => x.type === 'question').length);

issues.forEach(iss => {
  console.log(`[${iss.type}] ${iss.ch} ${iss.qid || iss.title} (${iss.field}): ${iss.matches.join(', ')}`);
});

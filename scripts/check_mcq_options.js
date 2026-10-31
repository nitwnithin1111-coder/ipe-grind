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

const mcqIssues = [];

for (const [chKey, chData] of Object.entries(chapters)) {
  if (!chData.questions) continue;
  chData.questions.forEach(q => {
    if (q.options && Array.isArray(q.options)) {
      q.options.forEach((opt, idx) => {
        const outside = stripMath(opt);
        if (/[xX]\s*10\^|10\^[-+]?\d+|[A-Za-z0-9]\^[-+]?\d+|g\/cm\^3|cm\^3|mol\^-1|\\[a-zA-Z]+|[A-Za-z0-9]_[A-Za-z0-9]/.test(outside)) {
          mcqIssues.push({
            chapter: chKey,
            id: q.id,
            optIdx: idx,
            option: opt
          });
        }
      });
    }
  });
}

console.log(`MCQ option issues: ${mcqIssues.length}`);
mcqIssues.slice(0, 10).forEach(m => {
  console.log(`[${m.chapter} | ${m.id} | opt ${m.optIdx}] ${m.option}`);
});

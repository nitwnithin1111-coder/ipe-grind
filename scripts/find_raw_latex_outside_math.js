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

// Regex for raw latex commands outside $...$ or $$...$$
const rawLatexRegex = /\\[a-zA-Z]{2,}/g;

const unrenderedIssues = [];

function checkRawLatexOutsideDollars(text, location) {
  if (!text || typeof text !== 'string') return;

  // Strip $$...$$ and $...$
  const stripped = text.replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\$[^\$\n]*?\$/g, '');

  const matches = stripped.match(rawLatexRegex);
  if (matches) {
    // Exclude allowed escaped characters like \n or \t
    const filtered = matches.filter(m => m !== '\\n' && m !== '\\t' && m !== '\\r');
    if (filtered.length > 0) {
      unrenderedIssues.push({
        location,
        foundCommands: [...new Set(filtered)],
        snippet: stripped.slice(0, 150)
      });
    }
  }
}

for (const chId in chapters) {
  const ch = chapters[chId];
  const chName = `${ch.subject} Ch ${ch.chapterNumber}: ${ch.chapter}`;

  if (ch.formulaSheet) {
    ch.formulaSheet.forEach((f, i) => {
      checkRawLatexOutsideDollars(f.symbols, `${chName} -> Formula #${i+1} (${f.title}) symbols`);
      checkRawLatexOutsideDollars(f.units, `${chName} -> Formula #${i+1} (${f.title}) units`);
      checkRawLatexOutsideDollars(f.tip, `${chName} -> Formula #${i+1} (${f.title}) tip`);
    });
  }

  if (ch.questions) {
    ch.questions.forEach((q, i) => {
      checkRawLatexOutsideDollars(q.question, `${chName} -> Q#${i+1} (${q.id}) question`);
      checkRawLatexOutsideDollars(q.answer, `${chName} -> Q#${i+1} (${q.id}) answer`);
      checkRawLatexOutsideDollars(q.telugu_hint, `${chName} -> Q#${i+1} (${q.id}) telugu_hint`);
    });
  }
}

console.log(`Found ${unrenderedIssues.length} locations where raw LaTeX commands appear outside $ delimiters!`);
unrenderedIssues.forEach((u, i) => {
  console.log(`\n[Raw LaTeX Issue #${i+1}] ${u.location}`);
  console.log(`  Commands: ${u.foundCommands.join(', ')}`);
  console.log(`  Snippet:  ${u.snippet.trim().replace(/\n/g, ' ')}`);
});

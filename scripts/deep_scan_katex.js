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

// Load manifest & all chapters
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
console.log(`Loaded ${Object.keys(chapters).length} chapters for KaTeX verification.`);

let totalTested = 0;
let errors = [];

function testExpression(expr, contextInfo, isDisplay = false) {
  if (!expr || typeof expr !== 'string') return;
  totalTested++;
  try {
    katex.renderToString(expr, {
      throwOnError: true,
      displayMode: isDisplay
    });
  } catch (err) {
    errors.push({
      context: contextInfo,
      expression: expr,
      error: err.message
    });
  }
}

// Regex to extract $...$ and $$...$$
function extractAndTest(text, contextInfo) {
  if (!text || typeof text !== 'string') return;

  // Extract display math $$...$$
  const displayMatches = text.match(/\$\$([\s\S]*?)\$\$/g);
  if (displayMatches) {
    for (const m of displayMatches) {
      const clean = m.slice(2, -2).trim();
      testExpression(clean, contextInfo + ' [display $$...$$]', true);
    }
  }

  // Remove display math before testing inline math
  const withoutDisplay = text.replace(/\$\$([\s\S]*?)\$\$/g, '');
  const inlineMatches = withoutDisplay.match(/\$([^\$\n]+?)\$/g);
  if (inlineMatches) {
    for (const m of inlineMatches) {
      const clean = m.slice(1, -1).trim();
      testExpression(clean, contextInfo + ' [inline $...$]', false);
    }
  }

  // Check for orphan unclosed dollars
  const count = (text.match(/\$/g) || []).length;
  if (count % 2 !== 0) {
    errors.push({
      context: contextInfo,
      expression: text.slice(0, 100),
      error: `Unmatched dollar sign ($ count is odd: ${count})`
    });
  }
}

for (const chId in chapters) {
  const ch = chapters[chId];
  const chName = `${ch.subject} Ch ${ch.chapterNumber}: ${ch.chapter}`;

  // 1. Formula Sheet
  if (ch.formulaSheet && Array.isArray(ch.formulaSheet)) {
    ch.formulaSheet.forEach((f, idx) => {
      const info = `${chName} -> Formula #${idx + 1} (${f.title})`;
      if (f.formula) {
        const clean = f.formula.replace(/^\$+|\$+$/g, '').trim();
        testExpression(clean, info + ' -> formula', true);
      }
      if (f.symbols) extractAndTest(f.symbols, info + ' -> symbols');
      if (f.units) extractAndTest(f.units, info + ' -> units');
      if (f.tip) extractAndTest(f.tip, info + ' -> tip');
    });
  }

  // 2. Questions
  if (ch.questions && Array.isArray(ch.questions)) {
    ch.questions.forEach((q, idx) => {
      const info = `${chName} -> Q#${idx + 1} (${q.id})`;
      extractAndTest(q.question, info + ' -> question');
      extractAndTest(q.answer, info + ' -> answer');
      if (q.formula) {
        const clean = q.formula.replace(/^\$+|\$+$/g, '').trim();
        testExpression(clean, info + ' -> key formula', true);
      }
      if (q.telugu_hint) extractAndTest(q.telugu_hint, info + ' -> telugu_hint');
      if (q.tenglish_hint) extractAndTest(q.tenglish_hint, info + ' -> tenglish_hint');
      if (q.options && Array.isArray(q.options)) {
        q.options.forEach((opt, oIdx) => {
          extractAndTest(opt, `${info} -> option ${oIdx}`);
        });
      }
    });
  }
}

console.log(`\n==================================================`);
console.log(`Total LaTeX Expressions Tested: ${totalTested}`);
console.log(`Total Errors / Syntax Issues Found: ${errors.length}`);
console.log(`==================================================\n`);

if (errors.length > 0) {
  errors.forEach((e, idx) => {
    console.log(`[Error #${idx + 1}] in ${e.context}`);
    console.log(`  Expression: "${e.expression}"`);
    console.log(`  Details:    ${e.error}\n`);
  });
} else {
  console.log('🎉 ALL LaTeX expressions in all 31 chapters rendered with 100% KaTeX perfection!');
}

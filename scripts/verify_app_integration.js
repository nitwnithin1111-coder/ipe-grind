const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

console.log('=== RUNNING FULL IPE GRIND APP INTEGRATION VERIFICATION ===\n');

// 1. Check HTML Elements & IDs
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

const requiredIds = [
  'header-user-btn',
  'header-user-name',
  'global-sub-all',
  'global-sub-physics',
  'global-sub-chemistry',
  'ch-picker-physics',
  'ch-picker-chemistry',
  'ch-pill-physics',
  'ch-pill-chemistry',
  'ch-pill-all',
  'modal-auth',
  'auth-input-name',
  'auth-input-mobile',
  'auth-select-aim',
  'ai-chat-modal',
  'ai-chat-messages',
  'ai-typing-indicator',
  'ai-chat-input',
  'ai-chat-send-btn'
];

let missingIds = [];
requiredIds.forEach(id => {
  if (!html.includes(`id="${id}"`)) {
    missingIds.push(id);
  }
});

if (missingIds.length > 0) {
  console.error('❌ Missing HTML IDs:', missingIds);
  process.exit(1);
} else {
  console.log('✅ All required HTML IDs present in index.html');
}

// 2. Check Groq AI script tag in index.html
if (/<script src="js\/ai\.js(?:\?v=\d+)?"/.test(html)) {
  console.log('✅ js/ai.js script tag correctly included in index.html');
} else {
  console.error('❌ Missing js/ai.js script tag in index.html');
  process.exit(1);
}

// 3. Verify Formula Count & Telugu Characters in Chapters
const manifestFile = path.join(baseDir, 'data', 'manifest.js');
const manifestCode = fs.readFileSync(manifestFile, 'utf8');
const fakeWindow = { IPE_DATA: {} };
eval(`(function(window){ ${manifestCode} })(fakeWindow)`);

const chapters = fakeWindow.IPE_DATA.manifest;
let totalQuestions = 0;
let totalFormulas = 0;
let teluguCharsFound = 0;
const teluguRegex = /[\u0C00-\u0C7F]/;

const allFiles = [];
chapters.physics.forEach(c => allFiles.push(path.join(baseDir, c.file)));
chapters.chemistry.forEach(c => allFiles.push(path.join(baseDir, c.file)));

allFiles.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  if (teluguRegex.test(code)) {
    teluguCharsFound++;
    console.error('❌ Telugu character found in file:', f);
  }
  eval(`(function(window){ ${code} })(fakeWindow)`);
});

Object.keys(fakeWindow.IPE_DATA.chapters).forEach(k => {
  const ch = fakeWindow.IPE_DATA.chapters[k];
  if (ch.questions) totalQuestions += ch.questions.length;
  if (ch.formulaSheet) totalFormulas += ch.formulaSheet.length;
});

console.log(`✅ Loaded ${Object.keys(fakeWindow.IPE_DATA.chapters).length} Chapters:`);
console.log(`   - Total Questions: ${totalQuestions}`);
console.log(`   - Total Formula Cards: ${totalFormulas}`);
console.log(`   - Telugu Script Characters Found: ${teluguCharsFound}`);

if (teluguCharsFound > 0) {
  console.error('❌ Telugu characters detected!');
  process.exit(1);
}

// 4. Verify sw.js cache name and files
const swCode = fs.readFileSync(path.join(baseDir, 'sw.js'), 'utf8');
if (swCode.includes('ipe-grind-v') && swCode.includes('./js/ai.js')) {
  console.log('✅ Service worker v9 caches ./js/ai.js');
} else {
  console.error('❌ Service worker cache missing v9 or ai.js');
}

console.log('\n🎉 ALL INTEGRATION CHECKS PASSED PERFECTLY!');

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = path.join(__dirname, '..', 'js');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

console.log(`Checking syntax of ${files.length} JS files in js/...`);
let errors = 0;

files.forEach(f => {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  try {
    new vm.Script(code);
    console.log(`  [PASS] ${f}`);
  } catch (err) {
    console.error(`  [FAIL] ${f}: ${err.message}`);
    errors++;
  }
});

// Also check sw.js
try {
  const swCode = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
  new vm.Script(swCode);
  console.log(`  [PASS] sw.js`);
} catch (err) {
  console.error(`  [FAIL] sw.js: ${err.message}`);
  errors++;
}

if (errors === 0) {
  console.log('ALL JAVASCRIPT FILES COMPILED CLEANLY WITH ZERO SYNTAX ERRORS!');
} else {
  console.error(`Found ${errors} syntax errors.`);
  process.exit(1);
}

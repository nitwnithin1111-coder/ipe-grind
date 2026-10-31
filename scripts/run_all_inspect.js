const { execSync } = require('child_process');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const inspectScript = path.join(baseDir, 'scripts/inspect_chapter.js');

for (let i = 3; i <= 16; i++) {
  const ch = 'phy-ch' + (i < 10 ? '0' + i : i);
  const out = execSync(`node "${inspectScript}" ${ch}`, { encoding: 'utf8', cwd: baseDir });
  const lines = out.split('\n').filter(l => l.trim() && !l.startsWith('==='));
  if (lines.length > 0) {
    console.log(`\n>>> ${ch} (${lines.length} issues)`);
    console.log(lines.join('\n'));
  } else {
    console.log(`${ch}: CLEAN`);
  }
}

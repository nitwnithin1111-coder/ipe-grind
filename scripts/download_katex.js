const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'assets', 'katex');
const fontsDir = path.join(targetDir, 'fonts');

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading core KaTeX files to:', targetDir);
  await download('https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js', path.join(targetDir, 'katex.min.js'));
  await download('https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css', path.join(targetDir, 'katex.min.css'));
  await download('https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js', path.join(targetDir, 'auto-render.min.js'));
  console.log('Core KaTeX files downloaded!');

  const css = fs.readFileSync(path.join(targetDir, 'katex.min.css'), 'utf8');
  const matches = Array.from(new Set(css.match(/fonts\/[a-zA-Z0-9_\-]+\.woff2/g) || []));

  console.log(`Downloading ${matches.length} KaTeX fonts...`);
  for (const rel of matches) {
    const filename = path.basename(rel);
    const url = `https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/fonts/${filename}`;
    await download(url, path.join(fontsDir, filename));
    process.stdout.write('.');
  }
  console.log('\nAll fonts downloaded successfully!');
}

run().catch(err => {
  console.error('Download error:', err);
  process.exit(1);
});

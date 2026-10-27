const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const urlFile = path.join(__dirname, 'live_url.txt');

function run() {
  console.log('[TUNNEL] Connecting durable tunnel to port 8000...');
  const proc = spawn('ssh', [
    '-o', 'StrictHostKeyChecking=no',
    '-o', 'ServerAliveInterval=15',
    '-o', 'ServerAliveCountMax=4',
    '-R', '80:localhost:8000',
    'nokey@localhost.run'
  ], { shell: true });

  proc.stdout.on('data', data => {
    const text = data.toString();
    const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.lhr\.life/);
    if (match) {
      const url = match[0];
      console.log('[TUNNEL LIVE URL]:', url);
      fs.writeFileSync(urlFile, url, 'utf8');
    }
  });

  proc.stderr.on('data', data => {
    // suppress stderr
  });

  proc.on('close', code => {
    console.log('[TUNNEL] Exited with code ' + code + '. Reconnecting in 3s...');
    setTimeout(run, 3000);
  });

  proc.on('error', err => {
    console.error('[TUNNEL ERROR]:', err);
    setTimeout(run, 3000);
  });
}

run();

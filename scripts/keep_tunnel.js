const { spawn } = require('child_process');

function startTunnel() {
  console.log('Starting durable localtunnel process...');
  const proc = spawn('npx', ['--yes', 'localtunnel', '--port', '8000'], {
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  proc.stdout.on('data', data => {
    const text = data.toString();
    process.stdout.write(text);
  });

  proc.stderr.on('data', data => {
    process.stderr.write(data.toString());
  });

  proc.on('close', code => {
    console.log(`localtunnel exited with code ${code}. Auto-reconnecting in 2 seconds...`);
    setTimeout(startTunnel, 2000);
  });

  proc.on('error', err => {
    console.error('localtunnel process error:', err);
    setTimeout(startTunnel, 2000);
  });
}

startTunnel();

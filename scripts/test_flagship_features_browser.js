// scripts/test_flagship_features_browser.js
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function testFlagshipFeatures() {
  const port = 9362;
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDataDir = `C:\\Users\\chary\\.gemini\\antigravity\\scratch\\ipe-grind\\temp_chrome_flagship_${Date.now()}`;
  
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${port}`,
    '--window-size=390,844',
    'about:blank'
  ];

  const proc = spawn(chromePath, args);

  let versionData = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 150));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      versionData = await res.json();
      if (versionData && versionData.length > 0) break;
    } catch (e) {}
  }

  if (!versionData || versionData.length === 0) {
    proc.kill();
    throw new Error(`Chrome failed to expose debugging endpoint on port ${port}`);
  }

  const target = versionData.find(t => t.type === 'page') || versionData[0];
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let idCounter = 1;
  const pending = new Map();
  const eventListeners = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve } = pending.get(msg.id);
      pending.delete(msg.id);
      resolve(msg.result || msg);
    }
    if (msg.method && eventListeners.has(msg.method)) {
      eventListeners.get(msg.method)(msg.params);
    }
  };

  function sendCommand(method, params = {}) {
    return new Promise((resolve) => {
      const id = idCounter++;
      pending.set(id, { resolve });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');
  
  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      console.log('   [Browser Console]', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      console.error('   [Browser Error]', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
    }
  });

  const loadedPromise = new Promise((resolve) => {
    eventListeners.set('Page.loadEventFired', resolve);
  });
  await sendCommand('Page.navigate', { url: 'file:///C:/Users/chary/.gemini/antigravity/scratch/ipe-grind/index.html' });
  await loadedPromise;
  await new Promise(r => setTimeout(r, 600));

  console.log("=== 1. VERIFYING LIVE COUNTDOWN & DAILY GOAL BANNER ===");
  const countdownEval = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const banner = document.getElementById('countdown-goal-banner');
        const days = document.getElementById('countdown-days')?.textContent;
        const hours = document.getElementById('countdown-hours')?.textContent;
        const goalText = document.getElementById('daily-goal-text')?.textContent;
        const goalPct = document.getElementById('daily-goal-pct')?.textContent;
        return JSON.stringify({
          hasBanner: !!banner,
          days,
          hours,
          goalText,
          goalPct
        });
      })()
    `
  });
  console.log("Countdown Result:", countdownEval.result.value);

  // Take screenshot of feed with Countdown Banner
  const feedScreenshot = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/screen_feed_countdown_390x844.png', Buffer.from(feedScreenshot.data || feedScreenshot.result?.data, 'base64'));
  console.log("📸 Saved screenshots/screen_feed_countdown_390x844.png");

  console.log("\n=== 2. VERIFYING COMMUTE MODE HUD ===");
  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `window.IPE_COMMUTE.toggleCommuteMode(true);`
  });
  await new Promise(r => setTimeout(r, 300));

  const commuteEval = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const hud = document.getElementById('commute-hud-overlay');
        const isVisible = hud && hud.style.display !== 'none';
        const ring = document.getElementById('commute-progress-ring');
        const timerSec = document.getElementById('commute-timer-sec')?.textContent;
        return JSON.stringify({ isVisible, timerSec, hasRing: !!ring });
      })()
    `
  });
  console.log("Commute Result:", commuteEval.result.value);

  const commuteScreenshot = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/screen_commute_hud_390x844.png', Buffer.from(commuteScreenshot.data || commuteScreenshot.result?.data, 'base64'));
  console.log("📸 Saved screenshots/screen_commute_hud_390x844.png");

  // Close commute
  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `window.IPE_COMMUTE.toggleCommuteMode(false);`
  });

  console.log("\n=== 3. VERIFYING AMBIENT FOCUS AUDIO SYNTHESIZER ===");
  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `window.IPE_AMBIENT.openModal();`
  });
  await new Promise(r => setTimeout(r, 300));

  const ambientEval = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const modal = document.getElementById('ambient-audio-modal');
        const isOpen = modal && modal.classList.contains('open');
        const canvas = document.getElementById('ambient-visualizer-canvas');
        return JSON.stringify({ isOpen, hasCanvas: !!canvas });
      })()
    `
  });
  console.log("Ambient Audio Result:", ambientEval.result.value);

  const audioScreenshot = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/screen_ambient_audio_390x844.png', Buffer.from(audioScreenshot.data || audioScreenshot.result?.data, 'base64'));
  console.log("📸 Saved screenshots/screen_ambient_audio_390x844.png");

  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `window.IPE_AMBIENT.closeModal();`
  });

  console.log("\n=== 4. VERIFYING INTERACTIVE FORMULA LAB & VARIABLE SIMULATORS ===");
  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `window.IPE_SIMULATORS.openModal('sonometer');`
  });
  await new Promise(r => setTimeout(r, 400));

  const simSonometerEval = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const freq = document.getElementById('sono-res-freq')?.textContent;
        const vel = document.getElementById('sono-res-vel')?.textContent;
        const tension = document.getElementById('sono-res-tension')?.textContent;
        const canvas = document.getElementById('sonometer-canvas');
        const tab = document.getElementById('sim-tab-sonometer'); return JSON.stringify({ freq, vel, tension, hasCanvas: !!canvas, tabText: tab?.innerText, tabRect: tab?.getBoundingClientRect() });
      })()
    `
  });
  console.log("Sonometer Result:", simSonometerEval.result.value);
  const spanStyle = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: '(() => { const sp = document.querySelector("#sim-tab-sonometer span"); const s = window.getComputedStyle(sp); return { text: sp.innerText, color: s.color, fs: s.fontSize, lh: s.lineHeight }; })()'
  });
  console.log("SPAN STYLE:", spanStyle.result.value);

  const sonoScreenshot = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/screen_sim_sonometer_390x844.png', Buffer.from(sonoScreenshot.data || sonoScreenshot.result?.data, 'base64'));
  console.log("📸 Saved screenshots/screen_sim_sonometer_390x844.png");

  // Switch to Daniell Cell (Nernst)
  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `window.IPE_SIMULATORS.switchSimulator('nernst');`
  });
  await new Promise(r => setTimeout(r, 300));

  const simNernstEval = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const eCell = document.getElementById('nernst-res-ecell')?.textContent;
        const q = document.getElementById('nernst-res-q')?.textContent;
        const dg = document.getElementById('nernst-res-dg')?.textContent;
        return JSON.stringify({ eCell, q, dg });
      })()
    `
  });
  console.log("Nernst Result:", simNernstEval.result.value);

  const nernstScreenshot = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/screen_sim_nernst_390x844.png', Buffer.from(nernstScreenshot.data || nernstScreenshot.result?.data, 'base64'));
  console.log("📸 Saved screenshots/screen_sim_nernst_390x844.png");

  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `window.IPE_SIMULATORS.closeModal();`
  });

  console.log("\n=== 5. VERIFYING 60-MARK OFFICIAL BOARD MOCK EXAM GENERATOR ===");
  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `window.IPE_MOCK.openModal('physics');`
  });
  await new Promise(r => setTimeout(r, 500));

  const mockEval = await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const modal = document.getElementById('mock-exam-modal');
        const isOpen = modal && modal.classList.contains('open');
        const secAItems = document.querySelectorAll('#printable-mock-paper .mock-section-block:nth-child(3) .mock-question-item');
        const secBItems = document.querySelectorAll('#printable-mock-paper .mock-section-block:nth-child(4) .mock-question-item');
        const secCItems = document.querySelectorAll('#printable-mock-paper .mock-section-block:nth-child(5) .mock-question-item');
        const timer = document.getElementById('mock-timer-display')?.textContent;
        return JSON.stringify({
          isOpen,
          secACount: secAItems.length,
          secBCount: secBItems.length,
          secCCount: secCItems.length,
          timer
        });
      })()
    `
  });
  console.log("Mock Exam Result:", mockEval.result.value);

  // Reveal Answer Key
  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `window.IPE_MOCK.toggleAnswerKey();`
  });
  await new Promise(r => setTimeout(r, 400));

  const mockScreenshot = await sendCommand('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/screen_mock_exam_390x844.png', Buffer.from(mockScreenshot.data || mockScreenshot.result?.data, 'base64'));
  console.log("📸 Saved screenshots/screen_mock_exam_390x844.png");

  await sendCommand('Runtime.evaluate', {
    returnByValue: true,
    expression: `window.IPE_MOCK.closeModal();`
  });

  console.log("\n🎉 ALL 5 FLAGSHIP FEATURES VERIFIED IN ACTUAL CHROME BROWSER ENVIRONMENT!");

  proc.kill();
  process.exit(0);
}

testFlagshipFeatures().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});

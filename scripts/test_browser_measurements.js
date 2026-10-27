// scripts/test_browser_measurements.js
const { spawn } = require('child_process');

async function testViewport(width, height, port) {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDataDir = `C:\\Users\\chary\\.gemini\\antigravity\\scratch\\ipe-grind\\temp_chrome_${width}x${height}_${Date.now()}`;
  
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${port}`,
    `--window-size=${width},${height}`,
    'about:blank'
  ];

  const proc = spawn(chromePath, args);

  // Wait for remote debugging endpoint to be ready
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
  const wsUrl = target.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
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
      resolve(msg);
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

  // Enable Page domain and navigate
  await sendCommand('Page.enable');
  
  const loadedPromise = new Promise((resolve) => {
    eventListeners.set('Page.loadEventFired', resolve);
  });

  await sendCommand('Page.navigate', { url: 'http://localhost:8000/index.html' });
  await loadedPromise;

  // Small delay for DOM layout & CSS calculations
  await new Promise(r => setTimeout(r, 600));

  const resp = await sendCommand('Runtime.evaluate', {
    expression: `
      (() => {
        const root = document.querySelector('.app-shell') || document.getElementById('app-root');
        const rect = root ? root.getBoundingClientRect() : null;
        const header = document.querySelector('.app-header');
        const headerRect = header ? header.getBoundingClientRect() : null;
        const nav = document.querySelector('.bottom-nav');
        const navRect = nav ? nav.getBoundingClientRect() : null;
        const docScrollWidth = document.documentElement.scrollWidth;
        const docScrollHeight = document.documentElement.scrollHeight;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        
        return JSON.stringify({
          window: { width: winWidth, height: winHeight, ratio: winWidth / winHeight },
          root: rect ? { width: rect.width, height: rect.height, ratio: rect.width / rect.height, top: rect.top, left: rect.left } : null,
          header: headerRect ? { width: headerRect.width, height: headerRect.height, top: headerRect.top } : null,
          nav: navRect ? { width: navRect.width, height: navRect.height, bottom: navRect.bottom } : null,
          hasHorizontalScroll: docScrollWidth > winWidth,
          hasPageScroll: docScrollHeight > winHeight
        });
      })()
    `,
    returnByValue: true
  });

  ws.close();
  proc.kill();

  if (resp.result && resp.result.result && resp.result.result.value) {
    return JSON.parse(resp.result.result.value);
  } else {
    throw new Error(`Unexpected eval response: ${JSON.stringify(resp)}`);
  }
}

async function run() {
  console.log("=== VERIFYING EXACT 9:16 SCREEN RATIO ACROSS SPECIFIED DEVICES ===\n");
  const testCases = [
    { name: "360 x 640 (Standard Budget Android Phone)", w: 360, h: 640, port: 9351 },
    { name: "390 x 844 (iPhone 13 / 14 Portrait)", w: 390, h: 844, port: 9352 },
    { name: "412 x 915 (Samsung Galaxy S23 / Pixel)", w: 412, h: 915, port: 9353 },
    { name: "1920 x 1080 (Desktop Window 1080p)", w: 1920, h: 1080, port: 9354 }
  ];

  let allPassed = true;
  for (const tc of testCases) {
    try {
      const res = await testViewport(tc.w, tc.h, tc.port);
      if (!res.root) {
        throw new Error(".app-shell root element not found in DOM");
      }
      const ratio = res.root.ratio;
      const expectedRatio = 9 / 16; // 0.5625
      const diff = Math.abs(ratio - expectedRatio);
      const isExact916 = diff < 0.01;

      console.log(`📱 Screen Size: ${tc.name}`);
      console.log(`   Browser Viewport: ${res.window.width} x ${res.window.height}px`);
      console.log(`   .app-shell Dimensions: ${res.root.width.toFixed(1)}px x ${res.root.height.toFixed(1)}px`);
      console.log(`   Aspect Ratio: ${ratio.toFixed(4)} (Expected 9:16 = ${expectedRatio.toFixed(4)})`);
      console.log(`   Header Height: ${res.header ? res.header.height.toFixed(1) + 'px' : 'N/A'}`);
      console.log(`   Bottom Nav Height: ${res.nav ? res.nav.height.toFixed(1) + 'px' : 'N/A'}`);
      console.log(`   Horizontal Scroll: ${res.hasHorizontalScroll ? '❌ YES (FAIL)' : '✅ NONE (PASS)'}`);
      console.log(`   Window Page Scroll: ${res.hasPageScroll ? '❌ YES (FAIL)' : '✅ NONE (PASS)'}`);
      console.log(`   Exact 9:16 Match: ${isExact916 ? '✅ PASS' : '❌ FAIL'}`);
      console.log('----------------------------------------------------');

      if (!isExact916 || res.hasHorizontalScroll || res.hasPageScroll) {
        allPassed = false;
      }
    } catch (err) {
      console.error(`Error testing ${tc.name}:`, err.message);
      allPassed = false;
    }
    // Small delay between browser launches
    await new Promise(r => setTimeout(r, 400));
  }

  if (allPassed) {
    console.log("\n🎉 ALL 4 VIEWPORTS STRICTLY MAINTAIN EXACT 9:16 RATIO WITH ZERO HORIZONTAL OR PAGE SCROLL!");
    process.exit(0);
  } else {
    console.error("\n❌ Some viewport verification checks failed.");
    process.exit(1);
  }
}

run();

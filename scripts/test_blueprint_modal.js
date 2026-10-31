const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function testBlueprint() {
  const port = 9362;
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDataDir = `C:\\Users\\chary\\.gemini\\antigravity\\scratch\\ipe-grind\\temp_chrome_bp_${Date.now()}`;
  
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
    throw new Error('Chrome failed to expose debugging endpoint');
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
      resolve(msg);
    }
    if (msg.method && eventListeners.has(msg.method)) {
      eventListeners.get(msg.method)(msg.params);
    }
  };

  function sendCommand(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await sendCommand('Page.enable');
  await sendCommand('Runtime.enable');

  const loadedPromise = new Promise((resolve) => {
    eventListeners.set('Page.loadEventFired', resolve);
  });
  await sendCommand('Page.navigate', { url: 'file:///C:/Users/chary/.gemini/antigravity/scratch/ipe-grind/index.html' });
  await loadedPromise;
  await new Promise(r => setTimeout(r, 600));

  console.log("=== TESTING OFFICIAL BLUEPRINT & PYQ TRENDS MODAL ===");

  // 1. Open Blueprint Modal
  await sendCommand('Runtime.evaluate', {
    expression: `window.IPE_APP.openBlueprintModal();`
  });
  await new Promise(r => setTimeout(r, 400));

  const modalEval = await sendCommand('Runtime.evaluate', {
    expression: `
      (() => {
        const modal = document.getElementById('blueprint-modal');
        const isOpen = modal && modal.classList.contains('open');
        const tabs = modal.querySelectorAll('.bp-tab-pill');
        const sections = modal.querySelectorAll('.bp-section-card');
        const docScrollWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;

        return JSON.stringify({
          isOpen,
          tabCount: tabs.length,
          sectionCardCount: sections.length,
          hasHorizontalOverflow: docScrollWidth > winWidth
        });
      })()
    `,
    returnByValue: true
  });

  const mData = JSON.parse(modalEval.result.result.value);
  console.log(`   Modal opened: ${mData.isOpen ? '✅ YES' : '❌ NO'}`);
  console.log(`   Tabs count: ${mData.tabCount} (Blueprint, Weightage, Trends)`);
  console.log(`   Section cards in Blueprint tab: ${mData.sectionCardCount}`);
  console.log(`   Horizontal overflow: ${mData.hasHorizontalOverflow ? '❌ YES' : '✅ NONE'}`);

  // 2. Switch to Weightage tab
  console.log("\n=== TESTING WEIGHTAGE TAB & TABLES ===");
  await sendCommand('Runtime.evaluate', {
    expression: `window.IPE_APP.setBlueprintTab('weightage');`
  });
  await new Promise(r => setTimeout(r, 300));

  const weightageEval = await sendCommand('Runtime.evaluate', {
    expression: `
      (() => {
        const phyTableRows = document.querySelectorAll('#bp-physics-table-wrap tbody tr').length;
        const chemTableRows = document.querySelectorAll('#bp-chemistry-table-wrap tbody tr').length;
        return JSON.stringify({ phyTableRows, chemTableRows });
      })()
    `,
    returnByValue: true
  });
  const wData = JSON.parse(weightageEval.result.result.value);
  console.log(`   Physics table rows: ${wData.phyTableRows} chapters`);
  console.log(`   Chemistry table rows: ${wData.chemTableRows} chapters`);

  // 3. Switch to Trends tab
  console.log("\n=== TESTING PYQ TRENDS TAB ===");
  await sendCommand('Runtime.evaluate', {
    expression: `window.IPE_APP.setBlueprintTab('trends');`
  });
  await new Promise(r => setTimeout(r, 300));

  const trendsEval = await sendCommand('Runtime.evaluate', {
    expression: `
      (() => {
        const trendItems = document.querySelectorAll('.bp-trend-item');
        return JSON.stringify({ trendItemCount: trendItems.length });
      })()
    `,
    returnByValue: true
  });
  const tData = JSON.parse(trendsEval.result.result.value);
  console.log(`   High-yield PYQ trend items: ${tData.trendItemCount}`);

  // Close modal
  await sendCommand('Runtime.evaluate', {
    expression: `window.IPE_APP.closeBlueprintModal();`
  });

  ws.close();
  proc.kill();

  if (mData.isOpen && wData.phyTableRows === 16 && wData.chemTableRows === 15 && tData.trendItemCount === 6) {
    console.log("\n🎉 OFFICIAL BLUEPRINT & PYQ TRENDS MODAL FULLY VERIFIED!");
    process.exit(0);
  } else {
    console.error("\n❌ Blueprint verification failed.");
    process.exit(1);
  }
}

testBlueprint().catch(e => {
  console.error("Test error:", e);
  process.exit(1);
});

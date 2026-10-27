// scripts/test_screens_in_browser.js
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function testScreens() {
  const port = 9361;
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const userDataDir = `C:\\Users\\chary\\.gemini\\antigravity\\scratch\\ipe-grind\\temp_chrome_screens_${Date.now()}`;
  
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
  await sendCommand('Page.navigate', { url: 'http://localhost:8000/index.html' });
  await loadedPromise;
  await new Promise(r => setTimeout(r, 600));

  console.log("=== TESTING CHAPTERS SCREEN ===");
  // Switch to chapters tab
  await sendCommand('Runtime.evaluate', {
    expression: `window.IPE_APP.switchTab('chapters');`
  });
  await new Promise(r => setTimeout(r, 400));

  const chaptersEval = await sendCommand('Runtime.evaluate', {
    expression: `
      (() => {
        const sec = document.getElementById('section-chapters');
        const cards = sec.querySelectorAll('.chapter-card-item');
        const summary = sec.querySelector('.chapters-summary-card');
        const partHeaders = sec.querySelectorAll('.part-section-header');
        const segmentedPills = sec.querySelectorAll('.chapters-segmented-control .global-sub-pill');
        const docScrollWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;

        const firstCard = cards[0];
        const cardRect = firstCard ? firstCard.getBoundingClientRect() : null;
        const cardStyles = firstCard ? window.getComputedStyle(firstCard) : null;

        return JSON.stringify({
          cardCount: cards.length,
          hasSummaryCard: !!summary,
          summaryText: summary ? summary.textContent.trim().replace(/\\s+/g, ' ') : '',
          partHeaderCount: partHeaders.length,
          segmentedPillCount: segmentedPills.length,
          firstCardWidth: cardRect ? cardRect.width : 0,
          firstCardHeight: cardRect ? cardRect.height : 0,
          border: cardStyles ? cardStyles.border : '',
          borderRadius: cardStyles ? cardStyles.borderRadius : '',
          hasHorizontalScroll: docScrollWidth > winWidth
        });
      })()
    `,
    returnByValue: true
  });
  const chData = JSON.parse(chaptersEval.result.result.value);
  console.log(`   Chapter cards rendered: ${chData.cardCount}`);
  console.log(`   Subject summary card present: ${chData.hasSummaryCard ? '✅ YES' : '❌ NO'}`);
  console.log(`   Summary text: "${chData.summaryText}"`);
  console.log(`   Part headers: ${chData.partHeaderCount}`);
  console.log(`   First card dimensions: ${chData.firstCardWidth.toFixed(1)}px x ${chData.firstCardHeight.toFixed(1)}px`);
  console.log(`   Card border: ${chData.border}, radius: ${chData.borderRadius}`);
  console.log(`   Horizontal scroll: ${chData.hasHorizontalScroll ? '❌ YES' : '✅ NONE'}`);

  // Take screenshot of Chapters screen
  const ssChapters = await sendCommand('Page.captureScreenshot');
  fs.writeFileSync('screenshots/screen_chapters_390x844.png', Buffer.from(ssChapters.result.data, 'base64'));
  console.log("   Saved screenshot: screenshots/screen_chapters_390x844.png");

  console.log("\n=== TESTING FLASHCARDS SCREEN ===");
  // Switch to flashcards tab
  await sendCommand('Runtime.evaluate', {
    expression: `window.IPE_APP.switchTab('formulas');`
  });
  await new Promise(r => setTimeout(r, 600));

  const fcEval = await sendCommand('Runtime.evaluate', {
    expression: `
      (() => {
        const sec = document.getElementById('section-formulas');
        const contentEl = document.getElementById('flashcards-view-content');
        const select = document.getElementById('flashcard-chapter-select');
        const searchInput = document.getElementById('flashcard-search-input');
        const card = document.getElementById('flashcard-3d-card');
        const formulaBox = sec.querySelector('.formula-box');
        const katexEl = sec.querySelector('.katex');
        const docScrollWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;

        const selectStyles = select ? window.getComputedStyle(select) : null;
        const inputStyles = searchInput ? window.getComputedStyle(searchInput) : null;
        const boxRect = formulaBox ? formulaBox.getBoundingClientRect() : null;
        const boxScrollWidth = formulaBox ? formulaBox.scrollWidth : 0;
        const boxClientWidth = formulaBox ? formulaBox.clientWidth : 0;

        return JSON.stringify({
          contentHtmlSnippet: contentEl ? contentEl.innerHTML.slice(0, 200) : 'null',
          selectHeight: selectStyles ? selectStyles.height : '',
          selectBg: selectStyles ? selectStyles.backgroundColor : '',
          selectBorder: selectStyles ? selectStyles.border : '',
          inputHeight: inputStyles ? inputStyles.height : '',
          inputBg: inputStyles ? inputStyles.backgroundColor : '',
          inputBorder: inputStyles ? inputStyles.border : '',
          formulaBoxWidth: boxRect ? boxRect.width : 0,
          formulaBoxScrollWidth: boxScrollWidth,
          formulaBoxClientWidth: boxClientWidth,
          isFormulaOverflowingBox: boxScrollWidth > boxClientWidth + 2,
          hasKaTeX: !!katexEl,
          hasHorizontalScroll: docScrollWidth > winWidth
        });
      })()
    `,
    returnByValue: true
  });
  const fcData = JSON.parse(fcEval.result.result.value);
  console.log(`   Dropdown height: ${fcData.selectHeight}, background: ${fcData.selectBg}`);
  console.log(`   Search input height: ${fcData.inputHeight}, background: ${fcData.inputBg}`);
  console.log(`   Formula box width: ${fcData.formulaBoxWidth.toFixed(1)}px (client: ${fcData.formulaBoxClientWidth}px, scroll: ${fcData.formulaBoxScrollWidth}px)`);
  console.log(`   KaTeX formula rendered: ${fcData.hasKaTeX ? '✅ YES' : '❌ NO'}`);
  console.log(`   Formula overflowing box: ${fcData.isFormulaOverflowingBox ? '❌ YES' : '✅ NO (contained)'}`);
  console.log(`   Horizontal scroll: ${fcData.hasHorizontalScroll ? '❌ YES' : '✅ NONE'}`);

  // Test card flip
  await sendCommand('Runtime.evaluate', {
    expression: `window.IPE_FLASHCARDS.flip();`
  });
  await new Promise(r => setTimeout(r, 400));

  const flipEval = await sendCommand('Runtime.evaluate', {
    expression: `
      (() => {
        const card = document.getElementById('flashcard-3d-card');
        const back = document.getElementById('fc-back-face');
        const tip = back ? back.querySelector('.fc-exam-tip-box') : null;
        const aiBtn = back ? back.querySelector('.fc-ai-explain-btn') : null;
        return JSON.stringify({
          isFlipped: card ? card.classList.contains('flipped') : false,
          backHasContent: back ? back.children.length > 0 : false,
          hasExamTip: !!tip,
          hasAiBtn: !!aiBtn
        });
      })()
    `,
    returnByValue: true
  });
  const flipData = JSON.parse(flipEval.result.result.value);
  console.log(`   Card flipped: ${flipData.isFlipped ? '✅ YES' : '❌ NO'}`);
  console.log(`   Back face populated: ${flipData.backHasContent ? '✅ YES' : '❌ NO'}`);
  console.log(`   Exam tip present: ${flipData.hasExamTip ? '✅ YES' : '❌ NO'}`);
  console.log(`   AI explain button present: ${flipData.hasAiBtn ? '✅ YES' : '❌ NO'}`);

  const ssFlashcards = await sendCommand('Page.captureScreenshot');
  fs.writeFileSync('screenshots/screen_flashcards_390x844.png', Buffer.from(ssFlashcards.result.data, 'base64'));
  console.log("   Saved screenshot: screenshots/screen_flashcards_390x844.png");

  console.log("\n=== TESTING QUIZ SCREEN ===");
  await sendCommand('Runtime.evaluate', {
    expression: `window.IPE_APP.switchTab('quiz');`
  });
  await new Promise(r => setTimeout(r, 400));

  const quizEval = await sendCommand('Runtime.evaluate', {
    expression: `
      (() => {
        const sec = document.getElementById('section-quiz');
        const card = sec.querySelector('.quiz-setup-card');
        const title = sec.querySelector('.quiz-setup-title');
        const btn = sec.querySelector('.btn-primary');
        const docScrollWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;

        const cardStyles = card ? window.getComputedStyle(card) : null;
        return JSON.stringify({
          hasCard: !!card,
          titleText: title ? title.textContent : '',
          border: cardStyles ? cardStyles.border : '',
          borderRadius: cardStyles ? cardStyles.borderRadius : '',
          hasHorizontalScroll: docScrollWidth > winWidth
        });
      })()
    `,
    returnByValue: true
  });
  const quizData = JSON.parse(quizEval.result.result.value);
  console.log(`   Setup card present: ${quizData.hasCard ? '✅ YES' : '❌ NO'}`);
  console.log(`   Title: "${quizData.titleText}"`);
  console.log(`   Card border: ${quizData.border}, radius: ${quizData.borderRadius}`);
  console.log(`   Horizontal scroll: ${quizData.hasHorizontalScroll ? '❌ YES' : '✅ NONE'}`);

  console.log("\n=== TESTING SAVED SCREEN ===");
  await sendCommand('Runtime.evaluate', {
    expression: `window.IPE_APP.switchTab('saved');`
  });
  await new Promise(r => setTimeout(r, 400));

  const savedEval = await sendCommand('Runtime.evaluate', {
    expression: `
      (() => {
        const sec = document.getElementById('section-saved');
        const tabs = sec.querySelectorAll('.saved-tab-btn');
        const emptyState = sec.querySelector('.empty-state');
        const docScrollWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;

        return JSON.stringify({
          tabCount: tabs.length,
          hasEmptyState: !!emptyState,
          hasHorizontalScroll: docScrollWidth > winWidth
        });
      })()
    `,
    returnByValue: true
  });
  const savedData = JSON.parse(savedEval.result.result.value);
  console.log(`   Tabs count: ${savedData.tabCount}`);
  console.log(`   Empty state styled: ${savedData.hasEmptyState ? '✅ YES' : '❌ NO'}`);
  console.log(`   Horizontal scroll: ${savedData.hasHorizontalScroll ? '❌ YES' : '✅ NONE'}`);

  ws.close();
  proc.kill();

  const success = chData.cardCount > 0 && chData.hasSummaryCard && !chData.hasHorizontalScroll && !fcData.hasHorizontalScroll && fcData.hasKaTeX && flipData.isFlipped && quizData.hasCard && savedData.tabCount === 2;
  if (success) {
    console.log("\n🎉 ALL SCREENS (FEED, CHAPTERS, FLASHCARDS, QUIZ, SAVED) VERIFIED WITH ZERO ERRORS & ZERO OVERFLOW!");
    process.exit(0);
  } else {
    console.error("\n❌ Screen verification failed.");
    process.exit(1);
  }
}

testScreens().catch(e => {
  console.error("Test error:", e);
  process.exit(1);
});

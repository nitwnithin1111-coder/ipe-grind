const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

const idRegex = /id="([^"]+)"/g;
let match;
const elements = {};

function createElement(id) {
  return {
    id: id,
    style: {},
    classList: {
      _classes: new Set(),
      add: function(c) { this._classes.add(c); },
      remove: function(c) { this._classes.delete(c); },
      toggle: function(c, force) {
        if (force === undefined) {
          if (this._classes.has(c)) this._classes.delete(c); else this._classes.add(c);
        } else if (force) {
          this._classes.add(c);
        } else {
          this._classes.delete(c);
        }
      },
      contains: function(c) { return this._classes.has(c); }
    },
    value: '',
    innerHTML: '',
    innerText: '',
    textContent: '',
    setAttribute: function() {},
    getAttribute: function(attr) {
      if (attr === 'data-tab') return this.id.replace('section-', '');
      if (attr === 'data-subj') return 'all';
      return '';
    },
    querySelectorAll: function() { return []; },
    querySelector: function() { return null; },
    addEventListener: function() {},
    scrollTo: function() {},
    scrollIntoView: function() {},
    remove: function() {},
    appendChild: function(child) { return child; },
    removeChild: function(child) { return child; }
  };
}

while ((match = idRegex.exec(html)) !== null) {
  elements[match[1]] = createElement(match[1]);
}

const sandbox = {
  window: {},
  document: {
    documentElement: createElement('documentElement'),
    createElement: createElement,
    getElementById: (id) => elements[id] || null,
    querySelectorAll: (sel) => {
      if (sel === '.view-section') return [elements['section-feed'], elements['section-chapters'], elements['section-quiz'], elements['section-formulas'], elements['section-saved']];
      if (sel === '.nav-item') return [createElement('n1'), createElement('n2')];
      if (sel === '.formula-filter-pill') return [createElement('p1')];
      return [];
    },
    querySelector: () => null,
    addEventListener: () => {}
  },
  localStorage: {
    _d: {},
    getItem: function(k) { return this._d[k] || null; },
    setItem: function(k, v) { this._d[k] = v; }
  },
  navigator: { userAgent: 'test' },
  addEventListener: () => {},
  removeEventListener: () => {},
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  console: console
};
sandbox.window = sandbox;

const context = vm.createContext(sandbox);

function runFile(relPath) {
  const code = fs.readFileSync(path.join(baseDir, relPath), 'utf8');
  vm.runInContext(code, context, { filename: relPath });
}

runFile('data/manifest.js');
const manifest = sandbox.window.IPE_DATA.manifest;
manifest.physics.forEach(c => runFile(c.file));
manifest.chemistry.forEach(c => runFile(c.file));

runFile('js/storage.js');
runFile('js/speech.js');
runFile('js/gamification.js');
runFile('js/quiz.js');
runFile('js/feed.js');
runFile('js/flashcards.js');
runFile('js/ai.js');
runFile('js/countdown.js');
runFile('js/ambient_audio.js');
runFile('js/commute.js');
runFile('js/simulators.js');
runFile('js/mock_exam.js');
runFile('js/app.js');

console.log('Running IPE_APP.init()...');
try {
  sandbox.window.IPE_APP.init();
  console.log('✅ IPE_APP.init() succeeded!');
} catch (e) {
  console.error('❌ IPE_APP.init() failed:', e);
}

console.log('Simulating tap on Physics pill:');
try {
  sandbox.window.IPE_APP.setGlobalSubject('physics');
  console.log('✅ setGlobalSubject(physics) succeeded!');
} catch (e) {
  console.error('❌ setGlobalSubject(physics) failed:', e);
}

console.log('Checking Flashcards content for Physics:');
console.log('Length of flashcards-view-content innerHTML:', elements['flashcards-view-content'].innerHTML.length);
if (elements['flashcards-view-content'].innerHTML.includes('No flashcards match')) {
  console.error('❌ Flashcards says: No flashcards match your filter!');
} else {
  console.log('✅ Physics Flashcards rendered successfully!');
}

console.log('Simulating tap on Chemistry pill:');
try {
  sandbox.window.IPE_APP.setGlobalSubject('chemistry');
  console.log('✅ setGlobalSubject(chemistry) succeeded!');
} catch (e) {
  console.error('❌ setGlobalSubject(chemistry) failed:', e);
}

console.log('Checking Flashcards content for Chemistry:');
console.log('Length of flashcards-view-content innerHTML:', elements['flashcards-view-content'].innerHTML.length);
if (elements['flashcards-view-content'].innerHTML.includes('No flashcards match')) {
  console.error('❌ Flashcards says: No flashcards match your filter!');
} else {
  console.log('✅ Chemistry Flashcards rendered successfully!');
}

console.log('Simulating opening Chapter Formulas for phy-ch01:');
try {
  sandbox.window.IPE_APP.openChapterFormulas('phy-ch01');
  console.log('✅ openChapterFormulas(phy-ch01) succeeded!');
} catch (e) {
  console.error('❌ openChapterFormulas failed:', e);
}

console.log('Testing Flagship Features in headless sandbox:');

console.log('1. Testing IPE_COUNTDOWN:');
try {
  sandbox.window.IPE_COUNTDOWN.init();
  const timeRem = sandbox.window.IPE_COUNTDOWN.calculateTimeRemaining();
  console.log('✅ IPE_COUNTDOWN init & calculateTimeRemaining succeeded! Days remaining:', timeRem.days);
} catch (e) {
  console.error('❌ IPE_COUNTDOWN failed:', e);
}

console.log('2. Testing IPE_AMBIENT:');
try {
  sandbox.window.IPE_AMBIENT.init();
  console.log('✅ IPE_AMBIENT init succeeded! Available tracks:', Object.keys(sandbox.window.IPE_AMBIENT.getTracks()).join(', '));
} catch (e) {
  console.error('❌ IPE_AMBIENT failed:', e);
}

console.log('3. Testing IPE_COMMUTE:');
try {
  sandbox.window.IPE_COMMUTE.init();
  sandbox.window.IPE_COMMUTE.setSpeed('15s');
  console.log('✅ IPE_COMMUTE init & setSpeed succeeded!');
} catch (e) {
  console.error('❌ IPE_COMMUTE failed:', e);
}

console.log('4. Testing IPE_SIMULATORS:');
try {
  sandbox.window.IPE_SIMULATORS.init();
  sandbox.window.IPE_SIMULATORS.switchSimulator('sonometer');
  sandbox.window.IPE_SIMULATORS.switchSimulator('potentiometer');
  sandbox.window.IPE_SIMULATORS.switchSimulator('nernst');
  sandbox.window.IPE_SIMULATORS.switchSimulator('kinetics');
  console.log('✅ IPE_SIMULATORS all 4 simulators initialized & switched successfully!');
} catch (e) {
  console.error('❌ IPE_SIMULATORS failed:', e);
}

console.log('5. Testing IPE_MOCK:');
try {
  sandbox.window.IPE_MOCK.init();
  sandbox.window.IPE_MOCK.generatePaper('physics');
  console.log('✅ IPE_MOCK generated Physics 60M Paper successfully!');
  sandbox.window.IPE_MOCK.generatePaper('chemistry');
  console.log('✅ IPE_MOCK generated Chemistry 60M Paper successfully!');
} catch (e) {
  console.error('❌ IPE_MOCK failed:', e);
}

process.exit(0);

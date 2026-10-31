// Reels Hands-Free Commute Mode Engine for IPE GRIND
// Hands-free auto-advancing, pulsing progress ring, and TTS audio narration for bus/train commuters
window.IPE_COMMUTE = (function() {
  let isEnabled = false;
  let isPaused = false;
  let autoTTS = true;

  // Speed options in seconds (or 'tts')
  // '15s', '30s', '45s', 'audio'
  let speedMode = '30s'; 
  let durationMs = 30000;
  let remainingMs = 30000;
  let lastTickTime = 0;
  let rafId = null;

  // Track if current card speech is playing
  let isAudioSpeaking = false;

  function setSpeed(mode) {
    speedMode = mode;
    if (mode === '15s') durationMs = 15000;
    else if (mode === '30s') durationMs = 30000;
    else if (mode === '45s') durationMs = 45000;
    else if (mode === 'audio') durationMs = 0; // speech driven

    remainingMs = durationMs;
    updateSpeedButtonsUI();
    resetCountdown();
  }

  function toggleCommuteMode(force) {
    if (force !== undefined) {
      isEnabled = force;
    } else {
      isEnabled = !isEnabled;
    }

    const hud = document.getElementById('commute-hud-overlay');
    const toggleBtn = document.getElementById('feed-commute-btn');

    if (isEnabled) {
      isPaused = false;
      if (hud) hud.style.display = 'flex';
      if (toggleBtn) toggleBtn.classList.add('active');

      startCardFlow();
      setupKeyboardListener();
    } else {
      if (hud) hud.style.display = 'none';
      if (toggleBtn) toggleBtn.classList.remove('active');

      stopFlow();
      if (window.IPE_SPEECH) window.IPE_SPEECH.stop();
    }
  }

  function togglePause() {
    if (!isEnabled) return;
    isPaused = !isPaused;

    const pauseBtn = document.getElementById('commute-pause-icon');
    const ringEl = document.getElementById('commute-progress-ring');

    if (isPaused) {
      if (pauseBtn) pauseBtn.textContent = '▶';
      if (ringEl) ringEl.classList.add('paused');
      if (window.IPE_SPEECH) window.IPE_SPEECH.stop();
    } else {
      if (pauseBtn) pauseBtn.textContent = '⏸';
      if (ringEl) ringEl.classList.remove('paused');
      lastTickTime = performance.now();
      if (speedMode === 'audio' || autoTTS) {
        speakCurrentCard();
      } else {
        tickLoop(performance.now());
      }
    }
  }

  function startCardFlow() {
    if (!isEnabled || isPaused) return;

    remainingMs = durationMs;
    lastTickTime = performance.now();

    const ringEl = document.getElementById('commute-progress-ring');
    if (ringEl) ringEl.classList.remove('paused');

    // Trigger TTS narration if enabled or speed is 'audio'
    if (autoTTS || speedMode === 'audio') {
      speakCurrentCard();
    } else {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tickLoop);
    }
  }

  function speakCurrentCard() {
    if (!window.IPE_SPEECH) {
      // Fallback to standard 30s timer
      durationMs = 30000;
      remainingMs = 30000;
      rafId = requestAnimationFrame(tickLoop);
      return;
    }

    // Read question & answer from active card in DOM
    const questionEl = document.querySelector('.vcard-question-box');
    const answerEl = document.querySelector('.vcard-answer-body');
    const qText = questionEl ? (questionEl.innerText || questionEl.textContent) : 'Next Question';
    const aText = answerEl ? (answerEl.innerText || answerEl.textContent) : '';

    isAudioSpeaking = true;
    updateStatusText('🎙️ Narrating question & steps...');

    window.IPE_SPEECH.toggleSpeak('commute-active', qText, aText, (speaking) => {
      isAudioSpeaking = speaking;
      if (!speaking && isEnabled && !isPaused) {
        updateStatusText('✅ Answer complete. Advancing...');
        // Pause 2.5 seconds after speaking finishes before flipping
        setTimeout(() => {
          if (isEnabled && !isPaused) {
            advanceToNext();
          }
        }, 2200);
      }
    });

    if (speedMode !== 'audio') {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tickLoop);
    }
  }

  function tickLoop(now) {
    if (!isEnabled || isPaused) return;

    const delta = now - lastTickTime;
    lastTickTime = now;
    remainingMs -= delta;

    if (remainingMs <= 0) {
      advanceToNext();
      return;
    }

    updateRingUI(remainingMs / durationMs);
    rafId = requestAnimationFrame(tickLoop);
  }

  function advanceToNext() {
    stopFlow();

    // Advance feed question
    if (window.IPE_FEED && window.IPE_FEED.nextQuestion) {
      window.IPE_FEED.nextQuestion();
    }

    // Increment daily goal count
    if (window.IPE_COUNTDOWN && window.IPE_COUNTDOWN.incrementDailyProgress) {
      window.IPE_COUNTDOWN.incrementDailyProgress(1);
    }

    // Short breather before starting next card flow
    setTimeout(() => {
      if (isEnabled && !isPaused) {
        startCardFlow();
      }
    }, 400);
  }

  function resetCountdown() {
    if (rafId) cancelAnimationFrame(rafId);
    remainingMs = durationMs;
    updateRingUI(1);
    if (isEnabled && !isPaused) {
      startCardFlow();
    }
  }

  function stopFlow() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function updateRingUI(fraction) {
    fraction = Math.max(0, Math.min(1, fraction));
    // SVG circle radius 18, circumference 2 * pi * 18 = 113.1
    const circumference = 113.1;
    const ringEl = document.getElementById('commute-ring-fill');
    if (ringEl) {
      ringEl.style.strokeDashoffset = circumference * (1 - fraction);
    }

    const timerTextEl = document.getElementById('commute-timer-sec');
    if (timerTextEl) {
      if (speedMode === 'audio') {
        timerTextEl.textContent = 'TTS';
      } else {
        const secs = Math.ceil(remainingMs / 1000);
        timerTextEl.textContent = `${Math.max(0, secs)}s`;
      }
    }
  }

  function updateStatusText(txt) {
    const statusEl = document.getElementById('commute-status-note');
    if (statusEl) statusEl.textContent = txt;
  }

  function toggleAutoTTS() {
    autoTTS = !autoTTS;
    const btn = document.getElementById('commute-tts-toggle');
    if (btn) btn.classList.toggle('active', autoTTS);
    if (!autoTTS && window.IPE_SPEECH) {
      window.IPE_SPEECH.stop();
    }
  }

  function updateSpeedButtonsUI() {
    const modes = ['15s', '30s', '45s', 'audio'];
    modes.forEach(m => {
      const b = document.getElementById(`commute-spd-${m}`);
      if (b) b.classList.toggle('active', speedMode === m);
    });
  }

  function setupKeyboardListener() {
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', (e) => {
      if (!isEnabled) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
      }
    }, { once: true });
  }

  return {
    init: function() {
      updateSpeedButtonsUI();
    },
    toggleCommuteMode: toggleCommuteMode,
    togglePause: togglePause,
    setSpeed: setSpeed,
    toggleAutoTTS: toggleAutoTTS,
    advanceToNext: advanceToNext,
    isEnabled: function() { return isEnabled; },
    isPaused: function() { return isPaused; }
  };
})();

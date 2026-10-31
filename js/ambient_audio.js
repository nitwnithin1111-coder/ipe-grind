// Ambient Focus Audio Synthesizer for IPE GRIND
// Pure Web Audio API Synthesized Soundscapes (Zero external audio files or dependencies)
window.IPE_AMBIENT = (function() {
  let audioCtx = null;
  let masterGain = null;
  let analyser = null;
  let animFrameId = null;

  let isPlaying = false;
  let masterVolume = 0.7; // 0.0 to 1.0

  // Track Nodes & States
  const tracks = {
    gamma: { name: '40Hz Gamma Focus', active: false, volume: 0.5, nodes: null },
    alpha: { name: '10Hz Alpha Calm', active: false, volume: 0.5, nodes: null },
    rain: { name: 'Gentle Rain', active: false, volume: 0.6, nodes: null },
    brown: { name: 'Deep Brown Noise', active: false, volume: 0.6, nodes: null }
  };

  // Rain transient timer
  let rainInterval = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function setupMasterGraph() {
    const ctx = getAudioContext();
    if (!ctx || masterGain) return;

    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(masterVolume, ctx.currentTime);

    analyser = ctx.createAnalyser();
    analyser.fftSize = 64;

    masterGain.connect(analyser);
    analyser.connect(ctx.destination);
  }

  // Generate Brownian Noise Buffer (Random Walk)
  function createBrownNoiseBuffer(ctx, duration = 4.0) {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5; // Scale to comfortable level
      // prevent runaway dc offset
      if (data[i] > 1) data[i] = 1;
      if (data[i] < -1) data[i] = -1;
    }
    return buffer;
  }

  // Generate Pink/Rain Noise Buffer
  function createRainNoiseBuffer(ctx, duration = 4.0) {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);

    // Paul Kellet's filtered pink noise algorithm
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      b6 = white * 0.115926;
      left[i] = pink * 0.11;
      right[i] = (pink * 0.11) * (0.8 + Math.random() * 0.4);
    }
    return buffer;
  }

  // Start 40Hz Gamma Focus (Binaural Beats: 200Hz Left, 240Hz Right)
  function startGamma() {
    const ctx = getAudioContext();
    if (!ctx) return;
    setupMasterGraph();

    stopTrack('gamma');

    const merger = ctx.createChannelMerger(2);
    const oscLeft = ctx.createOscillator();
    const oscRight = ctx.createOscillator();

    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(200, ctx.currentTime); // 200 Hz

    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(240, ctx.currentTime); // 240 Hz -> 40 Hz Gamma

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(tracks.gamma.volume * 0.25, ctx.currentTime);

    // Route left to ch0, right to ch1
    oscLeft.connect(merger, 0, 0);
    oscRight.connect(merger, 0, 1);
    merger.connect(gainNode);
    gainNode.connect(masterGain);

    oscLeft.start();
    oscRight.start();

    tracks.gamma.nodes = { oscLeft, oscRight, merger, gainNode };
    tracks.gamma.active = true;
  }

  // Start 10Hz Alpha Relaxation (Binaural Beats: 200Hz Left, 210Hz Right)
  function startAlpha() {
    const ctx = getAudioContext();
    if (!ctx) return;
    setupMasterGraph();

    stopTrack('alpha');

    const merger = ctx.createChannelMerger(2);
    const oscLeft = ctx.createOscillator();
    const oscRight = ctx.createOscillator();

    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(200, ctx.currentTime); // 200 Hz

    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(210, ctx.currentTime); // 210 Hz -> 10 Hz Alpha

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(tracks.alpha.volume * 0.25, ctx.currentTime);

    oscLeft.connect(merger, 0, 0);
    oscRight.connect(merger, 0, 1);
    merger.connect(gainNode);
    gainNode.connect(masterGain);

    oscLeft.start();
    oscRight.start();

    tracks.alpha.nodes = { oscLeft, oscRight, merger, gainNode };
    tracks.alpha.active = true;
  }

  // Start Procedural Gentle Rain
  function startRain() {
    const ctx = getAudioContext();
    if (!ctx) return;
    setupMasterGraph();

    stopTrack('rain');

    const buffer = createRainNoiseBuffer(ctx, 4.0);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Filter to simulate soft rainfall on rooftop
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.Q.setValueAtTime(1.2, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(tracks.rain.volume * 0.5, ctx.currentTime);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGain);

    source.start();

    // Occasional gentle raindrop transient
    if (rainInterval) clearInterval(rainInterval);
    rainInterval = setInterval(() => {
      if (!tracks.rain.active || !audioCtx) return;
      try {
        const dropOsc = audioCtx.createOscillator();
        const dropGain = audioCtx.createGain();
        dropOsc.type = 'sine';
        dropOsc.frequency.setValueAtTime(1200 + Math.random() * 800, audioCtx.currentTime);
        dropGain.gain.setValueAtTime(0.04 * tracks.rain.volume, audioCtx.currentTime);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
        dropOsc.connect(dropGain);
        dropGain.connect(masterGain);
        dropOsc.start();
        dropOsc.stop(audioCtx.currentTime + 0.09);
      } catch (e) {}
    }, 450);

    tracks.rain.nodes = { source, filter, gainNode };
    tracks.rain.active = true;
  }

  // Start Procedural Deep Brown Noise
  function startBrown() {
    const ctx = getAudioContext();
    if (!ctx) return;
    setupMasterGraph();

    stopTrack('brown');

    const buffer = createBrownNoiseBuffer(ctx, 4.0);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(tracks.brown.volume * 0.45, ctx.currentTime);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(masterGain);

    source.start();

    tracks.brown.nodes = { source, filter, gainNode };
    tracks.brown.active = true;
  }

  function stopTrack(key) {
    const t = tracks[key];
    if (!t) return;

    if (t.nodes) {
      try {
        if (t.nodes.oscLeft) t.nodes.oscLeft.stop();
        if (t.nodes.oscRight) t.nodes.oscRight.stop();
        if (t.nodes.source) t.nodes.source.stop();
        if (t.nodes.gainNode) t.nodes.gainNode.disconnect();
      } catch (e) {}
      t.nodes = null;
    }

    if (key === 'rain' && rainInterval) {
      clearInterval(rainInterval);
      rainInterval = null;
    }

    t.active = false;
  }

  function toggleTrack(key) {
    if (!tracks[key]) return;

    if (tracks[key].active) {
      stopTrack(key);
    } else {
      if (key === 'gamma') {
        stopTrack('alpha'); // Mutually exclusive binaural beat
        startGamma();
      } else if (key === 'alpha') {
        stopTrack('gamma'); // Mutually exclusive binaural beat
        startAlpha();
      } else if (key === 'rain') {
        startRain();
      } else if (key === 'brown') {
        startBrown();
      }
    }

    // Check if any track is still active
    const anyActive = Object.values(tracks).some(t => t.active);
    isPlaying = anyActive;

    updateUI();
    if (isPlaying) startVisualizer();
  }

  function setTrackVolume(key, val) {
    if (!tracks[key]) return;
    const v = Math.max(0, Math.min(1, parseFloat(val)));
    tracks[key].volume = v;
    if (tracks[key].nodes && tracks[key].nodes.gainNode && audioCtx) {
      let scale = 0.5;
      if (key === 'gamma' || key === 'alpha') scale = 0.25;
      if (key === 'brown') scale = 0.45;
      tracks[key].nodes.gainNode.gain.setValueAtTime(v * scale, audioCtx.currentTime);
    }
  }

  function setMasterVolume(val) {
    const v = Math.max(0, Math.min(1, parseFloat(val)));
    masterVolume = v;
    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(v, audioCtx.currentTime);
    }
    const valEl = document.getElementById('ambient-master-val');
    if (valEl) valEl.textContent = `${Math.round(v * 100)}%`;
  }

  function applyPreset(name) {
    // Stop all
    Object.keys(tracks).forEach(k => stopTrack(k));

    if (name === 'deep_study') {
      // 40Hz Gamma + Deep Brown noise
      tracks.gamma.volume = 0.6;
      tracks.brown.volume = 0.7;
      startGamma();
      startBrown();
    } else if (name === 'zen_rain') {
      // Gentle Rain + 10Hz Alpha
      tracks.alpha.volume = 0.5;
      tracks.rain.volume = 0.8;
      startAlpha();
      startRain();
    } else if (name === 'pure_gamma') {
      tracks.gamma.volume = 0.8;
      startGamma();
    } else if (name === 'pure_rain') {
      tracks.rain.volume = 0.8;
      startRain();
    }

    isPlaying = Object.values(tracks).some(t => t.active);
    updateUI();
    if (isPlaying) startVisualizer();
  }

  function stopAll() {
    Object.keys(tracks).forEach(k => stopTrack(k));
    isPlaying = false;
    updateUI();
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }

  function toggleMasterPlay() {
    if (isPlaying) {
      stopAll();
    } else {
      // Default to deep study preset
      applyPreset('deep_study');
    }
  }

  // Animated Audio Frequency Visualizer Canvas
  function startVisualizer() {
    if (typeof window === 'undefined' || !window.requestAnimationFrame) return;
    if (animFrameId) cancelAnimationFrame(animFrameId);

    const canvas = document.getElementById('ambient-visualizer-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser ? analyser.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
      if (!isPlaying) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      animFrameId = requestAnimationFrame(draw);

      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.random() * 80;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.9;
        const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
        grad.addColorStop(1, 'rgba(129, 140, 248, 0.95)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, [2, 2, 0, 0]);
          ctx.fill();
        } else {
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
        }
        x += barWidth;
      }
    }
    draw();
  }

  function openModal() {
    const modal = document.getElementById('ambient-audio-modal');
    if (modal) {
      modal.classList.add('open');
      updateUI();
      if (isPlaying) startVisualizer();
    }
  }

  function closeModal() {
    const modal = document.getElementById('ambient-audio-modal');
    if (modal) modal.classList.remove('open');
  }

  function updateUI() {
    if (typeof document === 'undefined') return;

    // Header audio pill badge
    const headerBtn = document.getElementById('header-audio-btn');
    if (headerBtn) {
      headerBtn.classList.toggle('active', isPlaying);
      const eqIcon = headerBtn.querySelector('.audio-eq-icon');
      if (eqIcon) {
        eqIcon.classList.toggle('playing', isPlaying);
      }
    }

    // Modal master button
    const masterBtn = document.getElementById('ambient-master-toggle-btn');
    if (masterBtn) {
      masterBtn.textContent = isPlaying ? '⏸ Stop Audio' : '▶ Play Focus Audio';
      masterBtn.classList.toggle('active', isPlaying);
    }

    // Track toggles
    Object.keys(tracks).forEach(k => {
      const card = document.getElementById(`ambient-card-${k}`);
      const btn = document.getElementById(`ambient-btn-${k}`);
      if (card) {
        card.classList.toggle('active', tracks[k].active);
      }
      if (btn) {
        btn.textContent = tracks[k].active ? 'Active' : 'Enable';
      }
    });
  }

  return {
    init: function() {
      updateUI();
    },
    openModal: openModal,
    closeModal: closeModal,
    toggleMasterPlay: toggleMasterPlay,
    toggleTrack: toggleTrack,
    setTrackVolume: setTrackVolume,
    setMasterVolume: setMasterVolume,
    applyPreset: applyPreset,
    stopAll: stopAll,
    isPlaying: function() { return isPlaying; },
    getTracks: function() { return tracks; }
  };
})();

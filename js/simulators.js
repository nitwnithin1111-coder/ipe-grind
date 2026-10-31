// Interactive Formula Lab & Variable Simulators for IPE GRIND
// Physics & Chemistry real-time formula calculation, interactive 60fps canvas graphics, and law verification
window.IPE_SIMULATORS = (function() {
  let activeSimulator = 'sonometer'; // 'sonometer' | 'potentiometer' | 'nernst' | 'kinetics'
  let animId = null;

  // Simulator 1 State: Sonometer
  const sonometerState = {
    length: 0.50,       // meters (0.10 to 1.00 m)
    mass: 2.0,          // kg (0.5 to 10.0 kg)
    mu: 1.5e-3,         // kg/m (linear mass density)
    mode: 1,            // 1 = Fundamental, 2 = 1st overtone, 3 = 2nd overtone
    time: 0
  };

  // Simulator 2 State: Potentiometer Internal Resistance
  const potentiometerState = {
    l1: 750,            // cm (open circuit balancing length, 450 to 950 cm)
    R: 10,              // ohms (resistance box, 1 to 50 ohms)
    l2: 500,            // cm (closed circuit balancing length, < l1)
    emf: 1.5,           // volts
    jockeyPos: 500,     // cm
    isMoving: false
  };

  // Simulator 3 State: Daniell Cell Nernst Equation
  const nernstState = {
    znConc: 0.100,      // M (Zn2+)
    cuConc: 1.000,      // M (Cu2+)
    temp: 298,          // Kelvin (273 to 350 K)
    e0: 1.10,           // Volts
    electronPhase: 0
  };

  // Simulator 4 State: First-Order Kinetics & Radioactive Decay
  const kineticsState = {
    initialAmount: 100, // mol/L or nuclei
    k: 0.05,            // rate/decay constant (s^-1)
    time: 0,            // elapsed time (s)
    isPlaying: true,
    lastTick: 0
  };

  // -------------------------------------------------------------
  // SIMULATOR 1: SONOMETER TRANSVERSE VIBRATION
  // nu = (p / 2L) * sqrt(T / mu)
  // -------------------------------------------------------------
  function calcSonometer() {
    const g = 9.8;
    const T = sonometerState.mass * g;
    const v = Math.sqrt(T / sonometerState.mu);
    const fundamental = (1 / (2 * sonometerState.length)) * v;
    const currentFreq = sonometerState.mode * fundamental;
    const wavelength = (2 * sonometerState.length) / sonometerState.mode;

    return {
      tension: T,
      velocity: v,
      fundamentalFreq: fundamental,
      operatingFreq: currentFreq,
      wavelength: wavelength
    };
  }

  function updateSonometerUI() {
    if (typeof document === 'undefined') return;
    const results = calcSonometer();

    const freqEl = document.getElementById('sono-res-freq');
    const fundEl = document.getElementById('sono-res-fund');
    const velEl = document.getElementById('sono-res-vel');
    const tensionEl = document.getElementById('sono-res-tension');

    if (freqEl) freqEl.textContent = `${results.operatingFreq.toFixed(1)} Hz`;
    if (fundEl) fundEl.textContent = `${results.fundamentalFreq.toFixed(1)} Hz`;
    if (velEl) velEl.textContent = `${results.velocity.toFixed(1)} m/s`;
    if (tensionEl) tensionEl.textContent = `${results.tension.toFixed(2)} N`;

    // Sliders readouts
    const lenVal = document.getElementById('sono-val-length');
    const massVal = document.getElementById('sono-val-mass');
    const muVal = document.getElementById('sono-val-mu');

    if (lenVal) lenVal.textContent = `${(sonometerState.length * 100).toFixed(0)} cm (${sonometerState.length.toFixed(2)} m)`;
    if (massVal) massVal.textContent = `${sonometerState.mass.toFixed(1)} kg`;
    if (muVal) muVal.textContent = `${(sonometerState.mu * 1000).toFixed(2)} g/m`;

    // Law verification constants
    const law1El = document.getElementById('sono-law1-val');
    const law2El = document.getElementById('sono-law2-val');
    const law3El = document.getElementById('sono-law3-val');

    if (law1El) law1El.textContent = (results.fundamentalFreq * sonometerState.length).toFixed(2);
    if (law2El) law2El.textContent = (results.fundamentalFreq / Math.sqrt(results.tension)).toFixed(2);
    if (law3El) law3El.textContent = (results.fundamentalFreq * Math.sqrt(sonometerState.mu * 1000)).toFixed(2);
  }

  function drawSonometerCanvas() {
    const canvas = document.getElementById('sonometer-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const W = canvas.width;
    const H = canvas.height;

    // Sonometer wooden sound-box
    const boxY = H * 0.58;
    const boxH = H * 0.28;
    const gradBox = ctx.createLinearGradient(0, boxY, 0, boxY + boxH);
    gradBox.addColorStop(0, '#78350f');
    gradBox.addColorStop(1, '#451a03');

    ctx.fillStyle = gradBox;
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(40, boxY, W - 80, boxH, 6);
    else ctx.fillRect(40, boxY, W - 80, boxH);
    ctx.fill();
    ctx.stroke();

    // Sound holes in wooden box
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.arc(W * 0.35, boxY + boxH * 0.5, 9, 0, Math.PI * 2);
    ctx.arc(W * 0.65, boxY + boxH * 0.5, 9, 0, Math.PI * 2);
    ctx.fill();

    // Wooden knife-edge bridges B1 and B2
    const bridge1X = 90;
    // Bridge 2 moves according to vibrating length L
    const maxBridge2X = W - 110;
    const bridge2X = bridge1X + (maxBridge2X - bridge1X) * (sonometerState.length / 1.0);
    const wireY = boxY - 26;

    // Draw Bridges (triangles)
    function drawBridge(x, label) {
      ctx.fillStyle = '#f59e0b';
      ctx.strokeStyle = '#d97706';
      ctx.beginPath();
      ctx.moveTo(x - 12, boxY);
      ctx.lineTo(x, wireY);
      ctx.lineTo(x + 12, boxY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, boxY + 16);
    }
    drawBridge(bridge1X, 'B₁ (Node)');
    drawBridge(bridge2X, 'B₂ (Node)');

    // Vibrating String with standing wave
    const results = calcSonometer();
    const p = sonometerState.mode;
    const span = bridge2X - bridge1X;
    const amp = 16 * Math.sin(sonometerState.time * (results.operatingFreq > 100 ? 15 : 8));

    // Outer dead wire segments (fixed to peg and pulley)
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(50, wireY + 8);
    ctx.lineTo(bridge1X, wireY);
    ctx.stroke();

    // Pulley at right end
    const pulleyX = W - 50;
    const pulleyY = boxY - 8;
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(pulleyX, pulleyY, 14, 0, Math.PI * 2);
    ctx.fill();

    // Wire over pulley down to weight hanger
    ctx.beginPath();
    ctx.moveTo(bridge2X, wireY);
    ctx.lineTo(pulleyX, wireY);
    ctx.lineTo(pulleyX + 14, pulleyY);
    ctx.lineTo(pulleyX + 14, H - 15);
    ctx.stroke();

    // Hanging weight hanger & slotted weights
    const hangerY = H - 35;
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(pulleyX + 6, hangerY, 16, 20);
    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 9px monospace';
    ctx.fillText(`${sonometerState.mass}kg`, pulleyX + 14, hangerY + 14);

    // Active Vibrating Standing Wave segment
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 10;
    ctx.beginPath();

    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      const x = bridge1X + frac * span;
      const wave = amp * Math.sin(p * Math.PI * frac);
      const y = wireY + wave;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow

    // Antinode Paper Rider at middle antinode
    const antinodeFrac = 0.5 / p; // First antinode peak
    const riderX = bridge1X + antinodeFrac * span;
    const riderY = wireY + amp * Math.sin(p * Math.PI * antinodeFrac);

    // Inverted V Paper Rider
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(riderX - 6, riderY + 8);
    ctx.lineTo(riderX, riderY - 6);
    ctx.lineTo(riderX + 6, riderY + 8);
    ctx.stroke();

    ctx.fillStyle = '#f87171';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Paper Rider (Antinode)', riderX, riderY - 12);
  }

  // -------------------------------------------------------------
  // SIMULATOR 2: POTENTIOMETER INTERNAL RESISTANCE
  // r = R * (l1 - l2) / l2
  // -------------------------------------------------------------
  function calcPotentiometer() {
    const l1 = potentiometerState.l1;
    const l2 = potentiometerState.l2;
    const R = potentiometerState.R;
    const E = potentiometerState.emf;

    const r = R * ((l1 - l2) / l2);
    const V = E * (l2 / l1);
    const I = V / R;
    const potGradient = E / l1; // V/cm

    return {
      r: r,
      terminalPD: V,
      current: I,
      gradient: potGradient
    };
  }

  function updatePotentiometerUI() {
    if (typeof document === 'undefined') return;
    const results = calcPotentiometer();

    const rEl = document.getElementById('pot-res-r');
    const vEl = document.getElementById('pot-res-v');
    const iEl = document.getElementById('pot-res-i');
    const gradEl = document.getElementById('pot-res-grad');

    if (rEl) rEl.textContent = `${results.r.toFixed(2)} Ω`;
    if (vEl) vEl.textContent = `${results.terminalPD.toFixed(3)} V`;
    if (iEl) iEl.textContent = `${(results.current * 1000).toFixed(1)} mA`;
    if (gradEl) gradEl.textContent = `${(results.gradient * 100).toFixed(3)} mV/cm`;

    // Sliders readouts
    const l1Val = document.getElementById('pot-val-l1');
    const l2Val = document.getElementById('pot-val-l2');
    const rVal = document.getElementById('pot-val-r');

    if (l1Val) l1Val.textContent = `${potentiometerState.l1} cm`;
    if (l2Val) l2Val.textContent = `${potentiometerState.l2} cm`;
    if (rVal) rVal.textContent = `${potentiometerState.R} Ω`;
  }

  function drawPotentiometerCanvas() {
    const canvas = document.getElementById('potentiometer-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const W = canvas.width;
    const H = canvas.height;

    // Board outline
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    if (ctx.roundRect) ctx.roundRect(20, 20, W - 40, H - 40, 8);
    else ctx.fillRect(20, 20, W - 40, H - 40);
    ctx.fill();
    ctx.stroke();

    // Draw 4-wire representation of 10-meter Potentiometer wire
    const wireStartX = 60;
    const wireEndX = W - 60;
    const wireSpan = wireEndX - wireStartX;
    const numWires = 4;
    const wireSpacing = 28;
    const startY = 60;

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;

    for (let w = 0; w < numWires; w++) {
      const y = startY + w * wireSpacing;
      ctx.beginPath();
      ctx.moveTo(wireStartX, y);
      ctx.lineTo(wireEndX, y);
      ctx.stroke();

      // Brass connection strips alternating left/right
      if (w < numWires - 1) {
        ctx.fillStyle = '#eab308';
        if (w % 2 === 0) {
          // Right strip connecting w and w+1
          ctx.fillRect(wireEndX - 4, y, 12, wireSpacing);
        } else {
          // Left strip connecting w and w+1
          ctx.fillRect(wireStartX - 8, y, 12, wireSpacing);
        }
      }
    }

    // Ruler Scale
    ctx.fillStyle = '#64748b';
    ctx.font = '9px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('0 cm', wireStartX, startY - 8);
    ctx.textAlign = 'right';
    ctx.fillText('100 cm Scale', wireEndX, startY - 8);

    // Active Jockey Position Cursor
    const balanceLength = potentiometerState.l2; // Currently testing closed circuit
    const targetWireIndex = Math.floor(balanceLength / 250);
    const fractionOnWire = (balanceLength % 250) / 250;
    const isEven = targetWireIndex % 2 === 0;
    const jockeyX = isEven ? wireStartX + fractionOnWire * wireSpan : wireEndX - fractionOnWire * wireSpan;
    const jockeyY = startY + targetWireIndex * wireSpacing;

    // Jockey Handle & Needle
    ctx.fillStyle = '#38bdf8';
    ctx.strokeStyle = '#0284c7';
    ctx.beginPath();
    ctx.moveTo(jockeyX - 5, jockeyY - 18);
    ctx.lineTo(jockeyX + 5, jockeyY - 18);
    ctx.lineTo(jockeyX, jockeyY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`Jockey J (l₂ = ${balanceLength}cm)`, jockeyX, jockeyY - 24);

    // Galvanometer Display at Bottom
    const galvX = W * 0.5;
    const galvY = H - 55;
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#475569';
    ctx.beginPath();
    ctx.arc(galvX, galvY, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Galvanometer dial & null needle
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('G', galvX, galvY - 14);

    // Needle pointing straight UP at center zero (balanced condition)
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(galvX, galvY + 12);
    ctx.lineTo(galvX, galvY - 18);
    ctx.stroke();

    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('NULL BALANCE (G = 0)', galvX, galvY + 44);
  }

  // -------------------------------------------------------------
  // SIMULATOR 3: DANIELL CELL NERNST EQUATION
  // E_cell = E0 - (2.303 RT / nF) * log10([Zn2+] / [Cu2+])
  // -------------------------------------------------------------
  function calcNernst() {
    const R = 8.314;
    const F = 96485;
    const n = 2;
    const T = nernstState.temp;
    const E0 = nernstState.e0;

    const Q = nernstState.znConc / nernstState.cuConc;
    const logQ = Math.log10(Q);
    const nernstFactor = (2.303 * R * T) / (n * F);
    const deltaE = nernstFactor * logQ;
    const eCell = E0 - deltaE;
    // Delta G = -n * F * Ecell (in kJ/mol)
    const deltaG = (-n * F * eCell) / 1000;

    return {
      Q: Q,
      logQ: logQ,
      nernstFactor: nernstFactor,
      deltaE: deltaE,
      eCell: eCell,
      deltaG: deltaG,
      isSpontaneous: deltaG < 0
    };
  }

  function updateNernstUI() {
    if (typeof document === 'undefined') return;
    const results = calcNernst();

    const emfEl = document.getElementById('nernst-res-ecell');
    const qEl = document.getElementById('nernst-res-q');
    const corrEl = document.getElementById('nernst-res-corr');
    const dgEl = document.getElementById('nernst-res-dg');

    if (emfEl) emfEl.textContent = `${results.eCell.toFixed(4)} V`;
    if (qEl) qEl.textContent = results.Q.toFixed(3);
    if (corrEl) corrEl.textContent = `${(results.deltaE * 1000).toFixed(2)} mV`;
    if (dgEl) dgEl.textContent = `${results.deltaG.toFixed(1)} kJ/mol`;

    // Sliders readouts
    const znVal = document.getElementById('nernst-val-zn');
    const cuVal = document.getElementById('nernst-val-cu');
    const tempVal = document.getElementById('nernst-val-temp');

    if (znVal) znVal.textContent = `${nernstState.znConc.toFixed(3)} M`;
    if (cuVal) cuVal.textContent = `${nernstState.cuConc.toFixed(3)} M`;
    if (tempVal) tempVal.textContent = `${nernstState.temp} K (${(nernstState.temp - 273).toFixed(0)} °C)`;
  }

  function drawNernstCanvas() {
    const canvas = document.getElementById('nernst-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const W = canvas.width;
    const H = canvas.height;

    // Beaker 1: Zn Anode (Left)
    const b1X = W * 0.15;
    const bW = W * 0.28;
    const bY = H * 0.42;
    const bH = H * 0.48;

    // Beaker 2: Cu Cathode (Right)
    const b2X = W * 0.57;

    function drawBeaker(x, color, label, conc) {
      // Liquid
      ctx.fillStyle = color;
      ctx.fillRect(x + 4, bY + 20, bW - 8, bH - 24);

      // Glass outline
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, bY);
      ctx.lineTo(x, bY + bH);
      ctx.lineTo(x + bW, bY + bH);
      ctx.lineTo(x + bW, bY);
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + bW / 2, bY + bH - 12);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px monospace';
      ctx.fillText(`[${conc.toFixed(3)} M]`, x + bW / 2, bY + bH + 14);
    }

    // Anode Beaker: ZnSO4 (light silvery grey liquid)
    drawBeaker(b1X, 'rgba(148, 163, 184, 0.25)', 'Zn Anode (ZnSO₄)', nernstState.znConc);
    // Cathode Beaker: CuSO4 (rich blue liquid)
    drawBeaker(b2X, 'rgba(56, 189, 248, 0.4)', 'Cu Cathode (CuSO₄)', nernstState.cuConc);

    // Electrodes
    // Zn Plate (Silvery)
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(b1X + bW * 0.35, bY - 25, 20, bH * 0.7);

    // Cu Plate (Copper red)
    ctx.fillStyle = '#d97706';
    ctx.fillRect(b2X + bW * 0.35, bY - 25, 20, bH * 0.7);

    // Salt Bridge (U-tube inverted)
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(b1X + bW * 0.7, bY + bH * 0.35);
    ctx.lineTo(b1X + bW * 0.7, bY - 10);
    ctx.lineTo(b2X + bW * 0.3, bY - 10);
    ctx.lineTo(b2X + bW * 0.3, bY + bH * 0.35);
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Salt Bridge (KCl)', W * 0.5, bY - 16);

    // Connecting wires & Digital Voltmeter
    const vCenter = W * 0.5;
    const vY = 40;

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(b1X + bW * 0.45, bY - 25);
    ctx.lineTo(b1X + bW * 0.45, vY);
    ctx.lineTo(vCenter - 35, vY);

    ctx.moveTo(vCenter + 35, vY);
    ctx.lineTo(b2X + bW * 0.45, vY);
    ctx.lineTo(b2X + bW * 0.45, bY - 25);
    ctx.stroke();

    // Animated electron flow from Zn to Cu
    nernstState.electronPhase = (nernstState.electronPhase + 0.05) % 1.0;
    const wireLength = (b2X + bW * 0.45) - (b1X + bW * 0.45);
    ctx.fillStyle = '#facc15';
    for (let e = 0; e < 4; e++) {
      const frac = (nernstState.electronPhase + e * 0.25) % 1.0;
      const ex = (b1X + bW * 0.45) + frac * wireLength;
      ctx.beginPath();
      ctx.arc(ex, vY, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Digital Voltmeter Box
    const results = calcNernst();
    ctx.fillStyle = '#020617';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    if (ctx.roundRect) ctx.roundRect(vCenter - 45, vY - 22, 90, 44, 6);
    else ctx.fillRect(vCenter - 45, vY - 22, 90, 44);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${results.eCell.toFixed(3)} V`, vCenter, vY + 4);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '8px sans-serif';
    ctx.fillText('EMF (VOLTMETER)', vCenter, vY + 16);
  }

  // -------------------------------------------------------------
  // SIMULATOR 4: FIRST-ORDER KINETICS & RADIOACTIVE DECAY
  // [A]t = [A]0 * e^(-kt), t1/2 = 0.693 / k
  // -------------------------------------------------------------
  function calcKinetics() {
    const A0 = kineticsState.initialAmount;
    const k = kineticsState.k;
    const t = kineticsState.time;

    const tHalf = Math.log(2) / k; // 0.693 / k
    const At = A0 * Math.exp(-k * t);
    const reacted = A0 - At;
    const percentRemaining = (At / A0) * 100;
    const halfLivesElapsed = t / tHalf;
    const rate = k * At;

    return {
      tHalf: tHalf,
      remaining: At,
      reacted: reacted,
      percentRemaining: percentRemaining,
      halfLivesElapsed: halfLivesElapsed,
      rate: rate
    };
  }

  function updateKineticsUI() {
    if (typeof document === 'undefined') return;
    const results = calcKinetics();

    const tHalfEl = document.getElementById('kin-res-thalf');
    const remEl = document.getElementById('kin-res-rem');
    const pctEl = document.getElementById('kin-res-pct');
    const rateEl = document.getElementById('kin-res-rate');

    if (tHalfEl) tHalfEl.textContent = `${results.tHalf.toFixed(2)} s`;
    if (remEl) remEl.textContent = `${results.remaining.toFixed(1)}`;
    if (pctEl) pctEl.textContent = `${results.percentRemaining.toFixed(1)}%`;
    if (rateEl) rateEl.textContent = `${results.rate.toFixed(3)} M/s`;

    // Sliders readouts
    const kVal = document.getElementById('kin-val-k');
    const a0Val = document.getElementById('kin-val-a0');
    const tVal = document.getElementById('kin-val-time');

    if (kVal) kVal.textContent = `${kineticsState.k.toFixed(3)} s⁻¹`;
    if (a0Val) a0Val.textContent = `${kineticsState.initialAmount}`;
    if (tVal) tVal.textContent = `${kineticsState.time.toFixed(1)} s (${results.halfLivesElapsed.toFixed(2)} t½)`;

    const playBtn = document.getElementById('kin-btn-play');
    if (playBtn) playBtn.textContent = kineticsState.isPlaying ? '⏸ Pause' : '▶ Play Animation';
  }

  function drawKineticsCanvas() {
    const canvas = document.getElementById('kinetics-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const W = canvas.width;
    const H = canvas.height;

    // Coordinate Axes
    const originX = 55;
    const originY = H - 35;
    const graphW = W - 80;
    const graphH = H - 65;

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // Y-Axis ([A] Conc)
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY - graphH);
    // X-Axis (Time t)
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + graphW, originY);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('[A]₀', originX - 8, originY - graphH + 10);
    ctx.fillText('0', originX - 8, originY + 4);
    ctx.textAlign = 'center';
    ctx.fillText('Time (t) ➔', originX + graphW / 2, originY + 24);

    const results = calcKinetics();
    const maxTime = Math.max(30, results.tHalf * 4.5);
    const A0 = kineticsState.initialAmount;

    // Half-Life Milestones (Dotted vertical guidelines)
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    for (let h = 1; h <= 4; h++) {
      const th = h * results.tHalf;
      if (th <= maxTime) {
        const hx = originX + (th / maxTime) * graphW;
        ctx.beginPath();
        ctx.moveTo(hx, originY);
        ctx.lineTo(hx, originY - graphH);
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${h}t½`, hx, originY + 12);
      }
    }
    ctx.setLineDash([]); // reset line dash

    // Plot Full Exponential Curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxTime;
      const at = A0 * Math.exp(-kineticsState.k * t);
      const px = originX + (t / maxTime) * graphW;
      const py = originY - (at / A0) * graphH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Current State Glowing Point Marker
    const currX = originX + (Math.min(kineticsState.time, maxTime) / maxTime) * graphW;
    const currY = originY - (results.remaining / A0) * graphH;

    ctx.fillStyle = '#ec4899';
    ctx.shadowColor = '#ec4899';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(currX, currY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Tooltip at cursor
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`(${kineticsState.time.toFixed(1)}s, ${results.percentRemaining.toFixed(0)}%)`, currX + 10, currY - 6);
  }

  // Master Render & Animation Loop
  function tick(timestamp) {
    if (!lastTick) lastTick = timestamp;
    const delta = (timestamp - lastTick) / 1000;
    lastTick = timestamp;

    if (activeSimulator === 'sonometer') {
      sonometerState.time += delta;
      drawSonometerCanvas();
    } else if (activeSimulator === 'potentiometer') {
      drawPotentiometerCanvas();
    } else if (activeSimulator === 'nernst') {
      drawNernstCanvas();
    } else if (activeSimulator === 'kinetics') {
      if (kineticsState.isPlaying) {
        kineticsState.time += delta * 1.5;
        const results = calcKinetics();
        if (kineticsState.time > results.tHalf * 4.5) {
          kineticsState.time = 0; // Loop animation
        }
        updateKineticsUI();
      }
      drawKineticsCanvas();
    }

    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      animId = requestAnimationFrame(tick);
    }
  }

  let lastTick = 0;

  function switchSimulator(simKey) {
    activeSimulator = simKey;

    const tabs = ['sonometer', 'potentiometer', 'nernst', 'kinetics'];
    tabs.forEach(k => {
      const btn = document.getElementById(`sim-tab-${k}`);
      const pane = document.getElementById(`sim-pane-${k}`);
      if (btn) btn.classList.toggle('active', k === simKey);
      if (pane) pane.style.display = k === simKey ? 'block' : 'none';
    });

    if (simKey === 'sonometer') updateSonometerUI();
    else if (simKey === 'potentiometer') updatePotentiometerUI();
    else if (simKey === 'nernst') updateNernstUI();
    else if (simKey === 'kinetics') updateKineticsUI();
  }

  function openLabModal(defaultSim) {
    const modal = document.getElementById('formula-lab-modal');
    if (modal) {
      modal.classList.add('open');
      if (defaultSim) switchSimulator(defaultSim);
      else switchSimulator(activeSimulator);

      if (!animId && typeof window !== 'undefined' && window.requestAnimationFrame) {
        animId = requestAnimationFrame(tick);
      }
    }
  }

  function closeLabModal() {
    const modal = document.getElementById('formula-lab-modal');
    if (modal) modal.classList.remove('open');
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  return {
    init: function() {
      updateSonometerUI();
      updatePotentiometerUI();
      updateNernstUI();
      updateKineticsUI();
    },
    openModal: openLabModal,
    closeModal: closeLabModal,
    switchSimulator: switchSimulator,

    // Sonometer controls
    setSonometerLength: function(val) { sonometerState.length = parseFloat(val); updateSonometerUI(); },
    setSonometerMass: function(val) { sonometerState.mass = parseFloat(val); updateSonometerUI(); },
    setSonometerMu: function(val) { sonometerState.mu = parseFloat(val); updateSonometerUI(); },
    setSonometerMode: function(m) { sonometerState.mode = parseInt(m, 10); updateSonometerUI(); },

    // Potentiometer controls
    setPotentiometerL1: function(val) { sonometerState.l1 = parseInt(val, 10); updatePotentiometerUI(); },
    setPotentiometerL2: function(val) { potentiometerState.l2 = parseInt(val, 10); updatePotentiometerUI(); },
    setPotentiometerR: function(val) { potentiometerState.R = parseFloat(val); updatePotentiometerUI(); },

    // Nernst controls
    setNernstZn: function(val) { nernstState.znConc = parseFloat(val); updateNernstUI(); },
    setNernstCu: function(val) { nernstState.cuConc = parseFloat(val); updateNernstUI(); },
    setNernstTemp: function(val) { nernstState.temp = parseInt(val, 10); updateNernstUI(); },

    // Kinetics controls
    setKineticsK: function(val) { kineticsState.k = parseFloat(val); updateKineticsUI(); },
    setKineticsA0: function(val) { kineticsState.initialAmount = parseFloat(val); updateKineticsUI(); },
    setKineticsTime: function(val) { kineticsState.time = parseFloat(val); updateKineticsUI(); },
    toggleKineticsPlay: function() { kineticsState.isPlaying = !kineticsState.isPlaying; updateKineticsUI(); },
    resetKinetics: function() { kineticsState.time = 0; updateKineticsUI(); }
  };
})();

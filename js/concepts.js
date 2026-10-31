// Interactive Concept Masterclass & Deep Concept Teaching Module for IPE GRIND
// Teaches physics and chemistry concepts from absolute scratch with real-world analogies, interactive SVG diagrams, and step-by-step derivations
window.IPE_CONCEPTS = (function() {
  const CONCEPTS_DATA = [
    {
      id: 'concept-doppler',
      subject: 'physics',
      chapter: 'phy-ch01',
      title: 'Doppler Effect in Sound Waves',
      subtitle: 'Why approaching ambulance sirens sound higher in pitch & exact apparent frequency derivation',
      difficulty: 'High Yield (LAQ / SAQ)',
      marks: '8M / 4M',
      tags: ['Waves', 'Acoustics', 'Frequency'],
      videoUrl: 'https://www.youtube.com/watch?v=h4OnBYrbCjY',
      videoTitle: 'Doppler Effect Visualized in 3D',
      summary: 'When a sound source moves towards an observer, sound wave crests get compressed in front of the source, resulting in shorter apparent wavelength and higher perceived pitch.',
      analogy: 'Imagine a person throwing a ball at you every 2 seconds. If they run towards you while throwing, each subsequent ball travels a shorter distance, so the balls reach you faster than every 2 seconds!',
      theory: `
        <h4>1. Microscopic Wave Picture</h4>
        <p>A source of sound emits spherical wavefronts at interval $T_0 = 1/\\nu$. If the source moves at velocity $v_s$ towards a stationary observer, the distance between successive wavefronts (the apparent wavelength $\\lambda'$) decreases:</p>
        $$\\lambda' = \\frac{v - v_s}{\\nu}$$
        <p>Since wave velocity $v = \\nu' \\lambda'$ remains constant in the medium (air), the apparent frequency $\\nu'$ heard by the observer is:</p>
        $$\\nu' = \\frac{v}{\\lambda'} = \\nu \\left( \\frac{v}{v - v_s} \\right)$$

        <h4>2. General Doppler Master Equation</h4>
        <p>When both source and observer are moving along the line joining them:</p>
        $$\\nu' = \\nu \\left( \\frac{v \\pm v_o}{v \\mp v_s} \\right)$$
        <ul>
          <li><strong>Numerator:</strong> Use $+v_o$ when observer moves <em>towards</em> source; use $-v_o$ when observer moves <em>away</em>.</li>
          <li><strong>Denominator:</strong> Use $-v_s$ when source moves <em>towards</em> observer; use $+v_s$ when source moves <em>away</em>.</li>
        </ul>

        <h4>3. Why Boards Ask This (60/60 Marking Scheme)</h4>
        <p>In TS Board exams, write the formal definition, state the 4 standard sign convention cases, and show the algebraic derivation of $\\nu'$ clearly. State that Doppler effect does not apply when source and observer move perpendicularly at the instant of closest approach.</p>
      `,
      svgDiagram: `
        <svg viewBox="0 0 500 160" class="concept-svg-diagram">
          <rect width="500" height="160" rx="8" fill="var(--bg-subtle)" stroke="var(--border)" />
          <!-- Observer -->
          <circle cx="80" cy="80" r="14" fill="#3b82f6" />
          <text x="80" y="115" text-anchor="middle" fill="var(--text-secondary)" font-size="11">Observer (Vo)</text>
          <!-- Source -->
          <circle cx="360" cy="80" r="14" fill="#ef4444" />
          <text x="360" y="115" text-anchor="middle" fill="var(--text-secondary)" font-size="11">Source (Vs ➔)</text>
          <!-- Compressed Wavefronts in front -->
          <circle cx="340" cy="80" r="30" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.8"/>
          <circle cx="310" cy="80" r="60" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.6"/>
          <circle cx="270" cy="80" r="95" fill="none" stroke="#ef4444" stroke-width="1.5" opacity="0.4"/>
          <!-- Elongated Wavefronts behind -->
          <circle cx="400" cy="80" r="45" fill="none" stroke="#3b82f6" stroke-width="1.5" opacity="0.5"/>
          <circle cx="430" cy="80" r="75" fill="none" stroke="#3b82f6" stroke-width="1.5" opacity="0.3"/>
          <text x="250" y="30" text-anchor="middle" fill="var(--accent)" font-weight="bold" font-size="12">Compressed Wavelengths (Higher Pitch ν' > ν)</text>
        </svg>
      `
    },
    {
      id: 'concept-ydse',
      subject: 'physics',
      chapter: 'phy-ch03',
      title: 'Young\'s Double Slit Interference (Wave Optics)',
      subtitle: 'Wave nature of light, constructive vs destructive superposition & fringe width derivation',
      difficulty: 'High Yield (4M SAQ)',
      marks: '4M',
      tags: ['Wave Optics', 'Interference', 'Fringe Width'],
      videoUrl: 'https://www.youtube.com/watch?v=Iuv6hY6zsd0',
      videoTitle: 'Young\'s Double Slit Experiment Explained',
      summary: 'When monochromatic coherent light passes through two closely spaced parallel slits, light waves spread out and overlap on a screen, producing an alternating series of bright and dark fringes.',
      analogy: 'Imagine two pebbles dropped simultaneously into still water. Where two wave crests meet, the water splashes twice as high (bright fringe). Where a crest meets a trough, the water stays completely flat (dark fringe)!',
      theory: `
        <h4>1. Condition for Interference Fringes</h4>
        <p>Let $d$ be the distance between two coherent slit sources $S_1$ and $S_2$, and $D$ be the distance to the screen ($D \\gg d$). For a point $P$ at distance $y$ from the center of the screen:</p>
        $$\\text{Path Difference } \\Delta x = S_2 P - S_1 P \\approx \\frac{y \\cdot d}{D}$$

        <h4>2. Fringe Positions</h4>
        <ul>
          <li><strong>Bright Fringes (Constructive):</strong> $\\Delta x = n\\lambda \\implies y_n = \\frac{n\\lambda D}{d} \\quad (n = 0, 1, 2, \\dots)$</li>
          <li><strong>Dark Fringes (Destructive):</strong> $\\Delta x = (2n - 1)\\frac{\\lambda}{2} \\implies y_n = (2n - 1)\\frac{\\lambda D}{2d} \\quad (n = 1, 2, \\dots)$</li>
        </ul>

        <h4>3. Fringe Width Derivation ($\\beta$)</h4>
        <p>The spacing between any two consecutive bright or dark fringes is identical:</p>
        $$\\beta = y_{n+1} - y_n = \\frac{(n+1)\\lambda D}{d} - \\frac{n\\lambda D}{d} = \\frac{\\lambda D}{d}$$
        <blockquote>💡 <strong>TSBIE Board Trap:</strong> If the whole apparatus is immersed in water of refractive index $\\mu = 1.33$, the wavelength becomes $\\lambda' = \\lambda / \\mu$, so the fringe width decreases to $\\beta' = \\beta / \\mu$.</blockquote>
      `,
      svgDiagram: `
        <svg viewBox="0 0 500 160" class="concept-svg-diagram">
          <rect width="500" height="160" rx="8" fill="var(--bg-subtle)" stroke="var(--border)" />
          <!-- Slit Barrier -->
          <line x1="120" y1="10" x2="120" y2="60" stroke="var(--text-primary)" stroke-width="3"/>
          <line x1="120" y1="75" x2="120" y2="85" stroke="var(--text-primary)" stroke-width="3"/>
          <line x1="120" y1="100" x2="120" y2="150" stroke="var(--text-primary)" stroke-width="3"/>
          <!-- Slit Labels -->
          <text x="105" y="70" text-anchor="end" fill="var(--accent)" font-size="11">S1</text>
          <text x="105" y="96" text-anchor="end" fill="var(--accent)" font-size="11">S2</text>
          <!-- Screen -->
          <line x1="420" y1="10" x2="420" y2="150" stroke="#94a3b8" stroke-width="3"/>
          <!-- Fringes on Screen -->
          <rect x="425" y="20" width="16" height="12" fill="#3b82f6" rx="2"/>
          <rect x="425" y="38" width="8" height="12" fill="#1e293b" rx="2"/>
          <rect x="425" y="56" width="16" height="12" fill="#3b82f6" rx="2"/>
          <rect x="425" y="74" width="22" height="14" fill="#60a5fa" rx="2"/> <!-- Central Max -->
          <rect x="425" y="94" width="16" height="12" fill="#3b82f6" rx="2"/>
          <rect x="425" y="112" width="8" height="12" fill="#1e293b" rx="2"/>
          <rect x="425" y="130" width="16" height="12" fill="#3b82f6" rx="2"/>
          <!-- Rays to Central Max -->
          <line x1="120" y1="68" x2="425" y2="81" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,4"/>
          <line x1="120" y1="92" x2="425" y2="81" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4,4"/>
          <text x="270" y="145" text-anchor="middle" fill="var(--text-secondary)" font-size="11">D (Distance to Screen)</text>
          <text x="455" y="85" text-anchor="start" fill="#60a5fa" font-size="10">n=0 (Central Bright)</text>
        </svg>
      `
    },
    {
      id: 'concept-nernst',
      subject: 'chemistry',
      chapter: 'chem-ch03',
      title: 'Nernst Equation & Electrochemical Cells',
      subtitle: 'Predicting real cell voltage at any concentration & equilibrium constant connection',
      difficulty: 'High Yield (LAQ / Numerical)',
      marks: '8M / 4M',
      tags: ['Electrochemistry', 'Cell Potential', 'Daniell Cell'],
      videoUrl: 'https://www.youtube.com/watch?v=w44N_hJmG9c',
      videoTitle: 'Nernst Equation and Electrochemical Cells',
      summary: 'The Nernst equation quantitatively describes how electrode potential and cell EMF depend on ion concentrations, temperature, and reaction quotient Q in galvanic systems.',
      analogy: 'Think of cell EMF as water pressure between two tanks. When the concentration difference is high, water rushes furiously (high voltage). As ions deplete and reaction approaches equilibrium, the pressure equalizes until voltage drops to exactly zero (flat dead battery)!',
      theory: `
        <h4>1. Standard Daniell Cell Reaction</h4>
        $$\\text{Zn}(s) + \\text{Cu}^{2+}(aq) \\rightleftharpoons \\text{Zn}^{2+}(aq) + \\text{Cu}(s)$$
        <p>Standard EMF: $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = +0.34\\text{ V} - (-0.76\\text{ V}) = 1.10\\text{ V}$.</p>

        <h4>2. Nernst Equation Formulation</h4>
        $$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{2.303 RT}{nF} \\log_{10} Q$$
        <p>At standard laboratory temperature $T = 298\\text{ K}$ ($25^\\circ\\text{C}$):</p>
        $$E_{\\text{cell}} = 1.10\\text{ V} - \\frac{0.0591}{2} \\log_{10} \\left( \\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]} \\right)$$

        <h4>3. Relation to Equilibrium Constant ($K_c$)</h4>
        <p>When the cell completely discharges and reaches dynamic chemical equilibrium, $E_{\\text{cell}} = 0$ and $Q = K_c$:</p>
        $$E^\\circ_{\\text{cell}} = \\frac{0.0591}{n} \\log_{10} K_c \\implies \\log_{10} K_c = \\frac{n \\cdot E^\\circ_{\\text{cell}}}{0.0591}$$
        <p>For the Daniell cell with $n = 2$ and $E^\\circ = 1.10\\text{ V}$:</p>
        $$K_c = 10^{\\frac{2 \\times 1.10}{0.0591}} \\approx 2 \\times 10^{37}$$
      `,
      svgDiagram: `
        <svg viewBox="0 0 500 160" class="concept-svg-diagram">
          <rect width="500" height="160" rx="8" fill="var(--bg-subtle)" stroke="var(--border)" />
          <!-- Anode Beaker -->
          <rect x="60" y="40" width="120" height="100" rx="4" fill="none" stroke="#94a3b8" stroke-width="2"/>
          <rect x="62" y="70" width="116" height="68" fill="#e2e8f0" opacity="0.15"/>
          <rect x="100" y="20" width="16" height="90" fill="#94a3b8" rx="2"/>
          <text x="108" y="15" text-anchor="middle" fill="var(--text-primary)" font-size="10">Zn Anode (-)</text>
          <text x="120" y="110" text-anchor="middle" fill="var(--text-secondary)" font-size="10">Zn²⁺ sol</text>

          <!-- Salt Bridge -->
          <path d="M150 50 Q250 15 350 50" fill="none" stroke="#f59e0b" stroke-width="12" stroke-linecap="round"/>
          <text x="250" y="32" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="10">Salt Bridge (KCl/Agar)</text>

          <!-- Cathode Beaker -->
          <rect x="320" y="40" width="120" height="100" rx="4" fill="none" stroke="#94a3b8" stroke-width="2"/>
          <rect x="322" y="70" width="116" height="68" fill="#38bdf8" opacity="0.25"/>
          <rect x="380" y="20" width="16" height="90" fill="#b45309" rx="2"/>
          <text x="388" y="15" text-anchor="middle" fill="#b45309" font-size="10">Cu Cathode (+)</text>
          <text x="380" y="110" text-anchor="middle" fill="#38bdf8" font-size="10">Cu²⁺ sol</text>

          <!-- Wire & Voltmeter -->
          <path d="M108 20 L108 8 L220 8" fill="none" stroke="#ef4444" stroke-width="2"/>
          <path d="M280 8 L388 8 L388 20" fill="none" stroke="#ef4444" stroke-width="2"/>
          <circle cx="250" cy="8" r="14" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
          <text x="250" y="12" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="9">1.10V</text>
        </svg>
      `
    },
    {
      id: 'concept-pn-junction',
      subject: 'physics',
      chapter: 'phy-ch15',
      title: 'P-N Junction Diode & Full-Wave Rectification',
      subtitle: 'Semiconductor barrier potential, diffusion vs drift current, and converting AC into DC',
      difficulty: 'High Yield (LAQ 8M)',
      marks: '8M',
      tags: ['Semiconductors', 'Diodes', 'Rectification'],
      videoUrl: 'https://www.youtube.com/watch?v=7ukDKVHnac4',
      videoTitle: 'P-N Junction Diode Working Animation',
      summary: 'When p-type and n-type semiconductor crystals are joined, majority carriers diffuse across the junction, leaving uncompensated donor and acceptor ions that create an internal electric field (depletion layer).',
      analogy: 'Think of the depletion layer as a border security gate with a one-way turnstile. Under forward bias, you push with enough battery voltage ($>0.7\\text{ V}$) to open the turnstile and current floods through easily. Under reverse bias, the gate locks completely shut!',
      theory: `
        <h4>1. Depletion Layer & Barrier Potential</h4>
        <p>Electrons from the n-side diffuse into the p-side, and holes from the p-side diffuse into the n-side. This leaves behind:</p>
        <ul>
          <li>Immobile positive donor ions ($\\text{P}^+$) on the n-side</li>
          <li>Immobile negative acceptor ions ($\\text{B}^-$) on the p-side</li>
        </ul>
        <p>This creates a built-in potential barrier $V_0 \\approx 0.7\\text{ V}$ for Silicon and $0.3\\text{ V}$ for Germanium that halts further diffusion.</p>

        <h4>2. Forward vs Reverse Biasing</h4>
        <ul>
          <li><strong>Forward Bias:</strong> Positive terminal of battery connected to p-side, negative to n-side. Depletion layer width <em>decreases</em>, resistance drops to near zero, large milliampere ($mA$) current flows.</li>
          <li><strong>Reverse Bias:</strong> Positive terminal to n-side, negative to p-side. Depletion layer width <em>increases</em>, negligible microampere ($\\mu A$) minority carrier leakage current flows.</li>
        </ul>

        <h4>3. Full-Wave Center-Tap Rectifier Working</h4>
        <p>A center-tapped transformer with two diodes $D_1$ and $D_2$ conducts during alternate half-cycles of the AC input voltage:</p>
        <ul>
          <li><strong>Positive Half-Cycle:</strong> $D_1$ is forward-biased and conducts; $D_2$ is reverse-biased.</li>
          <li><strong>Negative Half-Cycle:</strong> $D_2$ is forward-biased and conducts; $D_1$ is reverse-biased.</li>
        </ul>
        <p>Current through the load resistor $R_L$ always flows in the same unidirectional direction, achieving rectification efficiency $\\eta = 81.2\\%$. Ripple frequency is double the input frequency: $f_{\\text{ripple}} = 2f$.</p>
      `,
      svgDiagram: `
        <svg viewBox="0 0 500 160" class="concept-svg-diagram">
          <rect width="500" height="160" rx="8" fill="var(--bg-subtle)" stroke="var(--border)" />
          <!-- Diode Block -->
          <rect x="140" y="45" width="100" height="70" fill="#3b82f6" opacity="0.3" rx="4"/>
          <rect x="260" y="45" width="100" height="70" fill="#10b981" opacity="0.3" rx="4"/>
          <!-- Depletion Layer -->
          <rect x="230" y="45" width="40" height="70" fill="#f59e0b" opacity="0.3"/>
          <text x="190" y="85" text-anchor="middle" fill="#3b82f6" font-weight="bold" font-size="16">P-type (Holes)</text>
          <text x="310" y="85" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="16">N-type (Electrons)</text>
          <text x="250" y="35" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="11">Depletion Region (Vo = 0.7V)</text>
          <!-- Barrier E-field arrow -->
          <line x1="265" y1="105" x2="235" y2="105" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
          <text x="250" y="125" text-anchor="middle" fill="#ef4444" font-size="10">Built-in E-field</text>
        </svg>
      `
    },
    {
      id: 'concept-organic-mechanisms',
      subject: 'chemistry',
      chapter: 'chem-ch10',
      title: 'Nucleophilic Substitution: SN1 vs SN2 Mechanisms',
      subtitle: 'Carbocation stability vs backside attack Walden inversion in haloalkanes',
      difficulty: 'High Yield (4M SAQ)',
      marks: '4M',
      tags: ['Organic Chemistry', 'Reaction Mechanisms', 'Haloalkanes'],
      videoUrl: 'https://www.youtube.com/watch?v=Jm_D9N3aVfI',
      videoTitle: 'SN1 and SN2 Mechanisms Compared',
      summary: 'Nucleophilic aliphatic substitution occurs via two fundamental pathways depending on the alkyl halide substrate structure: two-step unimolecular SN1 involving carbocation intermediate, or one-step concerted bimolecular SN2.',
      analogy: 'SN2 is like someone pushing you off a swing from behind while taking your seat in one single synchronized push! SN1 is like getting off the swing first, leaving it empty for a moment (carbocation), and then anyone can take the seat from either front or back!',
      theory: `
        <h4>1. Comprehensive SN1 vs SN2 Comparison Table</h4>
        <table class="bp-weightage-table" style="font-size: 11px;">
          <thead>
            <tr>
              <th>Feature</th>
              <th>SN1 (Unimolecular)</th>
              <th>SN2 (Bimolecular)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Kinetics</strong></td>
              <td>Rate $= k[R-X]^1$ (First Order)</td>
              <td>Rate $= k[R-X]^1[\\text{Nu}^-]^1$ (Second Order)</td>
            </tr>
            <tr>
              <td><strong>Steps</strong></td>
              <td>Two steps (Carbocation intermediate)</td>
              <td>Single concerted step (Transition state)</td>
            </tr>
            <tr>
              <td><strong>Substrate Reactivity</strong></td>
              <td>$3^\\circ > 2^\\circ > 1^\\circ > \\text{CH}_3\\text{X}$</td>
              <td>$\\text{CH}_3\\text{X} > 1^\\circ > 2^\\circ > 3^\\circ$</td>
            </tr>
            <tr>
              <td><strong>Stereochemistry</strong></td>
              <td>Racemization ($50\\%$ retention + $50\\%$ inversion)</td>
              <td>$100\\%$ Inversion of configuration (Walden Inversion)</td>
            </tr>
            <tr>
              <td><strong>Preferred Solvent</strong></td>
              <td>Polar protic ($\\text{H}_2\\text{O}, \\text{ROH}$)</td>
              <td>Polar aprotic (Acetone, DMSO, DMF)</td>
            </tr>
          </tbody>
        </table>

        <h4>2. High-Yield TSBIE Reaction Examples</h4>
        <p><strong>SN2 Example:</strong> Alkaline hydrolysis of methyl bromide:</p>
        $$\\text{CH}_3\\text{Br} + \\text{OH}^- \\xrightarrow{\\text{slow}} [\\text{HO}\\cdots\\text{CH}_3\\cdots\\text{Br}]^{\\ddagger} \\xrightarrow{\\text{fast}} \\text{CH}_3\\text{OH} + \\text{Br}^-$$
        <p><strong>SN1 Example:</strong> Hydrolysis of tertiary butyl bromide:</p>
        $$\\text{Step 1: } (\\text{CH}_3)_3\\text{C}-\\text{Br} \\xrightarrow{\\text{slow}} (\\text{CH}_3)_3\\text{C}^+ + \\text{Br}^- \\quad \\text{(Rate Determining Step)}$$
        $$\\text{Step 2: } (\\text{CH}_3)_3\\text{C}^+ + \\text{OH}^- \\xrightarrow{\\text{fast}} (\\text{CH}_3)_3\\text{C}-\\text{OH}$$
      `,
      svgDiagram: `
        <svg viewBox="0 0 500 160" class="concept-svg-diagram">
          <rect width="500" height="160" rx="8" fill="var(--bg-subtle)" stroke="var(--border)" />
          <!-- Left: SN2 Backside attack -->
          <text x="130" y="25" text-anchor="middle" fill="var(--accent)" font-weight="bold" font-size="12">SN2: Concerted Backside Attack</text>
          <circle cx="60" cy="80" r="12" fill="#ef4444"/>
          <text x="60" y="84" text-anchor="middle" fill="#fff" font-size="9">OH⁻</text>
          <line x1="75" y1="80" x2="115" y2="80" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,3"/>
          <circle cx="130" cy="80" r="16" fill="#64748b"/>
          <text x="130" y="85" text-anchor="middle" fill="#fff" font-size="10">C</text>
          <line x1="145" y1="80" x2="185" y2="80" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,3"/>
          <circle cx="200" cy="80" r="14" fill="#f59e0b"/>
          <text x="200" y="84" text-anchor="middle" fill="#fff" font-size="9">Br⁻</text>
          <text x="130" y="130" text-anchor="middle" fill="var(--text-secondary)" font-size="11">Transition State [HO···C···Br]‡</text>

          <!-- Divider -->
          <line x1="250" y1="15" x2="250" y2="145" stroke="var(--border)" stroke-width="1.5"/>

          <!-- Right: SN1 Planar carbocation -->
          <text x="375" y="25" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="12">SN1: Planar sp² Carbocation</text>
          <circle cx="375" cy="75" r="16" fill="#3b82f6"/>
          <text x="375" y="80" text-anchor="middle" fill="#fff" font-weight="bold" font-size="10">C⁺</text>
          <!-- Attack from Top and Bottom -->
          <path d="M340 40 Q375 50 375 60" fill="none" stroke="#10b981" stroke-width="2"/>
          <text x="320" y="40" fill="#10b981" font-size="9">Front 50%</text>
          <path d="M340 110 Q375 100 375 90" fill="none" stroke="#10b981" stroke-width="2"/>
          <text x="320" y="115" fill="#10b981" font-size="9">Back 50%</text>
          <text x="375" y="135" text-anchor="middle" fill="var(--text-secondary)" font-size="11">Racemic Mixture Formed</text>
        </svg>
      `
    }
  ];

  let currentSubjectFilter = 'all';

  function init() {
    renderConceptCards();
  }

  function openModal(conceptId) {
    const modal = document.getElementById('concept-explorer-modal');
    if (!modal) return;
    modal.classList.add('open');

    if (conceptId) {
      showConceptDetail(conceptId);
    } else {
      showConceptList();
    }
  }

  function closeModal() {
    const modal = document.getElementById('concept-explorer-modal');
    if (modal) modal.classList.remove('open');
  }

  function setSubjectFilter(subj) {
    currentSubjectFilter = subj;
    const pills = document.querySelectorAll('.concept-sub-pill');
    pills.forEach(p => p.classList.toggle('active', p.dataset.subj === subj));
    renderConceptCards();
  }

  function renderConceptCards() {
    const container = document.getElementById('concept-cards-grid');
    if (!container) return;

    const filtered = CONCEPTS_DATA.filter(c => {
      if (currentSubjectFilter === 'all') return true;
      return c.subject === currentSubjectFilter;
    });

    container.innerHTML = filtered.map(c => `
      <div class="concept-master-card" onclick="window.IPE_CONCEPTS.showConceptDetail('${c.id}')">
        <div class="concept-card-top">
          <span class="concept-subj-badge ${c.subject}">${c.subject === 'physics' ? '⚡ Physics' : '🧪 Chemistry'}</span>
          <span class="concept-marks-chip">${c.marks}</span>
        </div>
        <h3 class="concept-card-title">${c.title}</h3>
        <p class="concept-card-sub">${c.subtitle}</p>
        <div class="concept-card-footer">
          <span class="concept-diff-tag">${c.difficulty}</span>
          <button class="concept-view-btn" onclick="event.stopPropagation(); window.IPE_CONCEPTS.showConceptDetail('${c.id}')">
            <span>Learn Masterclass</span> ➔
          </button>
        </div>
      </div>
    `).join('');
  }

  function showConceptList() {
    const listView = document.getElementById('concept-list-view');
    const detailView = document.getElementById('concept-detail-view');
    if (listView) listView.style.display = 'block';
    if (detailView) detailView.style.display = 'none';
  }

  function showConceptDetail(conceptId) {
    const concept = CONCEPTS_DATA.find(c => c.id === conceptId);
    if (!concept) return;

    const listView = document.getElementById('concept-list-view');
    const detailView = document.getElementById('concept-detail-view');
    if (listView) listView.style.display = 'none';
    if (detailView) detailView.style.display = 'block';

    detailView.innerHTML = `
      <div class="concept-detail-header">
        <button class="concept-back-btn" onclick="window.IPE_CONCEPTS.showConceptList()">
          ← Back to All Masterclasses
        </button>
        <div class="concept-detail-tags">
          <span class="concept-subj-badge ${concept.subject}">${concept.subject === 'physics' ? '⚡ Physics' : '🧪 Chemistry'}</span>
          <span class="concept-marks-chip">High Yield ${concept.marks}</span>
        </div>
      </div>

      <h1 class="concept-detail-title">${concept.title}</h1>
      <div class="concept-detail-sub">${concept.subtitle}</div>

      <!-- Real-Life Analogy Hero Card -->
      <div class="concept-analogy-box">
        <div class="analogy-head">💡 Real-World Intuitive Analogy:</div>
        <p class="analogy-body">${concept.analogy}</p>
      </div>

      <!-- Interactive SVG Diagram -->
      <div class="concept-diagram-wrapper">
        <div class="diagram-caption">🎨 Visual Microscopic Diagram:</div>
        ${concept.svgDiagram}
      </div>

      <!-- Curated HD Concept Video Link -->
      <div class="concept-video-card">
        <div class="video-left">
          <span class="video-play-icon">▶</span>
          <div>
            <div class="video-card-title">${concept.videoTitle}</div>
            <div class="video-card-sub">Curated 4K Conceptual Animation Demonstration</div>
          </div>
        </div>
        <a href="${concept.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn-watch-video">
          Watch Visual Explainer ↗
        </a>
      </div>

      <!-- Step-by-Step Board Derivation & Theory -->
      <div class="concept-theory-card">
        ${concept.theory}
      </div>

      <!-- Action Footer -->
      <div class="concept-action-footer">
        <button class="btn-primary" onclick="window.IPE_AI.openChat('Sir, ${concept.title} meeda board exam questions ela solve cheyyalo scratch nundi explain cheyyandi!')">
          🤖 Ask IPE GURU Doubts on this Concept
        </button>
        <button class="btn-primary" style="background: var(--bg-subtle); border: 1px solid var(--border); color: var(--text-primary);" onclick="window.IPE_FEED.setFilter({ chapterId: '${concept.chapter}' }); window.IPE_CONCEPTS.closeModal(); window.IPE_APP.switchTab('feed');">
          Practice Chapter Questions ➔
        </button>
      </div>
    `;

    if (window.IPE_RENDER_MATH) {
      window.IPE_RENDER_MATH(detailView);
    }
  }

  return {
    init,
    openModal,
    closeModal,
    setSubjectFilter,
    showConceptDetail,
    showConceptList
  };
})();

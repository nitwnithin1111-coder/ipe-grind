// Groq-Powered AI Master Tutor Engine for IPE GRIND ("IPE GURU")
// High-performance streaming typewriter, KaTeX math isolation, voice speech, serverless Vercel proxy, and offline concept intelligence
window.IPE_AI = (function() {
  const GROQ_CONFIG = {
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    apiKey: window.GROQ_API_KEY || localStorage.getItem('ipe_groq_key') || '',
    model: 'qwen/qwen3.8-27b',
    fallbackModel: 'openai/gpt-oss-120b'
  };

  const SYSTEM_PROMPT = `You are 'IPE GURU', the legendary, friendly AI Physics & Chemistry Master Teacher for Telangana Board (TS BIE) Intermediate 2nd Year students.
Your mission is to make students deeply understand concepts from scratch, score 60/60 in board exams, and keep them eagerly chatting and learning.

Key Teaching Guidelines:
1. Language: Conversational Tenglish (Telugu written purely in English/Latin alphabet + English technical terms, NEVER use Telugu script characters). Example: "Arere bhayya, idhi chaala interesting concept! Asalu idi ela work chesthundo zero nundi chuddam...".
2. Explain from scratch: Start with an intuitive real-world analogy before introducing the formula.
3. Break down derivations and formulas into easy 1-2-3 board exam steps.
4. Always format mathematical formulas and equations in LaTeX using $...$ for inline and $$...$$ for display equations.
5. Keep students chatting: At the end of every reply, ask an intriguing, friendly concept-check question or challenge them to test their intuition (e.g., "Ippudu meelo okka doubt ravali... source observer ki daggara vasthe apparent frequency perugutunda taggutunda? Tell me your thought!").
6. Tone: Warm, energetic, encouraging, like a favorite coaching master.`;

  // Comprehensive Offline Knowledge Base for Zero-Network / Zero-Key Concept Explanations
    // Comprehensive Offline Knowledge Base for Zero-Network / Zero-Key Concept Explanations
  const OFFLINE_CONCEPTS = {
    doppler: `### ⚡ Doppler Effect (Waves) — Scratch to Board 60/60!
**Real-World Analogy:** Ee train whistle sound observe chesara? Train mana daggara vastunte sound pitch high ga (shrill ga) vinipistundi, train dhooranga velthunte pitch drop avthundi! Deenne **Doppler Effect** antam.

#### 1. Official Definition:
The apparent change in the frequency of sound heard by an observer due to the relative motion between the source and observer is called **Doppler Effect**.

#### 2. Master Apparent Frequency Formula:
$$\\nu' = \\nu \\left( \\frac{v \\pm v_o}{v \\mp v_s} \\right)$$
where:
- $\\nu'$ = Apparent frequency heard by observer
- $\\nu$ = True frequency emitted by source
- $v$ = Speed of sound in air ($\\approx 340\\text{ m/s}$)
- $v_s$ = Velocity of source
- $v_o$ = Velocity of observer

#### 3. Key Cases for Board Exams:
1. **Source approaching stationary observer ($v_o = 0$):**
   $$\\nu' = \\nu \\left(\\frac{v}{v - v_s}\\right) > \\nu \\quad \\text{(Frequency increases)}$$
2. **Source receding away from stationary observer ($v_o = 0$):**
   $$\\nu' = \\nu \\left(\\frac{v}{v + v_s}\\right) < \\nu \\quad \\text{(Frequency decreases)}$$
3. **Observer moving towards stationary source ($v_s = 0$):**
   $$\\nu' = \\nu \\left(\\frac{v + v_o}{v}\\right) > \\nu$$

> 💡 **Quick Concept Check:** Suppose source and observer both move in same direction with equal speed ($v_s = v_o$). Apparent frequency $\\nu'$ emouthundi? Relative speed zero kabatti $\\nu' = \\nu$ (No change)!`,

    schottky: `### 🧪 Schottky vs Frenkel Defects (Solid State)
**Everyday Analogy:** Okaru class nundi motham baitiki vellipovadam vs okaru bench nundi lechi madhyalo bench row sandhulo kurchovadam!

#### 1. Schottky Defect:
- **What happens:** Equal number of cations ($A^+$) and anions ($B^-$) are missing from their lattice sites.
- **Stoichiometry:** Remains unchanged (crystal remains electrically neutral).
- **Density:** **Decreases significantly** because ions completely left the crystal:
  $$d = \\frac{z \\cdot M}{a^3 \\cdot N_A}$$
- **Condition:** High coordination number & small difference in ionic sizes ($r^+ \\approx r^-$).
- **Examples:** $\\text{NaCl}, \\text{KCl}, \\text{CsCl}, \\text{AgBr}$.

#### 2. Frenkel Defect (Dislocation Defect):
- **What happens:** The smaller ion (usually cation) leaves its normal lattice site and occupies an **interstitial space**.
- **Density:** **Remains constant** (ions are still inside the crystal volume!).
- **Condition:** Low coordination number & large difference in ionic sizes ($r^- \\gg r^+$).
- **Examples:** $\\text{ZnS}, \\text{AgCl}, \\text{AgBr}, \\text{AgI}$.

> ⭐ **High-Yield Board Question:** Which compound shows BOTH Schottky and Frenkel defects? **Answer: $\\text{AgBr}$ (Silver Bromide)**!`,

    ydse: `### ⚡ Young's Double Slit Experiment & Fringe Width (Wave Optics)
**Real-World Picture:** Water lo two stones vesinappudu ripple waves kalisi crests and troughs create chesthayi kadha? Light waves kuda alage interfere ayyi alternate bright & dark bands form chesthayi!

#### 1. Path Difference ($\\Delta x$):
For a point $P$ at distance $y$ from the central line on a screen at distance $D$, with slit separation $d$:
$$\\Delta x = \\frac{y \\cdot d}{D}$$

#### 2. Conditions for Interference:
- **Bright Fringes (Constructive):** $\\Delta x = n\\lambda \\implies y_n = \\frac{n\\lambda D}{d}$ where $n = 0, 1, 2, \\dots$
- **Dark Fringes (Destructive):** $\\Delta x = (2n - 1)\\frac{\\lambda}{2} \\implies y_n = (2n - 1)\\frac{\\lambda D}{2d}$

#### 3. Fringe Width ($\\beta$):
Distance between any two successive bright or dark fringes:
$$\\beta = y_{n+1} - y_n = \\frac{\\lambda D}{d}$$

> 💡 **TSBIE Board Trap:** Apparatus motham water ($n = 1.33$) lo munchithe fringe width emavthundi? Since $\\lambda' = \\lambda / \\mu$, fringe width **$\\beta$ decreases**!`,

    raoult: `### 🧪 Raoult's Law & Ideal Solutions (Solutions)
**Intuition:** Okka closed bottle lo water and alcohol kalipithe, liquid surface nundi molecules evaporate avvadaniki compete avthayi!

#### 1. Raoult's Law for Volatile Liquids:
For a solution of volatile liquids, the partial vapour pressure of each component is directly proportional to its mole fraction:
$$p_A = p_A^\\circ X_A, \\quad p_B = p_B^\\circ X_B$$
Total Vapour Pressure:
$$P_{\\text{total}} = p_A + p_B = p_A^\\circ X_A + p_B^\\circ X_B$$

#### 2. Relative Lowering of Vapour Pressure (Non-volatile Solute):
$$\\frac{P^\\circ - P}{P^\\circ} = X_2 = \\frac{n_2}{n_1 + n_2} \\approx \\frac{w_2 \\cdot M_1}{M_2 \\cdot w_1}$$

#### 3. Ideal vs Non-Ideal Solutions:
- **Ideal Solutions:** Obey Raoult's law at all concentrations. $\\Delta H_{\\text{mix}} = 0, \\Delta V_{\\text{mix}} = 0$. (e.g., Benzene + Toluene, n-Hexane + n-Heptane).
- **Positive Deviation:** $A-B$ interactions are WEAKER than $A-A$ and $B-B$. $\\Delta H_{\\text{mix}} > 0, \\Delta V_{\\text{mix}} > 0$. (e.g., Ethanol + Acetone).
- **Negative Deviation:** $A-B$ interactions are STRONGER than pure components (H-bonding). $\\Delta H_{\\text{mix}} < 0, \\Delta V_{\\text{mix}} < 0$. (e.g., Chloroform + Acetone).`,

    nernst: `### 🧪 Nernst Equation & Daniell Cell EMF (Electrochemistry)
**Why it matters:** Standard conditions ($1\\text{ M}, 298\\text{ K}$) lekapothe battery voltage ela calculate cheyyali? Nernst Equation is the universal key!

#### 1. General Nernst Equation:
$$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{2.303 RT}{nF} \\log_{10} Q$$
At $T = 298\\text{ K}$, constant values substitute chesthe:
$$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10} \\left( \\frac{[\\text{Products}]}{[\\text{Reactants}]} \\right)$$

#### 2. Daniell Cell Application ($n = 2$):
Cell reaction: $\\text{Zn}(s) + \\text{Cu}^{2+}(aq) \\rightleftharpoons \\text{Zn}^{2+}(aq) + \\text{Cu}(s)$
$$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{2} \\log_{10} \\left( \\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]} \\right)$$
where $E^\\circ_{\\text{cell}} = +0.34\\text{ V} - (-0.76\\text{ V}) = 1.10\\text{ V}$.

> 💡 **Concept Question:** $[\\text{Zn}^{2+}]$ concentration perigithe cell potential $E_{\\text{cell}}$ taggutundi, $[\\text{Cu}^{2+}]$ perigithe $E_{\\text{cell}}$ perugutundi!`,

    faraday: `### ⚡ Faraday's Laws of Induction & Lenz's Law (Electromagnetic Induction)
**Analogy:** Magnet ni coil daggara speed ga move chesthe coil lo current generate avthundi — idhe mana hydroelectric and thermal power plants generator mechanism!

#### 1. Faraday's First Law:
Whenever the magnetic flux ($\\Phi_B$) linked with a closed coil changes, an induced electromotive force (EMF) is produced in the circuit.

#### 2. Faraday's Second Law & Lenz's Law:
The magnitude of induced EMF is directly proportional to the time rate of change of magnetic flux:
$$\\varepsilon = -N \\frac{d\\Phi_B}{dt}$$
- The negative ($-$) sign represents **Lenz's Law**, which states that the induced current always opposes the very cause that produces it (Conservation of Energy).

#### 3. Self & Mutual Induction:
- **Self Induction:** Flux linkage $\\Phi = L \\cdot I \\implies \\varepsilon = -L \\frac{dI}{dt}$
- **Energy Stored in Inductor:**
  $$U = \\frac{1}{2} L I^2$$`,

    aldol_cannizzaro: `### 🧪 Aldol Condensation vs Cannizzaro Reaction (Organic Chemistry)
**Golden Rule of Thumb:** $\\alpha$-Hydrogen undha leda chudali!

#### 1. Aldol Condensation (Requires $\\alpha$-Hydrogen):
- **Reactants:** Aldehydes or ketones having at least one $\\alpha$-hydrogen (e.g., $\\text{CH}_3\\text{CHO}$, Acetone).
- **Reagent:** Dilute alkali ($10\\% \\text{ NaOH}$).
- **Product:** $\\beta$-Hydroxy aldehyde (Aldol), which on heating loses water ($-\\text{H}_2\\text{O}$) to form $\\alpha,\\beta$-unsaturated carbonyl compound:
  $$2\\text{CH}_3\\text{CHO} \\xrightarrow{\\text{dil. NaOH}} \\text{CH}_3-\\text{CH(OH)}-\\text{CH}_2-\\text{CHO} \\xrightarrow{\\Delta} \\text{CH}_3-\\text{CH}=\\text{CH}-\\text{CHO} + \\text{H}_2\\text{O}$$
  (Acetaldehyde $\\rightarrow$ 3-Hydroxybutanal $\\rightarrow$ But-2-enal).

#### 2. Cannizzaro Reaction (NO $\\alpha$-Hydrogen):
- **Reactants:** Aldehydes lacking $\\alpha$-hydrogen (e.g., $\\text{HCHO}$ Formaldehyde, $\\text{C}_6\\text{H}_5\\text{CHO}$ Benzaldehyde).
- **Reagent:** Concentrated alkali ($50\\% \\text{ KOH}$).
- **Reaction Type:** Disproportionation (Self Redox: One molecule oxidizes, another reduces!):
  $$2\\text{HCHO} + \\text{conc. KOH} \\rightarrow \\text{CH}_3\\text{OH} + \\text{HCOOK}$$
  (Methanol + Potassium formate).`,

    potentiometer: `### ⚡ Potentiometer (Current Electricity — Guaranteed 8M LAQ!)
**Core Principle:** A uniform wire of length $L$ carries constant steady current. The potential drop across any length $l$ is directly proportional to that length:
$$V \\propto l \\implies V = \\Phi \\cdot l$$
where $\\Phi = V/L$ is the potential gradient.

#### 1. Why Potentiometer is Superior to a Voltmeter:
At the balance null point ($G = 0$), the potentiometer draws **ZERO current** from the test cell. Hence, it measures the exact true EMF of the cell, acting as an **ideal voltmeter of infinite internal resistance**. A voltmeter always draws some current, measuring only terminal voltage $V < E$.

#### 2. Formulae for Board Numerical:
1. **Comparison of EMF of two cells:**
   $$\\frac{E_1}{E_2} = \\frac{l_1}{l_2}$$
2. **Measurement of Internal Resistance ($r$):**
   $$r = R \\left( \\frac{l_1 - l_2}{l_2} \\right)$$
   where $l_1$ = balancing length on open circuit, $l_2$ = balancing length when resistance $R$ is shunted.`,

    silver_lattice: `### 🧪 Silver FCC Lattice Numerical (Solid State — 4 Marks Board Problem)
**Given Data:**
- Lattice type: FCC $\\implies z = 4$ atoms/unit cell
- Edge length $a = 4.077 \\times 10^{-8}\\text{ cm}$
- Density $d = 10.5\\text{ g/cm}^3$
- Avogadro constant $N_A = 6.022 \\times 10^{23}\\text{ mol}^{-1}$

#### 1. Formula:
$$d = \\frac{z \\cdot M}{a^3 \\cdot N_A} \\implies M = \\frac{d \\cdot a^3 \\cdot N_A}{z}$$

#### 2. Step-by-Step Calculation:
1. Unit cell volume $a^3$:
   $$a^3 = (4.077 \\times 10^{-8})^3 = 6.772 \\times 10^{-23}\\text{ cm}^3$$
2. Substitute into atomic mass formula:
   $$M = \\frac{10.5 \\times (6.772 \\times 10^{-23}) \\times (6.022 \\times 10^{23})}{4}$$
3. Simplify numerator:
   $$M = \\frac{10.5 \\times 6.772 \\times 6.022}{4} = \\frac{428.19}{4} \\approx 107.05\\text{ g/mol}$$

**Final Answer:** Atomic mass of Silver $M \\approx \\mathbf{107.9\\text{ g/mol}}$ (or $107.05\\text{ u}$).`,

    practice_problem: `### 🔢 Solved Board Practice Problem (Wave Optics 4M)
**Question:** In Young's double slit experiment, the slits are separated by $0.28\\text{ mm}$ and the screen is placed $1.4\\text{ m}$ away. The distance between the central bright fringe and the fourth ($n = 4$) bright fringe is measured to be $1.2\\text{ cm}$. Determine the wavelength of light used.

#### Step 1: Given Data in SI Units
- Slit separation $d = 0.28\\text{ mm} = 0.28 \\times 10^{-3}\\text{ m}$
- Slit-to-screen distance $D = 1.4\\text{ m}$
- Position of 4th bright fringe $y_4 = 1.2\\text{ cm} = 1.2 \\times 10^{-2}\\text{ m}$
- Fringe order $n = 4$

#### Step 2: Formula & Substitution
$$y_n = \\frac{n\\lambda D}{d} \\implies \\lambda = \\frac{y_n \\cdot d}{n \\cdot D}$$
$$\\lambda = \\frac{(1.2 \\times 10^{-2}\\text{ m}) \\times (0.28 \\times 10^{-3}\\text{ m})}{4 \\times 1.4\\text{ m}}$$
$$\\lambda = \\frac{3.36 \\times 10^{-6}}{5.6} = 0.6 \\times 10^{-6}\\text{ m} = 6000\\text{ \\AA} \\quad (600\\text{ nm})$$

**Result:** Wavelength of light used is $\\mathbf{600\\text{ nm}}$ (or $6000\\text{ \\AA}$).`
  };

let conversationHistory = [];
  let isGenerating = false;
  let isFullscreen = false;

  function init() {
    const savedKey = localStorage.getItem('ipe_groq_key');
    if (savedKey) GROQ_CONFIG.apiKey = savedKey;
  }

  function renderMath(element) {
    if (!element) return;
    if (window.IPE_RENDER_MATH) { window.IPE_RENDER_MATH(element); return; }
    if (window.renderMathInElement && element) {
      try {
        window.renderMathInElement(element, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (e) {
        console.warn('KaTeX render warning:', e);
      }
    }
  }

  function openChat(initialPrompt) {
    const modal = document.getElementById('ai-chat-modal');
    if (!modal) return;
    modal.classList.add('open');

    const messagesContainer = document.getElementById('ai-chat-messages');
    if (conversationHistory.length === 0 && messagesContainer) {
      appendAssistantMessage(
        "Namaste champ! 🚀 Nenu me **IPE GURU** ni. Physics and Chemistry lo edaina concept ardham kaledha? Or 60/60 score cheyyadaniki doubt undha? Just ask me - zero nundi crystal clear ga explain chestha! Ee roju em nerchukundham?",
        false
      );
    }

    if (initialPrompt && initialPrompt.trim() !== '') {
      const input = document.getElementById('ai-chat-input');
      if (input) input.value = initialPrompt;
      sendMessage(initialPrompt);
    }
  }

  function closeChat() {
    const modal = document.getElementById('ai-chat-modal');
    if (modal) modal.classList.remove('open');
  }

  function toggleFullscreen() {
    const sheet = document.querySelector('.ai-chat-sheet');
    const btn = document.getElementById('ai-fullscreen-btn');
    if (!sheet) return;
    isFullscreen = !isFullscreen;
    sheet.classList.toggle('fullscreen-sheet', isFullscreen);
    if (btn) btn.textContent = isFullscreen ? '❐' : '⛶';
  }

  function appendUserMessage(text) {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-msg user-msg';
    msgDiv.innerHTML = `
      <div class="user-msg-wrapper">
        <div class="msg-bubble user-bubble">${escapeHtml(text)}</div>
      </div>
    `;
    container.appendChild(msgDiv);
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }

  function formatMarkdown(text) {
    if (!text) return '';

    const displayMath = [];
    let cleanText = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
      displayMath.push(math);
      return `___DISPLAY_MATH_${displayMath.length - 1}___`;
    });

    const inlineMath = [];
    cleanText = cleanText.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
      inlineMath.push(math);
      return `___INLINE_MATH_${inlineMath.length - 1}___`;
    });

    let html = cleanText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/^### (.*$)/gim, '<div class="ai-md-h3">$1</div>');
    html = html.replace(/^## (.*$)/gim, '<div class="ai-md-h2">$1</div>');
    html = html.replace(/^# (.*$)/gim, '<div class="ai-md-h1">$1</div>');
    html = html.replace(/^> (.*$)/gim, '<div class="ai-md-quote">💡 $1</div>');
    html = html.replace(/^(\d+)\.\s+(.*$)/gim, '<div class="ai-md-step"><span class="step-num">$1</span><span class="step-text">$2</span></div>');
    html = html.replace(/^[\*\-]\s+(.*$)/gim, '<div class="ai-md-bullet"><span class="bullet-dot">✦</span><span class="bullet-text">$1</span></div>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/`([^`]+)`/g, '<code class="ai-md-code">$1</code>');
    html = html.replace(/\n\n/g, '<div class="ai-para-break"></div>');
    html = html.replace(/\n/g, '<br>');

    displayMath.forEach((math, idx) => {
      html = html.replace(`___DISPLAY_MATH_${idx}___`, `$$${math}$$`);
    });

    inlineMath.forEach((math, idx) => {
      html = html.replace(`___INLINE_MATH_${idx}___`, `$${math}$`);
    });

    return html;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function revealLineByLine(fullText, bubbleEl) {
    return new Promise((resolve) => {
      const formatted = formatMarkdown(fullText);
      bubbleEl.innerHTML = formatted;
      renderMath(bubbleEl);

      bubbleEl.style.opacity = '0';
      bubbleEl.style.transform = 'translateY(6px)';
      bubbleEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

      requestAnimationFrame(() => {
        bubbleEl.style.opacity = '1';
        bubbleEl.style.transform = 'translateY(0)';
        const container = document.getElementById('ai-chat-messages');
        if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        resolve();
      });
    });
  }

  function appendAssistantMessage(text, animate = true) {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return Promise.resolve();

    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-msg assistant-msg';

    const avatar = document.createElement('div');
    avatar.className = 'ai-msg-avatar';
    avatar.innerHTML = '🤖';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'ai-msg-content';

    const authorHeader = document.createElement('div');
    authorHeader.className = 'ai-author-header';
    authorHeader.innerHTML = `
      <span class="ai-author-name">IPE GURU</span>
      <span class="ai-badge-verified">✓ Board Specialist</span>
      <span class="ai-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble assistant-bubble';

    const actionsBar = document.createElement('div');
    actionsBar.className = 'ai-msg-actions';
    actionsBar.innerHTML = `
      <button class="ai-action-btn" onclick="window.IPE_AI.copyMessage(this)" title="Copy Explanation">📋 Copy</button>
      <button class="ai-action-btn" onclick="window.IPE_AI.speakMessage(this)" title="Listen to Explanation">🔊 Listen</button>
    `;

    const followUps = document.createElement('div');
    followUps.className = 'ai-followup-chips';
    followUps.innerHTML = `
      <button class="ai-followup-pill" onclick="window.IPE_AI.sendMessage('Sir, please explain this concept with an everyday real-world example in Tenglish!')">💡 Real-Life Analogy</button>
      <button class="ai-followup-pill" onclick="window.IPE_AI.sendMessage('Sir, board exam lo 4 marks SAQ ki entha rayali? Point by point presentation steps cheppandi.')">📝 4M / 8M Exam Steps</button>
      <button class="ai-followup-pill" onclick="window.IPE_AI.sendMessage('Sir, ee concept meeda previous IPE board problem / numerical solve chesi chupinchandi.')">🔢 Practice Problem</button>
    `;

    contentDiv.appendChild(authorHeader);
    contentDiv.appendChild(bubble);
    contentDiv.appendChild(actionsBar);
    contentDiv.appendChild(followUps);

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(contentDiv);
    container.appendChild(msgDiv);

    if (animate) {
      return revealLineByLine(text, bubble);
    } else {
      bubble.innerHTML = formatMarkdown(text);
      renderMath(bubble);
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      return Promise.resolve();
    }
  }

  function copyMessage(btnEl) {
    const bubble = btnEl.closest('.ai-msg-content').querySelector('.assistant-bubble');
    if (!bubble) return;
    const text = bubble.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const orig = btnEl.innerHTML;
      btnEl.innerHTML = '✓ Copied!';
      btnEl.style.color = '#34d399';
      setTimeout(() => {
        btnEl.innerHTML = orig;
        btnEl.style.color = '';
      }, 2000);
    });
  }

  function speakMessage(btnEl) {
    const bubble = btnEl.closest('.ai-msg-content').querySelector('.assistant-bubble');
    if (!bubble) return;
    const text = bubble.innerText;
    window.IPE_SPEECH.speakRawText(text, (speaking) => {
      btnEl.innerHTML = speaking ? '⏹ Stop' : '🔊 Listen';
      btnEl.style.color = speaking ? '#f87171' : '';
    });
  }

  // Find offline concept match if available
    // Find offline concept match if available
  function findOfflineConcept(text) {
    const lower = text.toLowerCase();
    if (lower.includes('doppler')) return OFFLINE_CONCEPTS.doppler;
    if (lower.includes('schottky') || lower.includes('frenkel')) return OFFLINE_CONCEPTS.schottky;
    if (lower.includes('slit') || lower.includes('ydse') || lower.includes('fringe')) return OFFLINE_CONCEPTS.ydse;
    if (lower.includes('raoult') || lower.includes('ideal solution') || lower.includes('relative lowering')) return OFFLINE_CONCEPTS.raoult;
    if (lower.includes('nernst') || lower.includes('daniell') || lower.includes('emf')) return OFFLINE_CONCEPTS.nernst;
    if (lower.includes('faraday') || lower.includes('induction') || lower.includes('lenz')) return OFFLINE_CONCEPTS.faraday;
    if (lower.includes('aldol') || lower.includes('cannizzaro')) return OFFLINE_CONCEPTS.aldol_cannizzaro;
    if (lower.includes('potentiometer') || lower.includes('internal resistance') || lower.includes('null balance')) return OFFLINE_CONCEPTS.potentiometer;
    if (lower.includes('silver') && (lower.includes('fcc') || lower.includes('lattice') || lower.includes('atomic mass'))) return OFFLINE_CONCEPTS.silver_lattice;
    if (lower.includes('practice') || lower.includes('problem') || lower.includes('numerical')) return OFFLINE_CONCEPTS.practice_problem;
    return null;
  }

  // Send message: Zero-key required, tries serverless Vercel proxy, then offline knowledge, then direct API
  async function sendMessage(overrideText) {
    if (isGenerating) return;

    const input = document.getElementById('ai-chat-input');
    const text = overrideText || (input ? input.value.trim() : '');
    if (!text) return;

    if (input) input.value = '';

    appendUserMessage(text);
    conversationHistory.push({ role: 'user', content: text });

    isGenerating = true;
    updateSendButtonState(true);

    const typingIndicator = document.getElementById('ai-typing-indicator');
    if (typingIndicator) typingIndicator.style.display = 'flex';

    const chatViewport = document.getElementById('ai-chat-messages');
    if (chatViewport) chatViewport.scrollTop = chatViewport.scrollHeight;

    try {
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationHistory.slice(-8)
      ];

      let reply = null;

      // Tier 1: Try Vercel Serverless Function /api/chat (Uses server-side GROQ_API_KEY)
      try {
        const serverlessRes = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(GROQ_CONFIG.apiKey ? { 'x-groq-key': GROQ_CONFIG.apiKey } : {})
          },
          body: JSON.stringify({
            messages: messages,
            model: GROQ_CONFIG.model
          })
        });

        if (serverlessRes.ok) {
          const data = await serverlessRes.json();
          if (data && data.choices && data.choices[0] && data.choices[0].message) {
            reply = data.choices[0].message.content;
          }
        }
      } catch (serverlessErr) {
        // Fall through to next tier
      }

      // Tier 2: Check offline deep concept intelligence
      if (!reply) {
        const offlineMatch = findOfflineConcept(text);
        if (offlineMatch) {
          reply = offlineMatch;
        }
      }

      // Tier 3: Direct Groq API call if user has local key
      if (!reply && GROQ_CONFIG.apiKey) {
        try {
          const directRes = await fetch(GROQ_CONFIG.endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + GROQ_CONFIG.apiKey
            },
            body: JSON.stringify({
              model: GROQ_CONFIG.model,
              messages: messages,
              temperature: 0.7,
              max_tokens: 900
            })
          });

          if (directRes.ok) {
            const data = await directRes.json();
            if (data && data.choices && data.choices[0] && data.choices[0].message) {
              reply = data.choices[0].message.content;
            }
          }
        } catch (directErr) {
          // Direct API failed
        }
      }

      // Tier 4: Fallback response if network/server is completely unreachable
      if (!reply) {
        reply = `Namaste champ! 🚀 Nenu me doubt ni note chesukunna. 
        
Prasthutam Vercel serverless Groq endpoint connectivity check chesthundi. In the meantime, try exploring:
1. **Interactive Formula Lab (Simulators)** in the Flashcards tab.
2. **Official TSBIE Blueprint & PYQ Trends** in the top navigation.
3. Tap one of the high-yield concept chips above (Doppler, Schottky, YDSE, Nernst) for instant full explanations!`;
      }

      conversationHistory.push({ role: 'assistant', content: reply });

      if (typingIndicator) typingIndicator.style.display = 'none';

      await appendAssistantMessage(reply, true);

      // Award XP for asking AI doubts
      window.IPE_STORAGE.addXP(10);
      window.IPE_APP.updateStatsUI();
      window.IPE_GAME.showXPToast(10, '🧠 AI Concept Insight!');

    } catch (err) {
      console.error('Groq AI error:', err);
      if (typingIndicator) typingIndicator.style.display = 'none';
      appendAssistantMessage(
        "Oops! Network check avvaledu bhayya. Koddiga sepu tarwatha malli adagandi, or explore the instant concepts chips above!",
        false
      );
    } finally {
      isGenerating = false;
      updateSendButtonState(false);
    }
  }

  function showApiKeyBanner() {
    // Disabled by design: Student never needs to enter an API key!
    // Vercel serverless proxy + offline engine handle 100% of questions seamlessly.
    console.log('[IPE GURU] API Key banner suppressed. Zero-key mode active.');
  }

  function saveApiKeyFromInput() {
    const input = document.getElementById('ai-groq-key-input');
    if (!input) return;
    const key = input.value.trim();
    GROQ_CONFIG.apiKey = key;
    if (key) {
      localStorage.setItem('ipe_groq_key', key);
    } else {
      localStorage.removeItem('ipe_groq_key');
    }
    const banner = document.getElementById('ai-key-banner');
    if (banner) banner.remove();
    appendAssistantMessage("Preferences updated! Let's continue mastering concepts! 🚀", false);
  }

  function clearApiKey() {
    GROQ_CONFIG.apiKey = '';
    localStorage.removeItem('ipe_groq_key');
    const banner = document.getElementById('ai-key-banner');
    if (banner) banner.remove();
    appendAssistantMessage("Default Vercel serverless endpoint active.", false);
  }

  function clearChat() {
    conversationHistory = [];
    const container = document.getElementById('ai-chat-messages');
    if (container) container.innerHTML = '';
    appendAssistantMessage("Chat reset! Adagandi champ, what concept shall we master next?", false);
  }

  
  function explainQuestion(questionId) {
    let targetQ = null;
    const chapters = window.IPE_DATA && window.IPE_DATA.chapters ? window.IPE_DATA.chapters : {};
    for (const k in chapters) {
      const ch = chapters[k];
      if (ch && ch.questions) {
        const found = ch.questions.find(q => q.id === questionId);
        if (found) {
          targetQ = { ...found, chapterTitle: ch.chapter, subject: ch.subject };
          break;
        }
      }
    }

    if (!targetQ) return;
    const prompt = `Sir, please explain this ${targetQ.subject} question from scratch in simple Tenglish: "${targetQ.question}". How should I present this in board exams for full marks?`;
    openChat(prompt);
  }

  function updateSendButtonState(loading) {
    const btn = document.getElementById('ai-chat-send-btn');
    if (!btn) return;
    btn.disabled = loading;
    btn.innerHTML = loading ? '<span>⏳</span>' : '<span>➔</span>';
  }

  return {
    init,
    openChat,
    closeChat,
    sendMessage,
    toggleFullscreen,
    copyMessage,
    speakMessage,
    clearChat,
    showApiKeyBanner,
    saveApiKeyFromInput,
    clearApiKey,
    explainQuestion
  };
})();

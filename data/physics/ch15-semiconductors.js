// IPE TS 2nd Year Physics - Chapter 15: Semiconductor Electronics
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch15"] = {
  "id": "phy-ch15",
  "subject": "Physics",
  "chapterNumber": 15,
  "chapter": "Semiconductor Electronics",
  "formulaSheet": [
    {
      "title": "Intrinsic vs Extrinsic Carrier Concentrations",
      "formula": "n_e \\cdot n_h = n_i^2 \\text{ (Mass Action Law)}",
      "symbols": "$n_e = \\text{Electron density}$, $n_h = \\text{Hole density}$, $n_i = \\text{Intrinsic carrier density}$",
      "units": "$\\text{m}^{-3}$",
      "tip": "In n-type: $n_e \\gg n_h$ (donor doped). In p-type: $n_h \\gg n_e$ (acceptor doped)."
    },
    {
      "title": "Rectifier Efficiencies",
      "formula": "\\eta_{Half-wave} = \\frac{0.406 R_L}{r_f + R_L} \\le 40.6\\%, \\quad \\eta_{Full-wave} = \\frac{0.812 R_L}{r_f + R_L} \\le 81.2\\%",
      "symbols": "$R_L = \\text{Load resistance}$, $r_f = \\text{Forward diode resistance}$",
      "units": "\\%",
      "tip": "Full-wave ripple frequency = 2f (100 Hz for 50 Hz input); Half-wave ripple frequency = f (50 Hz)."
    },
    {
      "title": "Zener Diode as Voltage Regulator",
      "formula": "I = I_Z + I_L, \\quad V_L = V_Z = \\text{constant}, \\quad R = \\frac{V_{in} - V_Z}{I}",
      "symbols": "$V_Z = \\text{Zener breakdown voltage}$, $R = \\text{Series dropping resistance}$",
      "units": "$\\text{Volt (V)}, \\Omega$",
      "tip": "Operates under reverse breakdown condition where voltage remains constant despite current variations."
    },
    {
      "title": "Conductivity of Semiconductors",
      "formula": "\\sigma = e (n_e \\mu_e + n_h \\mu_h)",
      "symbols": "n_e, $n_h = \\text{Electron and hole number densities}$, $\\mu_e$, $\\mu_h = \\text{Electron and hole mobilities}$",
      "units": "$\\text{S/m or } \\Omega^{-1}\\text{m}^{-1}$",
      "tip": "Electron mobility $\\mu_e$ is always greater than hole mobility $\\mu_h$ because electrons move in conduction band."
    },
    {
      "title": "Transistor Current Gain Relations",
      "formula": "I_E = I_B + I_C, \\quad \\beta = \\frac{\\alpha}{1 - \\alpha}, \\quad \\alpha = \\frac{\\beta}{1 + \\beta}",
      "symbols": "I_E, I_B, $I_C = \\text{Emitter, Base, Collector currents}$, $\\alpha = \\text{CB gain } (<1)$, $\\beta = \\text{CE gain } (20-500)$",
      "units": "$\\text{Dimensionless ratios}$",
      "tip": "In a transistor, base is made extremely thin ($<1\\mu\\text{m}$) and lightly doped so that base current $I_B$ is only $1-5\\%$ of $I_E$."
    }
  ],
  "questions": [
    {
      "id": "phy-ch15-q001",
      "subject": "Physics",
      "chapter": "Semiconductor Electronics",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "question": "What is a p-n junction diode? What are depletion layer and barrier potential?",
      "answer": "1. Depletion Layer: The narrow region around the metallurgical junction devoid of free charge carriers, containing only immobile donor and acceptor ions.\n2. Barrier Potential ($V_b$): The fictitious potential difference developed across the depletion layer due to immobile ions ($~0.7\\text{ V}$ for Silicon, $~0.3\\text{ V}$ for Germanium).",
      "formula": "V_b \\approx 0.7\\text{ V (Si)}, \\quad 0.3\\text{ V (Ge)}",
      "telugu_hint": "ksheent praamtm: svechchhaa vaahkaalu leni praamtm. avrodh potenshiyl silikaan‌ku 0.7 V, jermeniymku 0.3 V.",
      "source_check": "verified",
      "tenglish_hint": "ksheent praamtm: svechchhaa vaahkaalu leni praamtm. avrodh potenshiyl silikaan‌ku 0.7 V, jermeniymku 0.3 V."
    },
    {
      "id": "phy-ch15-q002",
      "subject": "Physics",
      "chapter": "Semiconductor Electronics",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "question": "Draw the logic symbols and write the truth tables of NAND and NOR gates.",
      "answer": "• **NAND Gate ($Y = \\overline{A \\cdot B}$)**:\n- Inputs (0,0)->1, (0,1)->1, (1,0)->1, (1,1)->0.\n• **NOR Gate ($Y = \\overline{A + B}$)**:\n- Inputs (0,0)->1, (0,1)->0, (1,0)->0, (1,1)->0.",
      "formula": "Y_{NAND} = \\overline{A \\cdot B}, \\quad Y_{NOR} = \\overline{A + B}",
      "telugu_hint": "NAND and NOR getlnu saarvtrik laajik getlu (Universal Gates) antaru.",
      "source_check": "verified",
      "tenglish_hint": "NAND and NOR getlnu saarvtrik laajik getlu (Universal Gates) antaru."
    },
    {
      "id": "phy-ch15-q003",
      "subject": "Physics",
      "chapter": "Semiconductor Electronics",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "question": "Explain the working of a Full-Wave Rectifier with a neat circuit diagram and input/output waveforms.",
      "answer": "1. **Definition**: A rectifier that converts both positive and negative half-cycles of AC into unidirectional pulsating DC.\n2. **Circuit**: Center-tapped step-down transformer, two p-n junction diodes $D_1, D_2$, and load resistance $R_L$.\n3. **Working**:\n• **During positive half-cycle**: Terminal $A$ is positive, $B$ is negative. Diode $D_1$ is forward biased (conducts) and $D_2$ is reverse biased (does not conduct). Current flows through $R_L$ from $X$ to $Y$.\n• **During negative half-cycle**: Terminal $A$ is negative, $B$ is positive. Diode $D_2$ is forward biased (conducts) and $D_1$ is reverse biased. Current flows through $R_L$ in the same direction from $X$ to $Y$.\n4. **Efficiency**: $\\eta_{max} = 81.2\\%$. Ripple frequency = $2f$ (100 Hz for 50 Hz input).",
      "formula": "\\eta_{max} = 81.2\\%, \\quad f_{ripple} = 2f",
      "telugu_hint": "poorn trmg rektiphyr rendu ardhbhaagaalnu oke directionlo DC gaa maarustumdi. maximum dksht 81.2%.",
      "source_check": "verified",
      "tenglish_hint": "poorn trmg rektiphyr rendu ardhbhaagaalnu oke directionlo DC gaa maarustumdi. maximum dksht 81.2%."
    },
    {
      "id": "phy-ch15-q004",
      "subject": "Physics",
      "chapter": "Semiconductor Electronics",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "question": "Explain the working of a Zener diode as a voltage regulator with circuit diagram.",
      "answer": "1. **Principle**: In reverse breakdown region (Zener voltage $V_Z$), the voltage across Zener diode remains constant even for large changes in reverse current.\n2. **Circuit**: Zener diode connected in reverse bias across unregulated DC input voltage $V_{in}$ in series with dropping resistor $R_s$. Load $R_L$ is connected in parallel with Zener.\n3. **Working**:\n• If input voltage $V_{in}$ increases, diode current $I_Z$ increases, causing increased voltage drop across $R_s$ ($\\Delta V = \\Delta I \\cdot R_s$), keeping output voltage $V_{out} = V_Z$ constant.\n• If input voltage decreases, $I_Z$ decreases, drop across $R_s$ decreases, keeping $V_{out}$ constant.",
      "formula": "V_{out} = V_Z = \\text{constant}",
      "telugu_hint": "jenr dyod vilom byaas lo brek‌daun voltej daggara constant voltej‌nu amdistoo regyuletr‌gaa workchestumdi.",
      "source_check": "verified",
      "tenglish_hint": "jenr dyod vilom byaas lo brek‌daun voltej daggara constant voltej‌nu amdistoo regyuletr‌gaa workchestumdi."
    },
    {
      "id": "phy-ch15-q005",
      "subject": "Physics",
      "chapter": "Semiconductor Electronics",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "In a p-type semiconductor, the majority charge carriers and impurity atoms are:",
      "options": [
        "A) Electrons, Pentavalent",
        "B) Holes, Trivalent",
        "C) Holes, Pentavalent",
        "D) Electrons, Trivalent"
      ],
      "correctOption": 1,
      "answer": "Correct Answer: B) Holes, Trivalent.\n• Doping pure Si with trivalent impurities (Boron, Aluminium, Indium) creates majority holes ($n_h \\gg n_e$).",
      "formula": "p\\text{-type: Trivalent dopant } (B, Al) \\implies n_h \\gg n_e",
      "telugu_hint": "p-rkm ardhvaahkmlo trismyojk mlinaalnu kluputaaru, rmdhraalu mejaaritee vaahkaalu.",
      "source_check": "verified",
      "tenglish_hint": "p-rkm ardhvaahkmlo trismyojk mlinaalnu kluputaaru, rmdhraalu mejaaritee vaahkaalu."
    }
  ]
};

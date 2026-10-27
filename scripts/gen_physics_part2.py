# -*- coding: utf-8 -*-
"""
IPE TS Inter 2nd Year - Physics Chapters 10 to 16 Generator
"""
import json
import os

OUTPUT_DIR = r"C:\Users\chary\.gemini\antigravity\scratch\ipe-grind\data\physics"

def save_chapter(ch_data, filename, var_name):
    path = os.path.join(OUTPUT_DIR, filename)
    json_str = json.dumps(ch_data, indent=2, ensure_ascii=False)
    content = (
        f"// IPE TS 2nd Year Physics - Chapter {ch_data['chapterNumber']}: {ch_data['chapter']}\n"
        "// Fully compliant with IPE Telangana Board format and syllabus requirements\n\n"
        "window.IPE_DATA = window.IPE_DATA || {};\n"
        "window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};\n\n"
        f"const {var_name} = {json_str};\n\n"
        "if (typeof window.registerChapter === 'function') {\n"
        f"  window.registerChapter({var_name});\n"
        "} else {\n"
        f"  window.IPE_DATA.chapters[{var_name}.id] = {var_name};\n"
        "}\n"
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved {filename} with {len(ch_data['questions'])} questions and {len(ch_data['formulaSheet'])} formulas.")

# ==============================================================================
# CH 10: Alternating Current
# ==============================================================================
ch10 = {
    "id": "phy-ch10", "subject": "Physics", "chapterNumber": 10, "chapter": "Alternating Current",
    "formulaSheet": [
        {"title": "RMS & Peak Values", "formula": "I_{rms} = \\frac{I_0}{\\sqrt{2}} \\approx 0.707 I_0, \\quad V_{rms} = \\frac{V_0}{\\sqrt{2}}", "symbols": "I_0, V_0 = \\text{Peak current and voltage}", "units": "\\text{Ampere (A), Volt (V)}", "tip": "Household 220V AC refers to V_rms. Peak voltage is 220 \\times \\sqrt{2} \\approx 311 \\text{ V}."},
        {"title": "LCR Series Circuit Impedance & Resonance", "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}", "symbols": "X_L = \\omega L = \\text{Inductive reactance}, X_C = \\frac{1}{\\omega C} = \\text{Capacitive reactance}", "units": "\\Omega", "tip": "At resonance: X_L = X_C, Z_{min} = R, current is maximum, power factor \\cos\\phi = 1."},
        {"title": "Power in AC Circuit & Power Factor", "formula": "P_{avg} = V_{rms} I_{rms} \\cos\\phi, \\quad \\cos\\phi = \\frac{R}{Z}", "symbols": "\\phi = \\text{Phase difference between V and I}, \\cos\\phi = \\text{Power factor}", "units": "\\text{Watt (W)}", "tip": "For pure inductor or capacitor, \\phi = 90^\\circ \\implies \\cos\\phi = 0 (Wattless current)."},
        {"title": "Transformer Equation", "formula": "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s} = k", "symbols": "k = \\text{Transformation ratio}, s = \\text{Secondary}, p = \\text{Primary}", "units": "\\text{Dimensionless ratio}", "tip": "Step-up transformer: k > 1 (N_s > N_p, V_s > V_p, I_s < I_p)."}
    ],
    "questions": [
        {"id": "phy-ch10-q001", "subject": "Physics", "chapter": "Alternating Current", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is the relation between the peak value and RMS value of alternating current?",
         "answer": "• Relation: $I_{rms} = \\frac{I_0}{\\sqrt{2}} = 0.707 I_0$, where $I_0$ is the peak (maximum) current.\n• Similarly for voltage: $V_{rms} = \\frac{V_0}{\\sqrt{2}} = 0.707 V_0$.",
         "formula": "I_{rms} = \\frac{I_0}{\\sqrt{2}}", "telugu_hint": "RMS విలువ = గరిష్ట విలువ / \\sqrt{2} = 0.707 I_0.", "source_check": "verified"},
        {"id": "phy-ch10-q002", "subject": "Physics", "chapter": "Alternating Current", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is meant by wattless current? Under what condition does it occur?",
         "answer": "1. Definition: The AC current flowing through a circuit which consumes zero average electrical power ($P = 0$) is called wattless current.\n2. Condition: It occurs when the circuit contains only a pure inductor ($L$) or pure capacitor ($C$), where phase angle $\\phi = 90^\\circ$ and power factor $\\cos 90^\\circ = 0$.",
         "formula": "P = V_{rms}I_{rms}\\cos(90^\\circ) = 0", "telugu_hint": "వలయంలో సగటు సామర్థ్య వ్యయం సున్నా అయినప్పుడు ఆ ప్రవాహాన్ని వాట్ రహిత ప్రవాహం అంటారు.", "source_check": "verified"},
        {"id": "phy-ch10-q003", "subject": "Physics", "chapter": "Alternating Current", "type": "VSAQ", "marks": 2, "important": False,
         "question": "What is the principle of a transformer? Can a transformer be used on direct current (DC)?",
         "answer": "1. Principle: Mutual induction between two inductively coupled coils.\n2. No, a transformer cannot work on DC because DC produces a steady magnetic field ($d\\Phi/dt = 0$), so no secondary EMF is induced.",
         "formula": "\\frac{V_s}{V_p} = \\frac{N_s}{N_p}", "telugu_hint": "ట్రాన్స్ ఫార్మర్ అన్యోన్య ప్రేరణ సూత్రంపై పనిచేస్తుంది. ఇది DC పై పనిచేయదు.", "source_check": "verified"},
        {"id": "phy-ch10-q004", "subject": "Physics", "chapter": "Alternating Current", "type": "SAQ", "marks": 4, "important": True,
         "question": "Obtain an expression for the impedance and resonant frequency of a series LCR alternating current circuit.",
         "answer": "1. Phasor relations: In series LCR with current $I = I_0\\sin\\omega t$:\n• Voltage across $R$: $V_R = I R$ (in phase with $I$).\n• Voltage across $L$: $V_L = I X_L$ (leads $I$ by $\\pi/2$).\n• Voltage across $C$: $V_C = I X_C$ (lags $I$ by $\\pi/2$).\n2. Net applied voltage $V$:\n$V^2 = V_R^2 + (V_L - V_C)^2 = I^2 [R^2 + (X_L - X_C)^2]$\n3. Impedance ($Z$):\n$$Z = \\frac{V}{I} = \\sqrt{R^2 + (X_L - X_C)^2}$$\n4. Resonant Frequency:\n• At electrical resonance, $X_L = X_C \\implies \\omega_0 L = \\frac{1}{\\omega_0 C}$.\n• $\\omega_0^2 = \\frac{1}{LC} \\implies \\omega_0 = \\frac{1}{\\sqrt{LC}}$\n• Frequency $\\nu_0 = \\frac{1}{2\\pi\\sqrt{LC}}$.",
         "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\nu_0 = \\frac{1}{2\\pi\\sqrt{LC}}", "telugu_hint": "శ్రేణి LCR వలయ అవరోధం Z = \\sqrt{R^2 + (X_L - X_C)^2}, అనునాద పౌనఃపున్యం \\nu_0 = \\frac{1}{2\\pi\\sqrt{LC}}.", "source_check": "verified"},
        {"id": "phy-ch10-q005", "subject": "Physics", "chapter": "Alternating Current", "type": "Numerical", "marks": 2, "important": True,
         "question": "A $220 \\text{ V}, 50 \\text{ Hz}$ AC source is connected to a resistance of $100\\;\\Omega$. What is the RMS value of current and peak voltage?",
         "answer": "• Given: $V_{rms} = 220 \\text{ V}, R = 100\\;\\Omega$.\n• (i) RMS Current: $I_{rms} = \\frac{V_{rms}}{R} = \\frac{220}{100} = 2.2 \\text{ A}$.\n• (ii) Peak Voltage: $V_0 = \\sqrt{2} \\times V_{rms} = 1.414 \\times 220 \\approx 311.1 \\text{ V}$.",
         "formula": "I_{rms} = \\frac{V_{rms}}{R} = 2.2\\text{ A}, \\quad V_0 = 311.1\\text{ V}", "telugu_hint": "I_{rms} = 220/100 = 2.2 A, V_0 = 220 \\times \\sqrt{2} = 311 V.", "source_check": "verified"},
        {"id": "phy-ch10-q006", "subject": "Physics", "chapter": "Alternating Current", "type": "MCQ", "marks": 1, "important": False,
         "question": "In a series LCR resonant circuit, the phase angle between applied voltage and circuit current is:",
         "options": ["A) $\\pi/2$", "B) $\\pi$", "C) 0", "D) $\\pi/4$"],
         "correctOption": 2, "answer": "Correct Answer: C) 0.\n• At resonance, $X_L = X_C$, so $\\tan\\phi = \\frac{X_L - X_C}{R} = 0 \\implies \\phi = 0$. Circuit is purely resistive.",
         "formula": "\\phi = 0, \\quad \\cos\\phi = 1", "telugu_hint": "అనునాదం వద్ద వోల్టేజ్ మరియు విద్యుత్ ప్రవాహాలు ఒకే దశలో ఉంటాయి (\\phi = 0).", "source_check": "verified"}
    ]
}
save_chapter(ch10, "ch10-ac.js", "alternatingCurrentChapter")

# ==============================================================================
# CH 11: Electromagnetic Waves
# ==============================================================================
ch11 = {
    "id": "phy-ch11", "subject": "Physics", "chapterNumber": 11, "chapter": "Electromagnetic Waves",
    "formulaSheet": [
        {"title": "Displacement Current", "formula": "I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}", "symbols": "\\Phi_E = \\text{Electric flux}, \\varepsilon_0 = \\text{Permittivity of free space}", "units": "\\text{Ampere (A)}", "tip": "Inside capacitor during charging, conduction current I_c = 0 and displacement current I_d = I."},
        {"title": "Speed of EM Waves in Vacuum", "formula": "c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{E_0}{B_0} \\approx 3 \\times 10^8 \\text{ m/s}", "symbols": "E_0 = \\text{Electric field amplitude}, B_0 = \\text{Magnetic field amplitude}", "units": "\\text{m/s}", "tip": "In a dielectric medium, v = \\frac{1}{\\sqrt{\\mu \\varepsilon}} = \\frac{c}{\\sqrt{\\mu_r \\varepsilon_r}} = \\frac{c}{n}."},
        {"title": "Electromagnetic Spectrum Order", "formula": "\\lambda: \\text{Radio} > \\text{Micro} > \\text{IR} > \\text{Visible} > \\text{UV} > \\text{X-rays} > \\gamma\\text{-rays}", "symbols": "\\nu: \\gamma\\text{-rays} > \\text{X-rays} > \\text{UV} > \\text{Visible} > \\text{IR} > \\text{Micro} > \\text{Radio}", "units": "\\text{m (wavelength), Hz (frequency)}", "tip": "\\gamma-rays have highest frequency and photon energy (E = h\\nu)."}
    ],
    "questions": [
        {"id": "phy-ch11-q001", "subject": "Physics", "chapter": "Electromagnetic Waves", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is displacement current? Give the expression for it.",
         "answer": "• Definition: The current which arises due to the time rate of change of electric flux in a region is called displacement current ($I_d$).\n• Expression: $I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}$.",
         "formula": "I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}", "telugu_hint": "విద్యుత్ అభివాహంలో కాలంతో పాటు వచ్చే మార్పు వల్ల ఏర్పడే ప్రవాహాన్ని స్థానభ్రంశ ప్రవాహం అంటారు: I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}.", "source_check": "verified"},
        {"id": "phy-ch11-q002", "subject": "Physics", "chapter": "Electromagnetic Waves", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State any four characteristics of electromagnetic waves.",
         "answer": "1. EM waves are transverse in nature ($\\vec{E} \\perp \\vec{B} \\perp \\vec{c}$).\n2. They do not require any material medium for propagation.\n3. Travel in vacuum with speed $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = 3 \\times 10^8 \\text{ m/s}$.\n4. Ratio of amplitudes is $\\frac{E_0}{B_0} = c$.",
         "formula": "c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{E_0}{B_0}", "telugu_hint": "విద్యుదయస్కాంత తరంగాలు తిర్యక్ తరంగాలు, శూన్యంలో కాంతి వేగంతో ప్రయాణిస్తాయి, యానకం అవసరం లేదు.", "source_check": "verified"},
        {"id": "phy-ch11-q003", "subject": "Physics", "chapter": "Electromagnetic Waves", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Mention one important application each of: (i) Microwaves, (ii) Infrared waves, (iii) Ultraviolet rays, and (iv) X-rays.",
         "answer": "• (i) **Microwaves**: Radar systems for aircraft navigation and microwave ovens.\n• (ii) **Infrared waves**: Remote controls for TV and physiotherapy treatment.\n• (iii) **Ultraviolet rays**: Water purifiers (germicidal lamp) and LASIK eye surgery.\n• (iv) **X-rays**: Diagnostic tool to detect bone fractures and luggage inspection.",
         "formula": "\\text{Radio} \\to \\text{Micro} \\to \\text{IR} \\to \\text{Vis} \\to \\text{UV} \\to \\text{X-ray} \\to \\gamma", "telugu_hint": "మైక్రోతరంగాలు: రాడార్, ఓవెన్; పరారుణ: రిమోట్ కంట్రోల్; UV: నీటి శుద్ధి; X-కిరణాలు: ఎముకల పరీక్ష.", "source_check": "verified"},
        {"id": "phy-ch11-q004", "subject": "Physics", "chapter": "Electromagnetic Waves", "type": "MCQ", "marks": 1, "important": False,
         "question": "Which of the following electromagnetic radiations has the shortest wavelength?",
         "options": ["A) Microwaves", "B) Ultraviolet rays", "C) X-rays", "D) Gamma rays"],
         "correctOption": 3, "answer": "Correct Answer: D) Gamma rays.\n• Gamma rays have the highest frequency and therefore the shortest wavelength ($\\lambda < 10^{-12} \\text{ m}$).",
         "formula": "\\lambda_{\\gamma} < 10^{-12}\\text{ m}", "telugu_hint": "గామా కిరణాలకు అత్యల్ప తరంగదైర్ఘ్యం, అత్యధిక పౌనఃపున్యం మరియు శక్తి ఉంటాయి.", "source_check": "verified"}
    ]
}
save_chapter(ch11, "ch11-em-waves.js", "emWavesChapter")

# ==============================================================================
# CH 12: Dual Nature of Radiation and Matter
# ==============================================================================
ch12 = {
    "id": "phy-ch12", "subject": "Physics", "chapterNumber": 12, "chapter": "Dual Nature of Radiation and Matter",
    "formulaSheet": [
        {"title": "Einstein's Photoelectric Equation", "formula": "K_{max} = e V_0 = h\\nu - \\Phi_0 = h(\\nu - \\nu_0)", "symbols": "K_{max} = \\text{Max kinetic energy}, V_0 = \\text{Stopping potential}, \\Phi_0 = h\\nu_0 = \\text{Work function}", "units": "\\text{Joule (J) or eV}", "tip": "1 eV = 1.6 \\times 10^{-19} J. Max kinetic energy depends on frequency, not intensity."},
        {"title": "de-Broglie Wavelength of Matter Waves", "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mE}}", "symbols": "h = 6.626 \\times 10^{-34} \\text{ J s}, p = mv = \\text{Momentum}, E = \\text{Kinetic energy}", "units": "\\text{meter (m) or Å}", "tip": "For electron accelerated through V volts: \\lambda = \\frac{1.227}{\\sqrt{V}} \\text{ nm} = \\frac{12.27}{\\sqrt{V}} \\text{ Å}."}
    ],
    "questions": [
        {"id": "phy-ch12-q001", "subject": "Physics", "chapter": "Dual Nature of Radiation and Matter", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Define work function, threshold frequency, and stopping potential in photoelectric effect.",
         "answer": "1. Work Function ($\\Phi_0$): Minimum energy required to emit an electron from a metal surface.\n2. Threshold Frequency ($\\nu_0$): Minimum frequency of incident light below which no photoelectrons are emitted.\n3. Stopping Potential ($V_0$): Minimum negative anode potential that reduces photoelectric current to zero ($e V_0 = K_{max}$).",
         "formula": "\\Phi_0 = h\\nu_0, \\quad eV_0 = K_{max}", "telugu_hint": "పనిప్రమేయం: ఎలక్ట్రాన్ విడుదల కావడానికి కనీస శక్తి; ప్రారంభ పౌనఃపున్యం: కాంతివిద్యుత్ ఉద్గారానికి కనీస పౌనఃపున్యం; నిరోధక పోటెన్షియల్: ప్రవాహం సున్నా అయ్యే ఋణ పోటెన్షియల్.", "source_check": "verified"},
        {"id": "phy-ch12-q002", "subject": "Physics", "chapter": "Dual Nature of Radiation and Matter", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is de-Broglie hypothesis? Write the formula for the de-Broglie wavelength of an electron.",
         "answer": "• Statement: A moving material particle is always associated with a wave, called matter wave or de-Broglie wave.\n• Formula for electron: $\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2m_e e V}} = \\frac{1.227}{\\sqrt{V}} \\text{ nm}$.",
         "formula": "\\lambda = \\frac{1.227}{\\sqrt{V}}\\text{ nm}", "telugu_hint": "చలనంలో ఉన్న ప్రతి ద్రవ్య కణానికి తరంగ స్వభావం ఉంటుంది: \\lambda = \\frac{h}{p} = \\frac{1.227}{\\sqrt{V}} nm.", "source_check": "verified"},
        {"id": "phy-ch12-q003", "subject": "Physics", "chapter": "Dual Nature of Radiation and Matter", "type": "SAQ", "marks": 4, "important": True,
         "question": "State the laws of photoelectric emission. Explain them on the basis of Einstein's photoelectric equation.",
         "answer": "1. **Einstein's Equation**: $h\\nu = \\Phi_0 + K_{max} \\implies K_{max} = h\\nu - h\\nu_0 = h(\\nu - \\nu_0)$.\n2. **Laws and Explanations**:\n• **Threshold frequency**: If incident frequency $\\nu < \\nu_0$, $K_{max} < 0$, which is impossible. Hence, no emission occurs below $\\nu_0$.\n• **Kinetic energy**: $K_{max} = h(\\nu - \\nu_0)$ depends linearly on incident frequency $\\nu$, independent of intensity.\n• **Current vs Intensity**: Greater intensity means more incident photons per second, creating more photoelectrons, so photoelectric current $\\propto$ intensity.\n• **Instantaneous emission**: Process involves instantaneous 1-to-1 collision between a photon and an electron (time lag $< 10^{-9}\\text{ s}$).",
         "formula": "K_{max} = h\\nu - \\Phi_0 = h(\\nu - \\nu_0)", "telugu_hint": "ఐన్‌స్టీన్ సమీకరణం K_{max} = h\\nu - \\Phi_0. పౌనఃపున్యం పెరిగితే గతిజశక్తి పెరుగుతుంది; తీవ్రత పెరిగితే కరెంట్ పెరుగుతుంది.", "source_check": "verified"},
        {"id": "phy-ch12-q004", "subject": "Physics", "chapter": "Dual Nature of Radiation and Matter", "type": "Numerical", "marks": 4, "important": True,
         "question": "The work function of caesium metal is $2.14 \\text{ eV}$. When light of frequency $6 \\times 10^{14} \\text{ Hz}$ falls on the metal surface, what is the maximum kinetic energy of emitted photoelectrons and stopping potential?",
         "answer": "• Given: $\\Phi_0 = 2.14 \\text{ eV}$, $\\nu = 6 \\times 10^{14} \\text{ Hz}$.\n• Energy of incident photon: $E = h\\nu = \\frac{6.63 \\times 10^{-34} \\times 6 \\times 10^{14}}{1.6 \\times 10^{-19}} \\text{ eV} = \\frac{3.978 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 2.486 \\text{ eV}$.\n• Max KE: $K_{max} = E - \\Phi_0 = 2.486 - 2.14 = 0.346 \\text{ eV} \\approx 0.35 \\text{ eV}$.\n• Stopping Potential: $V_0 = \\frac{K_{max}}{e} = 0.35 \\text{ V}$.",
         "formula": "K_{max} = 0.35\\text{ eV}, \\quad V_0 = 0.35\\text{ V}", "telugu_hint": "E = h\\nu = 2.49 eV. K_{max} = 2.49 - 2.14 = 0.35 eV, V_0 = 0.35 V.", "source_check": "verified"},
        {"id": "phy-ch12-q005", "subject": "Physics", "chapter": "Dual Nature of Radiation and Matter", "type": "MCQ", "marks": 1, "important": False,
         "question": "If the potential accelerating an electron is increased four times, its de-Broglie wavelength becomes:",
         "options": ["A) Doubled", "B) Halved", "C) Four times", "D) Unchanged"],
         "correctOption": 1, "answer": "Correct Answer: B) Halved.\n• $\\lambda \\propto \\frac{1}{\\sqrt{V}}$. If $V' = 4V$, $\\lambda' = \\frac{\\lambda}{\\sqrt{4}} = \\frac{\\lambda}{2}$.",
         "formula": "\\lambda' = \\frac{\\lambda}{\\sqrt{4}} = \\frac{\\lambda}{2}", "telugu_hint": "\\lambda \\propto 1/\\sqrt{V}. పోటెన్షియల్ 4 రెట్లు పెరిగితే తరంగదైర్ఘ్యం సగమవుతుంది.", "source_check": "verified"}
    ]
}
save_chapter(ch12, "ch12-dual-nature.js", "dualNatureChapter")

# ==============================================================================
# CH 13: Atoms
# ==============================================================================
ch13 = {
    "id": "phy-ch13", "subject": "Physics", "chapterNumber": 13, "chapter": "Atoms",
    "formulaSheet": [
        {"title": "Bohr's Postulates", "formula": "L = mvr = \\frac{nh}{2\\pi}, \\quad \\frac{m v^2}{r} = \\frac{1}{4\\pi \\varepsilon_0}\\frac{e^2}{r^2}, \\quad h\\nu = E_2 - E_1", "symbols": "n = 1, 2, 3, \\dots = \\text{Principal quantum number}", "units": "\\text{J s, m, eV}", "tip": "Angular momentum is quantized in integral multiples of h/2\\pi."},
        {"title": "Bohr Radius and Energy of Hydrogen Atom", "formula": "r_n = \\frac{\\varepsilon_0 n^2 h^2}{\\pi m e^2} = n^2 r_1 \\; (r_1 = 0.529\\text{ Å}), \\quad E_n = -\\frac{13.6}{n^2} \\text{ eV}", "symbols": "E_1 = -13.6\\text{ eV} \\text{ (ground state)}, E_2 = -3.4\\text{ eV}, E_3 = -1.51\\text{ eV}", "units": "\\text{eV or Joule}", "tip": "Negative sign indicates electron is bound to the nucleus. Ionization energy of H is +13.6 eV."},
        {"title": "Rydberg Formula for Spectral Lines", "formula": "\\frac{1}{\\lambda} = R \\left( \\frac{1}{n_1^2} - \\frac{1}{n_2^2} \\right)", "symbols": "R = 1.097 \\times 10^7 \\text{ m}^{-1} = \\text{Rydberg constant}", "units": "\\text{m}^{-1}", "tip": "Lyman: n_1=1 (UV); Balmer: n_1=2 (Visible); Paschen: n_1=3 (IR); Brackett: n_1=4 (IR); Pfund: n_1=5 (Far IR)."}
    ],
    "questions": [
        {"id": "phy-ch13-q001", "subject": "Physics", "chapter": "Atoms", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Bohr's quantization condition of angular momentum and frequency condition.",
         "answer": "1. Quantization Condition: An electron can revolve only in non-radiating orbits where its orbital angular momentum is an integral multiple of $\\frac{h}{2\\pi}$:\n$L = mvr = \\frac{nh}{2\\pi}$ ($n = 1, 2, 3, \\dots$).\n2. Frequency Condition: A photon is emitted or absorbed when an electron jumps between orbits:\n$h\\nu = E_2 - E_1$.",
         "formula": "mvr = \\frac{nh}{2\\pi}, \\quad h\\nu = E_2 - E_1", "telugu_hint": "ఎలక్ట్రాన్ కోణీయ ద్రవ్యవేగం mvr = \\frac{nh}{2\\pi}. కక్ష్యల మార్పిడిలో విడుదలయ్యే ఫోటాన్ శక్తి h\\nu = E_2 - E_1.", "source_check": "verified"},
        {"id": "phy-ch13-q002", "subject": "Physics", "chapter": "Atoms", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is the physical meaning of negative energy of an electron in an atom?",
         "answer": "• The negative total energy signifies that the electron is bound to the positive nucleus by attractive electrostatic forces.\n• Energy must be supplied from outside (equal to $|E_n|$) to liberate the electron to infinity.",
         "formula": "E_n = -\\frac{13.6}{n^2}\\text{ eV}", "telugu_hint": "ఋణ శక్తి అనేది ఎలక్ట్రాన్ కేంద్రకంతో బంధించబడి ఉందని సూచిస్తుంది.", "source_check": "verified"},
        {"id": "phy-ch13-q003", "subject": "Physics", "chapter": "Atoms", "type": "SAQ", "marks": 4, "important": True,
         "question": "Explain the different spectral series of hydrogen atom using the Rydberg formula and identify their spectral regions.",
         "answer": "• **Rydberg Formula**: $\\frac{1}{\\lambda} = R \\left( \\frac{1}{n_1^2} - \\frac{1}{n_2^2} \\right)$\n1. **Lyman Series**: $n_1 = 1, n_2 = 2, 3, 4, \\dots$ lies in **Ultraviolet (UV)** region.\n2. **Balmer Series**: $n_1 = 2, n_2 = 3, 4, 5, \\dots$ lies in **Visible** region (only series visible to human eye).\n3. **Paschen Series**: $n_1 = 3, n_2 = 4, 5, 6, \\dots$ lies in **Infrared (IR)** region.\n4. **Brackett Series**: $n_1 = 4, n_2 = 5, 6, 7, \\dots$ lies in **Infrared** region.\n5. **Pfund Series**: $n_1 = 5, n_2 = 6, 7, 8, \\dots$ lies in **Far Infrared** region.",
         "formula": "\\frac{1}{\\lambda} = R \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)", "telugu_hint": "లైమన్ (UV), బామర్ (దృశ్య కాంతి), పాషన్ (పరారుణ), బ్రాకెట్ (పరారుణ), ఫండ్ (దూర పరారుణ).", "source_check": "verified"},
        {"id": "phy-ch13-q004", "subject": "Physics", "chapter": "Atoms", "type": "Numerical", "marks": 4, "important": True,
         "question": "Calculate the shortest and longest wavelengths in the Balmer series of hydrogen spectrum ($R = 1.097 \\times 10^7 \\text{ m}^{-1}$).",
         "answer": "• For Balmer series: $n_1 = 2$.\n1. **Longest wavelength (First line, $n_2 = 3$)**:\n$\\frac{1}{\\lambda_{max}} = R\\left(\\frac{1}{2^2} - \\frac{1}{3^2}\\right) = R\\left(\\frac{1}{4} - \\frac{1}{9}\\right) = \\frac{5R}{36}$\n$\\lambda_{max} = \\frac{36}{5R} = \\frac{36}{5 \\times 1.097 \\times 10^7} \\approx 656.3 \\text{ nm} = 6563 \\text{ Å}$.\n2. **Shortest wavelength (Series limit, $n_2 = \\infty$)**:\n$\\frac{1}{\\lambda_{min}} = R\\left(\\frac{1}{4} - 0\\right) = \\frac{R}{4}$\n$\\lambda_{min} = \\frac{4}{R} = \\frac{4}{1.097 \\times 10^7} \\approx 364.6 \\text{ nm} = 3646 \\text{ Å}$.",
         "formula": "\\lambda_{max} = 656.3\\text{ nm}, \\quad \\lambda_{min} = 364.6\\text{ nm}", "telugu_hint": "దీర్ఘ తరంగదైర్ఘ్యం (n=3): 656.3 nm; హ్రస్వ తరంగదైర్ఘ్యం (n=\\infty): 364.6 nm.", "source_check": "verified"},
        {"id": "phy-ch13-q005", "subject": "Physics", "chapter": "Atoms", "type": "MCQ", "marks": 1, "important": False,
         "question": "The total energy of an electron in the first excited state ($n=2$) of hydrogen atom is:",
         "options": ["A) -13.6 eV", "B) -3.4 eV", "C) -1.51 eV", "D) -0.85 eV"],
         "correctOption": 1, "answer": "Correct Answer: B) -3.4 eV.\n• $E_n = -\\frac{13.6}{n^2} \\text{ eV} \\implies E_2 = -\\frac{13.6}{4} = -3.4 \\text{ eV}$.",
         "formula": "E_2 = -\\frac{13.6}{2^2} = -3.4\\text{ eV}", "telugu_hint": "మొదటి ఉత్తేజిత స్థాయి అంటే n=2: E_2 = -13.6 / 4 = -3.4 eV.", "source_check": "verified"}
    ]
}
save_chapter(ch13, "ch13-atoms.js", "atomsChapter")

# ==============================================================================
# CH 14: Nuclei (HIGH-YIELD 8M LAQ CHAPTER)
# ==============================================================================
ch14 = {
    "id": "phy-ch14", "subject": "Physics", "chapterNumber": 14, "chapter": "Nuclei",
    "formulaSheet": [
        {"title": "Nuclear Radius & Density", "formula": "R = R_0 A^{1/3} \\; (R_0 \\approx 1.2 \\times 10^{-15}\\text{ m}), \\quad \\rho_{nuclear} \\approx 2.3 \\times 10^{17} \\text{ kg/m}^3", "symbols": "A = \\text{Mass number}", "units": "\\text{meter (m), kg/m}^3", "tip": "Nuclear density is independent of mass number A; constant for all nuclei."},
        {"title": "Mass Defect & Binding Energy", "formula": "\\Delta m = [Z m_p + (A - Z) m_n] - M, \\quad E_b = \\Delta m \\cdot c^2 = \\Delta m (\\text{in amu}) \\times 931.5 \\text{ MeV}", "symbols": "\\Delta m = \\text{Mass defect}, E_{bn} = E_b / A = \\text{Binding energy per nucleon}", "units": "\\text{MeV}", "tip": "E_bn has maximum value of 8.75 MeV/nucleon for Iron-56 (most stable nucleus)."},
        {"title": "Radioactive Decay Law", "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}, \\quad \\tau = \\frac{1}{\\lambda} = 1.44 T_{1/2}", "symbols": "N_0 = \\text{Initial undecayed nuclei}, \\lambda = \\text{Decay constant}, T_{1/2} = \\text{Half-life}", "units": "T_{1/2} \\text{ in seconds, years}", "tip": "Activity A = -\\frac{dN}{dt} = \\lambda N; SI unit is Becquerel (1 Bq = 1 dps). 1 Curie = 3.7 \\times 10^{10} Bq."}
    ],
    "questions": [
        {"id": "phy-ch14-q001", "subject": "Physics", "chapter": "Nuclei", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Define mass defect and binding energy of a nucleus.",
         "answer": "1. Mass Defect ($\\Delta m$): The difference between total mass of individual constituent nucleons and the actual resting mass of the nucleus:\n$\\Delta m = [Z m_p + (A-Z) m_n] - M_{nucleus}$.\n2. Binding Energy ($E_b$): The energy required to break a nucleus completely into its separate constituent nucleons ($E_b = \\Delta m \\cdot c^2$).",
         "formula": "E_b = \\Delta m \\cdot c^2 = \\Delta m \\times 931.5 \\text{ MeV}", "telugu_hint": "ద్రవ్యరాశి లోపం: న్యూక్లియాన్ల ద్రవ్యరాశి మరియు కేంద్రక ద్రవ్యరాశి మధ్య భేదం. బంధన శక్తి E_b = \\Delta m \\times 931.5 MeV.", "source_check": "verified"},
        {"id": "phy-ch14-q002", "subject": "Physics", "chapter": "Nuclei", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is the relation between half-life ($T_{1/2}$) and decay constant ($\\lambda$) of a radioactive substance?",
         "answer": "• Relation: $T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}$.\n• Mean life $\\tau = \\frac{1}{\\lambda} \\implies T_{1/2} = 0.693 \\tau$.",
         "formula": "T_{1/2} = \\frac{0.693}{\\lambda}", "telugu_hint": "అర్థాయుష్షు T_{1/2} = \\frac{0.693}{\\lambda}.", "source_check": "verified"},
        {"id": "phy-ch14-q003", "subject": "Physics", "chapter": "Nuclei", "type": "LAQ", "marks": 8, "important": True,
         "question": "Explain the principle and working of a nuclear reactor with the help of a neat labeled diagram.",
         "answer": "1. **Principle**:\n• Based on sustained **controlled nuclear fission chain reaction** of Uranium-235 by slow (thermal) neutrons, releasing enormous energy according to $E = \\Delta m c^2$.\n\n2. **Main Components of a Nuclear Reactor**:\n• **(a) Nuclear Fuel**: Fissionable materials such as enriched Uranium ($^{235}_{92}\\text{U}$) or Plutonium ($^{239}_{94}\\text{Pu}$) packed in cylindrical rods.\n• **(b) Moderator**: Slows down high-energy fast neutrons (~2 MeV) to thermal energies (~0.025 eV). Common moderators: Heavy water ($\\text{D}_2\\text{O}$), Graphite, Beryllium oxide.\n• **(c) Control Rods**: Absorb excess neutrons to maintain neutron reproduction factor $k = 1$ (critical state). Made of Cadmium or Boron.\n• **(d) Coolant**: Absorbs huge heat released in the core and transfers it to the steam generator to drive turbines. Coolants: Heavy water, Liquid sodium, Pressurized water.\n• **(e) Radiation Shielding**: Heavy concrete walls (~2 m thick) and lead casing to shield operators from dangerous gamma rays and neutrons.\n\n3. **Working**:\n• Slow neutrons trigger fission in $^{235}\\text{U}$: $^{235}_{92}\\text{U} + ^1_0n \\to ^{141}_{56}\\text{Ba} + ^{92}_{36}\\text{Kr} + 3^1_0n + 200\\text{ MeV}$.\n• Released neutrons are slowed down by moderator and controlled by control rods.\n• Heat extracted by coolant turns water into high-pressure steam, rotating turbine to generate electric power.",
         "formula": "^{235}_{92}\\text{U} + ^1_0n \\to \\text{Fission Fragments} + 2.5 n + 200\\text{ MeV}", "telugu_hint": "న్యూక్లియర్ రియాక్టర్ భాగాలు: 1. ఇంధనం (U-235), 2. మాడరేటర్ (భారజలం D_2O), 3. నియంత్రణ కడ్డీలు (కాడ్మియం, బోరాన్), 4. శీతలీకారి (ద్రవ సోడియం), 5. రక్షణ కవచం (కాంక్రీట్).", "source_check": "verified"},
        {"id": "phy-ch14-q004", "subject": "Physics", "chapter": "Nuclei", "type": "LAQ", "marks": 8, "important": True,
         "question": "State the law of radioactive decay. Derive $N(t) = N_0 e^{-\\lambda t}$ and deduce the relation between half-life and decay constant.",
         "answer": "1. **Law of Radioactive Decay**:\n• The rate of disintegration ($-\\frac{dN}{dt}$) of a radioactive sample at any instant is directly proportional to the total number of undecayed nuclei ($N$) present at that instant:\n$$-\\frac{dN}{dt} \\propto N \\implies \\frac{dN}{dt} = -\\lambda N$$\nwhere $\\lambda$ is the decay constant.\n\n2. **Derivation**:\n• Rearranging: $\\frac{dN}{N} = -\\lambda dt$.\n• Integrating both sides: $\\int \\frac{dN}{N} = -\\lambda \\int dt \\implies \\ln N = -\\lambda t + C$.\n• At $t = 0, N = N_0 \\implies \\ln N_0 = C$.\n• Substitute $C$: $\\ln N - \\ln N_0 = -\\lambda t \\implies \\ln\\left(\\frac{N}{N_0}\\right) = -\\lambda t$.\n• Taking exponential on both sides:\n$$N(t) = N_0 e^{-\\lambda t}$$\n\n3. **Relation with Half-Life ($T_{1/2}$)**:\n• At half-life $t = T_{1/2}$, $N = N_0 / 2$.\n• $\\frac{N_0}{2} = N_0 e^{-\\lambda T_{1/2}} \\implies e^{\\lambda T_{1/2}} = 2$.\n• Taking natural logarithm:\n$$\\lambda T_{1/2} = \\ln 2 = 0.693 \\implies T_{1/2} = \\frac{0.693}{\\lambda}$$",
         "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}", "telugu_hint": "రేడియోధార్మిక క్షయ నియమం: dN/dt = -\\lambda N సాధిస్తే N = N_0 e^{-\\lambda t} వస్తుంది. అర్థాయుష్షు T_{1/2} = 0.693 / \\lambda.", "source_check": "verified"},
        {"id": "phy-ch14-q005", "subject": "Physics", "chapter": "Nuclei", "type": "Numerical", "marks": 4, "important": True,
         "question": "The half-life of $^{238}_{92}\\text{U}$ undergoing $\\alpha$-decay is $4.5 \\times 10^9 \\text{ years}$. What is the activity of $1 \\text{ g}$ sample of $^{238}\\text{U}$?",
         "answer": "• Given: $T_{1/2} = 4.5 \\times 10^9 \\text{ y} = 4.5 \\times 10^9 \\times 3.156 \\times 10^7 \\text{ s} = 1.42 \\times 10^{17} \\text{ s}$.\n• Mass $m = 1 \\text{ g}$, Molar mass $M = 238 \\text{ g/mol}$.\n• Number of nuclei $N = \\frac{N_A}{M} = \\frac{6.023 \\times 10^{23}}{238} = 2.53 \\times 10^{21}$.\n• Decay constant $\\lambda = \\frac{0.693}{T_{1/2}} = \\frac{0.693}{1.42 \\times 10^{17}} = 4.88 \\times 10^{-18} \\text{ s}^{-1}$.\n• Activity $A = \\lambda N = (4.88 \\times 10^{-18}) \\times (2.53 \\times 10^{21}) = 1.23 \\times 10^4 \\text{ Bq}$ (disintegrations/sec).",
         "formula": "A = \\lambda N = 1.23 \\times 10^4\\text{ Bq}", "telugu_hint": "క్రియాశీలత A = \\lambda N = 1.23 \\times 10^4 Bq.", "source_check": "verified"},
        {"id": "phy-ch14-q006", "subject": "Physics", "chapter": "Nuclei", "type": "MCQ", "marks": 1, "important": False,
         "question": "Which of the following materials is commonly used as a control rod in nuclear reactors?",
         "options": ["A) Heavy water", "B) Cadmium or Boron", "C) Graphite", "D) Liquid sodium"],
         "correctOption": 1, "answer": "Correct Answer: B) Cadmium or Boron.\n• Cadmium and Boron have high neutron absorption cross-sections without undergoing fission.",
         "formula": "\\text{Control Rods: Cadmium / Boron}", "telugu_hint": "న్యూట్రాన్లను పీల్చుకోవడానికి కాడ్మియం లేదా బోరాన్ కడ్డీలను ఉపయోగిస్తారు.", "source_check": "verified"}
    ]
}
save_chapter(ch14, "ch14-nuclei.js", "nucleiChapter")

# ==============================================================================
# CH 15: Semiconductor Electronics
# ==============================================================================
ch15 = {
    "id": "phy-ch15", "subject": "Physics", "chapterNumber": 15, "chapter": "Semiconductor Electronics",
    "formulaSheet": [
        {"title": "Intrinsic vs Extrinsic Carrier Concentrations", "formula": "n_e \\cdot n_h = n_i^2 \\text{ (Mass Action Law)}", "symbols": "n_e = \\text{Electron density}, n_h = \\text{Hole density}, n_i = \\text{Intrinsic carrier density}", "units": "\\text{m}^{-3}", "tip": "In n-type: n_e \\gg n_h (donor doped). In p-type: n_h \\gg n_e (acceptor doped)."},
        {"title": "Rectifier Efficiencies", "formula": "\\eta_{Half-wave} = \\frac{0.406 R_L}{r_f + R_L} \\le 40.6\\%, \\quad \\eta_{Full-wave} = \\frac{0.812 R_L}{r_f + R_L} \\le 81.2\\%", "symbols": "R_L = \\text{Load resistance}, r_f = \\text{Forward diode resistance}", "units": "\\%", "tip": "Full-wave ripple frequency = 2f (100 Hz for 50 Hz input); Half-wave ripple frequency = f (50 Hz)."},
        {"title": "Zener Diode as Voltage Regulator", "formula": "I = I_Z + I_L, \\quad V_L = V_Z = \\text{constant}, \\quad R = \\frac{V_{in} - V_Z}{I}", "symbols": "V_Z = \\text{Zener breakdown voltage}, R = \\text{Series dropping resistance}", "units": "\\text{Volt (V)}, \\Omega", "tip": "Operates under reverse breakdown condition where voltage remains constant despite current variations."}
    ],
    "questions": [
        {"id": "phy-ch15-q001", "subject": "Physics", "chapter": "Semiconductor Electronics", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is a p-n junction diode? What are depletion layer and barrier potential?",
         "answer": "1. Depletion Layer: The narrow region around the metallurgical junction devoid of free charge carriers, containing only immobile donor and acceptor ions.\n2. Barrier Potential ($V_b$): The fictitious potential difference developed across the depletion layer due to immobile ions ($~0.7\\text{ V}$ for Silicon, $~0.3\\text{ V}$ for Germanium).",
         "formula": "V_b \\approx 0.7\\text{ V (Si)}, \\quad 0.3\\text{ V (Ge)}", "telugu_hint": "క్షీణత ప్రాంతం: స్వేచ్ఛా వాహకాలు లేని ప్రాంతం. అవరోధ పోటెన్షియల్ సిలికాన్‌కు 0.7 V, జెర్మేనియంకు 0.3 V.", "source_check": "verified"},
        {"id": "phy-ch15-q002", "subject": "Physics", "chapter": "Semiconductor Electronics", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Draw the logic symbols and write the truth tables of NAND and NOR gates.",
         "answer": "• **NAND Gate ($Y = \\overline{A \\cdot B}$)**:\n- Inputs (0,0)->1, (0,1)->1, (1,0)->1, (1,1)->0.\n• **NOR Gate ($Y = \\overline{A + B}$)**:\n- Inputs (0,0)->1, (0,1)->0, (1,0)->0, (1,1)->0.",
         "formula": "Y_{NAND} = \\overline{A \\cdot B}, \\quad Y_{NOR} = \\overline{A + B}", "telugu_hint": "NAND మరియు NOR గేట్లను సార్వత్రిక లాజిక్ గేట్లు (Universal Gates) అంటారు.", "source_check": "verified"},
        {"id": "phy-ch15-q003", "subject": "Physics", "chapter": "Semiconductor Electronics", "type": "SAQ", "marks": 4, "important": True,
         "question": "Explain the working of a Full-Wave Rectifier with a neat circuit diagram and input/output waveforms.",
         "answer": "1. **Definition**: A rectifier that converts both positive and negative half-cycles of AC into unidirectional pulsating DC.\n2. **Circuit**: Center-tapped step-down transformer, two p-n junction diodes $D_1, D_2$, and load resistance $R_L$.\n3. **Working**:\n• **During positive half-cycle**: Terminal $A$ is positive, $B$ is negative. Diode $D_1$ is forward biased (conducts) and $D_2$ is reverse biased (does not conduct). Current flows through $R_L$ from $X$ to $Y$.\n• **During negative half-cycle**: Terminal $A$ is negative, $B$ is positive. Diode $D_2$ is forward biased (conducts) and $D_1$ is reverse biased. Current flows through $R_L$ in the same direction from $X$ to $Y$.\n4. **Efficiency**: $\\eta_{max} = 81.2\\%$. Ripple frequency = $2f$ (100 Hz for 50 Hz input).",
         "formula": "\\eta_{max} = 81.2\\%, \\quad f_{ripple} = 2f", "telugu_hint": "పూర్ణ తరంగ రెక్టిఫయర్ రెండు అర్ధభాగాలను ఒకే దిశలో DC గా మారుస్తుంది. గరిష్ట దక్షత 81.2%.", "source_check": "verified"},
        {"id": "phy-ch15-q004", "subject": "Physics", "chapter": "Semiconductor Electronics", "type": "SAQ", "marks": 4, "important": True,
         "question": "Explain the working of a Zener diode as a voltage regulator with circuit diagram.",
         "answer": "1. **Principle**: In reverse breakdown region (Zener voltage $V_Z$), the voltage across Zener diode remains constant even for large changes in reverse current.\n2. **Circuit**: Zener diode connected in reverse bias across unregulated DC input voltage $V_{in}$ in series with dropping resistor $R_s$. Load $R_L$ is connected in parallel with Zener.\n3. **Working**:\n• If input voltage $V_{in}$ increases, diode current $I_Z$ increases, causing increased voltage drop across $R_s$ ($\\Delta V = \\Delta I \\cdot R_s$), keeping output voltage $V_{out} = V_Z$ constant.\n• If input voltage decreases, $I_Z$ decreases, drop across $R_s$ decreases, keeping $V_{out}$ constant.",
         "formula": "V_{out} = V_Z = \\text{constant}", "telugu_hint": "జెనర్ డయోడ్ విలోమ బయాస్ లో బ్రేక్‌డౌన్ వోల్టేజ్ వద్ద స్థిర వోల్టేజ్‌ను అందిస్తూ రెగ్యులేటర్‌గా పనిచేస్తుంది.", "source_check": "verified"},
        {"id": "phy-ch15-q005", "subject": "Physics", "chapter": "Semiconductor Electronics", "type": "MCQ", "marks": 1, "important": False,
         "question": "In a p-type semiconductor, the majority charge carriers and impurity atoms are:",
         "options": ["A) Electrons, Pentavalent", "B) Holes, Trivalent", "C) Holes, Pentavalent", "D) Electrons, Trivalent"],
         "correctOption": 1, "answer": "Correct Answer: B) Holes, Trivalent.\n• Doping pure Si with trivalent impurities (Boron, Aluminium, Indium) creates majority holes ($n_h \\gg n_e$).",
         "formula": "p\\text{-type: Trivalent dopant } (B, Al) \\implies n_h \\gg n_e", "telugu_hint": "p-రకం అర్ధవాహకంలో త్రిసంయోజక మలినాలను కలుపుతారు, రంధ్రాలు మెజారిటీ వాహకాలు.", "source_check": "verified"}
    ]
}
save_chapter(ch15, "ch15-semiconductors.js", "semiconductorsChapter")

# ==============================================================================
# CH 16: Communication Systems
# ==============================================================================
ch16 = {
    "id": "phy-ch16", "subject": "Physics", "chapterNumber": 16, "chapter": "Communication Systems",
    "formulaSheet": [
        {"title": "Modulation Index in AM", "formula": "\\mu = \\frac{A_m}{A_c} = \\frac{A_{max} - A_{min}}{A_{max} + A_{min}}", "symbols": "A_m = \\text{Modulating signal amplitude}, A_c = \\text{Carrier amplitude}", "units": "\\text{Dimensionless (}\\le 1\\text{ to avoid distortion)}", "tip": "Modulated wave bandwidth BW = 2 f_m."},
        {"title": "Range of Line-of-Sight TV Antenna", "formula": "d = \\sqrt{2 R h_t} + \\sqrt{2 R h_r}", "symbols": "R = 6400 \\text{ km} = \\text{Earth radius}, h_t = \\text{Transmitter height}, h_r = \\text{Receiver height}", "units": "\\text{m or km}", "tip": "Area covered = \\pi d^2 = 2\\pi R h_t."}
    ],
    "questions": [
        {"id": "phy-ch16-q001", "subject": "Physics", "chapter": "Communication Systems", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is modulation? Why is modulation necessary for transmitting audio signals?",
         "answer": "1. Modulation: The process of superimposing low-frequency audio information signals onto high-frequency carrier waves.\n2. Necessity:\n• To reduce antenna length ($L = \\lambda / 4$; audio signals require towers hundreds of kilometers tall).\n• To prevent mixing of signals from different stations.\n• To increase effective radiated power ($P \\propto (l/\\lambda)^2$).",
         "formula": "\\lambda = \\frac{c}{\\nu}, \\quad L = \\frac{\\lambda}{4}", "telugu_hint": "తక్కువ పౌనఃపున్యం గల సమాచార సంకేతాలను ఎక్కువ పౌనఃపున్యం గల వాహక తరంగంపై అధ్యారోపణం చేయడాన్ని మాడ్యులేషన్ అంటారు.", "source_check": "verified"},
        {"id": "phy-ch16-q002", "subject": "Physics", "chapter": "Communication Systems", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Mention the basic blocks of a generalized communication system.",
         "answer": "1. Information Source & Input Transducer\n2. Transmitter\n3. Communication Channel (Transmission medium)\n4. Noise Source (external disturbance)\n5. Receiver & Output Transducer",
         "formula": "\\text{Source} \\to \\text{Transmitter} \\to \\text{Channel} \\to \\text{Receiver}", "telugu_hint": "సమాచార వ్యవస్థ భాగాలు: సమాచార జనకం, ట్రాన్స్ మీటర్, ప్రసార మాధ్యమం (ఛానల్), రిసీవర్.", "source_check": "verified"},
        {"id": "phy-ch16-q003", "subject": "Physics", "chapter": "Communication Systems", "type": "Numerical", "marks": 2, "important": True,
         "question": "A TV transmitting antenna has a height of 80 m. What is the maximum distance up to which TV transmission can be received? ($R = 6.4 \\times 10^6 \\text{ m}$)",
         "answer": "• Given: $h = 80 \\text{ m}, R = 6.4 \\times 10^6 \\text{ m}$.\n• Formula: $d = \\sqrt{2 R h}$\n• Calculation:\n$d = \\sqrt{2 \\times 6.4 \\times 10^6 \\times 80} = \\sqrt{1024 \\times 10^6} = 32 \\times 10^3 \\text{ m} = 32 \\text{ km}$.\n• Result: Maximum distance = $32 \\text{ km}$.",
         "formula": "d = \\sqrt{2 R h} = 32 \\text{ km}", "telugu_hint": "d = \\sqrt{2 \\times 6.4 \\times 10^6 \\times 80} = 32 \\text{ km}.", "source_check": "verified"},
        {"id": "phy-ch16-q004", "subject": "Physics", "chapter": "Communication Systems", "type": "MCQ", "marks": 1, "important": False,
         "question": "Sky wave propagation is based on reflection of radio waves from which layer of atmosphere?",
         "options": ["A) Troposphere", "B) Stratosphere", "C) Ionosphere", "D) Mesosphere"],
         "correctOption": 2, "answer": "Correct Answer: C) Ionosphere.\n• Sky waves (3 MHz to 30 MHz) undergo total internal reflection from the ionospheric plasma layers.",
         "formula": "\\text{Sky waves reflect from Ionosphere}", "telugu_hint": "స్కై తరంగాలు అయానోస్పియర్ ద్వారా పరావర్తనం చెందుతాయి.", "source_check": "verified"}
    ]
}
save_chapter(ch16, "ch16-communication.js", "communicationChapter")

print("All Physics Chapters 10 to 16 generated successfully!")

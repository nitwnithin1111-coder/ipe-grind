// IPE TS 2nd Year Physics - Chapter 12: Dual Nature of Radiation and Matter
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch12"] = {
  "id": "phy-ch12",
  "subject": "Physics",
  "chapterNumber": 12,
  "chapter": "Dual Nature of Radiation and Matter",
  "formulaSheet": [
    {
      "title": "Einstein's Photoelectric Equation",
      "formula": "K_{max} = e V_0 = h\\nu - \\Phi_0 = h(\\nu - \\nu_0)",
      "symbols": "$K_{max} = \\text{Max kinetic energy}$, $V_0 = \\text{Stopping potential}$, $\\Phi_0 = h\\nu_0 = \\text{Work function}$",
      "units": "$\\text{Joule (J) or eV}$",
      "tip": "$1\\text{ eV} = 1.6 \\times 10^{-19}\\text{ J}$. Max kinetic energy depends on frequency, not intensity."
    },
    {
      "title": "de-Broglie Wavelength of Matter Waves",
      "formula": "\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mE}}",
      "symbols": "$h = 6.626 \\times 10^{-34} \\text{ J s}$, $p = mv = \\text{Momentum}$, $E = \\text{Kinetic energy}$",
      "units": "$\\text{meter (m) or Å}$",
      "tip": "For electron accelerated through $V$ volts: $\\lambda = \\frac{1.227}{\\sqrt{V}}\\text{ nm} = \\frac{12.27}{\\sqrt{V}}\\text{ \\AA}$."
    },
    {
      "title": "Stopping Potential and Einstein Equation",
      "formula": "e V_0 = K_{max} = h\\nu - \\Phi_0 = h(\\nu - \\nu_0)",
      "symbols": "$V_0 = \\text{Stopping potential (V)}$, $e = 1.6 \\times 10^{-19}\\text{ C}$, $\\nu_0 = \\text{Threshold frequency}$",
      "units": "$\\text{Volt (V) or eV}$",
      "tip": "Slope of stopping potential $V_0$ vs frequency $\\nu$ graph is always a universal constant: $h/e = 4.14 \\times 10^{-15}\\text{ V s}$."
    },
    {
      "title": "de Broglie Wavelength of Gas Molecules",
      "formula": "\\lambda = \\frac{h}{\\sqrt{3 m k_B T}}",
      "symbols": "$m = \\text{Molecular mass}$, $k_B = 1.38 \\times 10^{-23}\\text{ J/K (Boltzmann constant)}$, $T = \\text{Kelvin temperature}$",
      "units": "$\\text{m or Å}$",
      "tip": "Wavelength is inversely proportional to square root of absolute temperature: $\\lambda \\propto 1/\\sqrt{T}$."
    }
  ],
  "questions": [
    {
      "id": "phy-ch12-q001",
      "subject": "Physics",
      "chapter": "Dual Nature of Radiation and Matter",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "question": "Define work function, threshold frequency, and stopping potential in photoelectric effect.",
      "answer": "1. Work Function ($\\Phi_0$): Minimum energy required to emit an electron from a metal surface.\n2. Threshold Frequency ($\\nu_0$): Minimum frequency of incident light below which no photoelectrons are emitted.\n3. Stopping Potential ($V_0$): Minimum negative anode potential that reduces photoelectric current to zero ($e V_0 = K_{max}$).",
      "formula": "\\Phi_0 = h\\nu_0, \\quad eV_0 = K_{max}",
      "telugu_hint": "workprmeym: electron vidudl kaavdaaniki knees energy; praarmbh frequency: lightelectric udgaaraaniki knees frequency; nirodhk potenshiyl: current zero ayye run potenshiyl.",
      "source_check": "verified",
      "tenglish_hint": "workprmeym: electron vidudl kaavdaaniki knees energy; praarmbh frequency: lightelectric udgaaraaniki knees frequency; nirodhk potenshiyl: current zero ayye run potenshiyl."
    },
    {
      "id": "phy-ch12-q002",
      "subject": "Physics",
      "chapter": "Dual Nature of Radiation and Matter",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "question": "What is de-Broglie hypothesis? Write the formula for the de-Broglie wavelength of an electron.",
      "answer": "• Statement: A moving material particle is always associated with a wave, called matter wave or de-Broglie wave.\n• Formula for electron: $\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2m_e e V}} = \\frac{1.227}{\\sqrt{V}} \\text{ nm}$.",
      "formula": "\\lambda = \\frac{1.227}{\\sqrt{V}}\\text{ nm}",
      "telugu_hint": "Every moving matter particle has wave nature (de Broglie): $\\lambda = \\frac{h}{p} = \\frac{1.227}{\\sqrt{V}}\\text{ nm}$.",
      "source_check": "verified",
      "tenglish_hint": "Every moving matter particle has wave nature (de Broglie): $\\lambda = \\frac{h}{p} = \\frac{1.227}{\\sqrt{V}}\\text{ nm}$."
    },
    {
      "id": "phy-ch12-q003",
      "subject": "Physics",
      "chapter": "Dual Nature of Radiation and Matter",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "question": "State the laws of photoelectric emission. Explain them on the basis of Einstein's photoelectric equation.",
      "answer": "1. **Einstein's Equation**: $h\\nu = \\Phi_0 + K_{max} \\implies K_{max} = h\\nu - h\\nu_0 = h(\\nu - \\nu_0)$.\n2. **Laws and Explanations**:\n• **Threshold frequency**: If incident frequency $\\nu < \\nu_0$, $K_{max} < 0$, which is impossible. Hence, no emission occurs below $\\nu_0$.\n• **Kinetic energy**: $K_{max} = h(\\nu - \\nu_0)$ depends linearly on incident frequency $\\nu$, independent of intensity.\n• **Current vs Intensity**: Greater intensity means more incident photons per second, creating more photoelectrons, so photoelectric current $\\propto$ intensity.\n• **Instantaneous emission**: Process involves instantaneous 1-to-1 collision between a photon and an electron (time lag $< 10^{-9}\\text{ s}$).",
      "formula": "K_{max} = h\\nu - \\Phi_0 = h(\\nu - \\nu_0)",
      "telugu_hint": "Einstein equation $K_{max} = h\\nu - \\Phi_0$. Frequency perigithe kinetic energy peruguthundi; intensity perigithe photoelectric current peruguthundi.",
      "source_check": "verified",
      "tenglish_hint": "Einstein equation $K_{max} = h\\nu - \\Phi_0$. Frequency perigithe kinetic energy peruguthundi; intensity perigithe photoelectric current peruguthundi."
    },
    {
      "id": "phy-ch12-q004",
      "subject": "Physics",
      "chapter": "Dual Nature of Radiation and Matter",
      "type": "Numerical",
      "marks": 4,
      "important": true,
      "question": "The work function of caesium metal is $2.14 \\text{ eV}$. When light of frequency $6 \\times 10^{14} \\text{ Hz}$ falls on the metal surface, what is the maximum kinetic energy of emitted photoelectrons and stopping potential?",
      "answer": "• Given: $\\Phi_0 = 2.14 \\text{ eV}$, $\\nu = 6 \\times 10^{14} \\text{ Hz}$.\n• Energy of incident photon: $E = h\\nu = \\frac{6.63 \\times 10^{-34} \\times 6 \\times 10^{14}}{1.6 \\times 10^{-19}} \\text{ eV} = \\frac{3.978 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 2.486 \\text{ eV}$.\n• Max KE: $K_{max} = E - \\Phi_0 = 2.486 - 2.14 = 0.346 \\text{ eV} \\approx 0.35 \\text{ eV}$.\n• Stopping Potential: $V_0 = \\frac{K_{max}}{e} = 0.35 \\text{ V}$.",
      "formula": "K_{max} = 0.35\\text{ eV}, \\quad V_0 = 0.35\\text{ V}",
      "telugu_hint": "$E = h\\nu = 2.49\\text{ eV}$. $K_{max} = 2.49 - 2.14 = 0.35\text{ eV}$, $V_0 = 0.35\text{ V}$.",
      "source_check": "verified",
      "tenglish_hint": "$E = h\\nu = 2.49\\text{ eV}$. $K_{max} = 2.49 - 2.14 = 0.35\text{ eV}$, $V_0 = 0.35\text{ V}$."
    },
    {
      "id": "phy-ch12-q005",
      "subject": "Physics",
      "chapter": "Dual Nature of Radiation and Matter",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "If the potential accelerating an electron is increased four times, its de-Broglie wavelength becomes:",
      "options": [
        "A) Doubled",
        "B) Halved",
        "C) Four times",
        "D) Unchanged"
      ],
      "correctOption": 1,
      "answer": "Correct Answer: B) Halved.\n• $\\lambda \\propto \\frac{1}{\\sqrt{V}}$. If $V' = 4V$, $\\lambda' = \\frac{\\lambda}{\\sqrt{4}} = \\frac{\\lambda}{2}$.",
      "formula": "\\lambda' = \\frac{\\lambda}{\\sqrt{4}} = \\frac{\\lambda}{2}",
      "telugu_hint": "$\\lambda \\propto 1/\\sqrt{V}$. potenshiyl 4 times perigite wavelength sgmvutumdi.",
      "source_check": "verified",
      "tenglish_hint": "$\\lambda \\propto 1/\\sqrt{V}$. potenshiyl 4 times perigite wavelength sgmvutumdi."
    }
  ]
};

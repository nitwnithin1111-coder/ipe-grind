// IPE TS 2nd Year Physics - Chapter 10: Alternating Current
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch10"] = {
  "id": "phy-ch10",
  "subject": "Physics",
  "chapterNumber": 10,
  "chapter": "Alternating Current",
  "formulaSheet": [
    {
      "title": "RMS & Peak Values",
      "formula": "I_{rms} = \\frac{I_0}{\\sqrt{2}} \\approx 0.707 I_0, \\quad V_{rms} = \\frac{V_0}{\\sqrt{2}}",
      "symbols": "$I_0, V_0 = \\text{Peak current and voltage}$",
      "units": "$\\text{Ampere (A), Volt (V)}$",
      "tip": "Household $220\\text{V}$ AC refers to $V_{rms}$. Peak voltage is $220 \\times \\sqrt{2} \\approx 311\\text{ V}$."
    },
    {
      "title": "LCR Series Circuit Impedance & Resonance",
      "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}",
      "symbols": "$X_L = \\omega L = \\text{Inductive reactance}$, $X_C = \\frac{1}{\\omega C} = \\text{Capacitive reactance}$",
      "units": "$\\Omega$",
      "tip": "At resonance: $X_L = X_C$, $Z_{min} = R$, current is maximum, power factor $\\cos\\phi = 1$."
    },
    {
      "title": "Power in AC Circuit & Power Factor",
      "formula": "P_{avg} = V_{rms} I_{rms} \\cos\\phi, \\quad \\cos\\phi = \\frac{R}{Z}",
      "symbols": "$\\phi = \\text{Phase difference between V and I}$, $\\cos\\phi = \\text{Power factor}$",
      "units": "$\\text{Watt (W)}$",
      "tip": "For pure inductor or capacitor, $\\phi = 90^\\circ \\implies \\cos\\phi = 0$ (Wattless current)."
    },
    {
      "title": "Transformer Equation",
      "formula": "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s} = k",
      "symbols": "$k = \\text{Transformation ratio}$, $s = \\text{Secondary}$, $p = \\text{Primary}$",
      "units": "$\\text{Dimensionless ratio}$",
      "tip": "Step-up transformer: $k > 1$ ($N_s > N_p, V_s > V_p, I_s < I_p$)."
    },
    {
      "title": "Quality Factor (Q-Factor) of Resonant Circuit",
      "formula": "Q = \\frac{\\omega_0 L}{R} = \\frac{1}{\\omega_0 C R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}",
      "symbols": "$\\omega_0 = \\text{Resonant angular frequency}$, $L = \\text{Inductance}$, $C = \\text{Capacitance}$, $R = \\text{Resistance}$",
      "units": "$\\text{Dimensionless ratio}$",
      "tip": "Higher Q-factor means sharper resonance peak and better tuning selectivity in radio/receiver circuits."
    },
    {
      "title": "Wattless Current in AC Circuit",
      "formula": "I_{wattless} = I_{rms} \\sin\\phi",
      "symbols": "$I_{rms} = \\text{Root mean square current}$, $\\phi = \\text{Phase angle between voltage and current}$",
      "units": "$\\text{Ampere (A)}$",
      "tip": "For a pure inductive or capacitive circuit ($\\phi = 90^\\circ$), average power consumed is zero, so full current is wattless."
    }
  ],
  "questions": [
    {
      "id": "phy-ch10-q001",
      "subject": "Physics",
      "chapter": "Alternating Current",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2021",
      "question": "What is the relation between the peak value and RMS value of alternating current?",
      "answer": "• Relation: $I_{rms} = \\frac{I_0}{\\sqrt{2}} = 0.707 I_0$, where $I_0$ is the peak (maximum) current.\n• Similarly for voltage: $V_{rms} = \\frac{V_0}{\\sqrt{2}} = 0.707 V_0$.",
      "formula": "I_{rms} = \\frac{I_0}{\\sqrt{2}}",
      "telugu_hint": "RMS value = maximum value / $\\sqrt{2} = 0.707 I_0$.",
      "source_check": "verified",
      "tenglish_hint": "RMS value = maximum value / $\\sqrt{2} = 0.707 I_0$."
    },
    {
      "id": "phy-ch10-q002",
      "subject": "Physics",
      "chapter": "Alternating Current",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2023, 2019",
      "question": "What is meant by wattless current? Under what condition does it occur?",
      "answer": "1. Definition: The AC current flowing through a circuit which consumes zero average electrical power ($P = 0$) is called wattless current.\n2. Condition: It occurs when the circuit contains only a pure inductor ($L$) or pure capacitor ($C$), where phase angle $\\phi = 90^\\circ$ and power factor $\\cos 90^\\circ = 0$.",
      "formula": "P = V_{rms}I_{rms}\\cos(90^\\circ) = 0",
      "telugu_hint": "vlymlo average saamrthy vyym zero ayinppudu aa prvaahaanni vaat rhit current antaru.",
      "source_check": "verified",
      "tenglish_hint": "vlymlo average saamrthy vyym zero ayinppudu aa prvaahaanni vaat rhit current antaru."
    },
    {
      "id": "phy-ch10-q003",
      "subject": "Physics",
      "chapter": "Alternating Current",
      "type": "VSAQ",
      "marks": 2,
      "important": false,
      "question": "What is the principle of a transformer? Can a transformer be used on direct current (DC)?",
      "answer": "1. Principle: Mutual induction between two inductively coupled coils.\n2. No, a transformer cannot work on DC because DC produces a steady magnetic field ($d\\Phi/dt = 0$), so no secondary EMF is induced.",
      "formula": "\\frac{V_s}{V_p} = \\frac{N_s}{N_p}",
      "telugu_hint": "traans phaarmr anyony prern principle paina work chesthundi. idi DC pai workcheydu.",
      "source_check": "verified",
      "tenglish_hint": "traans phaarmr anyony prern principle paina work chesthundi. idi DC pai workcheydu."
    },
    {
      "id": "phy-ch10-q004",
      "subject": "Physics",
      "chapter": "Alternating Current",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Obtain an expression for the impedance and resonant frequency of a series LCR alternating current circuit.",
      "answer": "1. Phasor relations: In series LCR with current $I = I_0\\sin\\omega t$:\n• Voltage across $R$: $V_R = I R$ (in phase with $I$).\n• Voltage across $L$: $V_L = I X_L$ (leads $I$ by $\\pi/2$).\n• Voltage across $C$: $V_C = I X_C$ (lags $I$ by $\\pi/2$).\n2. Net applied voltage $V$:\n$V^2 = V_R^2 + (V_L - V_C)^2 = I^2 [R^2 + (X_L - X_C)^2]$3. Impedance ($Z$):\n$$Z = \\frac{V}{I} = \\sqrt{R^2 + (X_L - X_C)^2}$$4. Resonant Frequency:\n• At electrical resonance, $X_L = X_C \\implies \\omega_0 L = \\frac{1}{\\omega_0 C}$.\n• $\\omega_0^2 = \\frac{1}{LC} \\implies \\omega_0 = \\frac{1}{\\sqrt{LC}}$\n• Frequency $\\nu_0 = \\frac{1}{2\\pi\\sqrt{LC}}$.",
      "formula": "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\nu_0 = \\frac{1}{2\\pi\\sqrt{LC}}",
      "telugu_hint": "Series LCR circuit impedance $Z = \\sqrt{R^2 + (X_L - X_C)^2}$, resonant frequency $\\nu_0 = \\frac{1}{2\\pi\\sqrt{LC}}$.",
      "source_check": "verified",
      "tenglish_hint": "Series LCR circuit impedance $Z = \\sqrt{R^2 + (X_L - X_C)^2}$, resonant frequency $\\nu_0 = \\frac{1}{2\\pi\\sqrt{LC}}$."
    },
    {
      "id": "phy-ch10-q005",
      "subject": "Physics",
      "chapter": "Alternating Current",
      "type": "Numerical",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "A $220 \\text{ V}, 50 \\text{ Hz}$ AC source is connected to a resistance of $100\\;\\Omega$. What is the RMS value of current and peak voltage?",
      "answer": "• Given: $V_{rms} = 220 \\text{ V}, R = 100\\;\\Omega$.\n• (i) RMS Current: $I_{rms} = \\frac{V_{rms}}{R} = \\frac{220}{100} = 2.2 \\text{ A}$.\n• (ii) Peak Voltage: $V_0 = \\sqrt{2} \\times V_{rms} = 1.414 \\times 220 \\approx 311.1 \\text{ V}$.",
      "formula": "I_{rms} = \\frac{V_{rms}}{R} = 2.2\\text{ A}, \\quad V_0 = 311.1\\text{ V}",
      "telugu_hint": "$I_{rms} = 220/100 = 2.2\\text{ A}$, $V_0 = 220 \\times \\sqrt{2} \\approx 311\\text{ V}$.",
      "source_check": "verified",
      "tenglish_hint": "$I_{rms} = 220/100 = 2.2\\text{ A}$, $V_0 = 220 \\times \\sqrt{2} \\approx 311\\text{ V}$."
    },
    {
      "id": "phy-ch10-q006",
      "subject": "Physics",
      "chapter": "Alternating Current",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "In a series LCR resonant circuit, the phase angle between applied voltage and circuit current is:",
      "options": [
        "A) $\\pi/2$",
        "B) $\\pi$",
        "C) 0",
        "D) $\\pi/4$"
      ],
      "correctOption": 2,
      "answer": "Correct Answer: C) 0.\n• At resonance, $X_L = X_C$, so $\\tan\\phi = \\frac{X_L - X_C}{R} = 0 \\implies \\phi = 0$. Circuit is purely resistive.",
      "formula": "\\phi = 0, \\quad \\cos\\phi = 1",
      "telugu_hint": "Resonance daggara voltage and current same phase lo untayi ($\\phi = 0$).",
      "source_check": "verified",
      "tenglish_hint": "Resonance daggara voltage and current same phase lo untayi ($\\phi = 0$)."
    }
  ]
};

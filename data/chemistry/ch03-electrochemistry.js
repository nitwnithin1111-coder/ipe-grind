// IPE TS 2nd Year Chemistry - Chapter 3: Electrochemistry
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["chem-ch03"] = {
  "id": "chem-ch03",
  "subject": "Chemistry",
  "chapterNumber": 3,
  "chapter": "Electrochemistry",
  "formulaSheet": [
    {
      "title": "Kohlrausch's Law of Independent Migration",
      "formula": "\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ, \\quad \\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ}",
      "symbols": "$\\Lambda_m^\\circ = \\text{Limiting molar conductivity}$, $\\alpha = \\text{Degree of dissociation}$",
      "units": "$\\text{S cm}^2\\text{ mol}^{-1}$",
      "tip": "Used to calculate molar conductivity of weak electrolytes (like acetic acid) at infinite dilution."
    },
    {
      "title": "Nernst Equation for Electrode & Cell EMF",
      "formula": "E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log_{10} Q, \\quad E^\\circ_{cell} = \\frac{0.0591}{n}\\log_{10} K_c",
      "symbols": "$n = \\text{Number of electrons transferred}$, $Q = \\text{Reaction quotient}$",
      "units": "$\\text{Volt (V)}$",
      "tip": "At $298\\text{ K}$ ($25^\\circ\\text{C}$). For Daniell cell: $E_{cell} = 1.10 - \\frac{0.0591}{2}\\log\\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}$."
    },
    {
      "title": "Faraday's Laws of Electrolysis",
      "formula": "m = Z I t = \\frac{E}{96500} I t, \\quad \\frac{m_1}{m_2} = \\frac{E_1}{E_2}",
      "symbols": "$m = \\text{Mass liberated}$, $Z = \\text{Electrochemical equivalent}$, $E = \\text{Equivalent weight}$, $1\\text{ F} = 96500\\text{ C}$",
      "units": "$\\text{grams (g), Coulombs (C)}$",
      "tip": "1 mole of electrons carries charge of 1 Faraday (96,487 C)."
    },
    {
      "title": "Equilibrium Constant from Standard Cell Potential",
      "formula": "\\log K_c = \\frac{n E^\\circ_{cell}}{0.0591} \\quad \\text{at } 298\\text{ K}",
      "symbols": "$n = \\text{Number of electrons transferred}$, $E^\\circ_{cell} = \\text{Standard cell EMF}$, $K_c = \\text{Equilibrium constant}$",
      "units": "$\\text{Dimensionless}$",
      "tip": "A positive $E^\\circ_{cell}$ means $K_c > 1$ and $\\Delta G^\\circ < 0$, meaning the cell reaction proceeds forward spontaneously."
    },
    {
      "title": "Specific Conductance to Molar Conductivity Relation",
      "formula": "\\Lambda_m = \\frac{1000 \\times \\kappa}{M}",
      "symbols": "$\\kappa = \\text{Specific conductance (S cm}^{-1}\\text{)}$, $M = \\text{Molarity of electrolyte (mol/L)}$",
      "units": "$\\text{S cm}^2 \\text{mol}^{-1}$",
      "tip": "On dilution, specific conductance $\\kappa$ decreases (fewer ions per unit volume), but molar conductivity $\\Lambda_m$ increases."
    }
  ],
  "questions": [
    {
      "id": "chem-ch03-q001",
      "subject": "Chemistry",
      "chapter": "Electrochemistry",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2023, 2022 (8M Core)",
      "question": "State Kohlrausch's law of independent migration of ions and write its mathematical equation.",
      "answer": "• Statement: Limiting molar conductivity of an electrolyte can be represented as the sum of the individual contributions of the anion and cation of the electrolyte.\n• Formula: $\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ$.\n• For $CH_3COOH$: $\\Lambda_m^\\circ(CH_3COOH) = \\lambda^\\circ(CH_3COO^-) + \\lambda^\\circ(H^+)$.",
      "formula": "\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ",
      "telugu_hint": "infinite vileent daggara vidyudvishleshy molar vaahkt daani kaatyaan and yaanyaanl svtmtr vaahktl mottaaniki equal.",
      "source_check": "verified",
      "tenglish_hint": "infinite vileent daggara vidyudvishleshy molar vaahkt daani kaatyaan and yaanyaanl svtmtr vaahktl mottaaniki equal."
    },
    {
      "id": "chem-ch03-q002",
      "subject": "Chemistry",
      "chapter": "Electrochemistry",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2022, 2020",
      "question": "State Faraday's first and second laws of electrolysis.",
      "answer": "1. First Law: The mass ($m$) of substance deposited or liberated at any electrode during electrolysis is directly proportional to the quantity of electricity ($Q = It$) passed:\n$m \\propto Q \\implies m = ZIt$.\n2. Second Law: When the same quantity of electricity is passed through different electrolytes, the masses of substances liberated are proportional to their chemical equivalent weights:\n$\\frac{m_1}{m_2} = \\frac{E_1}{E_2}$.",
      "formula": "m = Z I t, \\quad \\frac{m_1}{m_2} = \\frac{E_1}{E_2}",
      "telugu_hint": "phaarde 1v law: $m = ZIt$; 2v law: $\\frac{m_1}{m_2} = \\frac{E_1}{E_2}$.",
      "source_check": "verified",
      "tenglish_hint": "phaarde 1v law: $m = ZIt$; 2v law: $\\frac{m_1}{m_2} = \\frac{E_1}{E_2}$."
    },
    {
      "id": "chem-ch03-q003",
      "subject": "Chemistry",
      "chapter": "Electrochemistry",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE 2023, 2021",
      "question": "What are primary and secondary batteries? Write the chemical reactions occurring at anode and cathode in a Lead Storage Battery during discharging.",
      "answer": "1. Definitions:\n• **Primary battery**: Cell reaction occurs only once; cannot be recharged (e.g. Dry cell, Mercury button cell).\n• **Secondary battery**: Can be recharged and reused multiple times by passing direct current in reverse direction (e.g. Lead storage battery).\n\n2. **Discharge reactions in Lead Storage Battery**:\n• **Anode**: $Pb(s) + SO_4^{2-}(aq) \\to PbSO_4(s) + 2e^-$\n• **Cathode**: $PbO_2(s) + SO_4^{2-}(aq) + 4H^+(aq) + 2e^- \\to PbSO_4(s) + 2H_2O(l)$\n• **Overall Reaction**: $Pb(s) + PbO_2(s) + 2H_2SO_4(aq) \\to 2PbSO_4(s) + 2H_2O(l)$.",
      "formula": "Pb + PbO_2 + 2H_2SO_4 \\to 2PbSO_4 + 2H_2O",
      "telugu_hint": "led nilv byaatree dishchaarj reaction: Pb and PbO2 lu slphyoorik aamlmto reaction jripi PbSO4 and watergaa maartaayi.",
      "source_check": "verified",
      "tenglish_hint": "led nilv byaatree dishchaarj reaction: Pb and PbO2 lu slphyoorik aamlmto reaction jripi PbSO4 and watergaa maartaayi."
    },
    {
      "id": "chem-ch03-q004",
      "subject": "Chemistry",
      "chapter": "Electrochemistry",
      "type": "Numerical",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE 2024, 2022, 2019 (4M Problem)",
      "question": "Calculate the EMF of the Daniell cell at 298 K: $Zn(s) | Zn^{2+}(0.1\\text{ M}) || Cu^{2+}(0.01\\text{ M}) | Cu(s)$. Given $E^\\circ_{cell} = 1.10\\text{ V}$.",
      "answer": "• Cell reaction: $Zn(s) + Cu^{2+}(aq) \\to Zn^{2+}(aq) + Cu(s)$, with $n = 2$.\n• Nernst Equation:\n$E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log_{10} \\frac{[Zn^{2+}]}{[Cu^{2+}]}$\n• Substitute values:\n$E_{cell} = 1.10 - \\frac{0.0591}{2} \\log_{10} \\left(\\frac{0.1}{0.01}\\right) = 1.10 - 0.02955 \\log_{10}(10)$\n$E_{cell} = 1.10 - 0.02955 \\times 1 = 1.07045 \\text{ V} \\approx 1.07 \\text{ V}$.\n• Result: $E_{cell} = 1.07 \\text{ V}$.",
      "formula": "E_{cell} = 1.10 - 0.02955(1) = 1.07\\text{ V}",
      "telugu_hint": "$E_{cell} = 1.10 - \\frac{0.0591}{2} \\log(10) = 1.07\\text{ V}$.",
      "source_check": "verified",
      "tenglish_hint": "$E_{cell} = 1.10 - \\frac{0.0591}{2} \\log(10) = 1.07\\text{ V}$."
    },
    {
      "id": "chem-ch03-q005",
      "subject": "Chemistry",
      "chapter": "Electrochemistry",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "The charge required for the reduction of 1 mole of $Al^{3+}$ ions to $Al$ metal is:",
      "options": [
        "A) 1 F",
        "B) 2 F",
        "C) 3 F",
        "D) 96500 C"
      ],
      "correctOption": 2,
      "answer": "Correct Answer: C) 3 F.\n• Reaction: $Al^{3+} + 3e^- \\to Al$. Reduction of 1 mole requires 3 moles of electrons = 3 Faradays ($3 \\times 96500 \\text{ C}$).",
      "formula": "Al^{3+} + 3e^- \\to Al \\implies 3\\text{ F}",
      "telugu_hint": "1 mol $\\text{Al}^{3+}$ kshykrnaaniki 3 electronlu (3 phaardel charge) avsrm.",
      "source_check": "verified",
      "tenglish_hint": "1 mol $\\text{Al}^{3+}$ kshykrnaaniki 3 electronlu (3 phaardel charge) avsrm."
    }
  ]
};

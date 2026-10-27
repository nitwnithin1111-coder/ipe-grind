// IPE TS 2nd Year Physics - Chapter 11: Electromagnetic Waves
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch11"] = {
  "id": "phy-ch11",
  "subject": "Physics",
  "chapterNumber": 11,
  "chapter": "Electromagnetic Waves",
  "formulaSheet": [
    {
      "title": "Displacement Current",
      "formula": "I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}",
      "symbols": "$\\Phi_E = \\text{Electric flux}$, $\\varepsilon_0 = \\text{Permittivity of free space}$",
      "units": "$\\text{Ampere (A)}$",
      "tip": "Inside capacitor during charging, conduction current I_c = 0 and displacement current I_d = I."
    },
    {
      "title": "Speed of EM Waves in Vacuum",
      "formula": "c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{E_0}{B_0} \\approx 3 \\times 10^8 \\text{ m/s}",
      "symbols": "$E_0 = \\text{Electric field amplitude}$, $B_0 = \\text{Magnetic field amplitude}$",
      "units": "$\\text{m/s}$",
      "tip": "In a dielectric medium, $v = \\frac{1}{\\sqrt{\\mu \\varepsilon}} = \\frac{c}{\\sqrt{\\mu_r \\varepsilon_r}} = \\frac{c}{n}$."
    },
    {
      "title": "Electromagnetic Spectrum Order",
      "formula": "\\lambda: \\text{Radio} > \\text{Micro} > \\text{IR} > \\text{Visible} > \\text{UV} > \\text{X-rays} > \\gamma\\text{-rays}",
      "symbols": "$\\nu: \\gamma\\text{-rays} > \\text{X-rays} > \\text{UV} > \\text{Visible} > \\text{IR} > \\text{Micro} > \\text{Radio}$",
      "units": "$\\text{m (wavelength), Hz (frequency)}$",
      "tip": "$\\gamma$-rays have highest frequency and photon energy ($E = h\\nu$)."
    },
    {
      "title": "Energy Density and Radiation Pressure of EM Waves",
      "formula": "u = \\varepsilon_0 E_{rms}^2 = \\frac{B_{rms}^2}{\\mu_0}, \\quad P_{rad} = \\frac{I}{c}",
      "symbols": "$u = \\text{Total energy density (J/m}^3\\text{)}$, $I = \\text{Intensity of wave (W/m}^2\\text{)}$, $c = \\text{Speed of light}$",
      "units": "$\\text{J/m}^3 \\text{ and } \\text{N/m}^2$",
      "tip": "Electric field and magnetic field share equal halves of the total electromagnetic wave energy."
    }
  ],
  "questions": [
    {
      "id": "phy-ch11-q001",
      "subject": "Physics",
      "chapter": "Electromagnetic Waves",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "question": "What is displacement current? Give the expression for it.",
      "answer": "• Definition: The current which arises due to the time rate of change of electric flux in a region is called displacement current ($I_d$).\n• Expression: $I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}$.",
      "formula": "I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}",
      "telugu_hint": "Time-varying electric flux valla produce ayye current Displacement Current: $I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}$.",
      "source_check": "verified",
      "tenglish_hint": "Time-varying electric flux valla produce ayye current Displacement Current: $I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}$."
    },
    {
      "id": "phy-ch11-q002",
      "subject": "Physics",
      "chapter": "Electromagnetic Waves",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "question": "State any four characteristics of electromagnetic waves.",
      "answer": "1. EM waves are transverse in nature ($\\vec{E} \\perp \\vec{B} \\perp \\vec{c}$).\n2. They do not require any material medium for propagation.\n3. Travel in vacuum with speed $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = 3 \\times 10^8 \\text{ m/s}$.\n4. Ratio of amplitudes is $\\frac{E_0}{B_0} = c$.",
      "formula": "c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{E_0}{B_0}",
      "telugu_hint": "vidyudyskaamt waves tiryk waves, shoonymlo light vegmto pryaanistaayi, yaankm avsrm ledu.",
      "source_check": "verified",
      "tenglish_hint": "vidyudyskaamt waves tiryk waves, shoonymlo light vegmto pryaanistaayi, yaankm avsrm ledu."
    },
    {
      "id": "phy-ch11-q003",
      "subject": "Physics",
      "chapter": "Electromagnetic Waves",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "question": "Mention one important application each of: (i) Microwaves, (ii) Infrared waves, (iii) Ultraviolet rays, and (iv) X-rays.",
      "answer": "• (i) **Microwaves**: Radar systems for aircraft navigation and microwave ovens.\n• (ii) **Infrared waves**: Remote controls for TV and physiotherapy treatment.\n• (iii) **Ultraviolet rays**: Water purifiers (germicidal lamp) and LASIK eye surgery.\n• (iv) **X-rays**: Diagnostic tool to detect bone fractures and luggage inspection.",
      "formula": "\\text{Radio} \\to \\text{Micro} \\to \\text{IR} \\to \\text{Vis} \\to \\text{UV} \\to \\text{X-ray} \\to \\gamma",
      "telugu_hint": "maikrowaves: raadaar, oven; praarun: rimot kmtrol; UV: neeti shuddhi; X-kirnaalu: emukl preeksh.",
      "source_check": "verified",
      "tenglish_hint": "maikrowaves: raadaar, oven; praarun: rimot kmtrol; UV: neeti shuddhi; X-kirnaalu: emukl preeksh."
    },
    {
      "id": "phy-ch11-q004",
      "subject": "Physics",
      "chapter": "Electromagnetic Waves",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "Which of the following electromagnetic radiations has the shortest wavelength?",
      "options": [
        "A) Microwaves",
        "B) Ultraviolet rays",
        "C) X-rays",
        "D) Gamma rays"
      ],
      "correctOption": 3,
      "answer": "Correct Answer: D) Gamma rays.\n• Gamma rays have the highest frequency and therefore the shortest wavelength ($\\lambda < 10^{-12} \\text{ m}$).",
      "formula": "\\lambda_{\\gamma} < 10^{-12}\\text{ m}",
      "telugu_hint": "gaamaa kirnaalku atylp wavelength, atydhik frequency and energy untayi.",
      "source_check": "verified",
      "tenglish_hint": "gaamaa kirnaalku atylp wavelength, atydhik frequency and energy untayi."
    }
  ]
};

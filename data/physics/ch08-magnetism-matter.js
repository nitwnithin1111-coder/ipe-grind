// IPE TS 2nd Year Physics - Chapter 8: Magnetism and Matter
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch08"] = {
  "id": "phy-ch08",
  "subject": "Physics",
  "chapterNumber": 8,
  "chapter": "Magnetism and Matter",
  "formulaSheet": [
    {
      "title": "Magnetic Dipole Moment & Torque",
      "formula": "\\vec{M} = m(2\\vec{l}) = I \\vec{A}, \\quad \\vec{\\tau} = \\vec{M} \\times \\vec{B}",
      "symbols": "$m = \\text{Pole strength (A m)}$, $2l = \\text{Magnetic length}$, $I = \\text{Current}$, $A = \\text{Loop area}$",
      "units": "$\\text{A m}^2 \\text{ or J/T}$",
      "tip": "Potential energy $U = -\\vec{M} \\cdot \\vec{B} = -M B \\cos\\theta$."
    },
    {
      "title": "Earth's Magnetic Elements",
      "formula": "B_H = B \\cos\\theta, \\quad B_V = B \\sin\\theta, \\quad \\tan\\theta = \\frac{B_V}{B_H}",
      "symbols": "$\\theta = \\text{Angle of Dip (Inclination)}$, $B_H = \\text{Horizontal component}$, $B_V = \\text{Vertical component}$",
      "units": "$\\text{Tesla (T) or Gauss}$",
      "tip": "At magnetic equator: Dip $\\theta = 0^\\circ, B_V = 0$. At magnetic poles: Dip $\\theta = 90^\\circ, B_H = 0$."
    },
    {
      "title": "Curie's Law for Paramagnetism",
      "formula": "\\chi = \\frac{C}{T}",
      "symbols": "$\\chi = \\text{Magnetic susceptibility}$, $C = \\text{Curie constant}$, $T = \\text{Absolute temperature (K)}$",
      "units": "$\\text{Dimensionless}$",
      "tip": "Susceptibility of diamagnetic materials is negative and temperature independent."
    },
    {
      "title": "Curie-Weiss Law for Ferromagnetic Materials",
      "formula": "\\chi = \\frac{C}{T - T_c} \\quad (T > T_c)",
      "symbols": "$\\chi = \\text{Magnetic susceptibility}$, $C = \\text{Curie constant}$, $T_c = \\text{Curie temperature in K}$",
      "units": "$\\text{Dimensionless}$",
      "tip": "Above Curie temperature $T_c$, a ferromagnetic material transitions into a normal paramagnetic material."
    },
    {
      "title": "Relation between B, H and Magnetization M",
      "formula": "B = \\mu_0 (H + M) = \\mu_r \\mu_0 H",
      "symbols": "$B = \\text{Magnetic induction (T)}$, $H = \\text{Magnetic intensity (A/m)}$, $M = \\text{Intensity of magnetization (A/m)}$",
      "units": "$\\text{Tesla (T)}$",
      "tip": "Relative permeability and susceptibility are related by $\\mu_r = 1 + \\chi$."
    }
  ],
  "questions": [
    {
      "id": "phy-ch08-q001",
      "subject": "Physics",
      "chapter": "Magnetism and Matter",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2023, 2020",
      "question": "Define magnetic declination and angle of dip (inclination).",
      "answer": "1. Magnetic Declination ($D$): The acute angle between the geographic meridian and the magnetic meridian at a place on Earth.\n2. Angle of Dip ($\\theta$): The angle made by the total magnetic field of the earth with the horizontal in the magnetic meridian.",
      "formula": "\\tan\\theta = \\frac{B_V}{B_H}",
      "telugu_hint": "bhaugolik and magnetic yaamyottraal madhya konaanni dikpaatm (Declination) antaru. kshitij parallelto bhoomagnetic field chese konaanni nti (Dip) antaru.",
      "source_check": "verified",
      "tenglish_hint": "bhaugolik and magnetic yaamyottraal madhya konaanni dikpaatm (Declination) antaru. kshitij parallelto bhoomagnetic field chese konaanni nti (Dip) antaru."
    },
    {
      "id": "phy-ch08-q002",
      "subject": "Physics",
      "chapter": "Magnetism and Matter",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2023, 2022, 2019",
      "question": "What are the values of angle of dip at the Earth's (i) magnetic equator, and (ii) magnetic poles?",
      "answer": "• At Earth's magnetic equator: Angle of dip $\\theta = 0^\\circ$.\n• At Earth's magnetic poles: Angle of dip $\\theta = 90^\\circ$.",
      "formula": "\\theta_{equator} = 0^\\circ, \\quad \\theta_{pole} = 90^\\circ",
      "telugu_hint": "Magnetic equator daggara angle of dip $0^\\circ$, magnetic poles daggara $90^\\circ$.",
      "source_check": "verified",
      "tenglish_hint": "Magnetic equator daggara angle of dip $0^\\circ$, magnetic poles daggara $90^\\circ$."
    },
    {
      "id": "phy-ch08-q003",
      "subject": "Physics",
      "chapter": "Magnetism and Matter",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Compare the magnetic properties of Diamagnetic, Paramagnetic, and Ferromagnetic substances.",
      "answer": "• **Diamagnetic**:\n1. Feebly repelled by magnets.\n2. Move from stronger to weaker field regions.\n3. Susceptibility $\\chi$ is small and negative ($-1 \\le \\chi < 0$), independent of temperature.\n4. Examples: Bismuth, Copper, Water, NaCl.\n\n• **Paramagnetic**:\n1. Feebly attracted by magnets.\n2. Move from weaker to stronger field regions.\n3. Susceptibility $\\chi$ is small and positive ($0 < \\chi < \\epsilon$), inversely proportional to temperature ($\\chi \\propto 1/T$).\n4. Examples: Aluminium, Platinum, Oxygen gas.\n\n• **Ferromagnetic**:\n1. Strongly attracted by magnets.\n2. Strongly move into high-field regions; retain magnetization.\n3. Susceptibility $\\chi$ is very large and positive ($\\chi \\gg 1000$).\n4. Examples: Iron, Cobalt, Nickel.",
      "formula": "\\chi_{dia} < 0, \\quad \\chi_{para} > 0, \\quad \\chi_{ferro} \\gg 1",
      "telugu_hint": "dia substances repel avthayi ($\\chi$ runaatmkm); para substances svlpmgaa attract avthayi; ferro substances forcegaa attract avthayi ($\\chi$ chaalaa ekkuva).",
      "source_check": "verified",
      "tenglish_hint": "dia substances repel avthayi ($\\chi$ runaatmkm); para substances svlpmgaa attract avthayi; ferro substances forcegaa attract avthayi ($\\chi$ chaalaa ekkuva)."
    },
    {
      "id": "phy-ch08-q004",
      "subject": "Physics",
      "chapter": "Magnetism and Matter",
      "type": "Numerical",
      "marks": 2,
      "important": false,
      "question": "At a place, the horizontal and vertical components of Earth's magnetic field are equal. Find the angle of dip at that place.",
      "answer": "• Given: $B_H = B_V$.\n• Formula: $\\tan\\theta = \\frac{B_V}{B_H} = 1$.\n• Since $\\tan 45^\\circ = 1$, the angle of dip $\\theta = 45^\\circ$.",
      "formula": "\\tan\\theta = 1 \\implies \\theta = 45^\\circ",
      "telugu_hint": "$\\tan\\theta = B_V / B_H = 1 \\implies \\theta = 45^\\circ$.",
      "source_check": "verified",
      "tenglish_hint": "$\\tan\\theta = B_V / B_H = 1 \\implies \\theta = 45^\\circ$."
    },
    {
      "id": "phy-ch08-q005",
      "subject": "Physics",
      "chapter": "Magnetism and Matter",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "Magnetic susceptibility of a superconductor is:",
      "options": [
        "A) 0",
        "B) +1",
        "C) -1",
        "D) $\\infty$"
      ],
      "correctOption": 2,
      "answer": "Correct Answer: C) -1.\n• Superconductors show perfect diamagnetism (Meissner effect), where magnetic field is completely expelled ($B = 0 \\implies \\chi = -1$).",
      "formula": "\\chi = -1 \\text{ (Meissner effect)}",
      "telugu_hint": "ativaahkaalu smpoorn diasvbhaavaanni choopistaayi: $\\chi = -1$.",
      "source_check": "verified",
      "tenglish_hint": "ativaahkaalu smpoorn diasvbhaavaanni choopistaayi: $\\chi = -1$."
    }
  ]
};

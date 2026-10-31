// IPE TS 2nd Year Physics - Chapter 5: Electrostatic Potential and Capacitance
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch05"] = {
  "id": "phy-ch05",
  "subject": "Physics",
  "chapterNumber": 5,
  "chapter": "Electrostatic Potential and Capacitance",
  "formulaSheet": [
    {
      "title": "Electric Potential due to Point Charge",
      "formula": "V = \\frac{1}{4\\pi \\varepsilon_0}\\frac{q}{r}",
      "symbols": "$q = \\text{Source charge}$, $r = \\text{Distance}$",
      "units": "$\\text{Volt (V) or J/C}$",
      "tip": "Scalar quantity; sign of charge must be included."
    },
    {
      "title": "Capacitance of Parallel Plate Capacitor",
      "formula": "C_0 = \\frac{\\varepsilon_0 A}{d}, \\quad C = \\frac{K\\varepsilon_0 A}{d} = K C_0",
      "symbols": "$A = \\text{Plate area}$, $d = \\text{Plate separation}$, $K = \\text{Dielectric constant}$",
      "units": "$\\text{Farad (F)}$",
      "tip": "Introducing a dielectric increases capacitance by factor $K$."
    },
    {
      "title": "Energy Stored in a Capacitor",
      "formula": "U = \\frac{1}{2} C V^2 = \\frac{Q^2}{2C} = \\frac{1}{2} Q V",
      "symbols": "$Q = \\text{Charge}$, $V = \\text{Potential difference}$, $C = \\text{Capacitance}$",
      "units": "$\\text{Joule (J)}$",
      "tip": "Energy density in electric field $u = \\frac{1}{2}\\varepsilon_0 E^2$."
    },
    {
      "title": "Series and Parallel Combination of Capacitors",
      "formula": "\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2}, \\quad C_p = C_1 + C_2",
      "symbols": "$C_s = \\text{Series equivalent}$, $C_p = \\text{Parallel equivalent}$",
      "units": "$\\text{Farad (F)}$",
      "tip": "In series, charge $Q$ is same. In parallel, potential $V$ is same."
    },
    {
      "title": "Capacitance with Dielectric Slab of Thickness t",
      "formula": "C = \\frac{\\varepsilon_0 A}{d - t\\left(1 - \\frac{1}{K}\\right)}",
      "symbols": "$A = \\text{Area of plates}$, $d = \\text{Plate separation}$, $t = \\text{Thickness of slab}$, $K = \\text{Dielectric constant}$",
      "units": "$\\text{Farad (F)}$",
      "tip": "If a conducting metal plate ($K = \\infty$) of thickness $t$ is inserted: $C = \\frac{\\varepsilon_0 A}{d - t}$."
    },
    {
      "title": "Common Potential after Sharing of Charges",
      "formula": "V = \\frac{C_1 V_1 + C_2 V_2}{C_1 + C_2}",
      "symbols": "$C_1, C_2 = \\text{Capacitances of two capacitors}$, $V_1, V_2 = \\text{Initial potentials}$",
      "units": "$\\text{Volt (V)}$",
      "tip": "Electrostatic energy loss on sharing charge is $\\Delta U = \\frac{C_1 C_2 (V_1 - V_2)^2}{2(C_1 + C_2)}$, dissipated as heat and spark."
    }
  ],
  "questions": [
    {
      "id": "phy-ch05-q001",
      "subject": "Physics",
      "chapter": "Electrostatic Potential and Capacitance",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "What is an equipotential surface? State any two properties of equipotential surfaces.",
      "answer": "1. Definition: Any surface having the same electric potential at every point is called an equipotential surface.\n2. Properties:\n• No work is done in moving a test charge over an equipotential surface ($W = q\\Delta V = 0$).\n• Electric field lines are always perpendicular to the equipotential surface at every point.",
      "formula": "V = \\text{constant}, \\quad W = 0",
      "telugu_hint": "upritlmpai anni pointl daggara smaan electric potenshiyl umde tlaanni smpotenshiyl tlm antaru. deenipai aaveshaanni kdlchdaaniki work zero.",
      "source_check": "verified",
      "tenglish_hint": "upritlmpai anni pointl daggara smaan electric potenshiyl umde tlaanni smpotenshiyl tlm antaru. deenipai aaveshaanni kdlchdaaniki work zero."
    },
    {
      "id": "phy-ch05-q002",
      "subject": "Physics",
      "chapter": "Electrostatic Potential and Capacitance",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Why can two equipotential surfaces never intersect each other?",
      "answer": "• If two equipotential surfaces intersect, at the point of intersection there would be two different values of electric potential and two different directions of electric field, which is physically impossible.",
      "formula": "\\vec{E} \\perp \\text{Surface}",
      "telugu_hint": "khmdimchukumte oke point daggara rendu ververu potenshiyl valuelu and electric kshetr directionlu untayi, idi asaadhym.",
      "source_check": "verified",
      "tenglish_hint": "khmdimchukumte oke point daggara rendu ververu potenshiyl valuelu and electric kshetr directionlu untayi, idi asaadhym."
    },
    {
      "id": "phy-ch05-q003",
      "subject": "Physics",
      "chapter": "Electrostatic Potential and Capacitance",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Derive the expression for the capacitance of a parallel plate capacitor with air as dielectric.",
      "answer": "1. Setup: Two parallel conducting plates of area $A$ separated by distance $d$ have charges $+Q$ and $-Q$. Surface charge density $\\sigma = Q/A$.\n2. Electric field between plates:\n• Electric field $E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{Q}{\\varepsilon_0 A}$.\n3. Potential Difference:\n• $V = E \\cdot d = \\frac{Q d}{\\varepsilon_0 A}$.\n4. Capacitance ($C$):\n• $C = \\frac{Q}{V} = \\frac{Q}{\\frac{Q d}{\\varepsilon_0 A}} = \\frac{\\varepsilon_0 A}{d}$.",
      "formula": "C = \\frac{\\varepsilon_0 A}{d}",
      "telugu_hint": "Parallel plate capacitor capacitance: $C = \\frac{\\varepsilon_0 A}{d}$.",
      "source_check": "verified",
      "tenglish_hint": "Parallel plate capacitor capacitance: $C = \\frac{\\varepsilon_0 A}{d}$."
    },
    {
      "id": "phy-ch05-q004",
      "subject": "Physics",
      "chapter": "Electrostatic Potential and Capacitance",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Derive the formula for equivalent capacitance when three capacitors are connected in (a) Series, and (b) Parallel.",
      "answer": "• **(a) Series Combination**:\n1. Charge $Q$ is identical on all capacitors, while potential divides: $V = V_1 + V_2 + V_3$.\n2. Since $V_i = Q/C_i$, $V = \\frac{Q}{C_1} + \\frac{Q}{C_2} + \\frac{Q}{C_3} = Q\\left(\\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3}\\right)$.\n3. Since $V = Q/C_s$, we get: $\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3}$.\n\n• **(b) Parallel Combination**:\n1. Potential $V$ is same across each capacitor, while charge divides: $Q = Q_1 + Q_2 + Q_3$.\n2. Since $Q_i = C_i V$, $Q = C_1V + C_2V + C_3V = (C_1 + C_2 + C_3)V$.\n3. Since $Q = C_p V$, we get: $$C_p = C_1 + C_2 + C_3$$.",
      "formula": "\\frac{1}{C_s} = \\sum \\frac{1}{C_i}, \\quad C_p = \\sum C_i",
      "telugu_hint": "serieslo $\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3}$; parallello $C_p = C_1 + C_2 + C_3$.",
      "source_check": "verified",
      "tenglish_hint": "serieslo $\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3}$; parallello $C_p = C_1 + C_2 + C_3$."
    },
    {
      "id": "phy-ch05-q005",
      "subject": "Physics",
      "chapter": "Electrostatic Potential and Capacitance",
      "type": "Numerical",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "A $900 \\text{ pF}$ capacitor is charged by a $100 \\text{ V}$ battery. How much electrostatic energy is stored by the capacitor?",
      "answer": "• Given: $C = 900 \\text{ pF} = 900 \\times 10^{-12} \\text{ F} = 9 \\times 10^{-10} \\text{ F}$, $V = 100 \\text{ V}$.\n• Formula: $U = \\frac{1}{2} C V^2$\n• Calculation:\n$U = \\frac{1}{2} \\times (9 \\times 10^{-10}) \\times (100)^2 = \\frac{1}{2} \\times 9 \\times 10^{-10} \\times 10^4 = 4.5 \\times 10^{-6} \\text{ J} = 4.5 \\;\\mu\\text{J}$.\n• Result: Energy stored = $4.5 \\times 10^{-6} \\text{ J}$.",
      "formula": "U = \\frac{1}{2}CV^2 = 4.5 \\times 10^{-6} \\text{ J}",
      "telugu_hint": "$U = \\frac{1}{2} C V^2 = 4.5\\;\\mu\\text{J}$.",
      "source_check": "verified",
      "tenglish_hint": "$U = \\frac{1}{2} C V^2 = 4.5\\;\\mu\\text{J}$."
    },
    {
      "id": "phy-ch05-q006",
      "subject": "Physics",
      "chapter": "Electrostatic Potential and Capacitance",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "When a dielectric slab of dielectric constant $K$ is introduced between the plates of an isolated charged capacitor, the energy stored:",
      "options": [
        "A) Increases $K$ times",
        "B) Decreases by a factor $K$",
        "C) Remains unchanged",
        "D) Becomes zero"
      ],
      "correctOption": 1,
      "answer": "Correct Answer: B) Decreases by a factor $K$.\n• For an isolated capacitor, charge $Q$ is constant. Since $C' = KC$, $U' = \\frac{Q^2}{2C'} = \\frac{Q^2}{2KC} = \\frac{U}{K}$.",
      "formula": "U' = \\frac{U}{K}",
      "telugu_hint": "vivikt kepaasitr‌lo charge constantmgaa untundi, kepaasitens periginmdun energy $U/K$ tagguthundi.",
      "source_check": "verified",
      "tenglish_hint": "vivikt kepaasitr‌lo charge constantmgaa untundi, kepaasitens periginmdun energy $U/K$ tagguthundi."
    }
  ]
};

// IPE TS 2nd Year Physics - Chapter 6: Current Electricity
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch06"] = {
  "id": "phy-ch06",
  "subject": "Physics",
  "chapterNumber": 6,
  "chapter": "Current Electricity",
  "formulaSheet": [
    {
      "title": "Ohm's Law & Drift Velocity",
      "formula": "I = n A e v_d, \\quad v_d = \\frac{e E \\tau}{m}, \\quad R = \\frac{\\rho L}{A}",
      "symbols": "$n = \\text{Carrier density}$, $e = 1.6 \\times 10^{-19}\\text{ C}$, $v_d = \\text{Drift velocity}$, $\\tau = \\text{Relaxation time}$",
      "units": "$v_d \\text{ in m/s}, R \\text{ in } \\Omega$",
      "tip": "Drift velocity is very small (order of mm/s), but electric signal travels at speed of light."
    },
    {
      "title": "Kirchhoff's Laws",
      "formula": "\\sum I = 0 \\text{ (Junction Rule)}, \\quad \\sum \\Delta V = 0 \\text{ (Loop Rule)}",
      "symbols": "$\\text{Junction Rule: Conservation of Charge}$, $\\text{Loop Rule: Conservation of Energy}$",
      "units": "$\\text{Ampere (A), Volt (V)}$",
      "tip": "Loop rule states algebraic sum of potential changes around closed loop is zero."
    },
    {
      "title": "Wheatstone Bridge Balancing Condition",
      "formula": "\\frac{P}{Q} = \\frac{R}{S}",
      "symbols": "$P, Q, R, S = \\text{Four resistances arranged in quadrilateral}$",
      "units": "$\\Omega$",
      "tip": "When balanced, galvanometer current $I_g = 0$; no deflection."
    },
    {
      "title": "Potentiometer - Comparison of EMFs & Internal Resistance",
      "formula": "\\frac{E_1}{E_2} = \\frac{l_1}{l_2}, \\quad r = R \\left( \\frac{l_1 - l_2}{l_2} \\right)",
      "symbols": "$l_1 = \\text{Balancing length on open circuit}$, $l_2 = \\text{Balancing length with shunt resistor R}$",
      "units": "$\\Omega, \\text{cm}$",
      "tip": "Potentiometer draws no current at null point, acting as an ideal infinite resistance voltmeter."
    },
    {
      "title": "Temperature Coefficient of Resistance",
      "formula": "\\alpha = \\frac{R_2 - R_1}{R_1(t_2 - t_1)} = \\frac{\\Delta R}{R_0 \\Delta t}",
      "symbols": "$R_1, R_2 = \\text{Resistances at temperatures } t_1, t_2$, $\\Delta t = \\text{Temperature rise in } ^\\circ\\text{C}$",
      "units": "$\\text{K}^{-1} \\text{ or } ^\\circ\\text{C}^{-1}$",
      "tip": "$\\alpha$ is positive for metals (resistance increases with $T$), but negative for semiconductors and carbon."
    },
    {
      "title": "Internal Resistance of Cell via Potentiometer",
      "formula": "r = R\\left(\\frac{l_1 - l_2}{l_2}\\right)",
      "symbols": "$l_1 = \\text{Balancing length on open circuit (EMF)}$, $l_2 = \\text{Balancing length with shunt } R$",
      "units": "$\\Omega\\text{ (Ohm)}$",
      "tip": "Potentiometer draws zero current from the test cell at balance point, so it measures true EMF without loading error."
    }
  ],
  "questions": [
    {
      "id": "phy-ch06-q001",
      "subject": "Physics",
      "chapter": "Current Electricity",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2023, 2020 (8M Core)",
      "question": "State Ohm's law and write its mathematical formula with conditions.",
      "answer": "• Statement: At constant temperature and physical conditions, the steady current $I$ flowing through a conductor is directly proportional to the potential difference $V$ across its ends.\n• Formula: $V \\propto I \\implies V = IR$, where $R$ is electrical resistance.",
      "formula": "V = IR",
      "telugu_hint": "constant temperature daggara vaahkm thru prvhimche electric current daani chivrl madhya umde potenshiyl bhedaaniki anulomaanupaatmlo untundi (V = IR).",
      "source_check": "verified",
      "tenglish_hint": "constant temperature daggara vaahkm thru prvhimche electric current daani chivrl madhya umde potenshiyl bhedaaniki anulomaanupaatmlo untundi (V = IR)."
    },
    {
      "id": "phy-ch06-q002",
      "subject": "Physics",
      "chapter": "Current Electricity",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2022, 2019 (8M Core)",
      "question": "State Kirchhoff's First Law (Junction Rule) and Second Law (Loop Rule) and name their conservation principles.",
      "answer": "1. Junction Rule: The algebraic sum of currents meeting at any electrical junction is zero ($\\sum I = 0$). Based on **Conservation of Charge**.\n2. Loop Rule: The algebraic sum of changes in potential around any closed mesh is zero ($\\sum \\Delta V = 0$). Based on **Conservation of Energy**.",
      "formula": "\\sum I = 0, \\quad \\sum \\Delta V = 0",
      "telugu_hint": "smdhi law aavesh prirkshnpai, loop law energy prirkshn formulapai aadhaarpdi untayi.",
      "source_check": "verified",
      "tenglish_hint": "smdhi law aavesh prirkshnpai, loop law energy prirkshn formulapai aadhaarpdi untayi."
    },
    {
      "id": "phy-ch06-q003",
      "subject": "Physics",
      "chapter": "Current Electricity",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2023, 2022, 2018 (8M Core)",
      "question": "Why is a potentiometer preferred over a voltmeter to measure cell EMF?",
      "answer": "• A potentiometer works on the null deflection method and draws **no current** from the cell at balance point, measuring the exact open-circuit EMF.\n• A standard voltmeter draws current, measuring only the smaller terminal potential difference ($V = E - Ir$).",
      "formula": "I_{null} = 0 \\implies V = E",
      "telugu_hint": "potenshiyomeetr smtulit point daggara etuvmti electric teesukodu kabatti khchchitmain EMF kolustumdi.",
      "source_check": "verified",
      "tenglish_hint": "potenshiyomeetr smtulit point daggara etuvmti electric teesukodu kabatti khchchitmain EMF kolustumdi."
    },
    {
      "id": "phy-ch06-q004",
      "subject": "Physics",
      "chapter": "Current Electricity",
      "type": "LAQ",
      "marks": 8,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "State Kirchhoff's laws for an electrical network. Using these laws, obtain the condition for balancing in a Wheatstone bridge.",
      "answer": "1. **Kirchhoff's Laws**:\n• **First Law (Junction Rule)**: At any junction, sum of entering currents equals sum of leaving currents: $\\sum I = 0$ (Conservation of Charge).\n• **Second Law (Loop Rule)**: In any closed loop, algebraic sum of emf's equals algebraic sum of product of current and resistance: $\\sum E = \\sum IR$ (Conservation of Energy).\n\n2. **Wheatstone Bridge Setup**:\n• Four resistors $P, Q, R, S$ form a bridge $ABCD$.\n• Cell $E$ is connected between $A$ and $C$.\n• Galvanometer $G$ of resistance $G$ is connected between $B$ and $D$.\n\n3. **Applying Kirchhoff's Laws**:\n• At Junction $B$: $I_1 - I_g - I_3 = 0$.\n• At Junction $D$: $I_2 + I_g - I_4 = 0$.\n• For closed loop $ABDA$: $I_1 P + I_g G - I_2 R = 0$.\n• For closed loop $BCDB$: $I_3 Q - I_4 S - I_g G = 0$.\n\n4. **Balanced Condition ($I_g = 0$)**:\n• In the balanced state, galvanometer shows null deflection ($I_g = 0$).\n• Then $I_1 = I_3$ and $I_2 = I_4$.\n• From loop $ABDA$: $I_1 P = I_2 R$  --- (1)\n• From loop $BCDB$: $I_1 Q = I_2 S$  --- (2)\n\n5. **Dividing (1) by (2)**:\n$$\\frac{I_1 P}{I_1 Q} = \\frac{I_2 R}{I_2 S} \\implies \\frac{P}{Q} = \\frac{R}{S}$$\n• This is the balancing condition of Wheatstone's bridge.",
      "formula": "\\frac{P}{Q} = \\frac{R}{S}",
      "telugu_hint": "Kirchhoff loop rules vadi Wheatstone bridge balance condition $\\frac{P}{Q} = \\frac{R}{S}$ derive chestham.",
      "source_check": "verified",
      "tenglish_hint": "Kirchhoff loop rules vadi Wheatstone bridge balance condition $\\frac{P}{Q} = \\frac{R}{S}$ derive chestham."
    },
    {
      "id": "phy-ch06-q005",
      "subject": "Physics",
      "chapter": "Current Electricity",
      "type": "LAQ",
      "marks": 8,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "State the working principle of a potentiometer. Explain with a neat circuit diagram how a potentiometer is used to (a) compare EMFs of two cells, and (b) determine the internal resistance of a primary cell.",
      "answer": "1. **Principle of Potentiometer**:\n• The potential fall across any length of a uniform wire carrying constant current is directly proportional to its length: $V \\propto l \\implies V = \\phi l$, where $\\phi$ is potential gradient.\n\n2. **(a) Comparison of EMFs of two cells ($E_1, E_2$)**:\n• Primary circuit: Battery $B$, key $K$, rheostat $Rh$ in series with wire $AB$.\n• Secondary circuit: Two cells $E_1, E_2$ connected through two-way key to galvanometer $G$ and jockey.\n• With cell $E_1$ connected, jockey finds balancing length $l_1$: $E_1 = \\phi l_1$  --- (1)\n• With cell $E_2$ connected, jockey finds balancing length $l_2$: $E_2 = \\phi l_2$  --- (2)\n• Dividing (1) by (2): $\\frac{E_1}{E_2} = \\frac{l_1}{l_2}$.\n\n3. **(b) Determination of Internal Resistance ($r$)**:\n• A cell $E$ is connected across wire with resistance box $R$ and key $K_2$ in parallel.\n• When $K_2$ is open (open circuit), balancing length is $l_1$: $E = \\phi l_1$  --- (3)\n• When $K_2$ is closed, current flows through $R$ and terminal voltage $V$ has balancing length $l_2$: $V = \\phi l_2$  --- (4)\n• $\\frac{E}{V} = \\frac{l_1}{l_2}$.\n• Internal resistance $r = R\\left(\\frac{E}{V} - 1\\right) = R\\left(\\frac{l_1 - l_2}{l_2}\\right)$.",
      "formula": "\\frac{E_1}{E_2} = \\frac{l_1}{l_2}, \\quad r = R\\left(\\frac{l_1 - l_2}{l_2}\\right)",
      "telugu_hint": "Potentiometer principle $V \\propto l$. Comparing EMFs: $E_1/E_2 = l_1/l_2$; internal resistance: $r = R(l_1 - l_2)/l_2$.",
      "source_check": "verified",
      "tenglish_hint": "Potentiometer principle $V \\propto l$. Comparing EMFs: $E_1/E_2 = l_1/l_2$; internal resistance: $r = R(l_1 - l_2)/l_2$."
    },
    {
      "id": "phy-ch06-q006",
      "subject": "Physics",
      "chapter": "Current Electricity",
      "type": "Numerical",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "In a potentiometer arrangement, a cell of EMF $1.25\\text{ V}$ gives a balance point at $35.0\\text{ cm}$ length of the wire. If the cell is replaced by another cell and the balance point shifts to $63.0\\text{ cm}$, what is the EMF of the second cell?",
      "answer": "• Given: $E_1 = 1.25 \\text{ V}$, $l_1 = 35.0 \\text{ cm}$, $l_2 = 63.0 \\text{ cm}$.\n• Formula: $\\frac{E_1}{E_2} = \\frac{l_1}{l_2} \\implies E_2 = E_1 \\left(\\frac{l_2}{l_1}\\right)$\n• Calculation:\n$E_2 = 1.25 \\times \\left(\\frac{63.0}{35.0}\\right) = 1.25 \\times 1.8 = 2.25 \\text{ V}$.\n• Result: $E_2 = 2.25 \\text{ V}$.",
      "formula": "E_2 = E_1 \\left(\\frac{l_2}{l_1}\\right) = 2.25 \\text{ V}",
      "telugu_hint": "$E_2 = 1.25 \\times \\frac{63}{35} = 2.25\\text{ V}$.",
      "source_check": "verified",
      "tenglish_hint": "$E_2 = 1.25 \\times \\frac{63}{35} = 2.25\\text{ V}$."
    },
    {
      "id": "phy-ch06-q007",
      "subject": "Physics",
      "chapter": "Current Electricity",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "A wire of resistance $R$ is stretched to double its original length. Its new resistance will be:",
      "options": [
        "A) $2R$",
        "B) $4R$",
        "C) $R/2$",
        "D) $R/4$"
      ],
      "correctOption": 1,
      "answer": "Correct Answer: B) $4R$.\n• Volume remains constant ($A L = A' L'$). If $L' = 2L$, then $A' = A/2$.\n• $R' = \\rho \\frac{L'}{A'} = \\rho \\frac{2L}{A/2} = 4\\left(\\rho \\frac{L}{A}\\right) = 4R$.",
      "formula": "R' = n^2 R = (2)^2 R = 4R",
      "telugu_hint": "length rettimpu cheste addukot vaishaalym sgmvutumdi, resistance 4 times ($4R$) peruguthundi.",
      "source_check": "verified",
      "tenglish_hint": "length rettimpu cheste addukot vaishaalym sgmvutumdi, resistance 4 times ($4R$) peruguthundi."
    }
  ]
};

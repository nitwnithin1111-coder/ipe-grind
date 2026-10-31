// IPE TS 2nd Year Physics - Chapter 7: Moving Charges and Magnetism
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch07"] = {
  "id": "phy-ch07",
  "subject": "Physics",
  "chapterNumber": 7,
  "chapter": "Moving Charges and Magnetism",
  "formulaSheet": [
    {
      "title": "Biot-Savart Law",
      "formula": "d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\frac{I (d\\vec{l} \\times \\hat{r})}{r^2} \\implies dB = \\frac{\\mu_0}{4\\pi}\\frac{I dl \\sin\\theta}{r^2}",
      "symbols": "$\\frac{\\mu_0}{4\\pi} = 10^{-7} \\text{ T m/A}$, $I = \\text{Current}$, $dl = \\text{Current element}$",
      "units": "$\\text{Tesla (T)}$",
      "tip": "Magnetic field on axis of circular loop of radius $R$ at distance $x$ is $B = \\frac{\\mu_0 I R^2}{2(R^2+x^2)^{3/2}}$."
    },
    {
      "title": "Ampere's Circuital Law",
      "formula": "\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{enclosed}",
      "symbols": "$I_{enclosed} = \\text{Total current threading closed loop}$",
      "units": "$\\text{T}\\cdot\\text{m}$",
      "tip": "Inside ideal solenoid $B = \\mu_0 n I$, where $n = N/L$."
    },
    {
      "title": "Lorentz Force",
      "formula": "\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})",
      "symbols": "$q = \\text{Charge}$, $\\vec{v} = \\text{Velocity}$, $\\vec{B} = \\text{Magnetic field}$",
      "units": "$\\text{Newton (N)}$",
      "tip": "Magnetic force $F_m = q v B \\sin\\theta$ does zero work since force is always perpendicular to velocity."
    },
    {
      "title": "Galvanometer Conversion to Ammeter & Voltmeter",
      "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt for Ammeter)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Series R for Voltmeter)}",
      "symbols": "$G = \\text{Galvanometer resistance}$, $I_g = \\text{Full scale deflection current}$",
      "units": "$\\Omega$",
      "tip": "Ideal ammeter resistance $= 0$. Ideal voltmeter resistance $= \\infty$."
    },
    {
      "title": "Radius of Circular Orbit in Magnetic Field",
      "formula": "r = \\frac{mv}{qB} = \\frac{p}{qB} = \\frac{\\sqrt{2mE_k}}{qB}",
      "symbols": "$m = \\text{Particle mass}$, $v = \\text{Velocity}$, $q = \\text{Charge}$, $B = \\text{Magnetic field}$, $E_k = \\text{Kinetic energy}$",
      "units": "$\\text{m or cm}$",
      "tip": "Time period $T = \\frac{2\\pi m}{qB}$ and frequency $\\nu = \\frac{qB}{2\\pi m}$ (cyclotron frequency) are completely independent of speed and radius."
    },
    {
      "title": "Force between Parallel Current-Carrying Wires",
      "formula": "\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}",
      "symbols": "I_1, $I_2 = \\text{Currents in two wires}$, $d = \\text{Separation distance}$, $L = \\text{Length of wire}$",
      "units": "$\\text{N/m}$",
      "tip": "Parallel currents in the same direction attract each other; anti-parallel currents in opposite directions repel."
    }
  ],
  "questions": [
    {
      "id": "phy-ch07-q001",
      "subject": "Physics",
      "chapter": "Moving Charges and Magnetism",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2023, 2020",
      "question": "State Biot-Savart law and write its vector form.",
      "answer": "• Statement: The magnetic field $d\\vec{B}$ due to a current element $I d\\vec{l}$ at distance $r$ is directly proportional to current $I$, element length $dl$, sine of angle $\\theta$, and inversely proportional to $r^2$.\n• Vector form: $d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I (d\\vec{l} \\times \\hat{r})}{r^2}$.",
      "formula": "dB = \\frac{\\mu_0}{4\\pi}\\frac{I dl \\sin\\theta}{r^2}",
      "telugu_hint": "Biot-Savart Law: Magnetic field due to current element is $dB = \\frac{\\mu_0}{4\\pi}\\frac{I dl \\sin\\theta}{r^2}$.",
      "source_check": "verified",
      "tenglish_hint": "Biot-Savart Law: Magnetic field due to current element is $dB = \\frac{\\mu_0}{4\\pi}\\frac{I dl \\sin\\theta}{r^2}$."
    },
    {
      "id": "phy-ch07-q002",
      "subject": "Physics",
      "chapter": "Moving Charges and Magnetism",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2023, 2021",
      "question": "State Ampere's circuital law and write its mathematical equation.",
      "answer": "• Statement: The line integral of magnetic field $\\vec{B}$ around any closed loop is equal to $\\mu_0$ times the total steady current enclosed by the loop:\n$\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{enclosed}$.",
      "formula": "\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I",
      "telugu_hint": "Ampere's Circuital Law: $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I$.",
      "source_check": "verified",
      "tenglish_hint": "Ampere's Circuital Law: $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I$."
    },
    {
      "id": "phy-ch07-q003",
      "subject": "Physics",
      "chapter": "Moving Charges and Magnetism",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE 2024, 2022, 2019",
      "question": "Derive the expression for the magnetic field at a point on the axis of a circular current-carrying loop.",
      "answer": "1. Setup: Circular loop of radius $R$ carries current $I$. Point $P$ is on axis at distance $x$ from center $O$. Distance from element $dl$ to $P$ is $r = \\sqrt{R^2 + x^2}$.\n2. By Biot-Savart law: $dB = \\frac{\\mu_0}{4\\pi} \\frac{I dl \\sin 90^\\circ}{r^2} = \\frac{\\mu_0 I dl}{4\\pi (R^2 + x^2)}$.\n3. Resolving $dB$: The axial components $dB\\sin\\alpha = dB \\cdot (R/r)$ add up, while vertical components cancel by symmetry.\n4. Integration: $B = \\int dB \\sin\\alpha = \\frac{\\mu_0 I R}{4\\pi (R^2+x^2)^{3/2}} \\int dl$.\n• Since $\\int dl = 2\\pi R$, we obtain:\n$$B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}$$5. At center ($x = 0$): $B_0 = \\frac{\\mu_0 I}{2R}$.",
      "formula": "B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}",
      "telugu_hint": "Magnetic field on axis of circular coil is $B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}$.",
      "source_check": "verified",
      "tenglish_hint": "Magnetic field on axis of circular coil is $B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}$."
    },
    {
      "id": "phy-ch07-q004",
      "subject": "Physics",
      "chapter": "Moving Charges and Magnetism",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Explain how a moving coil galvanometer can be converted into (a) an Ammeter, and (b) a Voltmeter.",
      "answer": "• **(a) Conversion to Ammeter**:\n1. A galvanometer is converted into an ammeter by connecting a very small resistance called **Shunt ($S$)** in **parallel** with it.\n2. Since potential across both is equal: $I_g G = (I - I_g)S$.\n3. Shunt formula: $S = \\frac{I_g G}{I - I_g}$.\n\n• **(b) Conversion to Voltmeter**:\n1. A galvanometer is converted into a voltmeter by connecting a **high resistance ($R$)** in **series** with it.\n2. Total potential difference $V = I_g (G + R)$.\n3. Series resistance formula: $R = \\frac{V}{I_g} - G$.",
      "formula": "S = \\frac{I_g G}{I - I_g}, \\quad R = \\frac{V}{I_g} - G",
      "telugu_hint": "ammeetr‌gaa maarchdaaniki parallelgaa alp resistance (shmt S); volt meetr‌gaa maarchdaaniki serieslo adhik resistance (R) klpaali.",
      "source_check": "verified",
      "tenglish_hint": "ammeetr‌gaa maarchdaaniki parallelgaa alp resistance (shmt S); volt meetr‌gaa maarchdaaniki serieslo adhik resistance (R) klpaali."
    },
    {
      "id": "phy-ch07-q005",
      "subject": "Physics",
      "chapter": "Moving Charges and Magnetism",
      "type": "Numerical",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "A galvanometer of resistance $50\\;\\Omega$ requires a current of $2\\text{ mA}$ for full scale deflection. How can it be converted into an ammeter of range $0 - 5\\text{ A}$?",
      "answer": "• Given: $G = 50\\;\\Omega$, $I_g = 2\\text{ mA} = 2 \\times 10^{-3}\\text{ A}$, $I = 5\\text{ A}$.\n• Formula: $S = \\frac{I_g G}{I - I_g}$\n• Calculation:\n$S = \\frac{2 \\times 10^{-3} \\times 50}{5 - 0.002} = \\frac{0.1}{4.998} \\approx 0.02\\;\\Omega$.\n• Result: Connect a shunt resistance of $0.02\\;\\Omega$ in parallel with the galvanometer.",
      "formula": "S = \\frac{I_g G}{I - I_g} \\approx 0.02\\;\\Omega",
      "telugu_hint": "shmt $S = \\frac{0.1}{5} \\approx 0.02\\;\\Omega$ parallelgaa klpaali.",
      "source_check": "verified",
      "tenglish_hint": "shmt $S = \\frac{0.1}{5} \\approx 0.02\\;\\Omega$ parallelgaa klpaali."
    },
    {
      "id": "phy-ch07-q006",
      "subject": "Physics",
      "chapter": "Moving Charges and Magnetism",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "When a charged particle enters a uniform magnetic field perpendicularly, the trajectory followed is:",
      "options": [
        "A) Straight line",
        "B) Parabola",
        "C) Circle",
        "D) Helix"
      ],
      "correctOption": 2,
      "answer": "Correct Answer: C) Circle.\n• Magnetic force provides centripetal force ($q v B = m v^2 / r$), forcing it into a circle of radius $r = mv / qB$.",
      "formula": "r = \\frac{m v}{q B}",
      "telugu_hint": "lmbmgaa prveshimchinppudu particle vruttaakaar maargmlo tirugutumdi.",
      "source_check": "verified",
      "tenglish_hint": "lmbmgaa prveshimchinppudu particle vruttaakaar maargmlo tirugutumdi."
    }
  ]
};

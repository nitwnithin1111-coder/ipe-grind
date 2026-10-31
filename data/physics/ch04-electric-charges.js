// IPE TS 2nd Year Physics - Chapter 4: Electric Charges and Fields
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch04"] = {
  "id": "phy-ch04",
  "subject": "Physics",
  "chapterNumber": 4,
  "chapter": "Electric Charges and Fields",
  "formulaSheet": [
    {
      "title": "Coulomb's Law in Vacuum",
      "formula": "F = \\frac{1}{4\\pi \\varepsilon_0}\\frac{q_1 q_2}{r^2}",
      "symbols": "$\\frac{1}{4\\pi \\varepsilon_0} = 9 \\times 10^9 \\text{ N m}^2/\\text{C}^2$, $\\varepsilon_0 = 8.854 \\times 10^{-12} \\text{ C}^2/\\text{N m}^2$",
      "units": "$\\text{Newton (N)}$",
      "tip": "In a dielectric medium of constant $K$, force decreases by $K$: $F_m = F/K$."
    },
    {
      "title": "Electric Field of Dipole on Axial & Equatorial Line",
      "formula": "E_{axial} = \\frac{1}{4\\pi \\varepsilon_0}\\frac{2p}{r^3}, \\quad E_{equatorial} = \\frac{1}{4\\pi \\varepsilon_0}\\frac{p}{r^3}",
      "symbols": "$p = 2aq = \\text{Dipole moment}$, $r = \\text{Distance from center}$",
      "units": "$\\text{N/C or V/m}$",
      "tip": "$E_{axial} = 2 E_{equatorial}$ for a short dipole at same distance $r$."
    },
    {
      "title": "Torque on a Dipole in Uniform Electric Field",
      "formula": "\\vec{\\tau} = \\vec{p} \\times \\vec{E} \\implies \\tau = pE\\sin\\theta",
      "symbols": "$p = \\text{Dipole moment}$, $E = \\text{Electric field}$, $\\theta = \\text{Angle between p and E}$",
      "units": "$\\text{N}\\cdot\\text{m}$",
      "tip": "Stable equilibrium at $\\theta = 0^\\circ$ ($\\tau = 0$), maximum torque at $\\theta = 90^\\circ$."
    },
    {
      "title": "Gauss's Law",
      "formula": "\\Phi = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{enclosed}}{\\varepsilon_0}",
      "symbols": "$\\Phi = \\text{Total electric flux}$, $q_{enclosed} = \\text{Net charge inside closed surface}$",
      "units": "$\\text{N}\\cdot\\text{m}^2/\\text{C}$",
      "tip": "Electric flux through a closed surface is independent of its shape or size."
    },
    {
      "title": "Electric Field due to Infinite Flat Sheet of Charge",
      "formula": "E = \\frac{\\sigma}{2\\varepsilon_0}",
      "symbols": "$\\sigma = \\text{Surface charge density (C/m}^2\\text{)}$, $\\varepsilon_0 = \\text{Permittivity of free space}$",
      "units": "$\\text{N/C or V/m}$",
      "tip": "Electric field is uniform and completely independent of distance from the infinite plane sheet."
    },
    {
      "title": "Work Done in Rotating an Electric Dipole",
      "formula": "W = pE(\\cos\\theta_1 - \\cos\\theta_2)",
      "symbols": "$p = \\text{Electric dipole moment}$, $E = \\text{Electric field strength}$, $\\theta_1$, $\\theta_2 = \\text{Initial and final angles}$",
      "units": "$\\text{Joule (J)}$",
      "tip": "Work done in rotating dipole from stable equilibrium ($\\theta_1 = 0^\\circ$) to perpendicular ($\\theta_2 = 90^\\circ$) is $W = pE$."
    }
  ],
  "questions": [
    {
      "id": "phy-ch04-q001",
      "subject": "Physics",
      "chapter": "Electric Charges and Fields",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "State Coulomb's inverse square law in electrostatics and write the vector form.",
      "answer": "• Statement: The electrostatic force between two stationary point charges is directly proportional to the product of charges and inversely proportional to the square of the distance between them.\n• Vector form: $\\vec{F}_{12} = \\frac{1}{4\\pi \\varepsilon_0} \\frac{q_1 q_2}{r^2} \\hat{r}_{12}$.",
      "formula": "F = \\frac{1}{4\\pi \\varepsilon_0}\\frac{q_1 q_2}{r^2}",
      "telugu_hint": "rendu constant bimdu aaveshaal madhya aakrshn or vikrshn force aaveshaal lbdaaniki anulomaanupaatmlo, vaati madhya door vrgaaniki vilomaanupaatmlo untundi.",
      "source_check": "verified",
      "tenglish_hint": "rendu constant bimdu aaveshaal madhya aakrshn or vikrshn force aaveshaal lbdaaniki anulomaanupaatmlo, vaati madhya door vrgaaniki vilomaanupaatmlo untundi."
    },
    {
      "id": "phy-ch04-q002",
      "subject": "Physics",
      "chapter": "Electric Charges and Fields",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Define electric dipole moment. State its SI unit and direction.",
      "answer": "1. Definition: Electric dipole moment $\\vec{p}$ is the product of magnitude of either charge $q$ and the distance $2a$ between them.\n2. SI Unit: Coulomb-meter ($\\text{C}\\cdot\\text{m}$).\n3. Direction: By convention, directed from negative charge $(-q)$ to positive charge $(+q)$.",
      "formula": "\\vec{p} = q(2\\vec{a})",
      "telugu_hint": "electric dvidhruv bhraamkm p = q(2a). direction: run charge nundi dhn charge vaipu.",
      "source_check": "verified",
      "tenglish_hint": "electric dvidhruv bhraamkm p = q(2a). direction: run charge nundi dhn charge vaipu."
    },
    {
      "id": "phy-ch04-q003",
      "subject": "Physics",
      "chapter": "Electric Charges and Fields",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "State Gauss's law in electrostatics.",
      "answer": "• Statement: The total electric flux through any closed Gaussian surface in vacuum is equal to $\\frac{1}{\\varepsilon_0}$ times the net charge enclosed inside the surface.",
      "formula": "\\Phi = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{enclosed}}{\\varepsilon_0}",
      "telugu_hint": "Total electric flux through any closed surface is equal to $1/\\varepsilon_0$ times net charge enclosed: $\\Phi = q_{net} / \\varepsilon_0$.",
      "source_check": "verified",
      "tenglish_hint": "Total electric flux through any closed surface is equal to $1/\\varepsilon_0$ times net charge enclosed: $\\Phi = q_{net} / \\varepsilon_0$."
    },
    {
      "id": "phy-ch04-q004",
      "subject": "Physics",
      "chapter": "Electric Charges and Fields",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Derive an expression for the torque experienced by an electric dipole in a uniform electric field.",
      "answer": "1. Setup: An electric dipole of length $2a$ with charges $-q$ and $+q$ is placed in a uniform electric field $\\vec{E}$ at angle $\\theta$.\n2. Forces: Force on $+q$ is $\\vec{F}_+ = +q\\vec{E}$ and on $-q$ is $\\vec{F}_- = -q\\vec{E}$.\n• Net force $\\vec{F}_{net} = q\\vec{E} - q\\vec{E} = 0$.\n3. Torque: The two equal, opposite and parallel forces separated by perpendicular distance form a couple.\n• Perpendicular distance $d = 2a\\sin\\theta$.\n• $\\tau = \\text{Force} \\times \\text{Perpendicular distance} = qE \\times (2a\\sin\\theta) = (q \\cdot 2a)E\\sin\\theta$.\n• Since $p = 2aq$, we have $\\tau = pE\\sin\\theta$.\n4. Vector form: $\\vec{\\tau} = \\vec{p} \\times \\vec{E}$.",
      "formula": "\\vec{\\tau} = \\vec{p} \\times \\vec{E} \\implies \\tau = pE\\sin\\theta",
      "telugu_hint": "smroop electric fieldlo dvidhruvmpai nikr force zero, kaanee taark $\\tau = pE\\sin\\theta$ or $\\vec{\\tau} = \\vec{p} \\times \\vec{E}$ form avthundi.",
      "source_check": "verified",
      "tenglish_hint": "smroop electric fieldlo dvidhruvmpai nikr force zero, kaanee taark $\\tau = pE\\sin\\theta$ or $\\vec{\\tau} = \\vec{p} \\times \\vec{E}$ form avthundi."
    },
    {
      "id": "phy-ch04-q005",
      "subject": "Physics",
      "chapter": "Electric Charges and Fields",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "State Gauss's law and apply it to find the electric field intensity due to an infinitely long straight charged wire.",
      "answer": "1. Gauss's Law: $\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q}{\\varepsilon_0}$.\n2. Setup: Let wire have uniform linear charge density $\\lambda$. Choose a cylindrical Gaussian surface of radius $r$ and length $l$ coaxial with the wire.\n3. Flux calculation:\n• Flux through circular end faces is zero because $\\vec{E} \\perp d\\vec{A}$ ($\\cos 90^\\circ = 0$).\n• Flux through curved surface: $\\Phi = E \\times (2\\pi r l)$.\n4. Charge enclosed: $q_{enclosed} = \\lambda l$.\n5. By Gauss's Law: $E(2\\pi r l) = \\frac{\\lambda l}{\\varepsilon_0} \\implies E = \\frac{\\lambda}{2\\pi \\varepsilon_0 r}$.",
      "formula": "E = \\frac{\\lambda}{2\\pi \\varepsilon_0 r}",
      "telugu_hint": "infinite length gl wire daggara electric kshetr intensity: $E = \\frac{\\lambda}{2\\pi \\varepsilon_0 r}$.",
      "source_check": "verified",
      "tenglish_hint": "infinite length gl wire daggara electric kshetr intensity: $E = \\frac{\\lambda}{2\\pi \\varepsilon_0 r}$."
    },
    {
      "id": "phy-ch04-q006",
      "subject": "Physics",
      "chapter": "Electric Charges and Fields",
      "type": "Numerical",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Two point charges $q_1 = +2\\mu\\text{C}$ and $q_2 = -2\\mu\\text{C}$ are separated by $20\\text{ cm}$ in air. Find the electric field at the midpoint of the line joining them.",
      "answer": "• Given: $q_1 = +2 \\times 10^{-6}\\text{ C}$, $q_2 = -2 \\times 10^{-6}\\text{ C}$, separation $2r = 0.2\\text{ m} \\implies r = 0.1\\text{ m}$.\n• At midpoint, $\\vec{E}_1$ due to $+q_1$ is directed towards $q_2$. $\\vec{E}_2$ due to $-q_2$ is also directed towards $q_2$.\n• $E_1 = \\frac{1}{4\\pi \\varepsilon_0}\\frac{q_1}{r^2} = \\frac{9 \\times 10^9 \\times 2 \\times 10^{-6}}{(0.1)^2} = 1.8 \\times 10^6\\text{ N/C}$.\n• $E_2 = \\frac{9 \\times 10^9 \\times 2 \\times 10^{-6}}{(0.1)^2} = 1.8 \\times 10^6\\text{ N/C}$.\n• Net Field: $E_{net} = E_1 + E_2 = 3.6 \\times 10^6\\text{ N/C}$ directed towards the negative charge.",
      "formula": "E_{net} = E_1 + E_2 = 3.6 \\times 10^6\\text{ N/C}",
      "telugu_hint": "rendu kshetraal directionlu oke vaipu (run charge vaipu) untayi, kabatti koodaali: 1.8 + 1.8 = $3.6 \\times 10^6\\text{ N/C}$.",
      "source_check": "verified",
      "tenglish_hint": "rendu kshetraal directionlu oke vaipu (run charge vaipu) untayi, kabatti koodaali: 1.8 + 1.8 = $3.6 \\times 10^6\\text{ N/C}$."
    },
    {
      "id": "phy-ch04-q007",
      "subject": "Physics",
      "chapter": "Electric Charges and Fields",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "The electric flux through a closed surface containing a net charge of $1 \\text{ C}$ in vacuum is:",
      "options": [
        "A) $8.85 \\times 10^{-12} \\text{ N m}^2/\\text{C}$",
        "B) $1.13 \\times 10^{11} \\text{ N m}^2/\\text{C}$",
        "C) $9 \\times 10^9 \\text{ N m}^2/\\text{C}$",
        "D) Zero"
      ],
      "correctOption": 1,
      "answer": "Correct Answer: B) $1.13 \\times 10^{11} \\text{ N m}^2/\\text{C}$.\n• $\\Phi = \\frac{q}{\\varepsilon_0} = \\frac{1}{8.854 \\times 10^{-12}} \\approx 1.13 \\times 10^{11} \\text{ N m}^2/\\text{C}$.",
      "formula": "\\Phi = \\frac{1}{\\varepsilon_0} = 1.13 \\times 10^{11}\\text{ N m}^2/\\text{C}",
      "telugu_hint": "$\\Phi = 1 / \\varepsilon_0 = 1.13 \\times 10^{11}$.",
      "source_check": "verified",
      "tenglish_hint": "$\\Phi = 1 / \\varepsilon_0 = 1.13 \\times 10^{11}$."
    }
  ]
};

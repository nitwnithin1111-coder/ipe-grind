// IPE TS 2nd Year Physics - Chapter 9: Electromagnetic Induction
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch09"] = {
  "id": "phy-ch09",
  "subject": "Physics",
  "chapterNumber": 9,
  "chapter": "Electromagnetic Induction",
  "formulaSheet": [
    {
      "title": "Faraday's Law of Induction",
      "formula": "\\varepsilon = -\\frac{d\\Phi_B}{dt} = -N\\frac{d\\Phi_B}{dt}",
      "symbols": "$\\Phi_B = \\vec{B} \\cdot \\vec{A} = B A \\cos\\theta = \\text{Magnetic flux}$, $N = \\text{Number of turns}$",
      "units": "$\\text{Volt (V)}$",
      "tip": "Negative sign represents Lenz's Law (induced emf opposes the change causing it)."
    },
    {
      "title": "Motional EMF",
      "formula": "\\varepsilon = B l v",
      "symbols": "$B = \\text{Magnetic field}$, $l = \\text{Length of moving rod}$, $v = \\text{Velocity}$",
      "units": "$\\text{Volt (V)}$",
      "tip": "Mechanical power input $P = \\frac{B^2 l^2 v^2}{R}$ equals rate of Joule heat dissipation."
    },
    {
      "title": "Self & Mutual Inductance",
      "formula": "\\varepsilon = -L\\frac{dI}{dt}, \\quad \\varepsilon = -M\\frac{dI}{dt}, \\quad L_{solenoid} = \\mu_0 n^2 A l",
      "symbols": "$L = \\text{Self inductance}$, $M = \\text{Mutual inductance}$",
      "units": "$\\text{Henry (H)}$",
      "tip": "Energy stored in an inductor is $U = \\frac{1}{2} L I^2$."
    },
    {
      "title": "AC Generator EMF",
      "formula": "\\varepsilon = \\varepsilon_0 \\sin(\\omega t) = N B A \\omega \\sin(\\omega t)",
      "symbols": "$\\varepsilon_0 = N B A \\omega = \\text{Peak EMF}$, $\\omega = 2\\pi \\nu = \\text{Angular frequency}$",
      "units": "$\\text{Volt (V)}$",
      "tip": "Peak voltage occurs when plane of coil is parallel to magnetic field (flux is zero, rate of change is maximum)."
    },
    {
      "title": "Self Inductance of a Solenoid",
      "formula": "L = \\mu_0 n^2 A l = \\frac{\\mu_0 N^2 A}{l}",
      "symbols": "$N = \\text{Total turns}$, $n = \\text{Turns per unit length } (N/l)$, $A = \\text{Cross-sectional area}$, $l = \\text{Length}$",
      "units": "$\\text{Henry (H)}$",
      "tip": "If a soft iron core of relative permeability $\\mu_r$ is placed inside, inductance increases by factor $\\mu_r$ ($L' = \\mu_r L$)."
    },
    {
      "title": "Induced Charge in Electromagnetic Induction",
      "formula": "q = \\frac{\\Delta\\Phi}{R}",
      "symbols": "$\\Delta\\Phi = \\text{Total magnetic flux change (Wb)}$, $R = \\text{Circuit resistance (}\\Omega\\text{)}$",
      "units": "$\\text{Coulomb (C)}$",
      "tip": "Total induced charge depends ONLY on the net flux change $\\Delta\\Phi$ and resistance $R$, completely independent of the time taken."
    }
  ],
  "questions": [
    {
      "id": "phy-ch09-q001",
      "subject": "Physics",
      "chapter": "Electromagnetic Induction",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "question": "State Faraday's laws of electromagnetic induction.",
      "answer": "1. First Law: Whenever magnetic flux linked with a circuit changes, an induced emf is produced in it which lasts as long as the change continues.\n2. Second Law: The magnitude of induced emf is directly proportional to the time rate of change of magnetic flux linked with the circuit:\n$\\varepsilon = -\\frac{d\\Phi_B}{dt}$.",
      "formula": "\\varepsilon = -\\frac{d\\Phi_B}{dt}",
      "telugu_hint": "vlyaaniki anusmdhaanmain magnetic abhivaahmlo change vchchinmt time prerit EMF form avthundi. prerit EMF abhivaah change retuku anulomaanupaatmlo untundi.",
      "source_check": "verified",
      "tenglish_hint": "vlyaaniki anusmdhaanmain magnetic abhivaahmlo change vchchinmt time prerit EMF form avthundi. prerit EMF abhivaah change retuku anulomaanupaatmlo untundi."
    },
    {
      "id": "phy-ch09-q002",
      "subject": "Physics",
      "chapter": "Electromagnetic Induction",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "question": "State Lenz's law and explain which basic conservation law it represents.",
      "answer": "• Statement: The polarity of induced emf is such that it produces an induced current which opposes the change in magnetic flux that produces it.\n• Conservation Principle: Lenz's law is a consequence of the **Law of Conservation of Energy**.",
      "formula": "\\varepsilon = -\\frac{d\\Phi_B}{dt}",
      "telugu_hint": "Induced current eppudu daanni produce chesina cause ni oppose chesthundi. Idi Law of Conservation of Energy ni obey chesthundi.",
      "source_check": "verified",
      "tenglish_hint": "Induced current eppudu daanni produce chesina cause ni oppose chesthundi. Idi Law of Conservation of Energy ni obey chesthundi."
    },
    {
      "id": "phy-ch09-q003",
      "subject": "Physics",
      "chapter": "Electromagnetic Induction",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "question": "What are eddy currents? Mention any two practical applications.",
      "answer": "1. Definition: Circulating induced currents produced in solid metallic conductors when subjected to changing magnetic flux are called eddy currents (Foucault currents).\n2. Applications:\n• Magnetic braking in electric trains.\n• Induction furnaces for melting metals.",
      "formula": "i_{eddy} = \\frac{\\varepsilon}{R}",
      "telugu_hint": "lohpu dimmllo erpde sudi electric prvaahaalnu eddee kremtlu antaru. upyogaalu: railllo magnetic brekulu, imdkshn kolimi.",
      "source_check": "verified",
      "tenglish_hint": "lohpu dimmllo erpde sudi electric prvaahaalnu eddee kremtlu antaru. upyogaalu: railllo magnetic brekulu, imdkshn kolimi."
    },
    {
      "id": "phy-ch09-q004",
      "subject": "Physics",
      "chapter": "Electromagnetic Induction",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "question": "Derive the expression for the motional EMF induced across the ends of a conductor moving in a uniform magnetic field.",
      "answer": "1. Setup: A conducting rod $PQ$ of length $l$ moves with velocity $v$ perpendicular to a uniform magnetic field $\\vec{B}$ directed into the page on a U-shaped conducting frame.\n2. Area enclosed: Let distance of rod from base be $x$. Area $A = l x$.\n3. Magnetic Flux: $\\Phi_B = B A = B l x$.\n4. By Faraday's Law:\n$$\\varepsilon = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(B l x) = -B l \\frac{dx}{dt}$$5. Since velocity $v = -\\frac{dx}{dt}$ (distance $x$ is decreasing as rod moves left):\n$$\\varepsilon = B l v$$6. Direction: By Fleming's Right Hand Rule, current flows from $Q$ to $P$.",
      "formula": "\\varepsilon = B l v",
      "telugu_hint": "chln prerit EMF formula: $\u000barepsilon = B l v$.",
      "source_check": "verified",
      "tenglish_hint": "chln prerit EMF formula: $\u000barepsilon = B l v$."
    },
    {
      "id": "phy-ch09-q005",
      "subject": "Physics",
      "chapter": "Electromagnetic Induction",
      "type": "Numerical",
      "marks": 4,
      "important": true,
      "question": "A $1.0 \\text{ m}$ long metallic rod is rotated with an angular frequency of $400 \\text{ rad/s}$ about an axis normal to the rod passing through one end. A uniform magnetic field of $0.5 \\text{ T}$ acts parallel to the axis. Calculate the EMF induced between the center and the other end.",
      "answer": "• Given: $l = 1.0\\text{ m}$, $\\omega = 400\\text{ rad/s}$, $B = 0.5\\text{ T}$.\n• Formula: $\\varepsilon = \\frac{1}{2} B l^2 \\omega$\n• Calculation:\n$\\varepsilon = \\frac{1}{2} \\times 0.5 \\times (1.0)^2 \\times 400 = 100 \\text{ V}$.\n• Result: Induced EMF = $100 \\text{ V}$.",
      "formula": "\\varepsilon = \\frac{1}{2} B l^2 \\omega = 100 \\text{ V}",
      "telugu_hint": "$\\varepsilon = \\frac{1}{2} \\times 0.5 \\times 1^2 \\times 400 = 100\\text{ V}$.",
      "source_check": "verified",
      "tenglish_hint": "$\\varepsilon = \\frac{1}{2} \\times 0.5 \\times 1^2 \\times 400 = 100\\text{ V}$."
    },
    {
      "id": "phy-ch09-q006",
      "subject": "Physics",
      "chapter": "Electromagnetic Induction",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "The self-inductance of a solenoid depends on:",
      "options": [
        "A) Its geometry (area and length) and number of turns",
        "B) Current passing through it",
        "C) Potential applied across it",
        "D) Resistance of the wire"
      ],
      "correctOption": 0,
      "answer": "Correct Answer: A) Its geometry (area and length) and number of turns.\n• $L = \\mu_0 n^2 A l = \\mu_0 \\frac{N^2 A}{l}$, which depends solely on physical dimensions and permeability.",
      "formula": "L = \\mu_0 \\frac{N^2 A}{l}",
      "telugu_hint": "svym prerktvm chutl smkhy and jyaamiteey koltlpai aadhaarpdi untundi.",
      "source_check": "verified",
      "tenglish_hint": "svym prerktvm chutl smkhy and jyaamiteey koltlpai aadhaarpdi untundi."
    }
  ]
};

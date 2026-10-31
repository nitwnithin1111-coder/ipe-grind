// IPE TS 2nd Year Physics - Chapter 3: Wave Optics
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch03"] = {
  "id": "phy-ch03",
  "subject": "Physics",
  "chapterNumber": 3,
  "chapter": "Wave Optics",
  "formulaSheet": [
    {
      "title": "Huygens Wave Theory & Refraction",
      "formula": "\\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2} = \\frac{\\mu_2}{\\mu_1}",
      "symbols": "$v_1, v_2 = \\text{Speeds in media 1 and 2}$",
      "units": "$\\text{m/s}$",
      "tip": "Frequency remains unchanged during refraction."
    },
    {
      "title": "Young's Double Slit Fringe Width",
      "formula": "\\beta = \\frac{\\lambda D}{d}",
      "symbols": "$\\lambda = \\text{Wavelength}$, $D = \\text{Screen distance}$, $d = \\text{Slit separation}$",
      "units": "$\\text{m, mm}$",
      "tip": "Angular width $\\theta = \\beta/D = \\lambda/d$."
    },
    {
      "title": "Brewster's Law",
      "formula": "\\mu = \\tan i_p, \\quad i_p + r = 90^\\circ",
      "symbols": "$i_p = \\text{Brewster angle}$, $r = \\text{Angle of refraction}$",
      "units": "$\\text{Degrees}$",
      "tip": "Reflected and refracted rays are mutually perpendicular at Brewster angle."
    },
    {
      "title": "Malus's Law",
      "formula": "I = I_0 \\cos^2 \\theta",
      "symbols": "$I_0 = \\text{Initial polarized intensity}$, $\\theta = \\text{Angle between pass axes}$",
      "units": "$\\text{W/m}^2$",
      "tip": "At $\\theta = 90^\\circ$ (crossed polarizers), transmitted intensity is $0$."
    },
    {
      "title": "Fringe Width in a Medium",
      "formula": "\\beta' = \\frac{\\beta}{\\mu} = \\frac{\\lambda D}{\\mu d}",
      "symbols": "$\\beta' = \\text{Fringe width in medium}$, $\\mu = \\text{Refractive index of medium}$, $\\beta = \\text{Fringe width in air}$",
      "units": "$\\text{m or mm}$",
      "tip": "When Young double slit apparatus is immersed in water ($\\mu = 4/3$), fringe width decreases to $3/4$th of its value in air."
    },
    {
      "title": "Resolving Power of Astronomical Telescope",
      "formula": "RP = \\frac{1}{d\\theta} = \\frac{a}{1.22 \\lambda}",
      "symbols": "$a = \\text{Diameter of telescope objective aperture}$, $\\lambda = \\text{Wavelength of incident light}$, $d\\theta = \\text{Limit of resolution}$",
      "units": "$\\text{rad}^{-1}$",
      "tip": "Resolving power increases with larger objective aperture $a$ and shorter wavelength $\\lambda$."
    }
  ],
  "questions": [
    {
      "id": "phy-ch03-q001",
      "subject": "Physics",
      "chapter": "Wave Optics",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "What is a wavefront? Mention the shape of wavefront originating from a point source at a finite distance.",
      "answer": "1. Wavefront: The locus of all points having the same phase of oscillation is called a wavefront.\n2. Shape: From a point source at finite distance, the wavefront is spherical.",
      "formula": "\\phi = \\text{constant}",
      "telugu_hint": "smaan dshlo umde anni pointl bimdupthaanni trmg mukhm antaru. bimdu roop jnkm daggara golaakaar trmg mukhm form avthundi.",
      "source_check": "verified",
      "tenglish_hint": "smaan dshlo umde anni pointl bimdupthaanni trmg mukhm antaru. bimdu roop jnkm daggara golaakaar trmg mukhm form avthundi."
    },
    {
      "id": "phy-ch03-q002",
      "subject": "Physics",
      "chapter": "Wave Optics",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "State Brewster's law and write the mathematical relation.",
      "answer": "• Statement: When unpolarized light is incident at the polarizing angle ($i_p$) on a transparent medium, the reflected ray is completely plane polarized.\n• Mathematical expression: $\\mu = \\tan i_p$, where $\\mu$ is the refractive index.",
      "formula": "\\mu = \\tan i_p",
      "telugu_hint": "Polarizing angle daggara reflected ray completely plane polarized avtundi: $\\mu = \\tan i_p$.",
      "source_check": "verified",
      "tenglish_hint": "Polarizing angle daggara reflected ray completely plane polarized avtundi: $\\mu = \\tan i_p$."
    },
    {
      "id": "phy-ch03-q003",
      "subject": "Physics",
      "chapter": "Wave Optics",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "What are coherent sources? State why two independent bulbs cannot act as coherent sources.",
      "answer": "1. Coherent sources emit light waves of identical wavelength/frequency with a constant or zero phase difference.\n2. Two independent bulbs cannot be coherent because atomic transitions emitting light occur randomly and independently.",
      "formula": "\\Delta \\phi = \\text{constant}",
      "telugu_hint": "oke frequency and constantmain dshaapedm unn trmgaalnu vidudl chese jnkaalnu smbddh jnkaalu antaru.",
      "source_check": "verified",
      "tenglish_hint": "oke frequency and constantmain dshaapedm unn trmgaalnu vidudl chese jnkaalnu smbddh jnkaalu antaru."
    },
    {
      "id": "phy-ch03-q004",
      "subject": "Physics",
      "chapter": "Wave Optics",
      "type": "VSAQ",
      "marks": 2,
      "important": false,
      "question": "State Malus' law for the intensity of light transmitted through an analyzer.",
      "answer": "• Statement: When completely plane-polarized light of intensity $I_0$ passes through an analyzer, transmitted intensity $I$ is directly proportional to $\\cos^2 \\theta$, where $\\theta$ is the angle between their pass axes:\n$I = I_0 \\cos^2 \\theta$.",
      "formula": "I = I_0 \\cos^2 \\theta",
      "telugu_hint": "Analyzer nundi emerge ayye light intensity: $I = I_0 \\cos^2 \\theta$ (Malus Law).",
      "source_check": "verified",
      "tenglish_hint": "Analyzer nundi emerge ayye light intensity: $I = I_0 \\cos^2 \\theta$ (Malus Law)."
    },
    {
      "id": "phy-ch03-q005",
      "subject": "Physics",
      "chapter": "Wave Optics",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Derive the expression for the fringe width in Young's double slit experiment.",
      "answer": "1. Setup: Two slits $S_1, S_2$ separated by $d$; screen placed at distance $D$ ($D \\gg d$). Point $P$ is at distance $x$ from central maximum $O$.\n2. Path Difference: $\\Delta x = S_2P - S_1P$.\n$(S_2P)^2 - (S_1P)^2 = [D^2 + (x + d/2)^2] - [D^2 + (x - d/2)^2] = 2xd$Since $S_2P + S_1P \\approx 2D$, $\\Delta x = \\frac{xd}{D}$.\n3. Bright Fringe Condition: $\\Delta x = n\\lambda \\implies x_n = \\frac{n\\lambda D}{d}$.\n4. Fringe Width ($\\beta$): Separation between successive bright fringes:\n$\\beta = x_n - x_{n-1} = \\frac{\\lambda D}{d}$.",
      "formula": "\\beta = \\frac{\\lambda D}{d}",
      "telugu_hint": "Fringe width formula: $\\beta = \\frac{\\lambda D}{d}$.",
      "source_check": "verified",
      "tenglish_hint": "Fringe width formula: $\\beta = \\frac{\\lambda D}{d}$."
    },
    {
      "id": "phy-ch03-q006",
      "subject": "Physics",
      "chapter": "Wave Optics",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Prove that the reflected and refracted rays are mutually perpendicular at Brewster's angle.",
      "answer": "1. By Snell's Law: $\\mu = \\frac{\\sin i_p}{\\sin r}$.\n2. By Brewster's Law: $\\mu = \\tan i_p = \\frac{\\sin i_p}{\\cos i_p}$.\n3. Equating both: $\\frac{\\sin i_p}{\\sin r} = \\frac{\\sin i_p}{\\cos i_p} \\implies \\sin r = \\cos i_p$.\n4. We know $\\cos i_p = \\sin(90^\\circ - i_p) \\implies r = 90^\\circ - i_p$.\n5. Therefore: $i_p + r = 90^\\circ$. Hence, angle between reflected and refracted rays is $180^\\circ - (i_p + r) = 90^\\circ$.",
      "formula": "i_p + r = 90^\\circ",
      "telugu_hint": "$\\tan i_p = \\mu$ and snel law polchite $i_p + r = 90^\\circ$ ani vasthundi.",
      "source_check": "verified",
      "tenglish_hint": "$\\tan i_p = \\mu$ and snel law polchite $i_p + r = 90^\\circ$ ani vasthundi."
    },
    {
      "id": "phy-ch03-q007",
      "subject": "Physics",
      "chapter": "Wave Optics",
      "type": "Numerical",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "In Young's experiment, slits are separated by $0.28\\text{ mm}$ and screen is placed $1.4\\text{ m}$ away. Distance of 4th bright fringe from center is $1.2\\text{ cm}$. Calculate the wavelength of light.",
      "answer": "• Given: $d = 0.28 \\times 10^{-3} \\text{ m}$, $D = 1.4 \\text{ m}$, $x_4 = 1.2 \\times 10^{-2} \\text{ m}$, $n = 4$.\n• Formula: $x_n = \\frac{n\\lambda D}{d} \\implies \\lambda = \\frac{x_4 d}{4D}$\n• Calculation: $\\lambda = \\frac{1.2 \\times 10^{-2} \\times 0.28 \\times 10^{-3}}{4 \\times 1.4} = \\frac{0.336 \\times 10^{-5}}{5.6} = 6 \\times 10^{-7} \\text{ m} = 6000 \\text{ Å}$.\n• Result: $\\lambda = 600 \\text{ nm}$.",
      "formula": "\\lambda = \\frac{x_4 d}{4D} = 6000 \\text{ Å}",
      "telugu_hint": "$\\lambda = \\frac{x_4 d}{4D} = 600\\text{ nm}$.",
      "source_check": "verified",
      "tenglish_hint": "$\\lambda = \\frac{x_4 d}{4D} = 600\\text{ nm}$."
    },
    {
      "id": "phy-ch03-q008",
      "subject": "Physics",
      "chapter": "Wave Optics",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "Which of the following optical phenomena demonstrates that light is a transverse wave?",
      "options": [
        "A) Interference",
        "B) Diffraction",
        "C) Polarization",
        "D) Refraction"
      ],
      "correctOption": 2,
      "answer": "Correct Answer: C) Polarization.\n• Only transverse waves can exhibit polarization.",
      "formula": "\\text{Polarization confirms transverse nature}",
      "telugu_hint": "polarization light tiryk trmg svbhaavaanni nirdhaaristumdi.",
      "source_check": "verified",
      "tenglish_hint": "polarization light tiryk trmg svbhaavaanni nirdhaaristumdi."
    }
  ]
};

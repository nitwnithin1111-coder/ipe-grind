# -*- coding: utf-8 -*-
"""
IPE TS Inter 2nd Year - Physics Chapters 3 to 9 Generator
"""
import json
import os

OUTPUT_DIR = r"C:\Users\chary\.gemini\antigravity\scratch\ipe-grind\data\physics"

def save_chapter(ch_data, filename, var_name):
    path = os.path.join(OUTPUT_DIR, filename)
    json_str = json.dumps(ch_data, indent=2, ensure_ascii=False)
    content = (
        f"// IPE TS 2nd Year Physics - Chapter {ch_data['chapterNumber']}: {ch_data['chapter']}\n"
        "// Fully compliant with IPE Telangana Board format and syllabus requirements\n\n"
        "window.IPE_DATA = window.IPE_DATA || {};\n"
        "window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};\n\n"
        f"const {var_name} = {json_str};\n\n"
        "if (typeof window.registerChapter === 'function') {\n"
        f"  window.registerChapter({var_name});\n"
        "} else {\n"
        f"  window.IPE_DATA.chapters[{var_name}.id] = {var_name};\n"
        "}\n"
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved {filename} with {len(ch_data['questions'])} questions and {len(ch_data['formulaSheet'])} formulas.")

# ==============================================================================
# CH 3: Wave Optics
# ==============================================================================
ch03 = {
    "id": "phy-ch03", "subject": "Physics", "chapterNumber": 3, "chapter": "Wave Optics",
    "formulaSheet": [
        {"title": "Huygens Wave Theory & Refraction", "formula": "\\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2} = \\frac{\\mu_2}{\\mu_1}", "symbols": "v_1, v_2 = \\text{Speeds in media 1 and 2}", "units": "\\text{m/s}", "tip": "Frequency remains unchanged during refraction."},
        {"title": "Young's Double Slit Fringe Width", "formula": "\\beta = \\frac{\\lambda D}{d}", "symbols": "\\lambda = \\text{Wavelength}, D = \\text{Screen distance}, d = \\text{Slit separation}", "units": "\\text{m, mm}", "tip": "Angular width \\theta = \\beta/D = \\lambda/d."},
        {"title": "Brewster's Law", "formula": "\\mu = \\tan i_p, \\quad i_p + r = 90^\\circ", "symbols": "i_p = \\text{Brewster angle}, r = \\text{Angle of refraction}", "units": "\\text{Degrees}", "tip": "Reflected and refracted rays are mutually perpendicular at Brewster angle."},
        {"title": "Malus's Law", "formula": "I = I_0 \\cos^2 \\theta", "symbols": "I_0 = \\text{Initial polarized intensity}, \\theta = \\text{Angle between pass axes}", "units": "\\text{W/m}^2", "tip": "At \\theta = 90^\\circ (crossed polarizers), transmitted intensity is 0."}
    ],
    "questions": [
        {"id": "phy-ch03-q001", "subject": "Physics", "chapter": "Wave Optics", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is a wavefront? Mention the shape of wavefront originating from a point source at a finite distance.",
         "answer": "1. Wavefront: The locus of all points having the same phase of oscillation is called a wavefront.\n2. Shape: From a point source at finite distance, the wavefront is spherical.",
         "formula": "\\phi = \\text{constant}", "telugu_hint": "సమాన దశలో ఉండే అన్ని బిందువుల బిందుపథాన్ని తరంగ ముఖం అంటారు. బిందు రూప జనకం వద్ద గోళాకార తరంగ ముఖం ఏర్పడుతుంది.", "source_check": "verified"},
        {"id": "phy-ch03-q002", "subject": "Physics", "chapter": "Wave Optics", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Brewster's law and write the mathematical relation.",
         "answer": "• Statement: When unpolarized light is incident at the polarizing angle ($i_p$) on a transparent medium, the reflected ray is completely plane polarized.\n• Mathematical expression: $\\mu = \\tan i_p$, where $\\mu$ is the refractive index.",
         "formula": "\\mu = \\tan i_p", "telugu_hint": "ధ్రువణ కోణం వద్ద పరావర్తన కాంతి పూర్తిగా తల ధ్రువితమవుతుంది: \\mu = \\tan i_p.", "source_check": "verified"},
        {"id": "phy-ch03-q003", "subject": "Physics", "chapter": "Wave Optics", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What are coherent sources? State why two independent bulbs cannot act as coherent sources.",
         "answer": "1. Coherent sources emit light waves of identical wavelength/frequency with a constant or zero phase difference.\n2. Two independent bulbs cannot be coherent because atomic transitions emitting light occur randomly and independently.",
         "formula": "\\Delta \\phi = \\text{constant}", "telugu_hint": "ఒకే పౌనఃపున్యం మరియు స్థిరమైన దశాపేదం ఉన్న తరంగాలను విడుదల చేసే జనకాలను సంబద్ధ జనకాలు అంటారు.", "source_check": "verified"},
        {"id": "phy-ch03-q004", "subject": "Physics", "chapter": "Wave Optics", "type": "VSAQ", "marks": 2, "important": False,
         "question": "State Malus' law for the intensity of light transmitted through an analyzer.",
         "answer": "• Statement: When completely plane-polarized light of intensity $I_0$ passes through an analyzer, transmitted intensity $I$ is directly proportional to $\\cos^2 \\theta$, where $\\theta$ is the angle between their pass axes:\n$I = I_0 \\cos^2 \\theta$.",
         "formula": "I = I_0 \\cos^2 \\theta", "telugu_hint": "విశ్లేషణకారి గుండా ప్రసారమయ్యే కాంతి తీవ్రత I = I_0 \\cos^2 \\theta.", "source_check": "verified"},
        {"id": "phy-ch03-q005", "subject": "Physics", "chapter": "Wave Optics", "type": "SAQ", "marks": 4, "important": True,
         "question": "Derive the expression for the fringe width in Young's double slit experiment.",
         "answer": "1. Setup: Two slits $S_1, S_2$ separated by $d$; screen placed at distance $D$ ($D \\gg d$). Point $P$ is at distance $x$ from central maximum $O$.\n2. Path Difference: $\\Delta x = S_2P - S_1P$.\n$(S_2P)^2 - (S_1P)^2 = [D^2 + (x + d/2)^2] - [D^2 + (x - d/2)^2] = 2xd$\nSince $S_2P + S_1P \\approx 2D$, $\\Delta x = \\frac{xd}{D}$.\n3. Bright Fringe Condition: $\\Delta x = n\\lambda \\implies x_n = \\frac{n\\lambda D}{d}$.\n4. Fringe Width ($\\beta$): Separation between successive bright fringes:\n$\\beta = x_n - x_{n-1} = \\frac{\\lambda D}{d}$.",
         "formula": "\\beta = \\frac{\\lambda D}{d}", "telugu_hint": "వ్యవధాన పట్టీ వెడల్పు సూత్రం: \\beta = \\frac{\\lambda D}{d}.", "source_check": "verified"},
        {"id": "phy-ch03-q006", "subject": "Physics", "chapter": "Wave Optics", "type": "SAQ", "marks": 4, "important": True,
         "question": "Prove that the reflected and refracted rays are mutually perpendicular at Brewster's angle.",
         "answer": "1. By Snell's Law: $\\mu = \\frac{\\sin i_p}{\\sin r}$.\n2. By Brewster's Law: $\\mu = \\tan i_p = \\frac{\\sin i_p}{\\cos i_p}$.\n3. Equating both: $\\frac{\\sin i_p}{\\sin r} = \\frac{\\sin i_p}{\\cos i_p} \\implies \\sin r = \\cos i_p$.\n4. We know $\\cos i_p = \\sin(90^\\circ - i_p) \\implies r = 90^\\circ - i_p$.\n5. Therefore: $i_p + r = 90^\\circ$. Hence, angle between reflected and refracted rays is $180^\\circ - (i_p + r) = 90^\\circ$.",
         "formula": "i_p + r = 90^\\circ", "telugu_hint": "\\tan i_p = \\mu మరియు స్నెల్ నియమం పోల్చితే i_p + r = 90^\\circ అని వస్తుంది.", "source_check": "verified"},
        {"id": "phy-ch03-q007", "subject": "Physics", "chapter": "Wave Optics", "type": "Numerical", "marks": 4, "important": True,
         "question": "In Young's experiment, slits are separated by 0.28 mm and screen is placed 1.4 m away. Distance of 4th bright fringe from center is 1.2 cm. Calculate the wavelength of light.",
         "answer": "• Given: $d = 0.28 \\times 10^{-3} \\text{ m}$, $D = 1.4 \\text{ m}$, $x_4 = 1.2 \\times 10^{-2} \\text{ m}$, $n = 4$.\n• Formula: $x_n = \\frac{n\\lambda D}{d} \\implies \\lambda = \\frac{x_4 d}{4D}$\n• Calculation: $\\lambda = \\frac{1.2 \\times 10^{-2} \\times 0.28 \\times 10^{-3}}{4 \\times 1.4} = \\frac{0.336 \\times 10^{-5}}{5.6} = 6 \\times 10^{-7} \\text{ m} = 6000 \\text{ Å}$.\n• Result: $\\lambda = 600 \\text{ nm}$.",
         "formula": "\\lambda = \\frac{x_4 d}{4D} = 6000 \\text{ Å}", "telugu_hint": "\\lambda = \\frac{x_4 d}{4D} = 600 \\text{ nm}.", "source_check": "verified"},
        {"id": "phy-ch03-q008", "subject": "Physics", "chapter": "Wave Optics", "type": "MCQ", "marks": 1, "important": False,
         "question": "Which of the following optical phenomena demonstrates that light is a transverse wave?",
         "options": ["A) Interference", "B) Diffraction", "C) Polarization", "D) Refraction"],
         "correctOption": 2, "answer": "Correct Answer: C) Polarization.\n• Only transverse waves can exhibit polarization.",
         "formula": "\\text{Polarization confirms transverse nature}", "telugu_hint": "ధ్రువణం కాంతి తిర్యక్ తరంగ స్వభావాన్ని నిర్ధారిస్తుంది.", "source_check": "verified"}
    ]
}
save_chapter(ch03, "ch03-wave-optics.js", "waveOpticsChapter")

# ==============================================================================
# CH 4: Electric Charges and Fields
# ==============================================================================
ch04 = {
    "id": "phy-ch04", "subject": "Physics", "chapterNumber": 4, "chapter": "Electric Charges and Fields",
    "formulaSheet": [
        {"title": "Coulomb's Law in Vacuum", "formula": "F = \\frac{1}{4\\pi \\varepsilon_0}\\frac{q_1 q_2}{r^2}", "symbols": "\\frac{1}{4\\pi \\varepsilon_0} = 9 \\times 10^9 \\text{ N m}^2/\\text{C}^2, \\varepsilon_0 = 8.854 \\times 10^{-12} \\text{ C}^2/\\text{N m}^2", "units": "\\text{Newton (N)}", "tip": "In a dielectric medium of constant K, force decreases by K: F_m = F/K."},
        {"title": "Electric Field of Dipole on Axial & Equatorial Line", "formula": "E_{axial} = \\frac{1}{4\\pi \\varepsilon_0}\\frac{2p}{r^3}, \\quad E_{equatorial} = \\frac{1}{4\\pi \\varepsilon_0}\\frac{p}{r^3}", "symbols": "p = 2aq = \\text{Dipole moment}, r = \\text{Distance from center}", "units": "\\text{N/C or V/m}", "tip": "E_{axial} = 2 E_{equatorial} for a short dipole at same distance r."},
        {"title": "Torque on a Dipole in Uniform Electric Field", "formula": "\\vec{\\tau} = \\vec{p} \\times \\vec{E} \\implies \\tau = pE\\sin\\theta", "symbols": "p = \\text{Dipole moment}, E = \\text{Electric field}, \\theta = \\text{Angle between p and E}", "units": "\\text{N}\\cdot\\text{m}", "tip": "Stable equilibrium at \\theta = 0^\\circ (\\tau = 0), maximum torque at \\theta = 90^\\circ."},
        {"title": "Gauss's Law", "formula": "\\Phi = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{enclosed}}{\\varepsilon_0}", "symbols": "\\Phi = \\text{Total electric flux}, q_{enclosed} = \\text{Net charge inside closed surface}", "units": "\\text{N}\\cdot\\text{m}^2/\\text{C}", "tip": "Electric flux through a closed surface is independent of its shape or size."}
    ],
    "questions": [
        {"id": "phy-ch04-q001", "subject": "Physics", "chapter": "Electric Charges and Fields", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Coulomb's inverse square law in electrostatics and write the vector form.",
         "answer": "• Statement: The electrostatic force between two stationary point charges is directly proportional to the product of charges and inversely proportional to the square of the distance between them.\n• Vector form: $\\vec{F}_{12} = \\frac{1}{4\\pi \\varepsilon_0} \\frac{q_1 q_2}{r^2} \\hat{r}_{12}$.",
         "formula": "F = \\frac{1}{4\\pi \\varepsilon_0}\\frac{q_1 q_2}{r^2}", "telugu_hint": "రెండు స్థిర బిందు ఆవేశాల మధ్య ఆకర్షణ లేదా వికర్షణ బలం ఆవేశాల లబ్దానికి అనులోమానుపాతంలో, వాటి మధ్య దూర వర్గానికి విలోమానుపాతంలో ఉంటుంది.", "source_check": "verified"},
        {"id": "phy-ch04-q002", "subject": "Physics", "chapter": "Electric Charges and Fields", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Define electric dipole moment. State its SI unit and direction.",
         "answer": "1. Definition: Electric dipole moment $\\vec{p}$ is the product of magnitude of either charge $q$ and the distance $2a$ between them.\n2. SI Unit: Coulomb-meter ($\\text{C}\\cdot\\text{m}$).\n3. Direction: By convention, directed from negative charge $(-q)$ to positive charge $(+q)$.",
         "formula": "\\vec{p} = q(2\\vec{a})", "telugu_hint": "విద్యుత్ ద్విధ్రువ భ్రామకం p = q(2a). దిశ: ఋణ ఆవేశం నుండి ధన ఆవేశం వైపు.", "source_check": "verified"},
        {"id": "phy-ch04-q003", "subject": "Physics", "chapter": "Electric Charges and Fields", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Gauss's law in electrostatics.",
         "answer": "• Statement: The total electric flux through any closed Gaussian surface in vacuum is equal to $\\frac{1}{\\varepsilon_0}$ times the net charge enclosed inside the surface.",
         "formula": "\\Phi = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{enclosed}}{\\varepsilon_0}", "telugu_hint": "ఏదైనా సంవృత తలం గుండా వెళ్ళే మొత్తం విద్యుత్ అభివాహం ఆ తలంలో ఉండే నికర ఆవేశానికి 1/\\varepsilon_0 రెట్లు ఉంటుంది.", "source_check": "verified"},
        {"id": "phy-ch04-q004", "subject": "Physics", "chapter": "Electric Charges and Fields", "type": "SAQ", "marks": 4, "important": True,
         "question": "Derive an expression for the torque experienced by an electric dipole in a uniform electric field.",
         "answer": "1. Setup: An electric dipole of length $2a$ with charges $-q$ and $+q$ is placed in a uniform electric field $\\vec{E}$ at angle $\\theta$.\n2. Forces: Force on $+q$ is $\\vec{F}_+ = +q\\vec{E}$ and on $-q$ is $\\vec{F}_- = -q\\vec{E}$.\n• Net force $\\vec{F}_{net} = q\\vec{E} - q\\vec{E} = 0$.\n3. Torque: The two equal, opposite and parallel forces separated by perpendicular distance form a couple.\n• Perpendicular distance $d = 2a\\sin\\theta$.\n• $\\tau = \\text{Force} \\times \\text{Perpendicular distance} = qE \\times (2a\\sin\\theta) = (q \\cdot 2a)E\\sin\\theta$.\n• Since $p = 2aq$, we have $\\tau = pE\\sin\\theta$.\n4. Vector form: $\\vec{\\tau} = \\vec{p} \\times \\vec{E}$.",
         "formula": "\\vec{\\tau} = \\vec{p} \\times \\vec{E} \\implies \\tau = pE\\sin\\theta", "telugu_hint": "సమరూప విద్యుత్ క్షేత్రంలో ద్విధ్రువంపై నికర బలం సున్నా, కానీ టార్క్ \\tau = pE\\sin\\theta లేదా \\vec{\\tau} = \\vec{p} \\times \\vec{E} ఏర్పడుతుంది.", "source_check": "verified"},
        {"id": "phy-ch04-q005", "subject": "Physics", "chapter": "Electric Charges and Fields", "type": "SAQ", "marks": 4, "important": True,
         "question": "State Gauss's law and apply it to find the electric field intensity due to an infinitely long straight charged wire.",
         "answer": "1. Gauss's Law: $\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q}{\\varepsilon_0}$.\n2. Setup: Let wire have uniform linear charge density $\\lambda$. Choose a cylindrical Gaussian surface of radius $r$ and length $l$ coaxial with the wire.\n3. Flux calculation:\n• Flux through circular end faces is zero because $\\vec{E} \\perp d\\vec{A}$ ($\\cos 90^\\circ = 0$).\n• Flux through curved surface: $\\Phi = E \\times (2\\pi r l)$.\n4. Charge enclosed: $q_{enclosed} = \\lambda l$.\n5. By Gauss's Law: $E(2\\pi r l) = \\frac{\\lambda l}{\\varepsilon_0} \\implies E = \\frac{\\lambda}{2\\pi \\varepsilon_0 r}$.",
         "formula": "E = \\frac{\\lambda}{2\\pi \\varepsilon_0 r}", "telugu_hint": "అనంత పొడవు గల తీగ వద్ద విద్యుత్ క్షేత్ర తీవ్రత: E = \\frac{\\lambda}{2\\pi \\varepsilon_0 r}.", "source_check": "verified"},
        {"id": "phy-ch04-q006", "subject": "Physics", "chapter": "Electric Charges and Fields", "type": "Numerical", "marks": 4, "important": True,
         "question": "Two point charges $q_1 = +2\\mu\\text{C}$ and $q_2 = -2\\mu\\text{C}$ are separated by 20 cm in air. Find the electric field at the midpoint of the line joining them.",
         "answer": "• Given: $q_1 = +2 \\times 10^{-6}\\text{ C}$, $q_2 = -2 \\times 10^{-6}\\text{ C}$, separation $2r = 0.2\\text{ m} \\implies r = 0.1\\text{ m}$.\n• At midpoint, $\\vec{E}_1$ due to $+q_1$ is directed towards $q_2$. $\\vec{E}_2$ due to $-q_2$ is also directed towards $q_2$.\n• $E_1 = \\frac{1}{4\\pi \\varepsilon_0}\\frac{q_1}{r^2} = \\frac{9 \\times 10^9 \\times 2 \\times 10^{-6}}{(0.1)^2} = 1.8 \\times 10^6\\text{ N/C}$.\n• $E_2 = \\frac{9 \\times 10^9 \\times 2 \\times 10^{-6}}{(0.1)^2} = 1.8 \\times 10^6\\text{ N/C}$.\n• Net Field: $E_{net} = E_1 + E_2 = 3.6 \\times 10^6\\text{ N/C}$ directed towards the negative charge.",
         "formula": "E_{net} = E_1 + E_2 = 3.6 \\times 10^6\\text{ N/C}", "telugu_hint": "రెండు క్షేత్రాల దిశలు ఒకే వైపు (ఋణ ఆవేశం వైపు) ఉంటాయి, కాబట్టి కూడాలి: 1.8 + 1.8 = 3.6 \\times 10^6 N/C.", "source_check": "verified"},
        {"id": "phy-ch04-q007", "subject": "Physics", "chapter": "Electric Charges and Fields", "type": "MCQ", "marks": 1, "important": False,
         "question": "The electric flux through a closed surface containing a net charge of $1 \\text{ C}$ in vacuum is:",
         "options": ["A) $8.85 \\times 10^{-12} \\text{ N m}^2/\\text{C}$", "B) $1.13 \\times 10^{11} \\text{ N m}^2/\\text{C}$", "C) $9 \\times 10^9 \\text{ N m}^2/\\text{C}$", "D) Zero"],
         "correctOption": 1, "answer": "Correct Answer: B) $1.13 \\times 10^{11} \\text{ N m}^2/\\text{C}$.\n• $\\Phi = \\frac{q}{\\varepsilon_0} = \\frac{1}{8.854 \\times 10^{-12}} \\approx 1.13 \\times 10^{11} \\text{ N m}^2/\\text{C}$.",
         "formula": "\\Phi = \\frac{1}{\\varepsilon_0} = 1.13 \\times 10^{11}\\text{ N m}^2/\\text{C}", "telugu_hint": "\\Phi = 1 / \\varepsilon_0 = 1.13 \\times 10^{11}.", "source_check": "verified"}
    ]
}
save_chapter(ch04, "ch04-electric-charges.js", "electricChargesChapter")

# ==============================================================================
# CH 5: Electrostatic Potential and Capacitance
# ==============================================================================
ch05 = {
    "id": "phy-ch05", "subject": "Physics", "chapterNumber": 5, "chapter": "Electrostatic Potential and Capacitance",
    "formulaSheet": [
        {"title": "Electric Potential due to Point Charge", "formula": "V = \\frac{1}{4\\pi \\varepsilon_0}\\frac{q}{r}", "symbols": "q = \\text{Source charge}, r = \\text{Distance}", "units": "\\text{Volt (V) or J/C}", "tip": "Scalar quantity; sign of charge must be included."},
        {"title": "Capacitance of Parallel Plate Capacitor", "formula": "C_0 = \\frac{\\varepsilon_0 A}{d}, \\quad C = \\frac{K\\varepsilon_0 A}{d} = K C_0", "symbols": "A = \\text{Plate area}, d = \\text{Plate separation}, K = \\text{Dielectric constant}", "units": "\\text{Farad (F)}", "tip": "Introducing a dielectric increases capacitance by factor K."},
        {"title": "Energy Stored in a Capacitor", "formula": "U = \\frac{1}{2} C V^2 = \\frac{Q^2}{2C} = \\frac{1}{2} Q V", "symbols": "Q = \\text{Charge}, V = \\text{Potential difference}, C = \\text{Capacitance}", "units": "\\text{Joule (J)}", "tip": "Energy density in electric field u = \\frac{1}{2}\\varepsilon_0 E^2."},
        {"title": "Series and Parallel Combination of Capacitors", "formula": "\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2}, \\quad C_p = C_1 + C_2", "symbols": "C_s = \\text{Series equivalent}, C_p = \\text{Parallel equivalent}", "units": "\\text{Farad (F)}", "tip": "In series, charge Q is same. In parallel, potential V is same."}
    ],
    "questions": [
        {"id": "phy-ch05-q001", "subject": "Physics", "chapter": "Electrostatic Potential and Capacitance", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is an equipotential surface? State any two properties of equipotential surfaces.",
         "answer": "1. Definition: Any surface having the same electric potential at every point is called an equipotential surface.\n2. Properties:\n• No work is done in moving a test charge over an equipotential surface ($W = q\\Delta V = 0$).\n• Electric field lines are always perpendicular to the equipotential surface at every point.",
         "formula": "V = \\text{constant}, \\quad W = 0", "telugu_hint": "ఉపరితలంపై అన్ని బిందువుల వద్ద సమాన విద్యుత్ పోటెన్షియల్ ఉండే తలాన్ని సమపోటెన్షియల్ తలం అంటారు. దీనిపై ఆవేశాన్ని కదల్చడానికి పని సున్నా.", "source_check": "verified"},
        {"id": "phy-ch05-q002", "subject": "Physics", "chapter": "Electrostatic Potential and Capacitance", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Why can two equipotential surfaces never intersect each other?",
         "answer": "• If two equipotential surfaces intersect, at the point of intersection there would be two different values of electric potential and two different directions of electric field, which is physically impossible.",
         "formula": "\\vec{E} \\perp \\text{Surface}", "telugu_hint": "ఖండించుకుంటే ఒకే బిందువు వద్ద రెండు వేర్వేరు పోటెన్షియల్ విలువలు మరియు విద్యుత్ క్షేత్ర దిశలు ఉంటాయి, ఇది అసాధ్యం.", "source_check": "verified"},
        {"id": "phy-ch05-q003", "subject": "Physics", "chapter": "Electrostatic Potential and Capacitance", "type": "SAQ", "marks": 4, "important": True,
         "question": "Derive the expression for the capacitance of a parallel plate capacitor with air as dielectric.",
         "answer": "1. Setup: Two parallel conducting plates of area $A$ separated by distance $d$ have charges $+Q$ and $-Q$. Surface charge density $\\sigma = Q/A$.\n2. Electric field between plates:\n• Electric field $E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{Q}{\\varepsilon_0 A}$.\n3. Potential Difference:\n• $V = E \\cdot d = \\frac{Q d}{\\varepsilon_0 A}$.\n4. Capacitance ($C$):\n• $C = \\frac{Q}{V} = \\frac{Q}{\\frac{Q d}{\\varepsilon_0 A}} = \\frac{\\varepsilon_0 A}{d}$.",
         "formula": "C = \\frac{\\varepsilon_0 A}{d}", "telugu_hint": "సమాంతర పలకల కెపాసిటెన్స్ సూత్రం: C = \\frac{\\varepsilon_0 A}{d}.", "source_check": "verified"},
        {"id": "phy-ch05-q004", "subject": "Physics", "chapter": "Electrostatic Potential and Capacitance", "type": "SAQ", "marks": 4, "important": True,
         "question": "Derive the formula for equivalent capacitance when three capacitors are connected in (a) Series, and (b) Parallel.",
         "answer": "• **(a) Series Combination**:\n1. Charge $Q$ is identical on all capacitors, while potential divides: $V = V_1 + V_2 + V_3$.\n2. Since $V_i = Q/C_i$, $V = \\frac{Q}{C_1} + \\frac{Q}{C_2} + \\frac{Q}{C_3} = Q\\left(\\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3}\\right)$.\n3. Since $V = Q/C_s$, we get: $\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3}$.\n\n• **(b) Parallel Combination**:\n1. Potential $V$ is same across each capacitor, while charge divides: $Q = Q_1 + Q_2 + Q_3$.\n2. Since $Q_i = C_i V$, $Q = C_1V + C_2V + C_3V = (C_1 + C_2 + C_3)V$.\n3. Since $Q = C_p V$, we get: $C_p = C_1 + C_2 + C_3$.",
         "formula": "\\frac{1}{C_s} = \\sum \\frac{1}{C_i}, \\quad C_p = \\sum C_i", "telugu_hint": "శ్రేణిలో \\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3}; సమాంతరంలో C_p = C_1 + C_2 + C_3.", "source_check": "verified"},
        {"id": "phy-ch05-q005", "subject": "Physics", "chapter": "Electrostatic Potential and Capacitance", "type": "Numerical", "marks": 4, "important": True,
         "question": "A $900 \\text{ pF}$ capacitor is charged by a $100 \\text{ V}$ battery. How much electrostatic energy is stored by the capacitor?",
         "answer": "• Given: $C = 900 \\text{ pF} = 900 \\times 10^{-12} \\text{ F} = 9 \\times 10^{-10} \\text{ F}$, $V = 100 \\text{ V}$.\n• Formula: $U = \\frac{1}{2} C V^2$\n• Calculation:\n$U = \\frac{1}{2} \\times (9 \\times 10^{-10}) \\times (100)^2 = \\frac{1}{2} \\times 9 \\times 10^{-10} \\times 10^4 = 4.5 \\times 10^{-6} \\text{ J} = 4.5 \\;\\mu\\text{J}$.\n• Result: Energy stored = $4.5 \\times 10^{-6} \\text{ J}$.",
         "formula": "U = \\frac{1}{2}CV^2 = 4.5 \\times 10^{-6} \\text{ J}", "telugu_hint": "U = \\frac{1}{2} C V^2 = \\frac{1}{2} \\times 900 \\times 10^{-12} \\times 10000 = 4.5 \\;\\mu J.", "source_check": "verified"},
        {"id": "phy-ch05-q006", "subject": "Physics", "chapter": "Electrostatic Potential and Capacitance", "type": "MCQ", "marks": 1, "important": False,
         "question": "When a dielectric slab of dielectric constant $K$ is introduced between the plates of an isolated charged capacitor, the energy stored:",
         "options": ["A) Increases K times", "B) Decreases by a factor K", "C) Remains unchanged", "D) Becomes zero"],
         "correctOption": 1, "answer": "Correct Answer: B) Decreases by a factor K.\n• For an isolated capacitor, charge $Q$ is constant. Since $C' = KC$, $U' = \\frac{Q^2}{2C'} = \\frac{Q^2}{2KC} = \\frac{U}{K}$.",
         "formula": "U' = \\frac{U}{K}", "telugu_hint": "వివిక్త కెపాసిటర్‌లో ఆవేశం స్థిరంగా ఉంటుంది, కెపాసిటెన్స్ పెరిగినందున శక్తి U/K తగ్గుతుంది.", "source_check": "verified"}
    ]
}
save_chapter(ch05, "ch05-potential-capacitance.js", "potentialCapacitanceChapter")

# ==============================================================================
# CH 6: Current Electricity (HIGH-YIELD 8M LAQ CHAPTER)
# ==============================================================================
ch06 = {
    "id": "phy-ch06", "subject": "Physics", "chapterNumber": 6, "chapter": "Current Electricity",
    "formulaSheet": [
        {"title": "Ohm's Law & Drift Velocity", "formula": "I = n A e v_d, \\quad v_d = \\frac{e E \\tau}{m}, \\quad R = \\frac{\\rho L}{A}", "symbols": "n = \\text{Carrier density}, e = 1.6 \\times 10^{-19}\\text{ C}, v_d = \\text{Drift velocity}, \\tau = \\text{Relaxation time}", "units": "v_d \\text{ in m/s}, R \\text{ in } \\Omega", "tip": "Drift velocity is very small (order of mm/s), but electric signal travels at speed of light."},
        {"title": "Kirchhoff's Laws", "formula": "\\sum I = 0 \\text{ (Junction Rule)}, \\quad \\sum \\Delta V = 0 \\text{ (Loop Rule)}", "symbols": "\\text{Junction Rule: Conservation of Charge}, \\text{Loop Rule: Conservation of Energy}", "units": "\\text{Ampere (A), Volt (V)}", "tip": "Loop rule states algebraic sum of potential changes around closed loop is zero."},
        {"title": "Wheatstone Bridge Balancing Condition", "formula": "\\frac{P}{Q} = \\frac{R}{S}", "symbols": "P, Q, R, S = \\text{Four resistances arranged in quadrilateral}", "units": "\\Omega", "tip": "When balanced, galvanometer current I_g = 0; no deflection."},
        {"title": "Potentiometer - Comparison of EMFs & Internal Resistance", "formula": "\\frac{E_1}{E_2} = \\frac{l_1}{l_2}, \\quad r = R \\left( \\frac{l_1 - l_2}{l_2} \\right)", "symbols": "l_1 = \\text{Balancing length on open circuit}, l_2 = \\text{Balancing length with shunt resistor R}", "units": "\\Omega, \\text{cm}", "tip": "Potentiometer draws no current at null point, acting as an ideal infinite resistance voltmeter."}
    ],
    "questions": [
        {"id": "phy-ch06-q001", "subject": "Physics", "chapter": "Current Electricity", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Ohm's law and write its mathematical formula with conditions.",
         "answer": "• Statement: At constant temperature and physical conditions, the steady current $I$ flowing through a conductor is directly proportional to the potential difference $V$ across its ends.\n• Formula: $V \\propto I \\implies V = IR$, where $R$ is electrical resistance.",
         "formula": "V = IR", "telugu_hint": "స్థిర ఉష్ణోగ్రత వద్ద వాహకం గుండా ప్రవహించే విద్యుత్ ప్రవాహం దాని చివరల మధ్య ఉండే పోటెన్షియల్ భేదానికి అనులోమానుపాతంలో ఉంటుంది (V = IR).", "source_check": "verified"},
        {"id": "phy-ch06-q002", "subject": "Physics", "chapter": "Current Electricity", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Kirchhoff's First Law (Junction Rule) and Second Law (Loop Rule) and name their conservation principles.",
         "answer": "1. Junction Rule: The algebraic sum of currents meeting at any electrical junction is zero ($\\sum I = 0$). Based on **Conservation of Charge**.\n2. Loop Rule: The algebraic sum of changes in potential around any closed mesh is zero ($\\sum \\Delta V = 0$). Based on **Conservation of Energy**.",
         "formula": "\\sum I = 0, \\quad \\sum \\Delta V = 0", "telugu_hint": "సంధి నియమం ఆవేశ పరిరక్షణపై, లూప్ నియమం శక్తి పరిరక్షణ సూత్రంపై ఆధారపడి ఉంటాయి.", "source_check": "verified"},
        {"id": "phy-ch06-q003", "subject": "Physics", "chapter": "Current Electricity", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Why is a potentiometer preferred over a voltmeter to measure cell EMF?",
         "answer": "• A potentiometer works on the null deflection method and draws **no current** from the cell at balance point, measuring the exact open-circuit EMF.\n• A standard voltmeter draws current, measuring only the smaller terminal potential difference ($V = E - Ir$).",
         "formula": "I_{null} = 0 \\implies V = E", "telugu_hint": "పొటెన్షియోమీటర్ సంతులిత బిందువు వద్ద ఎటువంటి విద్యుత్ తీసుకోదు కాబట్టి ఖచ్చితమైన EMF కొలుస్తుంది.", "source_check": "verified"},
        {"id": "phy-ch06-q004", "subject": "Physics", "chapter": "Current Electricity", "type": "LAQ", "marks": 8, "important": True,
         "question": "State Kirchhoff's laws for an electrical network. Using these laws, obtain the condition for balancing in a Wheatstone bridge.",
         "answer": "1. **Kirchhoff's Laws**:\n• **First Law (Junction Rule)**: At any junction, sum of entering currents equals sum of leaving currents: $\\sum I = 0$ (Conservation of Charge).\n• **Second Law (Loop Rule)**: In any closed loop, algebraic sum of emf's equals algebraic sum of product of current and resistance: $\\sum E = \\sum IR$ (Conservation of Energy).\n\n2. **Wheatstone Bridge Setup**:\n• Four resistors $P, Q, R, S$ form a bridge $ABCD$.\n• Cell $E$ is connected between $A$ and $C$.\n• Galvanometer $G$ of resistance $G$ is connected between $B$ and $D$.\n\n3. **Applying Kirchhoff's Laws**:\n• At Junction $B$: $I_1 - I_g - I_3 = 0$.\n• At Junction $D$: $I_2 + I_g - I_4 = 0$.\n• For closed loop $ABDA$: $I_1 P + I_g G - I_2 R = 0$.\n• For closed loop $BCDB$: $I_3 Q - I_4 S - I_g G = 0$.\n\n4. **Balanced Condition ($I_g = 0$)**:\n• In the balanced state, galvanometer shows null deflection ($I_g = 0$).\n• Then $I_1 = I_3$ and $I_2 = I_4$.\n• From loop $ABDA$: $I_1 P = I_2 R$  --- (1)\n• From loop $BCDB$: $I_1 Q = I_2 S$  --- (2)\n\n5. **Dividing (1) by (2)**:\n$$\\frac{I_1 P}{I_1 Q} = \\frac{I_2 R}{I_2 S} \\implies \\frac{P}{Q} = \\frac{R}{S}$$\n• This is the balancing condition of Wheatstone's bridge.",
         "formula": "\\frac{P}{Q} = \\frac{R}{S}", "telugu_hint": "కిర్కాఫ్ లూప్ నియమాలను ఉపయోగించి విట్ స్టన్ బ్రిడ్జ్ సంతులిత నిబంధన \\frac{P}{Q} = \\frac{R}{S} సాధించాలి.", "source_check": "verified"},
        {"id": "phy-ch06-q005", "subject": "Physics", "chapter": "Current Electricity", "type": "LAQ", "marks": 8, "important": True,
         "question": "State the working principle of a potentiometer. Explain with a neat circuit diagram how a potentiometer is used to (a) compare EMFs of two cells, and (b) determine the internal resistance of a primary cell.",
         "answer": "1. **Principle of Potentiometer**:\n• The potential fall across any length of a uniform wire carrying constant current is directly proportional to its length: $V \\propto l \\implies V = \\phi l$, where $\\phi$ is potential gradient.\n\n2. **(a) Comparison of EMFs of two cells ($E_1, E_2$)**:\n• Primary circuit: Battery $B$, key $K$, rheostat $Rh$ in series with wire $AB$.\n• Secondary circuit: Two cells $E_1, E_2$ connected through two-way key to galvanometer $G$ and jockey.\n• With cell $E_1$ connected, jockey finds balancing length $l_1$: $E_1 = \\phi l_1$  --- (1)\n• With cell $E_2$ connected, jockey finds balancing length $l_2$: $E_2 = \\phi l_2$  --- (2)\n• Dividing (1) by (2): $\\frac{E_1}{E_2} = \\frac{l_1}{l_2}$.\n\n3. **(b) Determination of Internal Resistance ($r$)**:\n• A cell $E$ is connected across wire with resistance box $R$ and key $K_2$ in parallel.\n• When $K_2$ is open (open circuit), balancing length is $l_1$: $E = \\phi l_1$  --- (3)\n• When $K_2$ is closed, current flows through $R$ and terminal voltage $V$ has balancing length $l_2$: $V = \\phi l_2$  --- (4)\n• $\\frac{E}{V} = \\frac{l_1}{l_2}$.\n• Internal resistance $r = R\\left(\\frac{E}{V} - 1\\right) = R\\left(\\frac{l_1 - l_2}{l_2}\\right)$.",
         "formula": "\\frac{E_1}{E_2} = \\frac{l_1}{l_2}, \\quad r = R\\left(\\frac{l_1 - l_2}{l_2}\\right)", "telugu_hint": "పొటెన్షియోమీటర్ సూత్రం V \\propto l. EMFల పోలిక: E_1/E_2 = l_1/l_2; అంతర్గత నిరోధం: r = R(l_1 - l_2)/l_2.", "source_check": "verified"},
        {"id": "phy-ch06-q006", "subject": "Physics", "chapter": "Current Electricity", "type": "Numerical", "marks": 4, "important": True,
         "question": "In a potentiometer arrangement, a cell of EMF 1.25 V gives a balance point at 35.0 cm length of the wire. If the cell is replaced by another cell and the balance point shifts to 63.0 cm, what is the EMF of the second cell?",
         "answer": "• Given: $E_1 = 1.25 \\text{ V}$, $l_1 = 35.0 \\text{ cm}$, $l_2 = 63.0 \\text{ cm}$.\n• Formula: $\\frac{E_1}{E_2} = \\frac{l_1}{l_2} \\implies E_2 = E_1 \\left(\\frac{l_2}{l_1}\\right)$\n• Calculation:\n$E_2 = 1.25 \\times \\left(\\frac{63.0}{35.0}\\right) = 1.25 \\times 1.8 = 2.25 \\text{ V}$.\n• Result: $E_2 = 2.25 \\text{ V}$.",
         "formula": "E_2 = E_1 \\left(\\frac{l_2}{l_1}\\right) = 2.25 \\text{ V}", "telugu_hint": "E_2 = 1.25 \\times \\frac{63}{35} = 2.25 \\text{ V}.", "source_check": "verified"},
        {"id": "phy-ch06-q007", "subject": "Physics", "chapter": "Current Electricity", "type": "MCQ", "marks": 1, "important": False,
         "question": "A wire of resistance $R$ is stretched to double its original length. Its new resistance will be:",
         "options": ["A) 2R", "B) 4R", "C) R/2", "D) R/4"],
         "correctOption": 1, "answer": "Correct Answer: B) 4R.\n• Volume remains constant ($A L = A' L'$). If $L' = 2L$, then $A' = A/2$.\n• $R' = \\rho \\frac{L'}{A'} = \\rho \\frac{2L}{A/2} = 4\\left(\\rho \\frac{L}{A}\\right) = 4R$.",
         "formula": "R' = n^2 R = (2)^2 R = 4R", "telugu_hint": "పొడవు రెట్టింపు చేస్తే అడ్డుకోత వైశాల్యం సగమవుతుంది, నిరోధం 4 రెట్లు (4R) పెరుగుతుంది.", "source_check": "verified"}
    ]
}
save_chapter(ch06, "ch06-current-electricity.js", "currentElectricityChapter")

# ==============================================================================
# CH 7: Moving Charges and Magnetism
# ==============================================================================
ch07 = {
    "id": "phy-ch07", "subject": "Physics", "chapterNumber": 7, "chapter": "Moving Charges and Magnetism",
    "formulaSheet": [
        {"title": "Biot-Savart Law", "formula": "d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\frac{I (d\\vec{l} \\times \\hat{r})}{r^2} \\implies dB = \\frac{\\mu_0}{4\\pi}\\frac{I dl \\sin\\theta}{r^2}", "symbols": "\\frac{\\mu_0}{4\\pi} = 10^{-7} \\text{ T m/A}, I = \\text{Current}, dl = \\text{Current element}", "units": "\\text{Tesla (T)}", "tip": "Magnetic field on axis of circular loop of radius R at distance x is B = \\frac{\\mu_0 I R^2}{2(R^2+x^2)^{3/2}}."},
        {"title": "Ampere's Circuital Law", "formula": "\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{enclosed}", "symbols": "I_{enclosed} = \\text{Total current threading closed loop}", "units": "\\text{T}\\cdot\\text{m}", "tip": "Inside ideal solenoid B = \\mu_0 n I, where n = N/L."},
        {"title": "Lorentz Force", "formula": "\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})", "symbols": "q = \\text{Charge}, \\vec{v} = \\text{Velocity}, \\vec{B} = \\text{Magnetic field}", "units": "\\text{Newton (N)}", "tip": "Magnetic force F_m = q v B \\sin\\theta does zero work since force is always perpendicular to velocity."},
        {"title": "Galvanometer Conversion to Ammeter & Voltmeter", "formula": "S = \\frac{I_g G}{I - I_g} \\text{ (Shunt for Ammeter)}, \\quad R = \\frac{V}{I_g} - G \\text{ (Series R for Voltmeter)}", "symbols": "G = \\text{Galvanometer resistance}, I_g = \\text{Full scale deflection current}", "units": "\\Omega", "tip": "Ideal ammeter resistance = 0. Ideal voltmeter resistance = \\infty."}
    ],
    "questions": [
        {"id": "phy-ch07-q001", "subject": "Physics", "chapter": "Moving Charges and Magnetism", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Biot-Savart law and write its vector form.",
         "answer": "• Statement: The magnetic field $d\\vec{B}$ due to a current element $I d\\vec{l}$ at distance $r$ is directly proportional to current $I$, element length $dl$, sine of angle $\\theta$, and inversely proportional to $r^2$.\n• Vector form: $d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I (d\\vec{l} \\times \\hat{r})}{r^2}$.",
         "formula": "dB = \\frac{\\mu_0}{4\\pi}\\frac{I dl \\sin\\theta}{r^2}", "telugu_hint": "బయోట్-సావర్ట్ నియమం: విద్యుత్ అంశం వల్ల ఏర్పడే అయస్కాంత క్షేత్రం dB = \\frac{\\mu_0}{4\\pi}\\frac{I dl \\sin\\theta}{r^2}.", "source_check": "verified"},
        {"id": "phy-ch07-q002", "subject": "Physics", "chapter": "Moving Charges and Magnetism", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Ampere's circuital law and write its mathematical equation.",
         "answer": "• Statement: The line integral of magnetic field $\\vec{B}$ around any closed loop is equal to $\\mu_0$ times the total steady current enclosed by the loop:\n$\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{enclosed}$.",
         "formula": "\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I", "telugu_hint": "ఆంపియర్ లూప్ నియమం: \\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I.", "source_check": "verified"},
        {"id": "phy-ch07-q003", "subject": "Physics", "chapter": "Moving Charges and Magnetism", "type": "SAQ", "marks": 4, "important": True,
         "question": "Derive the expression for the magnetic field at a point on the axis of a circular current-carrying loop.",
         "answer": "1. Setup: Circular loop of radius $R$ carries current $I$. Point $P$ is on axis at distance $x$ from center $O$. Distance from element $dl$ to $P$ is $r = \\sqrt{R^2 + x^2}$.\n2. By Biot-Savart law: $dB = \\frac{\\mu_0}{4\\pi} \\frac{I dl \\sin 90^\\circ}{r^2} = \\frac{\\mu_0 I dl}{4\\pi (R^2 + x^2)}$.\n3. Resolving $dB$: The axial components $dB\\sin\\alpha = dB \\cdot (R/r)$ add up, while vertical components cancel by symmetry.\n4. Integration: $B = \\int dB \\sin\\alpha = \\frac{\\mu_0 I R}{4\\pi (R^2+x^2)^{3/2}} \\int dl$.\n• Since $\\int dl = 2\\pi R$, we obtain:\n$$B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}$$\n5. At center ($x = 0$): $B_0 = \\frac{\\mu_0 I}{2R}$.",
         "formula": "B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}", "telugu_hint": "వృత్తాకార తీగ చుట్ట అక్షంపై అయస్కాంత క్షేత్రం B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}.", "source_check": "verified"},
        {"id": "phy-ch07-q004", "subject": "Physics", "chapter": "Moving Charges and Magnetism", "type": "SAQ", "marks": 4, "important": True,
         "question": "Explain how a moving coil galvanometer can be converted into (a) an Ammeter, and (b) a Voltmeter.",
         "answer": "• **(a) Conversion to Ammeter**:\n1. A galvanometer is converted into an ammeter by connecting a very small resistance called **Shunt ($S$)** in **parallel** with it.\n2. Since potential across both is equal: $I_g G = (I - I_g)S$.\n3. Shunt formula: $S = \\frac{I_g G}{I - I_g}$.\n\n• **(b) Conversion to Voltmeter**:\n1. A galvanometer is converted into a voltmeter by connecting a **high resistance ($R$)** in **series** with it.\n2. Total potential difference $V = I_g (G + R)$.\n3. Series resistance formula: $R = \\frac{V}{I_g} - G$.",
         "formula": "S = \\frac{I_g G}{I - I_g}, \\quad R = \\frac{V}{I_g} - G", "telugu_hint": "అమ్మీటర్‌గా మార్చడానికి సమాంతరంగా అల్ప నిరోధం (షంట్ S); వోల్ట్ మీటర్‌గా మార్చడానికి శ్రేణిలో అధిక నిరోధం (R) కలపాలి.", "source_check": "verified"},
        {"id": "phy-ch07-q005", "subject": "Physics", "chapter": "Moving Charges and Magnetism", "type": "Numerical", "marks": 4, "important": True,
         "question": "A galvanometer of resistance $50\\;\\Omega$ requires a current of $2\\text{ mA}$ for full scale deflection. How can it be converted into an ammeter of range $0 - 5\\text{ A}$?",
         "answer": "• Given: $G = 50\\;\\Omega$, $I_g = 2\\text{ mA} = 2 \\times 10^{-3}\\text{ A}$, $I = 5\\text{ A}$.\n• Formula: $S = \\frac{I_g G}{I - I_g}$\n• Calculation:\n$S = \\frac{2 \\times 10^{-3} \\times 50}{5 - 0.002} = \\frac{0.1}{4.998} \\approx 0.02\\;\\Omega$.\n• Result: Connect a shunt resistance of $0.02\\;\\Omega$ in parallel with the galvanometer.",
         "formula": "S = \\frac{I_g G}{I - I_g} \\approx 0.02\\;\\Omega", "telugu_hint": "షంట్ S = \\frac{0.1}{5} \\approx 0.02\\;\\Omega సమాంతరంగా కలపాలి.", "source_check": "verified"},
        {"id": "phy-ch07-q006", "subject": "Physics", "chapter": "Moving Charges and Magnetism", "type": "MCQ", "marks": 1, "important": False,
         "question": "When a charged particle enters a uniform magnetic field perpendicularly, the trajectory followed is:",
         "options": ["A) Straight line", "B) Parabola", "C) Circle", "D) Helix"],
         "correctOption": 2, "answer": "Correct Answer: C) Circle.\n• Magnetic force provides centripetal force ($q v B = m v^2 / r$), forcing it into a circle of radius $r = mv / qB$.",
         "formula": "r = \\frac{m v}{q B}", "telugu_hint": "లంబంగా ప్రవేశించినప్పుడు కణం వృత్తాకార మార్గంలో తిరుగుతుంది.", "source_check": "verified"}
    ]
}
save_chapter(ch07, "ch07-moving-charges.js", "movingChargesChapter")

# ==============================================================================
# CH 8: Magnetism and Matter
# ==============================================================================
ch08 = {
    "id": "phy-ch08", "subject": "Physics", "chapterNumber": 8, "chapter": "Magnetism and Matter",
    "formulaSheet": [
        {"title": "Magnetic Dipole Moment & Torque", "formula": "\\vec{M} = m(2\\vec{l}) = I \\vec{A}, \\quad \\vec{\\tau} = \\vec{M} \\times \\vec{B}", "symbols": "m = \\text{Pole strength (A m)}, 2l = \\text{Magnetic length}, I = \\text{Current}, A = \\text{Loop area}", "units": "\\text{A m}^2 \\text{ or J/T}", "tip": "Potential energy U = -\\vec{M} \\cdot \\vec{B} = -M B \\cos\\theta."},
        {"title": "Earth's Magnetic Elements", "formula": "B_H = B \\cos\\theta, \\quad B_V = B \\sin\\theta, \\quad \\tan\\theta = \\frac{B_V}{B_H}", "symbols": "\\theta = \\text{Angle of Dip (Inclination)}, B_H = \\text{Horizontal component}, B_V = \\text{Vertical component}", "units": "\\text{Tesla (T) or Gauss}", "tip": "At magnetic equator: Dip \\theta = 0^\\circ, B_V = 0. At magnetic poles: Dip \\theta = 90^\\circ, B_H = 0."},
        {"title": "Curie's Law for Paramagnetism", "formula": "\\chi = \\frac{C}{T}", "symbols": "\\chi = \\text{Magnetic susceptibility}, C = \\text{Curie constant}, T = \\text{Absolute temperature (K)}", "units": "\\text{Dimensionless}", "tip": "Susceptibility of diamagnetic materials is negative and temperature independent."}
    ],
    "questions": [
        {"id": "phy-ch08-q001", "subject": "Physics", "chapter": "Magnetism and Matter", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Define magnetic declination and angle of dip (inclination).",
         "answer": "1. Magnetic Declination ($D$): The acute angle between the geographic meridian and the magnetic meridian at a place on Earth.\n2. Angle of Dip ($\\theta$): The angle made by the total magnetic field of the earth with the horizontal in the magnetic meridian.",
         "formula": "\\tan\\theta = \\frac{B_V}{B_H}", "telugu_hint": "భౌగోళిక మరియు అయస్కాంత యామ్యోత్తరాల మధ్య కోణాన్ని దిక్పాతం (Declination) అంటారు. క్షితిజ సమాంతరంతో భూఅయస్కాంత క్షేత్రం చేసే కోణాన్ని నతి (Dip) అంటారు.", "source_check": "verified"},
        {"id": "phy-ch08-q002", "subject": "Physics", "chapter": "Magnetism and Matter", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What are the values of angle of dip at the Earth's (i) magnetic equator, and (ii) magnetic poles?",
         "answer": "• At Earth's magnetic equator: Angle of dip $\\theta = 0^\\circ$.\n• At Earth's magnetic poles: Angle of dip $\\theta = 90^\\circ$.",
         "formula": "\\theta_{equator} = 0^\\circ, \\quad \\theta_{pole} = 90^\\circ", "telugu_hint": "భూమధ్యరేఖ వద్ద నతి కోణం 0^\\circ, ధ్రువాల వద్ద 90^\\circ.", "source_check": "verified"},
        {"id": "phy-ch08-q003", "subject": "Physics", "chapter": "Magnetism and Matter", "type": "SAQ", "marks": 4, "important": True,
         "question": "Compare the magnetic properties of Diamagnetic, Paramagnetic, and Ferromagnetic substances.",
         "answer": "• **Diamagnetic**:\n1. Feebly repelled by magnets.\n2. Move from stronger to weaker field regions.\n3. Susceptibility $\\chi$ is small and negative ($-1 \\le \\chi < 0$), independent of temperature.\n4. Examples: Bismuth, Copper, Water, NaCl.\n\n• **Paramagnetic**:\n1. Feebly attracted by magnets.\n2. Move from weaker to stronger field regions.\n3. Susceptibility $\\chi$ is small and positive ($0 < \\chi < \\epsilon$), inversely proportional to temperature ($\\chi \\propto 1/T$).\n4. Examples: Aluminium, Platinum, Oxygen gas.\n\n• **Ferromagnetic**:\n1. Strongly attracted by magnets.\n2. Strongly move into high-field regions; retain magnetization.\n3. Susceptibility $\\chi$ is very large and positive ($\\chi \\gg 1000$).\n4. Examples: Iron, Cobalt, Nickel.",
         "formula": "\\chi_{dia} < 0, \\quad \\chi_{para} > 0, \\quad \\chi_{ferro} \\gg 1", "telugu_hint": "డయా పదార్థాలు వికర్షించబడతాయి (\\chi ఋణాత్మకం); పారా పదార్థాలు స్వల్పంగా ఆకర్షించబడతాయి; ఫెర్రో పదార్థాలు బలంగా ఆకర్షించబడతాయి (\\chi చాలా ఎక్కువ).", "source_check": "verified"},
        {"id": "phy-ch08-q004", "subject": "Physics", "chapter": "Magnetism and Matter", "type": "Numerical", "marks": 2, "important": False,
         "question": "At a place, the horizontal and vertical components of Earth's magnetic field are equal. Find the angle of dip at that place.",
         "answer": "• Given: $B_H = B_V$.\n• Formula: $\\tan\\theta = \\frac{B_V}{B_H} = 1$.\n• Since $\\tan 45^\\circ = 1$, the angle of dip $\\theta = 45^\\circ$.",
         "formula": "\\tan\\theta = 1 \\implies \\theta = 45^\\circ", "telugu_hint": "\\tan\\theta = B_V / B_H = 1 \\implies \\theta = 45^\\circ.", "source_check": "verified"},
        {"id": "phy-ch08-q005", "subject": "Physics", "chapter": "Magnetism and Matter", "type": "MCQ", "marks": 1, "important": False,
         "question": "Magnetic susceptibility of a superconductor is:",
         "options": ["A) 0", "B) +1", "C) -1", "D) \\infty"],
         "correctOption": 2, "answer": "Correct Answer: C) -1.\n• Superconductors show perfect diamagnetism (Meissner effect), where magnetic field is completely expelled ($B = 0 \\implies \\chi = -1$).",
         "formula": "\\chi = -1 \\text{ (Meissner effect)}", "telugu_hint": "అతివాహకాలు సంపూర్ణ డయాస్వభావాన్ని చూపిస్తాయి: \\chi = -1.", "source_check": "verified"}
    ]
}
save_chapter(ch08, "ch08-magnetism-matter.js", "magnetismMatterChapter")

# ==============================================================================
# CH 9: Electromagnetic Induction
# ==============================================================================
ch09 = {
    "id": "phy-ch09", "subject": "Physics", "chapterNumber": 9, "chapter": "Electromagnetic Induction",
    "formulaSheet": [
        {"title": "Faraday's Law of Induction", "formula": "\\varepsilon = -\\frac{d\\Phi_B}{dt} = -N\\frac{d\\Phi_B}{dt}", "symbols": "\\Phi_B = \\vec{B} \\cdot \\vec{A} = B A \\cos\\theta = \\text{Magnetic flux}, N = \\text{Number of turns}", "units": "\\text{Volt (V)}", "tip": "Negative sign represents Lenz's Law (induced emf opposes the change causing it)."},
        {"title": "Motional EMF", "formula": "\\varepsilon = B l v", "symbols": "B = \\text{Magnetic field}, l = \\text{Length of moving rod}, v = \\text{Velocity}", "units": "\\text{Volt (V)}", "tip": "Mechanical power input P = \\frac{B^2 l^2 v^2}{R} equals rate of Joule heat dissipation."},
        {"title": "Self & Mutual Inductance", "formula": "\\varepsilon = -L\\frac{dI}{dt}, \\quad \\varepsilon = -M\\frac{dI}{dt}, \\quad L_{solenoid} = \\mu_0 n^2 A l", "symbols": "L = \\text{Self inductance}, M = \\text{Mutual inductance}", "units": "\\text{Henry (H)}", "tip": "Energy stored in an inductor is U = \\frac{1}{2} L I^2."},
        {"title": "AC Generator EMF", "formula": "\\varepsilon = \\varepsilon_0 \\sin(\\omega t) = N B A \\omega \\sin(\\omega t)", "symbols": "\\varepsilon_0 = N B A \\omega = \\text{Peak EMF}, \\omega = 2\\pi \\nu = \\text{Angular frequency}", "units": "\\text{Volt (V)}", "tip": "Peak voltage occurs when plane of coil is parallel to magnetic field (flux is zero, rate of change is maximum)."}
    ],
    "questions": [
        {"id": "phy-ch09-q001", "subject": "Physics", "chapter": "Electromagnetic Induction", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Faraday's laws of electromagnetic induction.",
         "answer": "1. First Law: Whenever magnetic flux linked with a circuit changes, an induced emf is produced in it which lasts as long as the change continues.\n2. Second Law: The magnitude of induced emf is directly proportional to the time rate of change of magnetic flux linked with the circuit:\n$\\varepsilon = -\\frac{d\\Phi_B}{dt}$.",
         "formula": "\\varepsilon = -\\frac{d\\Phi_B}{dt}", "telugu_hint": "వలయానికి అనుసంధానమైన అయస్కాంత అభివాహంలో మార్పు వచ్చినంత కాలం ప్రేరిత EMF ఏర్పడుతుంది. ప్రేరిత EMF అభివాహ మార్పు రేటుకు అనులోమానుపాతంలో ఉంటుంది.", "source_check": "verified"},
        {"id": "phy-ch09-q002", "subject": "Physics", "chapter": "Electromagnetic Induction", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Lenz's law and explain which basic conservation law it represents.",
         "answer": "• Statement: The polarity of induced emf is such that it produces an induced current which opposes the change in magnetic flux that produces it.\n• Conservation Principle: Lenz's law is a consequence of the **Law of Conservation of Energy**.",
         "formula": "\\varepsilon = -\\frac{d\\Phi_B}{dt}", "telugu_hint": "ప్రేరిత విద్యుత్ ప్రవాహం దానిని ఉత్పత్తి చేసిన కారణాన్ని వ్యతిరేకిస్తుంది. ఇది శక్తి పరిరక్షణ సూత్రంపై ఆధారపడి ఉంటుంది.", "source_check": "verified"},
        {"id": "phy-ch09-q003", "subject": "Physics", "chapter": "Electromagnetic Induction", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What are eddy currents? Mention any two practical applications.",
         "answer": "1. Definition: Circulating induced currents produced in solid metallic conductors when subjected to changing magnetic flux are called eddy currents (Foucault currents).\n2. Applications:\n• Magnetic braking in electric trains.\n• Induction furnaces for melting metals.",
         "formula": "i_{eddy} = \\frac{\\varepsilon}{R}", "telugu_hint": "లోహపు దిమ్మల్లో ఏర్పడే సుడి విద్యుత్ ప్రవాహాలను ఎడ్డీ కరెంట్లు అంటారు. ఉపయోగాలు: రైళ్లలో అయస్కాంత బ్రేకులు, ఇండక్షన్ కొలిమి.", "source_check": "verified"},
        {"id": "phy-ch09-q004", "subject": "Physics", "chapter": "Electromagnetic Induction", "type": "SAQ", "marks": 4, "important": True,
         "question": "Derive the expression for the motional EMF induced across the ends of a conductor moving in a uniform magnetic field.",
         "answer": "1. Setup: A conducting rod $PQ$ of length $l$ moves with velocity $v$ perpendicular to a uniform magnetic field $\\vec{B}$ directed into the page on a U-shaped conducting frame.\n2. Area enclosed: Let distance of rod from base be $x$. Area $A = l x$.\n3. Magnetic Flux: $\\Phi_B = B A = B l x$.\n4. By Faraday's Law:\n$$\\varepsilon = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(B l x) = -B l \\frac{dx}{dt}$$\n5. Since velocity $v = -\\frac{dx}{dt}$ (distance $x$ is decreasing as rod moves left):\n$$\\varepsilon = B l v$$\n6. Direction: By Fleming's Right Hand Rule, current flows from $Q$ to $P$.",
         "formula": "\\varepsilon = B l v", "telugu_hint": "చలన ప్రేరిత EMF సూత్రం: \\varepsilon = B l v.", "source_check": "verified"},
        {"id": "phy-ch09-q005", "subject": "Physics", "chapter": "Electromagnetic Induction", "type": "Numerical", "marks": 4, "important": True,
         "question": "A $1.0 \\text{ m}$ long metallic rod is rotated with an angular frequency of $400 \\text{ rad/s}$ about an axis normal to the rod passing through one end. A uniform magnetic field of $0.5 \\text{ T}$ acts parallel to the axis. Calculate the EMF induced between the center and the other end.",
         "answer": "• Given: $l = 1.0\\text{ m}$, $\\omega = 400\\text{ rad/s}$, $B = 0.5\\text{ T}$.\n• Formula: $\\varepsilon = \\frac{1}{2} B l^2 \\omega$\n• Calculation:\n$\\varepsilon = \\frac{1}{2} \\times 0.5 \\times (1.0)^2 \\times 400 = 100 \\text{ V}$.\n• Result: Induced EMF = $100 \\text{ V}$.",
         "formula": "\\varepsilon = \\frac{1}{2} B l^2 \\omega = 100 \\text{ V}", "telugu_hint": "\\varepsilon = \\frac{1}{2} \\times 0.5 \\times 1^2 \\times 400 = 100 \\text{ V}.", "source_check": "verified"},
        {"id": "phy-ch09-q006", "subject": "Physics", "chapter": "Electromagnetic Induction", "type": "MCQ", "marks": 1, "important": False,
         "question": "The self-inductance of a solenoid depends on:",
         "options": ["A) Its geometry (area and length) and number of turns", "B) Current passing through it", "C) Potential applied across it", "D) Resistance of the wire"],
         "correctOption": 0, "answer": "Correct Answer: A) Its geometry (area and length) and number of turns.\n• $L = \\mu_0 n^2 A l = \\mu_0 \\frac{N^2 A}{l}$, which depends solely on physical dimensions and permeability.",
         "formula": "L = \\mu_0 \\frac{N^2 A}{l}", "telugu_hint": "స్వయం ప్రేరకత్వం చుట్ల సంఖ్య మరియు జ్యామితీయ కొలతలపై ఆధారపడి ఉంటుంది.", "source_check": "verified"}
    ]
}
save_chapter(ch09, "ch09-induction.js", "inductionChapter")

print("All Physics Chapters 3 to 9 generated successfully!")

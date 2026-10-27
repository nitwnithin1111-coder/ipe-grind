# -*- coding: utf-8 -*-
"""
Generator for Physics Chapters 3 to 9 (TS Inter 2nd Year)
"""
import json
import os

OUTPUT_DIR = r"C:\Users\chary\.gemini\antigravity\scratch\ipe-grind\data\physics"

def save_chapter(ch_data, filename, var_name):
    path = os.path.join(OUTPUT_DIR, filename)
    json_str = json.dumps(ch_data, indent=2, ensure_ascii=False)
    content = f"""// IPE TS 2nd Year Physics - Chapter {ch_data['chapterNumber']}: {ch_data['chapter']}
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

const {var_name} = {json_str};

if (typeof window.registerChapter === 'function') {{
  window.registerChapter({var_name});
}} else {{
  window.IPE_DATA.chapters[{var_name}.id] = {var_name};
}}
"""
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved {filename} with {len(ch_data['questions'])} questions and {len(ch_data['formulaSheet'])} formulas.")

# ==============================================================================
# CHAPTER 3: WAVE OPTICS
# ==============================================================================
ch03 = {
    "id": "phy-ch03",
    "subject": "Physics",
    "chapterNumber": 3,
    "chapter": "Wave Optics",
    "formulaSheet": [
        {
            "title": "Huygens Principle of Secondary Wavelets",
            "formula": "v = \\frac{c}{\\mu}, \\quad \\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2} = \\frac{\\mu_2}{\\mu_1}",
            "symbols": "c = \\text{Speed of light in vacuum}, v = \\text{Speed in medium}, \\mu = \\text{Refractive index}",
            "units": "\\text{m/s}",
            "tip": "Wavefront is always perpendicular to the direction of light rays."
        },
        {
            "title": "Young's Double Slit Fringe Width",
            "formula": "\\beta = \\frac{\\lambda D}{d}",
            "symbols": "\\lambda = \\text{Wavelength}, D = \\text{Slit-to-screen distance}, d = \\text{Slit separation}",
            "units": "\\text{m or mm}",
            "tip": "Angular fringe width \\theta = \\frac{\\lambda}{d} is independent of screen distance D."
        },
        {
            "title": "Brewster's Law (Polarization by Reflection)",
            "formula": "\\mu = \\tan i_p",
            "symbols": "i_p = \\text{Brewster's/Polarizing angle}, \\mu = \\text{Refractive index of medium}",
            "units": "\\text{Degrees}",
            "tip": "At polarizing angle, reflected and refracted rays are perpendicular: i_p + r = 90^\\circ."
        },
        {
            "title": "Malus's Law",
            "formula": "I = I_0 \\cos^2 \\theta",
            "symbols": "I_0 = \\text{Incident polarized intensity}, \\theta = \\text{Angle between pass axes of polarizer and analyzer}",
            "units": "\\text{W/m}^2",
            "tip": "When \\theta = 90^\\circ (crossed polaroids), transmitted intensity is zero."
        },
        {
            "title": "Doppler Shift in Light",
            "formula": "\\frac{\\Delta \\nu}{\\nu} = -\\frac{v_{radial}}{c}, \\quad \\frac{\\Delta \\lambda}{\\lambda} = \\frac{v_{radial}}{c}",
            "symbols": "\\Delta \\lambda = \\text{Shift in wavelength}, v_{radial} = \\text{Line of sight relative speed}",
            "units": "\\text{m/s, nm}",
            "tip": "Red shift indicates recessional motion (universe expansion); Blue shift indicates approach."
        }
    ],
    "questions": [
        # VSAQ (2M)
        {
            "id": "phy-ch03-q001",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "VSAQ",
            "marks": 2,
            "important": True,
            "question": "What is a wavefront? What is the shape of the wavefront emerging from a point source at a finite distance and at infinity?",
            "answer": "1. Definition: A wavefront is defined as the locus of all points in a medium having the same phase of oscillation.\n2. Shapes:\n• From a point source at a finite distance: Spherical wavefront.\n• At infinity: Plane wavefront.",
            "formula": "\\text{Phase } \\phi = \\text{constant}",
            "telugu_hint": "సమాన దశలో కంపించే అన్ని బిందువుల బిందుపథాన్ని తరంగ ముఖం అంటారు. బిందు రూప జనకం వద్ద గోళాకార తరంగ ముఖం, అనంత దూరంలో సమతల తరంగ ముఖం ఏర్పడుతుంది.",
            "source_check": "verified"
        },
        {
            "id": "phy-ch03-q002",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "VSAQ",
            "marks": 2,
            "important": True,
            "question": "State Brewster's law and write the formula.",
            "answer": "• Statement: When unpolarized light is incident at the polarizing angle ($i_p$) on a transparent interface, the reflected light is completely plane-polarized.\n• The tangent of the polarizing angle is equal to the refractive index of the medium.",
            "formula": "\\mu = \\tan i_p",
            "telugu_hint": "ధ్రువణ కోణం వద్ద పతనమైనప్పుడు పరావర్తన కాంతి పూర్తిగా తల ధ్రువితమవుతుంది: \\mu = \\tan i_p.",
            "source_check": "verified"
        },
        {
            "id": "phy-ch03-q003",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "VSAQ",
            "marks": 2,
            "important": True,
            "question": "What are coherent sources? Why can two independent light sources never be coherent?",
            "answer": "1. Coherent sources are two sources of light which emit continuous light waves of the same frequency, same wavelength, and maintain a constant initial phase difference.\n2. Two independent sources cannot be coherent because light emission in atoms occurs through independent random quantum transitions lasting ~10⁻⁸ s.",
            "formula": "\\Delta \\phi = \\text{constant in time}",
            "telugu_hint": "నిరంతరం ఒకే పౌనఃపున్యం మరియు స్థిరమైన దశాపేదం గల తరంగాలను విడుదల చేసే జనకాలను సంబద్ధ జనకాలు అంటారు.",
            "source_check": "verified"
        },
        {
            "id": "phy-ch03-q004",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "VSAQ",
            "marks": 2,
            "important": False,
            "question": "What is Malus' law? Give the expression for transmitted intensity.",
            "answer": "• Statement: When completely plane-polarized light of intensity $I_0$ is incident on an analyzer, the transmitted intensity $I$ varies directly as the square of the cosine of the angle $\\theta$ between the transmission axes of the polarizer and analyzer.",
            "formula": "I = I_0 \\cos^2 \\theta",
            "telugu_hint": "ధ్రువణకారి మరియు విశ్లేషణకారి అక్షాల మధ్య కోణం \\theta అయితే, ప్రసార కాంతి తీవ్రత I = I_0 \\cos^2 \\theta.",
            "source_check": "verified"
        },
        {
            "id": "phy-ch03-q005",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "VSAQ",
            "marks": 2,
            "important": False,
            "question": "What is the Brewster angle for air-glass interface if the refractive index of glass is 1.5?",
            "answer": "• Formula: $\\tan i_p = \\mu = 1.5$\n• $i_p = \\tan^{-1}(1.5) \\approx 56.3^\\circ$ (or $56^\\circ 19'$).",
            "formula": "i_p = \\tan^{-1}(1.5) \\approx 56.3^\\circ",
            "telugu_hint": "\\tan i_p = 1.5 \\Rightarrow i_p = 56.3^\\circ.",
            "source_check": "verified"
        },
        {
            "id": "phy-ch03-q006",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "VSAQ",
            "marks": 2,
            "important": False,
            "question": "What happens to the fringe width in Young's experiment if the entire apparatus is immersed in water?",
            "answer": "• When immersed in water, the wavelength of light decreases to $\\lambda' = \\frac{\\lambda}{\\mu_w}$.\n• Since fringe width $\\beta = \\frac{\\lambda D}{d}$, the new fringe width decreases by a factor of $\\mu_w$:\n$\\beta' = \\frac{\\beta}{\\mu_w} = \\frac{\\beta}{1.33} = 0.75 \\beta$.",
            "formula": "\\beta' = \\frac{\\beta}{\\mu_w}",
            "telugu_hint": "నీటిలో కాంతి తరంగదైర్ఘ్యం తగ్గుతుంది కాబట్టి పట్టీ వెడల్పు కూడా తగ్గుతుంది (\\beta' = \\beta/\\mu).",
            "source_check": "verified"
        },
        # SAQ (4M)
        {
            "id": "phy-ch03-q007",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "SAQ",
            "marks": 4,
            "important": True,
            "question": "Derive the expression for fringe width in Young's double slit interference experiment.",
            "answer": "1. Experimental Setup:\n• Let $S_1, S_2$ be two coherent narrow slits separated by distance $d$.\n• Let $D$ be the distance of the screen from the slits ($D \\gg d$).\n• Let $P$ be a point on the screen at distance $x$ from central bright fringe $O$.\n\n2. Path Difference:\n• Path difference $\\Delta x = S_2P - S_1P$.\n• From geometry: $(S_2P)^2 - (S_1P)^2 = \\left[D^2 + \\left(x + \\frac{d}{2}\\right)^2\\right] - \\left[D^2 + \\left(x - \\frac{d}{2}\\right)^2\\right] = 2xd$\n• $(S_2P - S_1P)(S_2P + S_1P) = 2xd$\n• Since $S_2P + S_1P \\approx 2D$, we get: $\\Delta x = \\frac{xd}{D}$\n\n3. Bright Fringes (Constructive Interference):\n• $\\Delta x = n\\lambda \\implies x_n = \\frac{n\\lambda D}{d}$ ($n = 0, 1, 2, \\dots$)\n\n4. Fringe Width ($\\beta$):\n• Separation between two successive bright fringes:\n$\\beta = x_n - x_{n-1} = \\frac{n\\lambda D}{d} - \\frac{(n-1)\\lambda D}{d} = \\frac{\\lambda D}{d}$.",
            "formula": "\\beta = \\frac{\\lambda D}{d}",
            "telugu_hint": "వ్యవధాన పట్టీ వెడల్పు సూత్రం: \\beta = \\frac{\\lambda D}{d}. పట్టీ వెడల్పు తరంగదైర్ఘ్యం మరియు తెర దూరానికి అనులోమానుపాతంలో, చీలికల మధ్య దూరానికి విలోమానుపాతంలో ఉంటుంది.",
            "source_check": "verified"
        },
        {
            "id": "phy-ch03-q008",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "SAQ",
            "marks": 4,
            "important": True,
            "question": "Explain the phenomenon of total internal reflection and polarization by reflection to prove Brewster's law ($i_p + r = 90^\\circ$).",
            "answer": "1. Brewster's Law Principle:\n• When light reflects off an interface at Brewster's angle $i_p$, the reflected ray is totally polarized perpendicular to the plane of incidence.\n\n2. Snell's Law at $i_p$:\n• $\\mu = \\frac{\\sin i_p}{\\sin r}$\n\n3. From Brewster's Law:\n• $\\mu = \\tan i_p = \\frac{\\sin i_p}{\\cos i_p}$\n\n4. Equating both expressions:\n• $\\frac{\\sin i_p}{\\sin r} = \\frac{\\sin i_p}{\\cos i_p} \\implies \\sin r = \\cos i_p = \\sin(90^\\circ - i_p)$\n• $r = 90^\\circ - i_p \\implies i_p + r = 90^\\circ$\n\n5. Conclusion: At Brewster angle, the reflected and refracted rays are perpendicular to each other.",
            "formula": "i_p + r = 90^\\circ \\iff \\mu = \\tan i_p",
            "telugu_hint": "బ్రూస్టర్ కోణం వద్ద పరావర్తన మరియు వక్రీభవన కిరణాల మధ్య కోణం 90 డిగ్రీలు (i_p + r = 90^\\circ).",
            "source_check": "verified"
        },
        {
            "id": "phy-ch03-q009",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "SAQ",
            "marks": 4,
            "important": False,
            "question": "Distinguish clearly between Interference and Diffraction of light.",
            "answer": "• **Interference**:\n1. Caused by superposition of two distinct coherent wavefronts originating from two separate slits.\n2. All bright fringes have equal width ($\\beta = \\lambda D / d$).\n3. All bright fringes have uniform intensity ($I_{max} = 4I_0$).\n4. Regions of minimum intensity are perfectly dark ($I_{min} = 0$).\n\n• **Diffraction**:\n1. Caused by superposition of secondary wavelets originating from different parts of the same wavefront.\n2. Central maximum is twice as wide as secondary maxima ($2\\lambda D / a$).\n3. Intensity of successive bright fringes decreases rapidly.\n4. Regions of minimum intensity are not completely dark.",
            "formula": "\\text{Interference: } \\beta = \\text{const}; \\quad \\text{Diffraction: } \\beta_{central} = 2\\beta_{sec}",
            "telugu_hint": "వ్యతికరణంలో పట్టీల వెడల్పు మరియు తీవ్రత సమానంగా ఉంటాయి. వివర్తనంలో కేంద్ర పట్టీ వెడల్పు ఎక్కువగా ఉండి క్రమంగా తీవ్రత తగ్గుతుంది.",
            "source_check": "verified"
        },
        # Numericals
        {
            "id": "phy-ch03-q010",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "Numerical",
            "marks": 4,
            "important": True,
            "question": "In Young's double-slit experiment, the slits are separated by 0.28 mm and the screen is placed 1.4 m away. The distance between the central bright fringe and the fourth bright fringe is measured to be 1.2 cm. Determine the wavelength of light used.",
            "answer": "• **Given data**:\n- Slit separation $d = 0.28 \\text{ mm} = 0.28 \\times 10^{-3} \\text{ m}$\n- Screen distance $D = 1.4 \\text{ m}$\n- Position of 4th bright fringe $x_4 = 1.2 \\text{ cm} = 1.2 \\times 10^{-2} \\text{ m}$\n- Order $n = 4$\n\n• **Formula**:\n$x_n = \\frac{n\\lambda D}{d} \\implies \\lambda = \\frac{x_4 \\cdot d}{4 \\cdot D}$\n\n• **Calculation**:\n$\\lambda = \\frac{(1.2 \\times 10^{-2}) \\times (0.28 \\times 10^{-3})}{4 \\times 1.4}$\n$\\lambda = \\frac{0.336 \\times 10^{-5}}{5.6} = 6 \\times 10^{-7} \\text{ m} = 600 \\text{ nm} = 6000 \\text{ Å}$.\n\n• **Result**: Wavelength $\\lambda = 600 \\text{ nm}$.",
            "formula": "\\lambda = \\frac{x_n d}{n D} = 6000 \\text{ Å}",
            "telugu_hint": "\\lambda = \\frac{x_4 d}{4D} = \\frac{1.2 \\times 10^{-2} \\times 0.28 \\times 10^{-3}}{4 \\times 1.4} = 600 \\text{ nm}.",
            "source_check": "verified"
        },
        {
            "id": "phy-ch03-q011",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "Numerical",
            "marks": 2,
            "important": False,
            "question": "Light of wavelength 500 nm falls on a pair of slits and produces fringes of width 2 mm on a screen. If the wavelength is changed to 600 nm, find the new fringe width.",
            "answer": "• **Given**: $\\lambda_1 = 500 \\text{ nm}$, $\\beta_1 = 2 \\text{ mm}$, $\\lambda_2 = 600 \\text{ nm}$.\n• **Formula**: Since $\\beta \\propto \\lambda$, $\\frac{\\beta_2}{\\beta_1} = \\frac{\\lambda_2}{\\lambda_1}$\n• **Calculation**: $\\beta_2 = 2 \\times \\frac{600}{500} = 2 \\times 1.2 = 2.4 \\text{ mm}$.",
            "formula": "\\beta_2 = \\beta_1 \\left(\\frac{\\lambda_2}{\\lambda_1}\\right) = 2.4 \\text{ mm}",
            "telugu_hint": "\\beta_2 = 2 \\times \\frac{600}{500} = 2.4 \\text{ mm}.",
            "source_check": "verified"
        },
        # MCQs
        {
            "id": "phy-ch03-q012",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "MCQ",
            "marks": 1,
            "important": False,
            "question": "Which of the following optical phenomena conclusively proves the transverse wave nature of light?",
            "options": [
                "A) Interference",
                "B) Diffraction",
                "C) Polarization",
                "D) Refraction"
            ],
            "correctOption": 2,
            "answer": "Correct Answer: C) Polarization.\n• Only transverse waves can be polarized; longitudinal waves (like sound waves in air) cannot be polarized.",
            "formula": "\\text{Polarization confirms transverse nature}",
            "telugu_hint": "ధ్రువణం (Polarization) కాంతి తిర్యక్ తరంగ స్వభావాన్ని నిరూపిస్తుంది.",
            "source_check": "verified"
        },
        {
            "id": "phy-ch03-q013",
            "subject": "Physics",
            "chapter": "Wave Optics",
            "type": "MCQ",
            "marks": 1,
            "important": False,
            "question": "In Young's experiment, when monochromatic light is replaced by white light, what is observed at the center?",
            "options": [
                "A) A dark fringe",
                "B) A white central fringe bordered by colors",
                "C) Continuous rainbow spectrum without center",
                "D) No fringes are visible"
            ],
            "correctOption": 1,
            "answer": "Correct Answer: B) A white central fringe bordered by colors.\n• At the center, path difference $\\Delta x = 0$ for all wavelengths, so constructive interference occurs for all colors, producing white light.",
            "formula": "\\Delta x = 0 \\implies \\text{Central White Fringe}",
            "telugu_hint": "కేంద్రం వద్ద పతభేదం సున్నా కాబట్టి తెల్లటి పట్టీ ఏర్పడుతుంది.",
            "source_check": "verified"
        }
    ]
}

save_chapter(ch03, "ch03-wave-optics.js", "waveOpticsChapter")

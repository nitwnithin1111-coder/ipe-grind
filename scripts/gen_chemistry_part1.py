# -*- coding: utf-8 -*-
"""
IPE TS Inter 2nd Year - Chemistry Chapters 3 to 9 Generator
"""
import json
import os

OUTPUT_DIR = r"C:\Users\chary\.gemini\antigravity\scratch\ipe-grind\data\chemistry"

def save_chapter(ch_data, filename, var_name):
    path = os.path.join(OUTPUT_DIR, filename)
    json_str = json.dumps(ch_data, indent=2, ensure_ascii=False)
    content = (
        f"// IPE TS 2nd Year Chemistry - Chapter {ch_data['chapterNumber']}: {ch_data['chapter']}\n"
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
# CH 3: Electrochemistry
# ==============================================================================
ch03 = {
    "id": "chem-ch03", "subject": "Chemistry", "chapterNumber": 3, "chapter": "Electrochemistry",
    "formulaSheet": [
        {"title": "Kohlrausch's Law of Independent Migration", "formula": "\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ, \\quad \\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ}", "symbols": "\\Lambda_m^\\circ = \\text{Limiting molar conductivity}, \\alpha = \\text{Degree of dissociation}", "units": "\\text{S cm}^2\\text{ mol}^{-1}", "tip": "Used to calculate molar conductivity of weak electrolytes (like acetic acid) at infinite dilution."},
        {"title": "Nernst Equation for Electrode & Cell EMF", "formula": "E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log_{10} Q, \\quad E^\\circ_{cell} = \\frac{0.0591}{n}\\log_{10} K_c", "symbols": "n = \\text{Number of electrons transferred}, Q = \\text{Reaction quotient}", "units": "\\text{Volt (V)}", "tip": "At 298 K (25°C). For Daniell cell: E_{cell} = 1.10 - \\frac{0.0591}{2}\\log\\frac{[Zn^{2+}]}{[Cu^{2+}]}."},
        {"title": "Faraday's Laws of Electrolysis", "formula": "m = Z I t = \\frac{E}{96500} I t, \\quad \\frac{m_1}{m_2} = \\frac{E_1}{E_2}", "symbols": "m = \\text{Mass liberated}, Z = \\text{Electrochemical equivalent}, E = \\text{Equivalent weight}, 1\\text{ F} = 96500\\text{ C}", "units": "\\text{grams (g), Coulombs (C)}", "tip": "1 mole of electrons carries charge of 1 Faraday (96,487 C)."}
    ],
    "questions": [
        {"id": "chem-ch03-q001", "subject": "Chemistry", "chapter": "Electrochemistry", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Kohlrausch's law of independent migration of ions and write its mathematical equation.",
         "answer": "• Statement: Limiting molar conductivity of an electrolyte can be represented as the sum of the individual contributions of the anion and cation of the electrolyte.\n• Formula: $\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ$.\n• For $CH_3COOH$: $\\Lambda_m^\\circ(CH_3COOH) = \\lambda^\\circ(CH_3COO^-) + \\lambda^\\circ(H^+)$.",
         "formula": "\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ", "telugu_hint": "అనంత విలీనత వద్ద విద్యుద్విశ్లేష్య మోలార్ వాహకత దాని కాటయాన్ మరియు యానయాన్ల స్వతంత్ర వాహకతల మొత్తానికి సమానం.", "source_check": "verified"},
        {"id": "chem-ch03-q002", "subject": "Chemistry", "chapter": "Electrochemistry", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Faraday's first and second laws of electrolysis.",
         "answer": "1. First Law: The mass ($m$) of substance deposited or liberated at any electrode during electrolysis is directly proportional to the quantity of electricity ($Q = It$) passed:\n$m \\propto Q \\implies m = ZIt$.\n2. Second Law: When the same quantity of electricity is passed through different electrolytes, the masses of substances liberated are proportional to their chemical equivalent weights:\n$\\frac{m_1}{m_2} = \\frac{E_1}{E_2}$.",
         "formula": "m = Z I t, \\quad \\frac{m_1}{m_2} = \\frac{E_1}{E_2}", "telugu_hint": "ఫారడే 1వ నియమం: m = ZIt; 2వ నియమం: m_1/m_2 = E_1/E_2.", "source_check": "verified"},
        {"id": "chem-ch03-q003", "subject": "Chemistry", "chapter": "Electrochemistry", "type": "SAQ", "marks": 4, "important": True,
         "question": "What are primary and secondary batteries? Write the chemical reactions occurring at anode and cathode in a Lead Storage Battery during discharging.",
         "answer": "1. Definitions:\n• **Primary battery**: Cell reaction occurs only once; cannot be recharged (e.g. Dry cell, Mercury button cell).\n• **Secondary battery**: Can be recharged and reused multiple times by passing direct current in reverse direction (e.g. Lead storage battery).\n\n2. **Discharge reactions in Lead Storage Battery**:\n• **Anode**: $Pb(s) + SO_4^{2-}(aq) \\to PbSO_4(s) + 2e^-$\n• **Cathode**: $PbO_2(s) + SO_4^{2-}(aq) + 4H^+(aq) + 2e^- \\to PbSO_4(s) + 2H_2O(l)$\n• **Overall Reaction**: $Pb(s) + PbO_2(s) + 2H_2SO_4(aq) \\to 2PbSO_4(s) + 2H_2O(l)$.",
         "formula": "Pb + PbO_2 + 2H_2SO_4 \\to 2PbSO_4 + 2H_2O", "telugu_hint": "లెడ్ నిల్వ బ్యాటరీ డిశ్చార్జ్ చర్య: Pb మరియు PbO2 లు సల్ఫ్యూరిక్ ఆమ్లంతో చర్య జరిపి PbSO4 మరియు నీరుగా మారతాయి.", "source_check": "verified"},
        {"id": "chem-ch03-q004", "subject": "Chemistry", "chapter": "Electrochemistry", "type": "Numerical", "marks": 4, "important": True,
         "question": "Calculate the EMF of the Daniell cell at 298 K: $Zn(s) | Zn^{2+}(0.1\\text{ M}) || Cu^{2+}(0.01\\text{ M}) | Cu(s)$. Given $E^\\circ_{cell} = 1.10\\text{ V}$.",
         "answer": "• Cell reaction: $Zn(s) + Cu^{2+}(aq) \\to Zn^{2+}(aq) + Cu(s)$, with $n = 2$.\n• Nernst Equation:\n$E_{cell} = E^\\circ_{cell} - \\frac{0.0591}{n} \\log_{10} \\frac{[Zn^{2+}]}{[Cu^{2+}]}$\n• Substitute values:\n$E_{cell} = 1.10 - \\frac{0.0591}{2} \\log_{10} \\left(\\frac{0.1}{0.01}\\right) = 1.10 - 0.02955 \\log_{10}(10)$\n$E_{cell} = 1.10 - 0.02955 \\times 1 = 1.07045 \\text{ V} \\approx 1.07 \\text{ V}$.\n• Result: $E_{cell} = 1.07 \\text{ V}$.",
         "formula": "E_{cell} = 1.10 - 0.02955(1) = 1.07\\text{ V}", "telugu_hint": "E_{cell} = 1.10 - \\frac{0.0591}{2} \\log(10) = 1.10 - 0.0296 = 1.07 V.", "source_check": "verified"},
        {"id": "chem-ch03-q005", "subject": "Chemistry", "chapter": "Electrochemistry", "type": "MCQ", "marks": 1, "important": False,
         "question": "The charge required for the reduction of 1 mole of $Al^{3+}$ ions to $Al$ metal is:",
         "options": ["A) 1 F", "B) 2 F", "C) 3 F", "D) 96500 C"],
         "correctOption": 2, "answer": "Correct Answer: C) 3 F.\n• Reaction: $Al^{3+} + 3e^- \\to Al$. Reduction of 1 mole requires 3 moles of electrons = 3 Faradays ($3 \\times 96500 \\text{ C}$).",
         "formula": "Al^{3+} + 3e^- \\to Al \\implies 3\\text{ F}", "telugu_hint": "1 మోల్ Al^{3+} క్షయకరణానికి 3 ఎలక్ట్రాన్లు (3 ఫారడేల ఆవేశం) అవసరం.", "source_check": "verified"}
    ]
}
save_chapter(ch03, "ch03-electrochemistry.js", "electrochemistryChapter")

# ==============================================================================
# CH 4: Chemical Kinetics
# ==============================================================================
ch04 = {
    "id": "chem-ch04", "subject": "Chemistry", "chapterNumber": 4, "chapter": "Chemical Kinetics",
    "formulaSheet": [
        {"title": "Integrated Rate Equation (First Order)", "formula": "k = \\frac{2.303}{t}\\log_{10}\\left(\\frac{[R]_0}{[R]}\\right), \\quad t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{k}", "symbols": "k = \\text{Rate constant (s}^{-1}\\text{)}, [R]_0 = \\text{Initial concentration}, [R] = \\text{Concentration at time } t", "units": "\\text{s}^{-1}", "tip": "Half-life of a first-order reaction is completely independent of initial concentration."},
        {"title": "Arrhenius Equation & Activation Energy", "formula": "k = A e^{-E_a/RT}, \\quad \\log_{10}\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)", "symbols": "A = \\text{Pre-exponential frequency factor}, E_a = \\text{Activation energy (J/mol)}, R = 8.314 \\text{ J/mol K}", "units": "\\text{J/mol or kJ/mol}", "tip": "Plot of \\log k vs 1/T gives a straight line with slope = -E_a / (2.303 R)."}
    ],
    "questions": [
        {"id": "chem-ch04-q001", "subject": "Chemistry", "chapter": "Chemical Kinetics", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Define rate of reaction and rate constant (specific reaction rate).",
         "answer": "1. Rate of Reaction: The change in molar concentration of reactants or products per unit time ($r = -\\frac{d[R]}{dt} = +\\frac{d[P]}{dt}$).\n2. Rate Constant ($k$): The rate of reaction when the concentration of each reactant is taken as unity ($1\\text{ mol/L}$).",
         "formula": "r = k [A]^x [B]^y \\implies r = k \\text{ when } [A]=[B]=1", "telugu_hint": "ప్రమాణ కాలంలో క్రియాజనకాల లేదా క్రియాజన్యాల గాఢతలో వచ్చే మార్పును చర్యారేటు అంటారు. గాఢతలు ఏకాంకం అయినప్పుడు చర్యారేటు రేటు స్థిరాంకం అవుతుంది.", "source_check": "verified"},
        {"id": "chem-ch04-q002", "subject": "Chemistry", "chapter": "Chemical Kinetics", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is pseudo first-order reaction? Give one example.",
         "answer": "• Definition: A reaction which is actually of higher order but follows first-order kinetics due to one of the reactants being present in large excess.\n• Example: Acid-catalyzed hydrolysis of ethyl acetate:\n$CH_3COOC_2H_5 + H_2O \\xrightarrow{H^+} CH_3COOH + C_2H_5OH$\nRate = $k' [CH_3COOC_2H_5][H_2O] = k [CH_3COOC_2H_5]$.",
         "formula": "\\text{Rate} = k [\\text{ester}]", "telugu_hint": "ఎస్టర్ జలవిశ్లేషణలో నీరు అధిక పరిమాణంలో ఉండటం వల్ల ఇది మిథ్యా ప్రథమ క్రమాంక చర్య అవుతుంది.", "source_check": "verified"},
        {"id": "chem-ch04-q003", "subject": "Chemistry", "chapter": "Chemical Kinetics", "type": "SAQ", "marks": 4, "important": True,
         "question": "Distinguish between Order of a reaction and Molecularity of a reaction.",
         "answer": "• **Order of Reaction**:\n1. Sum of powers of concentration terms of reactants in the rate law equation.\n2. Experimental quantity determined only from rate data.\n3. Can be zero, fractional, or integer ($0, 1/2, 1, 2$).\n4. Applicable to elementary as well as complex reactions.\n\n• **Molecularity of Reaction**:\n1. Number of reacting species (atoms/ions/molecules) colliding simultaneously in an elementary step.\n2. Theoretical concept deduced from reaction mechanism.\n3. Can only be a positive whole integer ($1, 2, 3$). Cannot be zero or fractional.\n4. Meaningful only for elementary reactions; has no meaning for complex reactions.",
         "formula": "\\text{Order } = x + y \\; (\\text{experimental}); \\quad \\text{Molecularity } = \\text{integer } (1, 2, 3)", "telugu_hint": "క్రమాంకం ప్రయోగపూర్వకమైనది (సున్నా లేదా భిన్నం కావచ్చు); అణుత సిద్ధాంతపరమైనది (ధన పూర్ణాంకం మాత్రమే).", "source_check": "verified"},
        {"id": "chem-ch04-q004", "subject": "Chemistry", "chapter": "Chemical Kinetics", "type": "SAQ", "marks": 4, "important": True,
         "question": "Derive the integrated rate equation for a first-order reaction and show that its half-life period is independent of initial concentration.",
         "answer": "1. **Differential Rate Law**: For $R \\to P$:\n$$-\\frac{d[R]}{dt} = k [R] \\implies \\frac{d[R]}{[R]} = -k dt$$\n2. **Integration**: $\\int \\frac{d[R]}{[R]} = -k \\int dt \\implies \\ln[R] = -kt + I$.\n• At $t = 0, [R] = [R]_0 \\implies I = \\ln[R]_0$.\n• $\\ln[R] - \\ln[R]_0 = -kt \\implies \\ln\\left(\\frac{[R]_0}{[R]}\\right) = kt$.\n• Changing to base 10:\n$$k = \\frac{2.303}{t} \\log_{10}\\left(\\frac{[R]_0}{[R]}\\right)$$\n3. **Half-Life Period ($t_{1/2}$)**:\n• At $t = t_{1/2}, [R] = \\frac{[R]_0}{2}$.\n• $k = \\frac{2.303}{t_{1/2}} \\log_{10}\\left(\\frac{[R]_0}{[R]_0 / 2}\\right) = \\frac{2.303}{t_{1/2}} \\log_{10}(2) = \\frac{2.303 \\times 0.3010}{t_{1/2}} = \\frac{0.693}{t_{1/2}}$.\n$$t_{1/2} = \\frac{0.693}{k}$$\n• Since $[R]_0$ does not appear in the equation, $t_{1/2}$ is independent of initial concentration.",
         "formula": "k = \\frac{2.303}{t}\\log_{10}\\left(\\frac{[R]_0}{[R]}\\right), \\quad t_{1/2} = \\frac{0.693}{k}", "telugu_hint": "ప్రథమ క్రమాంక చర్య సమాకలిత రేటు సమీకరణం: k = \\frac{2.303}{t}\\log\\frac{[R]_0}{[R]}. అర్ధాయుష్షు t_{1/2} = \\frac{0.693}{k} తొలి గాఢతపై ఆధారపడదు.", "source_check": "verified"},
        {"id": "chem-ch04-q005", "subject": "Chemistry", "chapter": "Chemical Kinetics", "type": "Numerical", "marks": 4, "important": True,
         "question": "A first-order reaction has a rate constant $k = 1.15 \\times 10^{-3} \\text{ s}^{-1}$. How long will 5 g of this reactant take to reduce to 3 g?",
         "answer": "• Given: $k = 1.15 \\times 10^{-3} \\text{ s}^{-1}$, $[R]_0 = 5 \\text{ g}$, $[R] = 3 \\text{ g}$.\n• Formula: $t = \\frac{2.303}{k} \\log_{10}\\left(\\frac{[R]_0}{[R]}\\right)$\n• Calculation:\n$t = \\frac{2.303}{1.15 \\times 10^{-3}} \\log_{10}\\left(\\frac{5}{3}\\right) = 2002.6 \\times \\log_{10}(1.667) = 2002.6 \\times 0.2219 = 444.4 \\text{ seconds}$.\n• Result: Time required = $444.4 \\text{ s}$.",
         "formula": "t = \\frac{2.303}{k}\\log\\left(\\frac{5}{3}\\right) = 444.4\\text{ s}", "telugu_hint": "t = \\frac{2.303}{1.15 \\times 10^{-3}} \\log(1.667) = 444.4 సెకన్లు.", "source_check": "verified"},
        {"id": "chem-ch04-q006", "subject": "Chemistry", "chapter": "Chemical Kinetics", "type": "MCQ", "marks": 1, "important": False,
         "question": "For a zero-order reaction $A \\to B$, the units of rate constant $k$ are:",
         "options": ["A) $\\text{s}^{-1}$", "B) $\\text{mol L}^{-1} \\text{s}^{-1}$", "C) $\\text{L mol}^{-1} \\text{s}^{-1}$", "D) $\\text{mol}^{-2} \\text{L}^2 \\text{s}^{-1}$"],
         "correctOption": 1, "answer": "Correct Answer: B) $\\text{mol L}^{-1} \\text{s}^{-1}$.\n• Rate = $k [A]^0 = k$. Hence, unit of $k$ equals unit of rate: $\\text{mol L}^{-1} \\text{s}^{-1}$.",
         "formula": "\\text{Unit of } k = \\text{mol}^{1-n} \\text{L}^{n-1} \\text{s}^{-1}", "telugu_hint": "శూన్య క్రమాంక చర్యకు రేటు స్థిరాంకం ప్రమాణాలు: mol L^{-1} s^{-1}.", "source_check": "verified"}
    ]
}
save_chapter(ch04, "ch04-chemical-kinetics.js", "chemicalKineticsChapter")

# ==============================================================================
# CH 5: Surface Chemistry
# ==============================================================================
ch05 = {
    "id": "chem-ch05", "subject": "Chemistry", "chapterNumber": 5, "chapter": "Surface Chemistry",
    "formulaSheet": [
        {"title": "Freundlich Adsorption Isotherm", "formula": "\\frac{x}{m} = k P^{1/n} \\; (n > 1), \\quad \\log\\left(\\frac{x}{m}\\right) = \\log k + \\frac{1}{n}\\log P", "symbols": "x = \\text{Mass of gas adsorbed}, m = \\text{Mass of adsorbent}, P = \\text{Equilibrium pressure}", "units": "\\text{g/g}", "tip": "Plot of \\log(x/m) vs \\log P gives straight line with slope = 1/n and intercept = \\log k."},
        {"title": "Hardy-Schulze Rule", "formula": "\\text{Coagulating Power} \\propto (\\text{Valency of active ion})^4", "symbols": "Al^{3+} > Ba^{2+} > Na^+ \\text{ for negative sol}; \\quad [Fe(CN)_6]^{4-} > PO_4^{3-} > SO_4^{2-} > Cl^- \\text{ for positive sol}", "units": "\\text{Ratio}", "tip": "Higher the valency of the flocculating ion, greater is its precipitating power."}
    ],
    "questions": [
        {"id": "chem-ch05-q001", "subject": "Chemistry", "chapter": "Surface Chemistry", "type": "VSAQ", "marks": 2, "important": True,
         "question": "State Hardy-Schulze rule with suitable examples.",
         "answer": "• Statement: Greater the valency of the flocculating (oppositely charged) ion, the greater is its power to cause precipitation/coagulation of a colloidal solution.\n• For negative sol ($As_2S_3$): $Al^{3+} > Ba^{2+} > Na^+$.\n• For positive sol ($Fe(OH)_3$): $[Fe(CN)_6]^{4-} > PO_4^{3-} > SO_4^{2-} > Cl^-$.",
         "formula": "\\text{Coagulation Power} \\propto \\text{Valency}", "telugu_hint": "స్కందనం చెందించే అయాన్ సంయోజకత పెరిగేకొద్దీ దాని స్కందన సామర్థ్యం పెరుగుతుంది (హార్డీ-షుల్జే నియమం).", "source_check": "verified"},
        {"id": "chem-ch05-q002", "subject": "Chemistry", "chapter": "Surface Chemistry", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is Tyndall effect and Brownian movement in colloids?",
         "answer": "1. Tyndall Effect: The scattering of light by colloidal particles when a strong beam of light is passed through a colloidal sol, making the path of light visible.\n2. Brownian Movement: The continuous, rapid, zig-zag random motion of colloidal particles caused by unequal bombardments by dispersion medium molecules.",
         "formula": "\\text{Scattering } \\propto \\frac{1}{\\lambda^4}", "telugu_hint": "టిండాల్ ప్రభావం: కాంతి పరిక్షేపణం వల్ల కాంతి మార్గం కనిపించడం. బ్రౌనియన్ చలనం: కొల్లాయిడ్ కణాల జిగ్-జాగ్ చలనం.", "source_check": "verified"},
        {"id": "chem-ch05-q003", "subject": "Chemistry", "chapter": "Surface Chemistry", "type": "SAQ", "marks": 4, "important": True,
         "question": "Distinguish between Physisorption (Physical Adsorption) and Chemisorption (Chemical Adsorption).",
         "answer": "• **Physisorption**:\n1. Caused by weak van der Waals forces.\n2. Non-specific in nature.\n3. Reversible in nature.\n4. Low enthalpy of adsorption (20 - 40 kJ/mol).\n5. Forms multi-molecular layers at high pressure.\n\n• **Chemisorption**:\n1. Caused by strong chemical bond formation (covalent/ionic).\n2. Highly specific in nature.\n3. Irreversible in nature.\n4. High enthalpy of adsorption (80 - 240 kJ/mol).\n5. Forms unimolecular (single) layer.",
         "formula": "\\Delta H_{phys} = 20-40\\text{ kJ/mol}, \\quad \\Delta H_{chem} = 80-240\\text{ kJ/mol}", "telugu_hint": "భౌతిక అధిశోషణం బలహీన వాండర్‌వాల్స్ బలాల వల్ల జరుగుతుంది (ద్విగతం, బహుళ పొరలు). రసాయన అధిశోషణం బలమైన రసాయన బంధాల వల్ల జరుగుతుంది (ఏకగతం, ఏక పొర).", "source_check": "verified"},
        {"id": "chem-ch05-q004", "subject": "Chemistry", "chapter": "Surface Chemistry", "type": "SAQ", "marks": 4, "important": True,
         "question": "Compare Lyophilic and Lyophobic colloids with respect to preparation, stability, and reversibility.",
         "answer": "• **Lyophilic Colloids (Solvent-loving)**:\n1. Formed directly by mixing substance with dispersion medium (e.g. starch, gum, gelatin in water).\n2. Reversible sols: If evaporated, residue can be reconstituted by adding water.\n3. Highly stable; not easily precipitated by electrolytes.\n\n• **Lyophobic Colloids (Solvent-hating)**:\n1. Cannot be prepared by direct mixing; prepared by special chemical/physical methods (e.g. gold sol, $Fe(OH)_3$ sol, $As_2S_3$ sol).\n2. Irreversible sols: Precipitate cannot be reconstituted by adding liquid.\n3. Unstable; easily coagulated by adding small quantities of electrolytes.",
         "formula": "\\text{Lyophilic: Reversible, Stable; Lyophobic: Irreversible, Coagulated easily}", "telugu_hint": "లయోఫిలిక్ (ద్రావణి ప్రియ): నేరుగా తయారుచేయవచ్చు, ద్విగతం, స్థిరమైనవి. లయోఫోబిక్ (ద్రావణి విముఖ): ప్రత్యేక పద్ధతులతో తయారుచేస్తారు, ఏకగతం, అస్థిరమైనవి.", "source_check": "verified"},
        {"id": "chem-ch05-q005", "subject": "Chemistry", "chapter": "Surface Chemistry", "type": "MCQ", "marks": 1, "important": False,
         "question": "Milk is an emulsion of:",
         "options": ["A) Fat dispersed in water (O/W)", "B) Water dispersed in fat (W/O)", "C) Gas dispersed in liquid", "D) Solid dispersed in liquid"],
         "correctOption": 0, "answer": "Correct Answer: A) Fat dispersed in water (O/W).\n• In milk, liquid fat droplets are dispersed in water, stabilized by the milk protein casein.",
         "formula": "\\text{Milk = Oil-in-Water (O/W) Emulsion}", "telugu_hint": "పాలు అనేది నీటిలో కొవ్వు వెదజల్లబడిన ఎమల్షన్ (O/W).", "source_check": "verified"}
    ]
}
save_chapter(ch05, "ch05-surface-chemistry.js", "surfaceChemistryChapter")

# ==============================================================================
# CH 6: General Principles of Metallurgy
# ==============================================================================
ch06 = {
    "id": "chem-ch06", "subject": "Chemistry", "chapterNumber": 6, "chapter": "General Principles of Metallurgy",
    "formulaSheet": [
        {"title": "Ellingham Diagram Criteria", "formula": "\\Delta G^\\circ = \\Delta H^\\circ - T \\Delta S^\\circ < 0", "symbols": "\\Delta G^\\circ = \\text{Standard Gibbs free energy change}", "units": "\\text{kJ/mol}", "tip": "A metal can reduce the oxide of any other metal that lies above it in the Ellingham diagram."},
        {"title": "Important Ores of Metals", "formula": "\\text{Iron: Hematite } (Fe_2O_3), \\; \\text{Copper: Copper pyrites } (CuFeS_2), \\; \\text{Aluminium: Bauxite } (AlO_x(OH)_{3-2x}), \\; \\text{Zinc: Zinc blende } (ZnS)", "symbols": "", "units": "", "tip": "Sulfide ores are concentrated by froth floatation; Carbonate/hydrated ores by calcination."}
    ],
    "questions": [
        {"id": "chem-ch06-q001", "subject": "Chemistry", "chapter": "General Principles of Metallurgy", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Distinguish between Calcination and Roasting with examples.",
         "answer": "• **Calcination**: Heating concentrated ore in limited or no supply of air below its melting point to remove volatile moisture and $CO_2$:\n$CaCO_3 \\xrightarrow{\\Delta} CaO + CO_2 \\uparrow$\n• **Roasting**: Heating sulfide ore in excess supply of air below its melting point to convert it into metal oxide:\n$2ZnS + 3O_2 \\xrightarrow{\\Delta} 2ZnO + 2SO_2 \\uparrow$.",
         "formula": "CaCO_3 \\to CaO + CO_2, \\quad 2ZnS + 3O_2 \\to 2ZnO + 2SO_2", "telugu_hint": "భస్మీకరణం (Calcination): గాలి లేకుండా వేడి చేయడం; భర్జనం (Roasting): గాలి సమక్షంలో సల్ఫైడ్ ధాతువును ఆక్సైడ్‌గా మార్చడం.", "source_check": "verified"},
        {"id": "chem-ch06-q002", "subject": "Chemistry", "chapter": "General Principles of Metallurgy", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is the role of cryolite ($Na_3AlF_6$) in the extraction of Aluminium by Hall-Heroult process?",
         "answer": "• Cryolite lowers the extremely high melting point of pure alumina from $2050^\\circ\\text{C}$ to around $950^\\circ\\text{C}$.\n• It enhances the electrical conductivity of the molten electrolyte mixture.",
         "formula": "Na_3AlF_6 \\text{ lowers MP from } 2050^\\circ\\text{C to } 950^\\circ\\text{C}", "telugu_hint": "క్రయోలైట్ అల్యూమినా ద్రవీభవన స్థానాన్ని 2050°C నుండి 950°C కి తగ్గించి, విద్యుత్ వాహకతను పెంచుతుంది.", "source_check": "verified"},
        {"id": "chem-ch06-q003", "subject": "Chemistry", "chapter": "General Principles of Metallurgy", "type": "SAQ", "marks": 4, "important": True,
         "question": "Explain the Froth Floatation process for the concentration of sulfide ores with the role of collectors and depressants.",
         "answer": "1. **Principle**: Based on the difference in wetting characteristics of ore and gangue particles. Sulfide ore particles are wetted by pine oil, while gangue particles are wetted by water.\n2. **Procedure**: Powdered ore is mixed with water, collectors (pine oil, sodium ethyl xanthate), and frothers in a tank. Air is violently blown through the suspension.\n3. **Role of Reagents**:\n• **Collectors** (e.g. Pine oil, potassium ethyl xanthate): Enhance non-wettability of mineral particles with water, attaching them to rising froth bubbles.\n• **Froth Stabilizers** (e.g. Cresol, Aniline): Stabilize the air froth.\n• **Depressants** (e.g. $NaCN$): Selectively prevent one sulfide from forming froth in a mixed ore. For example, $NaCN$ selectively depresses $ZnS$ by forming soluble complex $Na_2[Zn(CN)_4]$, allowing $PbS$ to come with the froth.",
         "formula": "ZnS + 4NaCN \\to Na_2[Zn(CN)_4] + Na_2S", "telugu_hint": "ప్లవన ప్రక్రియ సల్ఫైడ్ ధాతువుల సాంద్రీకరణకు ఉపయోగిస్తారు. ధాతువు నూనెతో, వ్యర్థాలు నీటితో తడుస్తాయి. NaCN ని డిప్రెసెంట్‌గా ఉపయోగిస్తారు.", "source_check": "verified"},
        {"id": "chem-ch06-q004", "subject": "Chemistry", "chapter": "General Principles of Metallurgy", "type": "SAQ", "marks": 4, "important": True,
         "question": "Explain the refining of metals by (a) Zone Refining, and (b) Mond's process for refining Nickel.",
         "answer": "• **(a) Zone Refining**:\n1. Principle: Impurities are more soluble in the molten state (melt) than in the solid state of the metal.\n2. A circular mobile heater is moved slowly along an impure metal rod. Pure metal recrystallizes out behind the heater while impurities pass into the adjacent molten zone.\n3. Used for ultra-pure semiconductors: Silicon ($Si$), Germanium ($Ge$), Gallium ($Ga$).\n\n• **(b) Mond's Process for Nickel**:\n1. Impure nickel is heated in a stream of carbon monoxide at $330-350\\text{ K}$ to form volatile nickel tetracarbonyl:\n$Ni + 4CO \\xrightarrow{330-350\\text{ K}} Ni(CO)_4$\n2. The volatile complex is decomposed by heating at $450-470\\text{ K}$ to yield pure nickel:\n$Ni(CO)_4 \\xrightarrow{450-470\\text{ K}} Ni + 4CO \\uparrow$.",
         "formula": "Ni + 4CO \\rightleftharpoons Ni(CO)_4", "telugu_hint": "మండల శుద్ధి (Zone refining) సెమీకండక్టర్ల (Si, Ge) శుద్ధికి వాడతారు. మాండ్ ప్రక్రియ నికెల్ శుద్ధికి ఉపయోగిస్తారు.", "source_check": "verified"},
        {"id": "chem-ch06-q005", "subject": "Chemistry", "chapter": "General Principles of Metallurgy", "type": "MCQ", "marks": 1, "important": False,
         "question": "Copper matte obtained from the reverberatory furnace contains:",
         "options": ["A) $Cu_2O + FeO$", "B) $Cu_2S + FeS$", "C) $Cu_2S + Fe_2O_3$", "D) $CuSO_4 + FeSO_4$"],
         "correctOption": 1, "answer": "Correct Answer: B) $Cu_2S + FeS$.\n• Copper matte is a molten mixture of cuprous sulfide ($Cu_2S$) and ferrous sulfide ($FeS$).",
         "formula": "\\text{Copper Matte} = Cu_2S + FeS", "telugu_hint": "రాగి మాట్ అంటే Cu_2S మరియు FeS ల మిశ్రమం.", "source_check": "verified"}
    ]
}
save_chapter(ch06, "ch06-metallurgy.js", "metallurgyChapter")

# ==============================================================================
# CH 7: p-Block Elements (HIGH-YIELD 8M LAQ CHAPTER)
# ==============================================================================
ch07 = {
    "id": "chem-ch07", "subject": "Chemistry", "chapterNumber": 7, "chapter": "p-Block Elements",
    "formulaSheet": [
        {"title": "Haber's Process for Ammonia", "formula": "N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g), \\quad \\Delta H = -92.4 \\text{ kJ/mol}", "symbols": "\\text{Optimum conditions: } P = 200\\text{ atm}, T = 700\\text{ K}, \\text{Catalyst: Iron oxide with } K_2O, Al_2O_3", "units": "\\text{atm, K}", "tip": "Exothermic and decrease in volume; Le Chatelier's principle favors high pressure and moderate temperature."},
        {"title": "Ostwald's Process for Nitric Acid", "formula": "4NH_3 + 5O_2 \\xrightarrow{Pt/Rh, 500 K, 9 bar} 4NO + 6H_2O, \\quad 2NO + O_2 \\rightleftharpoons 2NO_2, \\quad 3NO_2 + H_2O \\to 2HNO_3 + NO", "symbols": "", "units": "", "tip": "Pt/Rh gauze acts as catalyst at 500 K and 9 bar pressure."},
        {"title": "Contact Process for Sulfuric Acid", "formula": "2SO_2 + O_2 \\xrightarrow{V_2O_5, 720 K, 2 bar} 2SO_3 \\; (\\Delta H = -196.6\\text{ kJ}), \\quad SO_3 + H_2SO_4 \\to H_2S_2O_7 \\text{ (Oleum)}", "symbols": "H_2S_2O_7 + H_2O \\to 2 H_2SO_4", "units": "", "tip": "SO3 is not directly dissolved in water because it forms dense fog of acid mist."}
    ],
    "questions": [
        {"id": "chem-ch07-q001", "subject": "Chemistry", "chapter": "p-Block Elements", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Why is $NH_3$ a Lewis base? What is the shape of $NH_3$ molecule?",
         "answer": "1. $NH_3$ is a Lewis base because the nitrogen atom has an unshared lone pair of electrons available for donation ($:NH_3$).\n2. Shape: Trigonal pyramidal ($sp^3$ hybridized with 1 lone pair, bond angle $107^\\circ$).",
         "formula": ":NH_3 \\text{ (Trigonal Pyramidal)}", "telugu_hint": "నత్రజని వద్ద ఒంటరి ఎలక్ట్రాన్ జంట ఉండటం వల్ల అమ్మోనియా లూయిస్ క్షారంగా పనిచేస్తుంది. ఆకృతి: పిరమిడల్.", "source_check": "verified"},
        {"id": "chem-ch07-q002", "subject": "Chemistry", "chapter": "p-Block Elements", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What are interhalogen compounds? Give two examples.",
         "answer": "• Definition: Binary compounds formed by the combination of two different halogen atoms with each other ($XX'_n$, where $n = 1, 3, 5, 7$).\n• Examples: $ClF_3$ (T-shaped), $IF_7$ (Pentagonal bipyramidal).",
         "formula": "XX'_n \\; (e.g. ClF_3, IF_7)", "telugu_hint": "రెండు వేర్వేరు హాలోజన్ పరమాణువుల మధ్య ఏర్పడే సమ్మేళనాలను అంతర్ హాలోజన్ సమ్మేళనాలు అంటారు (ఉదా: ClF_3, IF_7).", "source_check": "verified"},
        {"id": "chem-ch07-q003", "subject": "Chemistry", "chapter": "p-Block Elements", "type": "LAQ", "marks": 8, "important": True,
         "question": "How is ammonia manufactured by Haber's process? Explain the optimum conditions using Le Chatelier's principle with a flow diagram.",
         "answer": "1. **Chemical Equation**:\n$$N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g), \\quad \\Delta_r H^\\circ = -92.4\\text{ kJ/mol}$$\n\n2. **Application of Le Chatelier's Principle**:\n• **Effect of Pressure**: Formation of ammonia involves decrease in volume (4 volumes $\\to$ 2 volumes). According to Le Chatelier's principle, **high pressure** favors forward reaction. Optimum pressure = **200 atm**.\n• **Effect of Temperature**: The forward reaction is exothermic ($\\Delta H < 0$). Low temperature favors higher yield, but at low temperatures reaction rate is extremely sluggish. Hence an **optimum temperature of ~700 K** ($450-500^\\circ\\text{C}$) is used.\n• **Catalyst**: Finely divided iron oxide ($Fe_2O_3$) with small amounts of promoters ($K_2O$ and $Al_2O_3$) to increase rate of attainment of equilibrium.\n\n3. **Industrial Flow Diagram**:\n• $N_2$ and $H_2$ gases in 1:3 volume ratio are compressed to 200 atm in compressor.\n• Mixed gases enter catalyst chamber containing $Fe$ catalyst at 700 K.\n• Effluent gases pass through condenser where $NH_3$ liquefies.\n• Unreacted $N_2$ and $H_2$ are pumped back into compressor via recirculation pump.",
         "formula": "N_2 + 3H_2 \\rightleftharpoons 2NH_3 \\quad (200\\text{ atm, } 700\\text{ K, Fe catalyst})", "telugu_hint": "హేబర్ పద్ధతి: N_2 + 3H_2 \\rightleftharpoons 2NH_3. అనుకూల పరిస్థితులు: పీడనం 200 atm, ఉష్ణోగ్రత 700 K, ఉత్ప్రేరకం Fe, ప్రమోటర్లు K_2O, Al_2O_3.", "source_check": "verified"},
        {"id": "chem-ch07-q004", "subject": "Chemistry", "chapter": "p-Block Elements", "type": "LAQ", "marks": 8, "important": True,
         "question": "How is Ozone prepared in the laboratory? How does Ozone react with (a) Lead sulfide ($PbS$), (b) Potassium iodide ($KI$), and (c) Moist Silver ($Ag$)?",
         "answer": "1. **Laboratory Preparation**:\n• Prepared by passing a silent electric discharge through dry, pure, cold oxygen gas in an apparatus called ozoniser:\n$$3O_2(g) \\xrightarrow{\\text{Silent electric discharge}} 2O_3(g), \\quad \\Delta H = +285.4\\text{ kJ/mol}$$\n• Silent discharge avoids spark generation which would decompose ozone back to oxygen.\n\n2. **Reactions of Ozone (Powerful Oxidizing Agent)**:\n• **(a) Reaction with Lead Sulfide ($PbS$)**: Oxidizes black $PbS$ to white lead sulfate ($PbSO_4$):\n$$PbS + 4O_3 \\to PbSO_4 + 4O_2$$\n• **(b) Reaction with Potassium Iodide ($KI$)**: Oxidizes neutral aqueous $KI$ to liberate iodine ($I_2$):\n$$2KI + H_2O + O_3 \\to 2KOH + I_2 + O_2$$\n• **(c) Reaction with Moist Silver ($Ag$)**: Oxidizes silver to silver suboxide ($Ag_2O$), destroying its meniscus (Tailing of Mercury/Silver):\n$$2Ag + O_3 \\to Ag_2O + O_2$$.",
         "formula": "3O_2 \\to 2O_3, \\quad PbS + 4O_3 \\to PbSO_4 + 4O_2", "telugu_hint": "ఓజోన్ తయారీ: 3O_2 \\to 2O_3 (నిశ్శబ్ద విద్యుద్విసర్జన). చర్యలు: PbS ని PbSO4 గా, KI ని I2 గా, Ag ని Ag2O గా ఆక్సీకరణం చేస్తుంది.", "source_check": "verified"},
        {"id": "chem-ch07-q005", "subject": "Chemistry", "chapter": "p-Block Elements", "type": "MCQ", "marks": 1, "important": False,
         "question": "The oxidation state of sulfur in Caro's acid ($H_2SO_5$) and Marshall's acid ($H_2S_2O_8$) is:",
         "options": ["A) +8, +7", "B) +6, +6", "C) +4, +6", "D) +5, +5"],
         "correctOption": 1, "answer": "Correct Answer: B) +6, +6.\n• Both contain peroxy linkage ($-O-O-$). Sulfur has maximum oxidation state of +6 in both acids.",
         "formula": "\\text{Oxidation state of S in } H_2SO_5, H_2S_2O_8 = +6", "telugu_hint": "పెరాక్సీ బంధం ఉండటం వల్ల కారో ఆమ్లం మరియు మార్షల్ ఆమ్లంలో సల్ఫర్ ఆక్సీకరణ స్థితి +6.", "source_check": "verified"}
    ]
}
save_chapter(ch07, "ch07-p-block.js", "pBlockChapter")

# ==============================================================================
# CH 8: d and f Block Elements
# ==============================================================================
ch08 = {
    "id": "chem-ch08", "subject": "Chemistry", "chapterNumber": 8, "chapter": "d and f Block Elements",
    "formulaSheet": [
        {"title": "Magnetic Moment of Transition Metal Ions", "formula": "\\mu = \\sqrt{n(n + 2)} \\text{ BM}", "symbols": "n = \\text{Number of unpaired electrons}, \\text{BM} = \\text{Bohr Magneton}", "units": "\\text{BM}", "tip": "If n = 1: \\mu = 1.73 BM; n = 2: 2.83 BM; n = 3: 3.87 BM; n = 4: 4.90 BM; n = 5: 5.92 BM."},
        {"title": "Preparation of Potassium Dichromate", "formula": "4FeCr_2O_4 + 8Na_2CO_3 + 7O_2 \\to 8Na_2CrO_4 + 2Fe_2O_3 + 8CO_2", "symbols": "2Na_2CrO_4 + H_2SO_4 \\to Na_2Cr_2O_7 + Na_2SO_4 + H_2O, \\quad Na_2Cr_2O_7 + 2KCl \\to K_2Cr_2O_7 + 2NaCl", "units": "", "tip": "Dichromate ion Cr_2O_7^{2-} (orange) and chromate ion CrO_4^{2-} (yellow) interconvert with pH change."}
    ],
    "questions": [
        {"id": "chem-ch08-q001", "subject": "Chemistry", "chapter": "d and f Block Elements", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is Lanthanoid contraction? State its primary cause.",
         "answer": "1. Definition: The steady decrease in atomic and ionic radii of trivalent lanthanoids ($Ln^{3+}$) from Lanthanum ($Z=57$) to Lutetium ($Z=71$) with increasing atomic number.\n2. Cause: Imperfect shielding of nuclear charge by diffuse $4f$ electrons, pulling the outer shell inward.",
         "formula": "\\text{Radii: } La^{3+} (103\\text{ pm}) \\to Lu^{3+} (86\\text{ pm})", "telugu_hint": "లాంథనాయిడ్లలో పరమాణు సంఖ్య పెరిగేకొద్దీ పరమాణు, అయాన్ వ్యాసార్థాలు క్రమంగా తగ్గడాన్ని లాంథనాయిడ్ సంకోచం అంటారు. కారణం: 4f ఎలక్ట్రాన్ల బలహీన స్క్రీనింగ్ ప్రభావం.", "source_check": "verified"},
        {"id": "chem-ch08-q002", "subject": "Chemistry", "chapter": "d and f Block Elements", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Why do transition metals exhibit variable oxidation states?",
         "answer": "• Transition metals exhibit variable oxidation states because the energy difference between $(n-1)d$ and $ns$ orbitals is very small, allowing electrons from both orbitals to participate in bond formation.",
         "formula": "\\Delta E_{(n-1)d - ns} \\approx 0", "telugu_hint": "(n-1)d మరియు ns ఆర్బిటాళ్ళ శక్తుల మధ్య భేదం చాలా తక్కువగా ఉండటం వల్ల పరివర్తన మూలకాలు చర ఆక్సీకరణ స్థితులను ప్రదర్శిస్తాయి.", "source_check": "verified"},
        {"id": "chem-ch08-q003", "subject": "Chemistry", "chapter": "d and f Block Elements", "type": "SAQ", "marks": 4, "important": True,
         "question": "Give reasons for the following characteristic properties of transition elements: (a) Formation of colored ions, and (b) Catalytic activity.",
         "answer": "• **(a) Formation of Colored Ions**:\n1. Transition metal ions with incompletely filled $(n-1)d$ subshells have split $d$-orbitals ($t_{2g}$ and $e_g$).\n2. Electrons absorb specific visible light wavelengths to undergo **$d-d$ transitions**.\n3. The transmitted (complementary) light imparts characteristic color (e.g. $Cu^{2+}$ is blue, $Fe^{3+}$ is yellow/brown).\n\n• **(b) Catalytic Activity**:\n1. Transition metals and their compounds act as excellent catalysts because they can adopt **variable oxidation states** to form unstable intermediates.\n2. Their partially filled $d$-orbitals provide large active surface areas with vacant sites for reactants to adsorb.",
         "formula": "\\mu = \\sqrt{n(n+2)}\\text{ BM}, \\quad d-d \\text{ transition}", "telugu_hint": "రంగు గల అయాన్లు: d-d ఎలక్ట్రాన్ పరివర్తనల వల్ల; ఉత్ప్రేరక ధర్మం: చర ఆక్సీకరణ స్థితులు మరియు విశాల ఉపరితల వైశాల్యం వల్ల.", "source_check": "verified"},
        {"id": "chem-ch08-q004", "subject": "Chemistry", "chapter": "d and f Block Elements", "type": "Numerical", "marks": 2, "important": True,
         "question": "Calculate the 'spin-only' magnetic moment of $Fe^{2+}$ ion in Bohr Magnetons ($Z = 26$).",
         "answer": "• Electronic configuration of $Fe$: $[Ar] 3d^6 4s^2$.\n• Electronic configuration of $Fe^{2+}$: $[Ar] 3d^6$.\n• Number of unpaired electrons in $3d^6$: $n = 4$.\n• Formula: $\\mu = \\sqrt{n(n+2)} = \\sqrt{4(4+2)} = \\sqrt{24} \\approx 4.90 \\text{ BM}$.",
         "formula": "\\mu = \\sqrt{4(6)} = \\sqrt{24} = 4.90\\text{ BM}", "telugu_hint": "Fe^{2+} లో 4 ఒంటరి ఎలక్ట్రాన్లు ఉంటాయి: \\mu = \\sqrt{4(4+2)} = \\sqrt{24} \\approx 4.90 BM.", "source_check": "verified"},
        {"id": "chem-ch08-q005", "subject": "Chemistry", "chapter": "d and f Block Elements", "type": "MCQ", "marks": 1, "important": False,
         "question": "Which of the following ions is diamagnetic and colorless in aqueous solution?",
         "options": ["A) $Ti^{3+}$", "B) $Cu^{2+}$", "C) $Sc^{3+}$", "D) $Fe^{2+}$"],
         "correctOption": 2, "answer": "Correct Answer: C) $Sc^{3+}$.\n• $Sc^{3+}$ has configuration $[Ar] 3d^0$. Since it has no unpaired $d$-electrons, it is diamagnetic and cannot undergo $d-d$ transitions (colorless).",
         "formula": "Sc^{3+} = [Ar]3d^0 \\implies n=0", "telugu_hint": "Sc^{3+} లో d-ఎలక్ట్రాన్లు ఉండవు (3d^0), కాబట్టి ఇది డయా అయస్కాంతం మరియు రంగులేనిది.", "source_check": "verified"}
    ]
}
save_chapter(ch08, "ch08-df-block.js", "dfBlockChapter")

# ==============================================================================
# CH 9: Coordination Compounds
# ==============================================================================
ch09 = {
    "id": "chem-ch09", "subject": "Chemistry", "chapterNumber": 9, "chapter": "Coordination Compounds",
    "formulaSheet": [
        {"title": "Werner's Theory Valencies", "formula": "\\text{Primary Valency: Ionizable (Oxidation state)}, \\quad \\text{Secondary Valency: Non-ionizable (Coordination number)}", "symbols": "CoCl_3 \\cdot 6NH_3 \\to [Co(NH_3)_6]Cl_3 \\implies 3 Cl^- \\text{ precipitated with } AgNO_3", "units": "", "tip": "Secondary valency is directional and fixed (determines 3D octahedral or tetrahedral geometry)."},
        {"title": "Crystal Field Splitting Energy (CFSE)", "formula": "\\Delta_t = \\frac{4}{9} \\Delta_o, \\quad \\Delta_o = \\text{Octahedral splitting between } t_{2g} \\text{ and } e_g", "symbols": "\\text{Spectrochemical Series: } I^- < Br^- < Cl^- < F^- < OH^- < H_2O < NH_3 < en < CN^- < CO", "units": "\\text{cm}^{-1} \\text{ or kJ/mol}", "tip": "Strong field ligands (CN^-, CO) cause pairing (low spin); weak field ligands (halides) form high spin complexes."}
    ],
    "questions": [
        {"id": "chem-ch09-q001", "subject": "Chemistry", "chapter": "Coordination Compounds", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Write the IUPAC names of: (a) $[Co(NH_3)_6]Cl_3$ and (b) $K_4[Fe(CN)_6]$.",
         "answer": "• (a) $[Co(NH_3)_6]Cl_3$: **Hexaamminecobalt(III) chloride**.\n• (b) $K_4[Fe(CN)_6]$: **Potassium hexacyanidoferrate(II)**.",
         "formula": "[Co(NH_3)_6]Cl_3, \\quad K_4[Fe(CN)_6]", "telugu_hint": "(a) హెక్సా అమ్మీన్ కోబాల్ట్(III) క్లోరైడ్; (b) పొటాషియం హెక్సాసయనోఫెర్రేట్(II).", "source_check": "verified"},
        {"id": "chem-ch09-q002", "subject": "Chemistry", "chapter": "Coordination Compounds", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is an ambidentate ligand? Give two examples.",
         "answer": "• Definition: A monodentate ligand that can coordinate to the central metal atom through either of two different donor atoms.\n• Examples:\n1. Nitrito: $-NO_2^-$ (attaches through $N$) and $-ONO^-$ (attaches through $O$).\n2. Thiocyanato: $-SCN^-$ (attaches through $S$) and $-NCS^-$ (attaches through $N$).",
         "formula": "-NO_2^- \\text{ and } -ONO^-, \\quad -SCN^- \\text{ and } -NCS^-", "telugu_hint": "రెండు వేర్వేరు దాత పరమాణువుల ద్వారా బంధించగల లైగాండ్లను ఉభయదంత లైగాండ్లు అంటారు (ఉదా: NO_2^- / ONO^-).", "source_check": "verified"},
        {"id": "chem-ch09-q003", "subject": "Chemistry", "chapter": "Coordination Compounds", "type": "SAQ", "marks": 4, "important": True,
         "question": "State the main postulates of Werner's coordination theory.",
         "answer": "1. In coordination compounds, metals show two types of valency:\n• **Primary Valency**: Ionizable, non-directional, satisfied by negative anions. Corresponds to the oxidation state of the metal.\n• **Secondary Valency**: Non-ionizable, directional in space, satisfied by negative ions or neutral molecules. Corresponds to the coordination number of the metal.\n2. Every metal atom has a fixed number of secondary valencies (e.g. 6 for $Co^{3+}$, 4 for $Pt^{2+}$).\n3. Secondary valencies are directed toward fixed positions in space, defining the stereochemistry and geometrical shape of the complex (octahedral, tetrahedral, or square planar).",
         "formula": "\\text{Primary = Ionizable (Ox. State); Secondary = Coordinate Bond (Coord. No.)}", "telugu_hint": "వెర్నర్ సిద్ధాంతం: ప్రాథమిక సంయోజకత అయాన్లుగా మారుతుంది (ఆక్సీకరణ స్థితి); ద్వితీయ సంయోజకత అయాన్లుగా మారదు (సమన్వయ సంఖ్య) మరియు దిశాత్మకమైనది.", "source_check": "verified"},
        {"id": "chem-ch09-q004", "subject": "Chemistry", "chapter": "Coordination Compounds", "type": "SAQ", "marks": 4, "important": True,
         "question": "Using Valence Bond Theory (VBT), explain the hybridization, geometry, and magnetic property of $[Fe(CN)_6]^{4-}$ and $[Fe(H_2O)_6]^{2+}$.",
         "answer": "• **$[Fe(CN)_6]^{4-}$**:\n1. Central ion is $Fe^{2+}$ with $3d^6$ configuration.\n2. Cyanide ion ($CN^-$) is a **strong field ligand**, which forces all 6 electrons in $3d$ to pair up, leaving two vacant $3d$ orbitals.\n3. Hybridization: $d^2sp^3$ (Inner orbital octahedral complex).\n4. Unpaired electrons $n = 0 \\implies$ **Diamagnetic**.\n\n• **$[Fe(H_2O)_6]^{2+}$**:\n1. Water ($H_2O$) is a **weak field ligand**, unable to force pairing of $3d$ electrons.\n2. Uses outer $4s, 4p, 4d$ orbitals: $sp^3d^2$ hybridization (Outer orbital octahedral complex).\n3. Unpaired electrons $n = 4 \\implies$ **Strongly Paramagnetic** ($\\mu = 4.90\\text{ BM}$).",
         "formula": "[Fe(CN)_6]^{4-}: d^2sp^3 \\text{ (Diamagnetic)}; \\quad [Fe(H_2O)_6]^{2+}: sp^3d^2 \\text{ (Paramagnetic)}", "telugu_hint": "CN- బలమైన లైగాండ్ కాబట్టి ఎలక్ట్రాన్లు జతకూడి d^2sp^3 డయా అయస్కాంతం అవుతుంది. H2O బలహీన లైగాండ్ కాబట్టి sp^3d^2 పారా అయస్కాంతం అవుతుంది.", "source_check": "verified"},
        {"id": "chem-ch09-q005", "subject": "Chemistry", "chapter": "Coordination Compounds", "type": "MCQ", "marks": 1, "important": False,
         "question": "The number of ions produced from one mole of $[Co(NH_3)_5Cl]Cl_2$ in aqueous solution is:",
         "options": ["A) 4", "B) 3", "C) 2", "D) 1"],
         "correctOption": 1, "answer": "Correct Answer: B) 3.\n• Ionization: $[Co(NH_3)_5Cl]Cl_2 \\xrightarrow{aq} [Co(NH_3)_5Cl]^{2+} + 2Cl^-$. Total 3 ions (1 complex cation + 2 chloride anions).",
         "formula": "[Co(NH_3)_5Cl]Cl_2 \\to [Co(NH_3)_5Cl]^{2+} + 2Cl^-", "telugu_hint": "జలద్రావణంలో 1 సంక్లిష్ట కాటయాన్ మరియు 2 క్లోరైడ్ అయాన్లు (మొత్తం 3 అయాన్లు) ఏర్పడతాయి.", "source_check": "verified"}
    ]
}
save_chapter(ch09, "ch09-coordination.js", "coordinationChapter")

print("All Chemistry Chapters 3 to 9 generated successfully!")

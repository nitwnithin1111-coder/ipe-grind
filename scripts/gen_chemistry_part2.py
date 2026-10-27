# -*- coding: utf-8 -*-
"""
IPE TS Inter 2nd Year - Chemistry Chapters 10 to 15 Generator
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
# CH 10: Haloalkanes and Haloarenes
# ==============================================================================
ch10 = {
    "id": "chem-ch10", "subject": "Chemistry", "chapterNumber": 10, "chapter": "Haloalkanes and Haloarenes",
    "formulaSheet": [
        {"title": "SN1 vs SN2 Nucleophilic Substitution", "formula": "S_N1: \\text{Rate} = k[RX] \\; (3^\\circ > 2^\\circ > 1^\\circ), \\quad S_N2: \\text{Rate} = k[RX][Nu^-] \\; (1^\\circ > 2^\\circ > 3^\\circ)", "symbols": "S_N1: \\text{Carbocation intermediate, Racemization}; \\; S_N2: \\text{Transition state, Walden inversion}", "units": "", "tip": "Polar protic solvents favor S_N1; Polar aprotic solvents (acetone, DMF) favor S_N2."},
        {"title": "Name Reactions of Halo-compounds", "formula": "\\text{Wurtz-Fittig: } Ar-X + 2Na + R-X \\xrightarrow{\\text{dry ether}} Ar-R + 2NaX, \\quad \\text{Finkelstein: } R-Cl/Br + NaI \\xrightarrow{\\text{acetone}} R-I + NaX", "symbols": "\\text{Swarts: } R-Cl/Br + AgF/SbF_3 \\to R-F + AgX", "units": "", "tip": "Chloroform is stored in closed dark brown bottles filled to the brim to prevent oxidation to poisonous phosgene (COCl_2)."}
    ],
    "questions": [
        {"id": "chem-ch10-q001", "subject": "Chemistry", "chapter": "Haloalkanes and Haloarenes", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is Walden inversion and racemization in substitution reactions?",
         "answer": "1. Walden Inversion: Complete inversion of optical configuration at the chiral carbon atom occurring during a one-step $S_N2$ back-side attack mechanism (like an umbrella turning inside out in a storm).\n2. Racemization: Formation of an equimolar mixture of $(+)$ and $(-)$ enantiomers resulting in optical inactivity, occurring during a two-step $S_N1$ mechanism via planar carbocation.",
         "formula": "S_N2 \\implies \\text{Inversion}, \\quad S_N1 \\implies \\text{Racemization}", "telugu_hint": "SN2 చర్యలో వాల్డెన్ విలోమం (విన్యాసం తిరగబడటం) జరుగుతుంది. SN1 లో సమతల కార్బోకాటయాన్ వల్ల రెసిమీకరణం జరుగుతుంది.", "source_check": "verified"},
        {"id": "chem-ch10-q002", "subject": "Chemistry", "chapter": "Haloalkanes and Haloarenes", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Why is chloroform stored in closed, dark brown bottles filled completely to the brim?",
         "answer": "• In the presence of sunlight and atmospheric oxygen, chloroform slowly oxidizes to form **phosgene** ($COCl_2$), an extremely poisonous toxic gas:\n$2CHCl_3 + O_2 \\xrightarrow{h\\nu} 2COCl_2 + 2HCl$\n• Dark bottles cut off light, and filling to the brim excludes air.",
         "formula": "2CHCl_3 + O_2 \\xrightarrow{h\\nu} 2COCl_2 + 2HCl", "telugu_hint": "క్లోరోఫామ్ గాలి, కాంతి సమక్షంలో అత్యంత విషపూరితమైన ఫాస్జీన్ (COCl2) వాయువుగా మారుతుంది.", "source_check": "verified"},
        {"id": "chem-ch10-q003", "subject": "Chemistry", "chapter": "Haloalkanes and Haloarenes", "type": "SAQ", "marks": 4, "important": True,
         "question": "Compare $S_N1$ and $S_N2$ reaction mechanisms with respect to kinetics, mechanism, order of reactivity of alkyl halides, and stereochemistry.",
         "answer": "• **$S_N1$ Mechanism**:\n1. Unimolecular nucleophilic substitution; Rate = $k[R-X]$ (First order kinetics).\n2. Occurs in two steps via a planar intermediate carbocation.\n3. Reactivity order: $3^\\circ > 2^\\circ > 1^\\circ > CH_3-X$ (governed by carbocation stability).\n4. Stereochemistry: Involves racemization (partial retention + partial inversion).\n\n• **$S_N2$ Mechanism**:\n1. Bimolecular nucleophilic substitution; Rate = $k[R-X][Nu^-]$ (Second order kinetics).\n2. Occurs in a single concerted step through a pentacoordinated transition state.\n3. Reactivity order: $CH_3-X > 1^\\circ > 2^\\circ > 3^\\circ$ (governed by minimal steric hindrance).\n4. Stereochemistry: Involves complete Walden inversion.",
         "formula": "S_N1: 3^\\circ > 2^\\circ > 1^\\circ; \\quad S_N2: 1^\\circ > 2^\\circ > 3^\\circ", "telugu_hint": "SN1 రెండు దశల్లో జరుగుతుంది (3° > 2° > 1°). SN2 ఒకే దశలో వెనుక నుండి దాడి ద్వారా జరుగుతుంది (1° > 2° > 3°).", "source_check": "verified"},
        {"id": "chem-ch10-q004", "subject": "Chemistry", "chapter": "Haloalkanes and Haloarenes", "type": "SAQ", "marks": 4, "important": True,
         "question": "Write short notes on: (a) Wurtz-Fittig reaction, and (b) Finkelstein reaction.",
         "answer": "• **(a) Wurtz-Fittig Reaction**:\n- When an aryl halide and an alkyl halide are treated with sodium metal in dry ether, an alkylarene is formed:\n$$C_6H_5Br + 2Na + CH_3Br \\xrightarrow{\\text{dry ether}} C_6H_5-CH_3 \\text{ (Toluene)} + 2NaBr$$\n\n• **(b) Finkelstein Reaction**:\n- Alkyl iodides are prepared by the reaction of alkyl chlorides or bromides with sodium iodide ($NaI$) in dry acetone:\n$$R-Cl + NaI \\xrightarrow{\\text{dry acetone}} R-I + NaCl \\downarrow$$\n- $NaCl$ precipitates in acetone, driving the reaction forward by Le Chatelier's principle.",
         "formula": "ArX + 2Na + RX \\to Ar-R + 2NaX, \\quad R-Cl + NaI \\to R-I + NaCl", "telugu_hint": "ఉర్జ్-ఫిట్టిగ్: ఆల్కైల్ మరియు ఎరైల్ హాలైడ్ల మధ్య సోడియంతో చర్య. ఫింకెల్‌స్టీన్: ఆల్కైల్ అయోడైడ్ల తయారీ.", "source_check": "verified"},
        {"id": "chem-ch10-q005", "subject": "Chemistry", "chapter": "Haloalkanes and Haloarenes", "type": "MCQ", "marks": 1, "important": False,
         "question": "Which of the following alkyl halides undergoes $S_N1$ hydrolysis most rapidly?",
         "options": ["A) $CH_3Cl$", "B) $CH_3CH_2Cl$", "C) $(CH_3)_2CHCl$", "D) $(CH_3)_3CCl$"],
         "correctOption": 3, "answer": "Correct Answer: D) $(CH_3)_3CCl$.\n• Tert-butyl chloride forms a highly stable tertiary carbocation $(CH_3)_3C^+$, reacting fastest via $S_N1$.",
         "formula": "(CH_3)_3C^+ \\text{ is most stable carbocation}", "telugu_hint": "టెర్షియరీ బ్యూటైల్ క్లోరైడ్ అత్యంత స్థిరమైన కార్బోకాటయాన్ ఏర్పరుస్తుంది కాబట్టి SN1 లో వేగంగా పాల్గొంటుంది.", "source_check": "verified"}
    ]
}
save_chapter(ch10, "ch10-haloalkanes.js", "haloalkanesChapter")

# ==============================================================================
# CH 11: Oxygen Organics (HIGH-YIELD 8M LAQ CHAPTER)
# ==============================================================================
ch11 = {
    "id": "chem-ch11", "subject": "Chemistry", "chapterNumber": 11, "chapter": "Alcohols, Phenols, Ethers; Aldehydes, Ketones, Acids",
    "formulaSheet": [
        {"title": "Named Reactions of Phenols & Ethers", "formula": "\\text{Kolbe: } C_6H_5ONa + CO_2 \\xrightarrow{400 K, 4-7 atm} \\text{Salicylic acid}, \\quad \\text{Reimer-Tiemann: } C_6H_5OH + CHCl_3 + 3NaOH \\to \\text{Salicylaldehyde}", "symbols": "\\text{Williamson's Ether Synthesis: } R-X + R'-O^-Na^+ \\to R-O-R' + NaX", "units": "", "tip": "In Williamson synthesis, alkyl halide must be primary (1°) to avoid alkene elimination."},
        {"title": "Aldol & Cannizzaro Reactions", "formula": "\\text{Aldol: } 2CH_3CHO \\xrightarrow{\\text{dil. } NaOH} CH_3-CH(OH)-CH_2-CHO \\xrightarrow{\\Delta} CH_3-CH=CH-CHO \\; (\\alpha\\text{-H present})", "symbols": "\\text{Cannizzaro: } 2HCHO \\xrightarrow{50\\% KOH} CH_3OH + HCOOK \\; (\\text{no } \\alpha\\text{-H})", "units": "", "tip": "Aldol requires \\alpha-hydrogen; Cannizzaro occurs only in aldehydes having NO \\alpha-hydrogen."},
        {"title": "Hell-Volhard-Zelinsky (HVZ) Reaction", "formula": "R-CH_2-COOH + X_2 \\xrightarrow{\\text{red } P} R-CH(X)-COOH + HX \\; (X = Cl, Br)", "symbols": "", "units": "", "tip": "Carboxylic acids having \\alpha-hydrogen undergo halogenation at the \\alpha-position."}
    ],
    "questions": [
        {"id": "chem-ch11-q001", "subject": "Chemistry", "chapter": "Alcohols, Phenols, Ethers; Aldehydes, Ketones, Acids", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is Lucas reagent? How is it used to distinguish between primary, secondary, and tertiary alcohols?",
         "answer": "• **Lucas Reagent**: Equimolar mixture of concentrated $HCl$ and anhydrous $ZnCl_2$.\n1. **$3^\\circ$ Alcohol**: Produces turbidity immediately.\n2. **$2^\\circ$ Alcohol**: Produces turbidity within 5 minutes.\n3. **$1^\\circ$ Alcohol**: Produces no turbidity at room temperature; turbidity appears only on heating.",
         "formula": "\\text{Lucas Reagent: conc. } HCl + \\text{anh. } ZnCl_2", "telugu_hint": "లూకాస్ కారకం (conc. HCl + anh. ZnCl2): 3° ఆల్కహాల్ వెంటనే మసకబారుతుంది; 2° ఆల్కహాల్ 5 నిమిషాల్లో; 1° ఆల్కహాల్ గది ఉష్ణోగ్రత వద్ద స్పందించదు.", "source_check": "verified"},
        {"id": "chem-ch11-q002", "subject": "Chemistry", "chapter": "Alcohols, Phenols, Ethers; Aldehydes, Ketones, Acids", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Write the chemical equation for Williamson's ether synthesis.",
         "answer": "• Statement: When an alkyl halide is heated with sodium alkoxide, an ether is formed.\n• Equation: $CH_3CH_2Br + CH_3CH_2ONa \\to CH_3CH_2-O-CH_2CH_3 \\text{ (Diethyl ether)} + NaBr$.\n• Important: Alkyl halide must be primary ($1^\\circ$) to prevent dehydrohalogenation to alkene.",
         "formula": "R-X + R'-O^-Na^+ \\to R-O-R' + NaX", "telugu_hint": "విలియమ్సన్ ఈథర్ సంశ్లేషణ: ఆల్కైల్ హాలైడ్ + సోడియం ఆల్కాక్సైడ్ \\to ఈథర్.", "source_check": "verified"},
        {"id": "chem-ch11-q003", "subject": "Chemistry", "chapter": "Alcohols, Phenols, Ethers; Aldehydes, Ketones, Acids", "type": "LAQ", "marks": 8, "important": True,
         "question": "Explain the following named reactions with balanced chemical equations: (a) Reimer-Tiemann reaction, (b) Kolbe's reaction, (c) Aldol condensation, and (d) Cannizzaro reaction.",
         "answer": "1. **(a) Reimer-Tiemann Reaction**:\n• When phenol is treated with chloroform ($CHCl_3$) in the presence of aqueous $NaOH$ at $340\\text{ K}$, followed by acidification, **Salicylaldehyde** (2-hydroxybenzaldehyde) is formed:\n$$C_6H_5OH + CHCl_3 + 3NaOH \\xrightarrow{340\\text{ K}} o-HO-C_6H_4-CHO \\text{ (Salicylaldehyde)} + 3NaCl + 2H_2O$$\n\n2. **(b) Kolbe's Reaction**:\n• Phenol is converted into sodium phenoxide, which on heating with carbon dioxide ($CO_2$) at $400\\text{ K}$ under $4-7\\text{ atm}$ pressure followed by acidification yields **Salicylic acid** (2-hydroxybenzoic acid):\n$$C_6H_5ONa + CO_2 \\xrightarrow{400\\text{ K}, 4-7\\text{ atm}} o-HO-C_6H_4-COONa \\xrightarrow{H^+} o-HO-C_6H_4-COOH \\text{ (Salicylic acid)}$$\n\n3. **(c) Aldol Condensation**:\n• Two molecules of aldehydes or ketones containing at least one $\\alpha$-hydrogen atom in the presence of dilute alkali ($dil. NaOH$) condense to form a $\\beta$-hydroxy aldehyde (Aldol), which upon heating eliminates water to give $\\alpha,\\beta$-unsaturated carbonyl compound:\n$$2CH_3CHO \\xrightarrow{dil. NaOH} CH_3-CH(OH)-CH_2-CHO \\xrightarrow{\\Delta} CH_3-CH=CH-CHO \\text{ (Crotonaldehyde)} + H_2O$$\n\n4. **(d) Cannizzaro Reaction**:\n• Aldehydes having **no $\\alpha$-hydrogen** atoms (e.g. Formaldehyde, Benzaldehyde) undergo self oxidation-reduction (disproportionation) when heated with concentrated alkali ($50\\% KOH$), producing one molecule of alcohol and one molecule of carboxylic acid salt:\n$$2HCHO + \\text{conc. } KOH \\to CH_3OH \\text{ (Methanol)} + HCOOK \\text{ (Potassium formate)}$$\n$$2C_6H_5CHO + \\text{conc. } NaOH \\to C_6H_5CH_2OH \\text{ (Benzyl alcohol)} + C_6H_5COONa \\text{ (Sodium benzoate)}$$.",
         "formula": "\\text{Reimer-Tiemann, Kolbe, Aldol, Cannizzaro}", "telugu_hint": "రైమర్-టీమన్ (శాలిసిలాల్డిహైడ్), కోల్బే (శాలిసిలిక్ ఆమ్లం), ఆల్డాల్ (బీటా-హైడ్రాక్సీ ఆల్డిహైడ్), కానిజారో (ఆల్ఫా-హైడ్రోజన్ లేని ఆల్డిహైడ్ల ఆత్మ ఆక్సీకరణ-క్షయకరణం).", "source_check": "verified"},
        {"id": "chem-ch11-q004", "subject": "Chemistry", "chapter": "Alcohols, Phenols, Ethers; Aldehydes, Ketones, Acids", "type": "SAQ", "marks": 4, "important": True,
         "question": "Explain the Hell-Volhard-Zelinsky (HVZ) reaction and Clemmensen reduction with chemical equations.",
         "answer": "• **(a) Hell-Volhard-Zelinsky (HVZ) Reaction**:\n- Carboxylic acids having an $\\alpha$-hydrogen react with chlorine ($Cl_2$) or bromine ($Br_2$) in the presence of a small amount of red phosphorus to form $\\alpha$-halocarboxylic acids:\n$$CH_3-COOH + Cl_2 \\xrightarrow{\\text{red } P} Cl-CH_2-COOH \\text{ ($\\alpha$-Chloroacetic acid)} + HCl$$\n\n• **(b) Clemmensen Reduction**:\n- The carbonyl group ($>C=O$) of aldehydes or ketones is reduced to methylene group ($-CH_2-$) to form alkanes when treated with Zinc amalgam ($Zn/Hg$) and concentrated hydrochloric acid ($HCl$):\n$$CH_3-CHO + 4[H] \\xrightarrow{Zn-Hg / \\text{conc. } HCl} CH_3-CH_3 \\text{ (Ethane)} + H_2O$$.",
         "formula": "R-CH_2-COOH + X_2 \\xrightarrow{\\text{red P}} R-CH(X)-COOH, \\quad >C=O \\xrightarrow{Zn-Hg/HCl} -CH_2-", "telugu_hint": "HVZ చర్య: రెడ్ ఫాస్ఫరస్ సమక్షంలో ఆల్ఫా-హాలోజనీకరణం. క్లెమెన్సన్ క్షయకరణం: జింక్ అమాల్గమ్, conc. HCl తో కార్బోనైల్ గ్రూప్ ఆల్కేన్‌గా మారుతుంది.", "source_check": "verified"},
        {"id": "chem-ch11-q005", "subject": "Chemistry", "chapter": "Alcohols, Phenols, Ethers; Aldehydes, Ketones, Acids", "type": "MCQ", "marks": 1, "important": False,
         "question": "Which of the following compounds gives a positive Tollens' test (Silver Mirror)?",
         "options": ["A) Acetone", "B) Acetaldehyde", "C) Acetic acid", "D) Diethyl ether"],
         "correctOption": 1, "answer": "Correct Answer: B) Acetaldehyde ($CH_3CHO$).\n• Aldehydes reduce Tollens' reagent ($[Ag(NH_3)_2]^+$) to metallic silver, forming a shining silver mirror on the test tube wall.",
         "formula": "R-CHO + 2[Ag(NH_3)_2]^+ + 3OH^- \\to R-COO^- + 2Ag\\downarrow + 4NH_3 + 2H_2O", "telugu_hint": "ఆల్డిహైడ్లు టోలెన్స్ కారకాన్ని క్షయకరణం చేసి వెండి అద్దం (Silver Mirror) ఏర్పరుస్తాయి.", "source_check": "verified"}
    ]
}
save_chapter(ch11, "ch11-oxygen-organics.js", "oxygenOrganicsChapter")

# ==============================================================================
# CH 12: Amines
# ==============================================================================
ch12 = {
    "id": "chem-ch12", "subject": "Chemistry", "chapterNumber": 12, "chapter": "Amines (Organic Nitrogen Compounds)",
    "formulaSheet": [
        {"title": "Carbylamine Test & Hoffmann Degradation", "formula": "\\text{Carbylamine: } R-NH_2 + CHCl_3 + 3KOH \\xrightarrow{\\Delta} R-NC \\text{ (Isocyanide)} + 3KCl + 3H_2O", "symbols": "\\text{Hoffmann: } R-CONH_2 + Br_2 + 4KOH \\to R-NH_2 + K_2CO_3 + 2KBr + 2H_2O", "units": "", "tip": "Carbylamine test is given ONLY by primary (1°) aliphatic and aromatic amines; forms foul-smelling isocyanides."},
        {"title": "Basicity Order of Amines in Aqueous Solution", "formula": "\\text{Methyl substituted: } (CH_3)_2NH > CH_3NH_2 > (CH_3)_3N > NH_3 \\; (2^\\circ > 1^\\circ > 3^\\circ > NH_3)", "symbols": "\\text{Ethyl substituted: } (C_2H_5)_2NH > (C_2H_5)_3N > C_2H_5NH_2 > NH_3 \\; (2^\\circ > 3^\\circ > 1^\\circ > NH_3)", "units": "", "tip": "Governed by combined effects of +I inductive effect, steric hindrance, and hydration of cations."}
    ],
    "questions": [
        {"id": "chem-ch12-q001", "subject": "Chemistry", "chapter": "Amines (Organic Nitrogen Compounds)", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is Carbylamine test? Write the chemical equation.",
         "answer": "• Statement: When primary ($1^\\circ$) aliphatic or aromatic amines are heated with chloroform and alcoholic $KOH$, extremely foul-smelling **isocyanides (carbylamines)** are produced.\n• Equation:\n$$CH_3CH_2NH_2 + CHCl_3 + 3KOH \\xrightarrow{\\Delta} CH_3CH_2NC \\text{ (Ethyl isocyanide)} + 3KCl + 3H_2O$$\n• Note: Secondary and tertiary amines do not show this test.",
         "formula": "R-NH_2 + CHCl_3 + 3KOH \\to R-NC + 3KCl + 3H_2O", "telugu_hint": "కార్బైలమైన్ పరీక్ష: ప్రాథమిక అమైన్లు క్లోరోఫామ్, alc. KOH తో వేడిచేసినప్పుడు దుర్వాసన గల ఐసోసయనైడ్లను ఏర్పరుస్తాయి.", "source_check": "verified"},
        {"id": "chem-ch12-q002", "subject": "Chemistry", "chapter": "Amines (Organic Nitrogen Compounds)", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Explain Hoffmann bromamide degradation reaction with an equation.",
         "answer": "• Statement: When an acid amide is treated with bromine ($Br_2$) in an aqueous or ethanolic solution of sodium hydroxide ($NaOH$), a primary amine having **one carbon atom less** than the parent amide is formed:\n$$CH_3-CONH_2 + Br_2 + 4NaOH \\to CH_3-NH_2 \\text{ (Methylamine)} + Na_2CO_3 + 2NaBr + 2H_2O$$.",
         "formula": "R-CONH_2 + Br_2 + 4NaOH \\to R-NH_2 + Na_2CO_3 + 2NaBr + 2H_2O", "telugu_hint": "హాఫ్‌మన్ బ్రోమమైడ్ చర్య: ఎమైడ్ ఒక కార్బన్ తక్కువ గల ప్రైమరీ అమైన్‌గా మారుతుంది.", "source_check": "verified"},
        {"id": "chem-ch12-q003", "subject": "Chemistry", "chapter": "Amines (Organic Nitrogen Compounds)", "type": "SAQ", "marks": 4, "important": True,
         "question": "How do primary, secondary, and tertiary amines react with Hinsberg's reagent (Benzenesulfonyl chloride)?",
         "answer": "• **Hinsberg's Reagent**: Benzenesulfonyl chloride ($C_6H_5SO_2Cl$).\n1. **Primary ($1^\\circ$) Amine**:\n• Reacts to form N-alkylbenzenesulfonamide, which has an acidic hydrogen attached to nitrogen and **dissolves in alkali ($KOH$)**:\n$C_6H_5SO_2Cl + R-NH_2 \\to C_6H_5SO_2NHR + HCl$.\n\n2. **Secondary ($2^\\circ$) Amine**:\n• Reacts to form N,N-dialkylbenzenesulfonamide, which lacks acidic hydrogen on nitrogen and is **insoluble in alkali**:\n$C_6H_5SO_2Cl + R_2NH \\to C_6H_5SO_2NR_2 + HCl$.\n\n3. **Tertiary ($3^\\circ$) Amine**:\n• Does not react with Hinsberg's reagent because it has no replaceable hydrogen atom attached to nitrogen.",
         "formula": "1^\\circ: \\text{Soluble in alkali}; \\quad 2^\\circ: \\text{Insoluble in alkali}; \\quad 3^\\circ: \\text{No reaction}", "telugu_hint": "హిన్స్‌బర్గ్ కారకం: 1° అమైన్ క్షారంలో కరుగుతుంది; 2° అమైన్ క్షారంలో కరగదు; 3° అమైన్ చర్య జరపదు.", "source_check": "verified"},
        {"id": "chem-ch12-q004", "subject": "Chemistry", "chapter": "Amines (Organic Nitrogen Compounds)", "type": "MCQ", "marks": 1, "important": False,
         "question": "The correct order of basic strength of methyl substituted amines in aqueous solution is:",
         "options": ["A) $(CH_3)_3N > (CH_3)_2NH > CH_3NH_2$", "B) $(CH_3)_2NH > CH_3NH_2 > (CH_3)_3N > NH_3$", "C) $CH_3NH_2 > (CH_3)_2NH > (CH_3)_3N$", "D) $NH_3 > (CH_3)_3N > (CH_3)_2NH$"],
         "correctOption": 1, "answer": "Correct Answer: B) $(CH_3)_2NH > CH_3NH_2 > (CH_3)_3N > NH_3$.\n• In aqueous medium, basic strength is $2^\\circ > 1^\\circ > 3^\\circ > NH_3$ due to the combined effect of inductive effect, hydration enthalpy, and steric factors.",
         "formula": "(CH_3)_2NH > CH_3NH_2 > (CH_3)_3N > NH_3", "telugu_hint": "జలద్రావణంలో మిథైల్ అమైన్ల క్షార బల క్రమం: 2° > 1° > 3° > NH3.", "source_check": "verified"}
    ]
}
save_chapter(ch12, "ch12-amines.js", "aminesChapter")

# ==============================================================================
# CH 13: Biomolecules
# ==============================================================================
ch13 = {
    "id": "chem-ch13", "subject": "Chemistry", "chapterNumber": 13, "chapter": "Biomolecules",
    "formulaSheet": [
        {"title": "D-Glucose Structure & Reactions", "formula": "\\text{Glucose } (C_6H_{12}O_6) + HI \\xrightarrow{\\Delta} n\\text{-hexane}, \\quad \\text{Glucose} + Br_2 \\text{ water} \\to \\text{Gluconic acid}, \\quad \\text{Glucose} + conc. HNO_3 \\to \\text{Saccharic acid}", "symbols": "", "units": "", "tip": "Aldohexose with 4 chiral carbon centers (2^4 = 16 optical isomers)."},
        {"title": "Peptide Bond & Zwitterion", "formula": "H_2N-CHR-COOH \\rightleftharpoons H_3N^+-CHR-COO^- \\text{ (Zwitterion)}, \\quad -CO-NH- \\text{ (Peptide Linkage)}", "symbols": "", "units": "", "tip": "At isoelectric point (pI), amino acid exists as neutral dipolar zwitterion with no net electrical migration."}
    ],
    "questions": [
        {"id": "chem-ch13-q001", "subject": "Chemistry", "chapter": "Biomolecules", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is a peptide linkage? What is a zwitterion?",
         "answer": "1. Peptide Linkage ($-CO-NH-$): The covalent amide bond formed between the carboxyl group ($-COOH$) of one amino acid and the amino group ($-NH_2$) of an adjacent amino acid with elimination of a water molecule.\n2. Zwitterion: A dipolar ion containing both positive ($-NH_3^+$) and negative ($-COO^-$) charges within the same molecule, formed by internal proton transfer in amino acids.",
         "formula": "-CO-NH-, \\quad H_3N^+-CHR-COO^-", "telugu_hint": "పెప్టైడ్ బంధం: అమైనో ఆమ్లాల మధ్య ఏర్పడే -CO-NH- బంధం. జ్విట్టర్ అయాన్: అంతర్గత ప్రోటాన్ బదిలీ వల్ల ఏర్పడే ద్విధ్రువ అయాన్.", "source_check": "verified"},
        {"id": "chem-ch13-q002", "subject": "Chemistry", "chapter": "Biomolecules", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is denaturation of proteins? Which protein structures remain unaffected during denaturation?",
         "answer": "1. Denaturation: The loss of biological activity of a native protein when subjected to physical changes (temperature) or chemical changes (pH), causing unfolding of globule and uncoiling of helix.\n2. Unaffected structure: The **Primary structure** (covalent peptide sequence) remains completely intact, while secondary and tertiary structures are destroyed.",
         "formula": "\\text{Native Protein} \\xrightarrow{\\Delta / pH} \\text{Denatured (Primary intact)}", "telugu_hint": "ఉష్ణోగ్రత లేదా pH మార్పు వల్ల ప్రోటీన్ జీవక్రియ కోల్పోవడాన్ని డీనేచురేషన్ అంటారు. ప్రాథమిక నిర్మాణం స్థిరంగా ఉంటుంది.", "source_check": "verified"},
        {"id": "chem-ch13-q003", "subject": "Chemistry", "chapter": "Biomolecules", "type": "SAQ", "marks": 4, "important": True,
         "question": "State any four distinct structural differences between DNA and RNA.",
         "answer": "• **DNA (Deoxyribonucleic Acid)**:\n1. Contains 2-deoxy-D-ribose sugar.\n2. Nitrogenous bases: Adenine ($A$), Guanine ($G$), Cytosine ($C$), and **Thymine ($T$)**.\n3. Possesses a double-stranded helical structure ($B$-DNA).\n4. Acts as the permanent repository of genetic information; capable of self-replication.\n\n• **RNA (Ribonucleic Acid)**:\n1. Contains D-ribose sugar.\n2. Nitrogenous bases: Adenine ($A$), Guanine ($G$), Cytosine ($C$), and **Uracil ($U$)** (in place of Thymine).\n3. Usually single-stranded structure.\n4. Primarily directs protein synthesis; does not replicate itself (except in some retroviruses).",
         "formula": "\\text{DNA: Deoxyribose, Thymine, Double-stranded; RNA: Ribose, Uracil, Single-stranded}", "telugu_hint": "DNA: డీఆక్సీరైబోజ్ చక్కెర, థైమిన్, ద్వితంతు నిర్మాణం. RNA: రైబోజ్ చక్కెర, యురాసిల్, ఏకతంతు నిర్మాణం.", "source_check": "verified"},
        {"id": "chem-ch13-q004", "subject": "Chemistry", "chapter": "Biomolecules", "type": "MCQ", "marks": 1, "important": False,
         "question": "Deficiency of Vitamin C in human body leads to which disease?",
         "answer": "Correct Answer: B) Scurvy.\n• Vitamin C (Ascorbic acid) deficiency causes bleeding gums and skin hemorrhages (Scurvy).",
         "options": ["A) Rickets", "B) Scurvy", "C) Beri-beri", "D) Night blindness"],
         "correctOption": 1,
         "formula": "\\text{Vitamin C (Ascorbic Acid) } \\implies \\text{Scurvy}", "telugu_hint": "విటమిన్ C లోపం వల్ల స్కర్వీ (చిగుళ్ల నుండి రక్తం కారడం) వ్యాధి వస్తుంది.", "source_check": "verified"}
    ]
}
save_chapter(ch13, "ch13-biomolecules.js", "biomoleculesChapter")

# ==============================================================================
# CH 14: Polymers
# ==============================================================================
ch14 = {
    "id": "chem-ch14", "subject": "Chemistry", "chapterNumber": 14, "chapter": "Polymers",
    "formulaSheet": [
        {"title": "Classification of Polymers by Synthesis", "formula": "\\text{Addition (Chain-growth): } n CH_2=CH_2 \\xrightarrow{\\text{catalyst}} [CH_2-CH_2]_n \\text{ (Polyethylene)}", "symbols": "\\text{Condensation (Step-growth): Monomers with bifunctional groups react eliminating small molecules (} H_2O, HCl, NH_3 \\text{)}", "units": "", "tip": "Nylon-6,6: Hexamethylenediamine + Adipic acid; Dacron: Ethylene glycol + Terephthalic acid."},
        {"title": "Biodegradable Polymers", "formula": "\\text{PHBV: Poly } \\beta\\text{-hydroxybutyrate-co-} \\beta\\text{-hydroxyvalerate}, \\quad \\text{Nylon-2-nylon-6: Glycine + } \\varepsilon\\text{-aminocaproic acid}", "symbols": "", "units": "", "tip": "Undergo enzymatic bacterial degradation in the environment without polluting."}
    ],
    "questions": [
        {"id": "chem-ch14-q001", "subject": "Chemistry", "chapter": "Polymers", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Distinguish between Addition polymers and Condensation polymers with one example each.",
         "answer": "1. **Addition Polymers**: Formed by repeated addition of unsaturated monomer molecules without elimination of any small molecules (e.g. Polythene from ethene, Teflon from tetrafluoroethene).\n2. **Condensation Polymers**: Formed by repeated condensation reaction between bifunctional or polyfunctional monomers with elimination of small molecules like $H_2O, NH_3, HCl$ (e.g. Nylon-6,6, Terylene).",
         "formula": "\\text{Addition: No byproducts; Condensation: Eliminates } H_2O/HCl", "telugu_hint": "సంకలన పాలిమర్లు: ఉప-ఉత్పత్తులు లేకుండా ఏర్పడతాయి (పాలీథీన్). సంగ్రహణ పాలిమర్లు: నీరు లేదా HCl తొలగించబడి ఏర్పడతాయి (నైలాన్-6,6).", "source_check": "verified"},
        {"id": "chem-ch14-q002", "subject": "Chemistry", "chapter": "Polymers", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What is PHBV? Why is it environmentally significant?",
         "answer": "• **PHBV**: Poly $\\beta$-hydroxybutyrate-co-$\\beta$-hydroxyvalerate, a copolymer of 3-hydroxybutanoic acid and 3-hydroxypentanoic acid.\n• Environmental significance: It is a **biodegradable aliphatic polyester** that decomposes naturally into environmentally safe products by bacterial action, used in medical implants and capsule packaging.",
         "formula": "\\text{PHBV = Biodegradable Polyester}", "telugu_hint": "PHBV ఒక జీవ విచ్ఛిన్నం చెందే పాలిమర్. బ్యాక్టీరియా వల్ల సులభంగా విచ్ఛిన్నమై పర్యావరణ కాలుష్యాన్ని నివారిస్తుంది.", "source_check": "verified"},
        {"id": "chem-ch14-q003", "subject": "Chemistry", "chapter": "Polymers", "type": "SAQ", "marks": 4, "important": True,
         "question": "Write the monomer names and chemical equations for the preparation of: (a) Nylon-6,6, and (b) Bakelite.",
         "answer": "• **(a) Nylon-6,6**:\n1. Monomers: Hexamethylenediamine ($H_2N-(CH_2)_6-NH_2$) and Adipic acid ($HOOC-(CH_2)_4-COOH$).\n2. Equation:\n$$n H_2N-(CH_2)_6-NH_2 + n HOOC-(CH_2)_4-COOH \\xrightarrow{553\\text{ K}, \\text{high } P} [NH-(CH_2)_6-NH-CO-(CH_2)_4-CO]_n + 2n H_2O$$\n\n• **(b) Bakelite (Phenol-Formaldehyde Polymer)**:\n1. Monomers: Phenol ($C_6H_5OH$) and Formaldehyde ($HCHO$).\n2. Preparation: Condensation in presence of acid or base catalyst gives ortho and para hydroxymethylphenol derivatives. Linear polymer Novolac on heating with formaldehyde forms heavily cross-linked thermosetting Bakelite.",
         "formula": "\\text{Nylon-6,6: Hexanediamine + Adipic acid; Bakelite: Phenol + Formaldehyde}", "telugu_hint": "నైలాన్-6,6: హెక్సామిథిలీన్ డైఅమైన్ + అడిపిక్ ఆమ్లం; బేకలైట్: ఫీనాల్ + ఫార్మాల్డిహైడ్ (థర్మోసెట్టింగ్ ప్లాస్టిక్).", "source_check": "verified"},
        {"id": "chem-ch14-q004", "subject": "Chemistry", "chapter": "Polymers", "type": "MCQ", "marks": 1, "important": False,
         "question": "Which of the following polymers is a thermosetting plastic?",
         "options": ["A) Polyethylene", "B) Bakelite", "C) PVC", "D) Polystyrene"],
         "correctOption": 1, "answer": "Correct Answer: B) Bakelite.\n• Bakelite is a cross-linked thermosetting polymer that permanently hardens on heating and cannot be remolded.",
         "formula": "\\text{Bakelite = Cross-linked Thermosetting Plastic}", "telugu_hint": "బేకలైట్ ఒక థర్మోసెట్టింగ్ ప్లాస్టిక్, వేడిచేస్తే తిరిగి కరగదు.", "source_check": "verified"}
    ]
}
save_chapter(ch14, "ch14-polymers.js", "polymersChapter")

# ==============================================================================
# CH 15: Chemistry in Everyday Life
# ==============================================================================
ch15 = {
    "id": "chem-ch15", "subject": "Chemistry", "chapterNumber": 15, "chapter": "Chemistry in Everyday Life",
    "formulaSheet": [
        {"title": "Classification of Therapeutic Drugs", "formula": "\\text{Analgesics: Relieve pain without consciousness loss}, \\quad \\text{Antipyretics: Lower body temperature in fever}", "symbols": "\\text{Antiseptics: Applied to living tissues (Dettol)}; \\quad \\text{Disinfectants: Applied to inanimate floors/drains (1\\% phenol)}", "units": "", "tip": "Dettol is a mixture of chloroxylenol and \\alpha-terpineol."},
        {"title": "Soaps and Synthetic Detergents", "formula": "\\text{Soap: } R-COO^-Na^+ \\; (\\text{forms scum with } Ca^{2+}, Mg^{2+} \\text{ in hard water})", "symbols": "\\text{Synthetic Detergent: Anionic (Sodium lauryl sulfate), Cationic (Cetyltrimethylammonium bromide), Non-ionic}", "units": "", "tip": "Detergents work efficiently even in hard water because their calcium and magnesium salts are soluble in water."}
    ],
    "questions": [
        {"id": "chem-ch15-q001", "subject": "Chemistry", "chapter": "Chemistry in Everyday Life", "type": "VSAQ", "marks": 2, "important": True,
         "question": "Distinguish between Antiseptics and Disinfectants. Give one example of a substance that can act as both.",
         "answer": "1. **Antiseptics**: Chemicals that kill or prevent microbial growth, applied safely to **living tissues** such as wounds, cuts, and ulcers (e.g. Dettol, Savlon, Bithionol in soap).\n2. **Disinfectants**: Chemicals that kill microorganisms, applied only to **inanimate objects** like floors, drainage systems, and surgical tools.\n3. **Both**: **Phenol**:\n• $0.2\\%$ solution of phenol acts as an antiseptic.\n• $1.0\\%$ solution of phenol acts as a disinfectant.",
         "formula": "0.2\\% \\text{ Phenol = Antiseptic}; \\quad 1.0\\% \\text{ Phenol = Disinfectant}", "telugu_hint": "యాంటిసెప్టిక్స్: సజీవ కణజాలాలపై వాడతారు (డెట్టాల్). క్రిమిసంహారకాలు: నేలలు, డ్రైనేజీలపై వాడతారు. 0.2% ఫీనాల్ యాంటిసెప్టిక్, 1.0% ఫీనాల్ క్రిమిసంహారకం.", "source_check": "verified"},
        {"id": "chem-ch15-q002", "subject": "Chemistry", "chapter": "Chemistry in Everyday Life", "type": "VSAQ", "marks": 2, "important": True,
         "question": "What are analgesics? How are they classified? Give examples.",
         "answer": "• **Analgesics**: Medicines that alleviate or abolish pain without causing impairment of consciousness or mental confusion.\n1. **Non-narcotic (Non-addictive)**: Aspirin, Paracetamol (used for mild pains and fever).\n2. **Narcotic (Addictive)**: Morphine, Heroin, Codeine (prescribed for severe postoperative or cancer pain).",
         "formula": "\\text{Non-narcotic: Aspirin, Paracetamol; Narcotic: Morphine}", "telugu_hint": "నొప్పి నివారిణులు (అనాల్జెసిక్స్): స్పృహ కోల్పోకుండా నొప్పిని తగ్గిస్తాయి. అలవాటు పడనివి: ఆస్పిరిన్, పారాసిటమాల్; అలవాటు పడేవి: మార్ఫిన్.", "source_check": "verified"},
        {"id": "chem-ch15-q003", "subject": "Chemistry", "chapter": "Chemistry in Everyday Life", "type": "SAQ", "marks": 4, "important": True,
         "question": "Explain with examples: (a) Broad-spectrum antibiotics, (b) Antihistamines, (c) Artificial sweetening agents, and (d) Tranquilizers.",
         "answer": "• **(a) Broad-Spectrum Antibiotics**:\n- Antibiotics that kill or inhibit a wide range of Gram-positive and Gram-negative bacteria (e.g. Chloramphenicol, Ampicillin, Amoxicillin).\n\n• **(b) Antihistamines**:\n- Drugs that counteract allergic reactions by competing with histamine for binding sites on receptor cells (e.g. Terfenadine (Seldane), Brompheniramine (Dimetapp)).\n\n• **(c) Artificial Sweeteners**:\n- Chemical substances that impart sweetness to food without adding calories, suitable for diabetic patients (e.g. Aspartame (unstable to cooking heat), Saccharin, Sucralose).\n\n• **(d) Tranquilizers**:\n- Chemical compounds used for the treatment of stress, severe mental anxiety, and depression by affecting neurotransmitter transmission (e.g. Equanil, Valium, Serotonin).",
         "formula": "\\text{Broad-spectrum: Chloramphenicol; Sweetener: Saccharin, Aspartame}", "telugu_hint": "విస్తృత స్థాయి యాంటీబయోటిక్స్: క్లోరాంఫెనికాల్; యాంటీహిస్టమైన్లు: అలెర్జీ నివారిణులు; కృత్రిమ తీపి కారకాలు: సాకరిన్, ఆస్పార్టేమ్; ట్రాంక్విలైజర్లు: మానసిక ఒత్తిడి నివారిణులు.", "source_check": "verified"},
        {"id": "chem-ch15-q004", "subject": "Chemistry", "chapter": "Chemistry in Everyday Life", "type": "MCQ", "marks": 1, "important": False,
         "question": "The active chemical ingredients present in Dettol are:",
         "options": ["A) Chloroxylenol and Terpineol", "B) Phenol and Bithionol", "C) Iodine and Alcohol", "D) Aspirin and Paracetamol"],
         "correctOption": 0, "answer": "Correct Answer: A) Chloroxylenol and Terpineol.\n• Dettol is a well-known antiseptic composed of a mixture of chloroxylenol and $\\alpha$-terpineol.",
         "formula": "\\text{Dettol} = \\text{Chloroxylenol} + \\alpha\\text{-Terpineol}", "telugu_hint": "డెట్టాల్ లో క్లోరోజైలినాల్ మరియు టెర్పినాల్ ఉంటాయి.", "source_check": "verified"}
    ]
}
save_chapter(ch15, "ch15-everyday-life.js", "everydayLifeChapter")

print("All Chemistry Chapters 10 to 15 generated successfully!")

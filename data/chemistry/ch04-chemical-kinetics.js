// IPE TS 2nd Year Chemistry - Chapter 4: Chemical Kinetics
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["chem-ch04"] = {
  "id": "chem-ch04",
  "subject": "Chemistry",
  "chapterNumber": 4,
  "chapter": "Chemical Kinetics",
  "formulaSheet": [
    {
      "title": "Integrated Rate Equation (First Order)",
      "formula": "k = \\frac{2.303}{t}\\log_{10}\\left(\\frac{[R]_0}{[R]}\\right), \\quad t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{k}",
      "symbols": "$k = \\text{Rate constant (s}^{-1}\\text{)}$, $[R]_0 = \\text{Initial concentration}$, $[R] = \\text{Concentration at time } t$",
      "units": "$\\text{s}^{-1}$",
      "tip": "Half-life of a first-order reaction is completely independent of initial concentration."
    },
    {
      "title": "Arrhenius Equation & Activation Energy",
      "formula": "k = A e^{-E_a/RT}, \\quad \\log_{10}\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)",
      "symbols": "$A = \\text{Pre-exponential frequency factor}$, $E_a = \\text{Activation energy (J/mol)}$, $R = 8.314 \\text{ J/mol K}$",
      "units": "$\\text{J/mol or kJ/mol}$",
      "tip": "Plot of $\\log k$ vs $1/T$ gives a straight line with slope $= -E_a / (2.303 R)$."
    },
    {
      "title": "Zero Order Rate Law & Half-Life",
      "formula": "k = \\frac{[R]_0 - [R]}{t}, \\quad t_{1/2} = \\frac{[R]_0}{2k}",
      "symbols": "$[R]_0 = \\text{Initial reactant concentration}$, $[R] = \\text{Concentration at time } t$, $k = \\text{Rate constant}$",
      "units": "$\\text{mol L}^{-1} \\text{s}^{-1}$",
      "tip": "Half-life of zero order reaction is directly proportional to initial concentration $t_{1/2} \\propto [R]_0$ (e.g. decomposition of $\\text{NH}_3$ on hot Pt)."
    },
    {
      "title": "Arrhenius Equation in Two Temperatures Form",
      "formula": "\\log\\frac{k_2}{k_1} = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)",
      "symbols": "$k_1, k_2 = \\text{Rate constants at Kelvin temperatures } T_1, T_2$, $E_a = \\text{Activation energy}$, $R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$",
      "units": "$E_a\\text{ in J/mol or kJ/mol}$",
      "tip": "For most chemical reactions, rate of reaction nearly doubles for every $10^\\circ\\text{C}$ rise in temperature."
    }
  ],
  "questions": [
    {
      "id": "chem-ch04-q001",
      "subject": "Chemistry",
      "chapter": "Chemical Kinetics",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2023, 2022 (8M Core)",
      "question": "Define rate of reaction and rate constant (specific reaction rate).",
      "answer": "1. Rate of Reaction: The change in molar concentration of reactants or products per unit time ($r = -\\frac{d[R]}{dt} = +\\frac{d[P]}{dt}$).\n2. Rate Constant ($k$): The rate of reaction when the concentration of each reactant is taken as unity ($1\\text{ mol/L}$).",
      "formula": "r = k [A]^x [B]^y \\implies r = k \\text{ when } [A]=[B]=1",
      "telugu_hint": "prmaan timelo kriyaajnkaal or kriyaajnyaal concentrationlo vchche changenu reactionaaretu antaru. concentrationlu ekaamkm ayinppudu reactionaaretu retu constantaamkm avthundi.",
      "source_check": "verified",
      "tenglish_hint": "prmaan timelo kriyaajnkaal or kriyaajnyaal concentrationlo vchche changenu reactionaaretu antaru. concentrationlu ekaamkm ayinppudu reactionaaretu retu constantaamkm avthundi."
    },
    {
      "id": "chem-ch04-q002",
      "subject": "Chemistry",
      "chapter": "Chemical Kinetics",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2022, 2019 (8M Core)",
      "question": "What is pseudo first-order reaction? Give one example.",
      "answer": "• Definition: A reaction which is actually of higher order but follows first-order kinetics due to one of the reactants being present in large excess.\n• Example: Acid-catalyzed hydrolysis of ethyl acetate:\n$CH_3COOC_2H_5 + H_2O \\xrightarrow{H^+} CH_3COOH + C_2H_5OH$Rate = $k' [CH_3COOC_2H_5][H_2O] = k [CH_3COOC_2H_5]$.",
      "formula": "\\text{Rate} = k [\\text{ester}]",
      "telugu_hint": "estr jlvishleshnlo water adhik primaanmlo umdtm valla idi mithyaa prthm krmaamk reaction avthundi.",
      "source_check": "verified",
      "tenglish_hint": "estr jlvishleshnlo water adhik primaanmlo umdtm valla idi mithyaa prthm krmaamk reaction avthundi."
    },
    {
      "id": "chem-ch04-q003",
      "subject": "Chemistry",
      "chapter": "Chemical Kinetics",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE 2023, 2020",
      "question": "Distinguish between Order of a reaction and Molecularity of a reaction.",
      "answer": "• **Order of Reaction**:\n1. Sum of powers of concentration terms of reactants in the rate law equation.\n2. Experimental quantity determined only from rate data.\n3. Can be zero, fractional, or integer ($0, 1/2, 1, 2$).\n4. Applicable to elementary as well as complex reactions.\n\n• **Molecularity of Reaction**:\n1. Number of reacting species (atoms/ions/molecules) colliding simultaneously in an elementary step.\n2. Theoretical concept deduced from reaction mechanism.\n3. Can only be a positive whole integer ($1, 2, 3$). Cannot be zero or fractional.\n4. Meaningful only for elementary reactions; has no meaning for complex reactions.",
      "formula": "\\text{Order } = x + y \\; (\\text{experimental}); \\quad \\text{Molecularity } = \\text{integer } (1, 2, 3)",
      "telugu_hint": "krmaamkm pryogpoorvkmaindi (zero or bhinnm kaavchchu); anut siddhaamtprmaindi (dhn poornaamkm maatrme).",
      "source_check": "verified",
      "tenglish_hint": "krmaamkm pryogpoorvkmaindi (zero or bhinnm kaavchchu); anut siddhaamtprmaindi (dhn poornaamkm maatrme)."
    },
    {
      "id": "chem-ch04-q004",
      "subject": "Chemistry",
      "chapter": "Chemical Kinetics",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Derive the integrated rate equation for a first-order reaction and show that its half-life period is independent of initial concentration.",
      "answer": "1. **Differential Rate Law**: For $R \\to P$:\n$$-\\frac{d[R]}{dt} = k [R] \\implies \\frac{d[R]}{[R]} = -k dt$$2. **Integration**: $\\int \\frac{d[R]}{[R]} = -k \\int dt \\implies \\ln[R] = -kt + I$.\n• At $t = 0, [R] = [R]_0 \\implies I = \\ln[R]_0$.\n• $\\ln[R] - \\ln[R]_0 = -kt \\implies \\ln\\left(\\frac{[R]_0}{[R]}\\right) = kt$.\n• Changing to base 10:\n$$k = \\frac{2.303}{t} \\log_{10}\\left(\\frac{[R]_0}{[R]}\\right)$$3. **Half-Life Period ($t_{1/2}$)**:\n• At $t = t_{1/2}, [R] = \\frac{[R]_0}{2}$.\n• $k = \\frac{2.303}{t_{1/2}} \\log_{10}\\left(\\frac{[R]_0}{[R]_0 / 2}\\right) = \\frac{2.303}{t_{1/2}} \\log_{10}(2) = \\frac{2.303 \\times 0.3010}{t_{1/2}} = \\frac{0.693}{t_{1/2}}$.\n$$t_{1/2} = \\frac{0.693}{k}$$\n• Since $[R]_0$ does not appear in the equation, $t_{1/2}$ is independent of initial concentration.",
      "formula": "k = \\frac{2.303}{t}\\log_{10}\\left(\\frac{[R]_0}{[R]}\\right), \\quad t_{1/2} = \\frac{0.693}{k}",
      "telugu_hint": "First order integrated rate law $k = \\frac{2.303}{t}\\log\\frac{[R]_0}{[R]}$. Half-life $t_{1/2} = \\frac{0.693}{k}$ initial concentration paina depend avvadu.",
      "source_check": "verified",
      "tenglish_hint": "First order integrated rate law $k = \\frac{2.303}{t}\\log\\frac{[R]_0}{[R]}$. Half-life $t_{1/2} = \\frac{0.693}{k}$ initial concentration paina depend avvadu."
    },
    {
      "id": "chem-ch04-q005",
      "subject": "Chemistry",
      "chapter": "Chemical Kinetics",
      "type": "Numerical",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "A first-order reaction has a rate constant $k = 1.15 \\times 10^{-3} \\text{ s}^{-1}$. How long will 5 g of this reactant take to reduce to 3 g?",
      "answer": "• Given: $k = 1.15 \\times 10^{-3} \\text{ s}^{-1}$, $[R]_0 = 5 \\text{ g}$, $[R] = 3 \\text{ g}$.\n• Formula: $t = \\frac{2.303}{k} \\log_{10}\\left(\\frac{[R]_0}{[R]}\\right)$\n• Calculation:\n$t = \\frac{2.303}{1.15 \\times 10^{-3}} \\log_{10}\\left(\\frac{5}{3}\\right) = 2002.6 \\times \\log_{10}(1.667) = 2002.6 \\times 0.2219 = 444.4 \\text{ seconds}$.\n• Result: Time required = $444.4 \\text{ s}$.",
      "formula": "t = \\frac{2.303}{k}\\log\\left(\\frac{5}{3}\\right) = 444.4\\text{ s}",
      "telugu_hint": "$t = \\frac{2.303}{1.15 \\times 10^{-3}} \\log(1.667) = 444.4$ sec.",
      "source_check": "verified",
      "tenglish_hint": "$t = \\frac{2.303}{1.15 \\times 10^{-3}} \\log(1.667) = 444.4$ sec."
    },
    {
      "id": "chem-ch04-q006",
      "subject": "Chemistry",
      "chapter": "Chemical Kinetics",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "For a zero-order reaction $A \\to B$, the units of rate constant $k$ are:",
      "options": [
        "A) $\\text{s}^{-1}$",
        "B) $\\text{mol L}^{-1} \\text{s}^{-1}$",
        "C) $\\text{L mol}^{-1} \\text{s}^{-1}$",
        "D) $\\text{mol}^{-2} \\text{L}^2 \\text{s}^{-1}$"
      ],
      "correctOption": 1,
      "answer": "Correct Answer: B) $\\text{mol L}^{-1} \\text{s}^{-1}$.\n• Rate = $k [A]^0 = k$. Hence, unit of $k$ equals unit of rate: $\\text{mol L}^{-1} \\text{s}^{-1}$.",
      "formula": "\\text{Unit of } k = \\text{mol}^{1-n} \\text{L}^{n-1} \\text{s}^{-1}",
      "telugu_hint": "shoony krmaamk reactionku retu constantaamkm prmaanaalu: $\\text{mol L}^{-1}\\text{ s}^{-1}$.",
      "source_check": "verified",
      "tenglish_hint": "shoony krmaamk reactionku retu constantaamkm prmaanaalu: $\\text{mol L}^{-1}\\text{ s}^{-1}$."
    }
  ]
};

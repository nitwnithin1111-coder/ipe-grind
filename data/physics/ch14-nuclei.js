// IPE TS 2nd Year Physics - Chapter 14: Nuclei
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch14"] = {
  "id": "phy-ch14",
  "subject": "Physics",
  "chapterNumber": 14,
  "chapter": "Nuclei",
  "formulaSheet": [
    {
      "title": "Nuclear Radius & Density",
      "formula": "R = R_0 A^{1/3} \\; (R_0 \\approx 1.2 \\times 10^{-15}\\text{ m}), \\quad \\rho_{nuclear} \\approx 2.3 \\times 10^{17} \\text{ kg/m}^3",
      "symbols": "$A = \\text{Mass number}$",
      "units": "$\\text{meter (m), kg/m}^3$",
      "tip": "Nuclear density is independent of mass number $A$; constant for all nuclei."
    },
    {
      "title": "Mass Defect & Binding Energy",
      "formula": "\\Delta m = [Z m_p + (A - Z) m_n] - M, \\quad E_b = \\Delta m \\cdot c^2 = \\Delta m (\\text{in amu}) \\times 931.5 \\text{ MeV}",
      "symbols": "$\\Delta m = \\text{Mass defect}$, $E_{bn} = E_b / A = \\text{Binding energy per nucleon}$",
      "units": "$\\text{MeV}$",
      "tip": "$E_{bn}$ has maximum value of $8.75\\text{ MeV/nucleon}$ for Iron-56 (most stable nucleus)."
    },
    {
      "title": "Radioactive Decay Law",
      "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}, \\quad \\tau = \\frac{1}{\\lambda} = 1.44 T_{1/2}",
      "symbols": "$N_0 = \\text{Initial undecayed nuclei}$, $\\lambda = \\text{Decay constant}$, $T_{1/2} = \\text{Half-life}$",
      "units": "$T_{1/2} \\text{ in seconds, years}$",
      "tip": "Activity $A = -\\frac{dN}{dt} = \\lambda N$; SI unit is Becquerel ($1\\text{ Bq} = 1\\text{ dps}$). $1\\text{ Curie} = 3.7 \\times 10^{10}\\text{ Bq}$."
    },
    {
      "title": "Nuclear Radius and Nuclear Density",
      "formula": "R = R_0 A^{1/3}, \\quad \\rho_{nuclear} \\approx 2.3 \\times 10^{17} \\text{ kg/m}^3",
      "symbols": "$R_0 = 1.2 \\times 10^{-15} \\text{ m (1.2 fm)}$, $A = \\text{Mass number of nucleus}$",
      "units": "$\\text{fm (radius) and kg/m}^3 \\text{ (density)}$",
      "tip": "Nuclear density is completely independent of mass number $A$; all nuclei from Hydrogen to Uranium have nearly identical density!"
    },
    {
      "title": "Q-Value of Nuclear Reaction",
      "formula": "Q = (\\sum m_{reactants} - \\sum m_{products}) \\times 931.5 \\text{ MeV}",
      "symbols": "$m = \\text{Atomic masses in unified atomic mass units (u)}$",
      "units": "$\\text{MeV}$",
      "tip": "If $Q > 0$, reaction is exoergic (spontaneous); if $Q < 0$, reaction is endoergic and requires threshold input energy."
    }
  ],
  "questions": [
    {
      "id": "phy-ch14-q001",
      "subject": "Physics",
      "chapter": "Nuclei",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2023, 2022, 2020 (8M Guaranteed)",
      "question": "Define mass defect and binding energy of a nucleus.",
      "answer": "1. Mass Defect ($\\Delta m$): The difference between total mass of individual constituent nucleons and the actual resting mass of the nucleus:\n$\\Delta m = [Z m_p + (A-Z) m_n] - M_{nucleus}$.\n2. Binding Energy ($E_b$): The energy required to break a nucleus completely into its separate constituent nucleons ($E_b = \\Delta m \\cdot c^2$).",
      "formula": "E_b = \\Delta m \\cdot c^2 = \\Delta m \\times 931.5 \\text{ MeV}",
      "telugu_hint": "Mass defect is difference between nucleons mass and nucleus mass. Binding Energy $E_b = \\Delta m \\times 931.5\\text{ MeV}$.",
      "source_check": "verified",
      "tenglish_hint": "Mass defect is difference between nucleons mass and nucleus mass. Binding Energy $E_b = \\Delta m \\times 931.5\\text{ MeV}$."
    },
    {
      "id": "phy-ch14-q002",
      "subject": "Physics",
      "chapter": "Nuclei",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2023, 2021, 2019 (8M Guaranteed)",
      "question": "What is the relation between half-life ($T_{1/2}$) and decay constant ($\\lambda$) of a radioactive substance?",
      "answer": "• Relation: $T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}$.\n• Mean life $\\tau = \\frac{1}{\\lambda} \\implies T_{1/2} = 0.693 \\tau$.",
      "formula": "T_{1/2} = \\frac{0.693}{\\lambda}",
      "telugu_hint": "Half-life formula $T_{1/2} = \\frac{0.693}{\\lambda}$.",
      "source_check": "verified",
      "tenglish_hint": "Half-life formula $T_{1/2} = \\frac{0.693}{\\lambda}$."
    },
    {
      "id": "phy-ch14-q003",
      "subject": "Physics",
      "chapter": "Nuclei",
      "type": "LAQ",
      "marks": 8,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Explain the principle and working of a nuclear reactor with the help of a neat labeled diagram.",
      "answer": "1. **Principle**:\n• Based on sustained **controlled nuclear fission chain reaction** of Uranium-235 by slow (thermal) neutrons, releasing enormous energy according to $E = \\Delta m c^2$.\n\n2. **Main Components of a Nuclear Reactor**:\n• **(a) Nuclear Fuel**: Fissionable materials such as enriched Uranium ($^{235}_{92}\\text{U}$) or Plutonium ($^{239}_{94}\\text{Pu}$) packed in cylindrical rods.\n• **(b) Moderator**: Slows down high-energy fast neutrons (~$2\\text{ MeV}$) to thermal energies (~$0.025\\text{ eV}$). Common moderators: Heavy water ($\\text{D}_2\\text{O}$), Graphite, Beryllium oxide.\n• **(c) Control Rods**: Absorb excess neutrons to maintain neutron reproduction factor $k = 1$ (critical state). Made of Cadmium or Boron.\n• **(d) Coolant**: Absorbs huge heat released in the core and transfers it to the steam generator to drive turbines. Coolants: Heavy water, Liquid sodium, Pressurized water.\n• **(e) Radiation Shielding**: Heavy concrete walls (~$2\\text{ m}$ thick) and lead casing to shield operators from dangerous gamma rays and neutrons.\n\n3. **Working**:\n• Slow neutrons trigger fission in $^{235}\\text{U}$: $^{235}_{92}\\text{U} + ^1_0n \\to ^{141}_{56}\\text{Ba} + ^{92}_{36}\\text{Kr} + 3^1_0n + 200\\text{ MeV}$.\n• Released neutrons are slowed down by moderator and controlled by control rods.\n• Heat extracted by coolant turns water into high-pressure steam, rotating turbine to generate electric power.",
      "formula": "^{235}_{92}\\text{U} + ^1_0n \\to \\text{Fission Fragments} + 2.5 n + 200\\text{ MeV}",
      "telugu_hint": "nyookliyr riyaaktr bhaagaalu: 1. imdhnm (U-235), 2. maadretr (bhaarjlm $\\text{D}_2\\text{O}$), 3. niymtrn kddeelu (kaadmiym, boraan), 4. sheetleekaari (drv sodiym), 5. rkshn kvchm (kaamkreet).",
      "source_check": "verified",
      "tenglish_hint": "nyookliyr riyaaktr bhaagaalu: 1. imdhnm (U-235), 2. maadretr (bhaarjlm $\\text{D}_2\\text{O}$), 3. niymtrn kddeelu (kaadmiym, boraan), 4. sheetleekaari (drv sodiym), 5. rkshn kvchm (kaamkreet)."
    },
    {
      "id": "phy-ch14-q004",
      "subject": "Physics",
      "chapter": "Nuclei",
      "type": "LAQ",
      "marks": 8,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "State the law of radioactive decay. Derive $N(t) = N_0 e^{-\\lambda t}$ and deduce the relation between half-life and decay constant.",
      "answer": "1. **Law of Radioactive Decay**:\n• The rate of disintegration ($-\\frac{dN}{dt}$) of a radioactive sample at any instant is directly proportional to the total number of undecayed nuclei ($N$) present at that instant:\n$$-\\frac{dN}{dt} \\propto N \\implies \\frac{dN}{dt} = -\\lambda N$$where $\\lambda$ is the decay constant.\n\n2. **Derivation**:\n• Rearranging: $\\frac{dN}{N} = -\\lambda dt$.\n• Integrating both sides: $\\int \\frac{dN}{N} = -\\lambda \\int dt \\implies \\ln N = -\\lambda t + C$.\n• At $t = 0, N = N_0 \\implies \\ln N_0 = C$.\n• Substitute $C$: $\\ln N - \\ln N_0 = -\\lambda t \\implies \\ln\\left(\\frac{N}{N_0}\\right) = -\\lambda t$.\n• Taking exponential on both sides:\n$$N(t) = N_0 e^{-\\lambda t}$$\n3. **Relation with Half-Life ($T_{1/2}$)**:\n• At half-life $t = T_{1/2}$, $N = N_0 / 2$.\n• $\\frac{N_0}{2} = N_0 e^{-\\lambda T_{1/2}} \\implies e^{\\lambda T_{1/2}} = 2$.\n• Taking natural logarithm:\n$$\\lambda T_{1/2} = \\ln 2 = 0.693 \\implies T_{1/2} = \\frac{0.693}{\\lambda}$$",
      "formula": "N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{0.693}{\\lambda}",
      "telugu_hint": "Radioactive decay law $dN/dt = -\\lambda N \\implies N = N_0 e^{-\\lambda t}$. Half-life $T_{1/2} = \\frac{0.693}{\\lambda}$.",
      "source_check": "verified",
      "tenglish_hint": "Radioactive decay law $dN/dt = -\\lambda N \\implies N = N_0 e^{-\\lambda t}$. Half-life $T_{1/2} = \\frac{0.693}{\\lambda}$."
    },
    {
      "id": "phy-ch14-q005",
      "subject": "Physics",
      "chapter": "Nuclei",
      "type": "Numerical",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "The half-life of $^{238}_{92}\\text{U}$ undergoing $\\alpha$-decay is $4.5 \\times 10^9 \\text{ years}$. What is the activity of $1 \\text{ g}$ sample of $^{238}\\text{U}$?",
      "answer": "• Given: $T_{1/2} = 4.5 \\times 10^9 \\text{ y} = 4.5 \\times 10^9 \\times 3.156 \\times 10^7 \\text{ s} = 1.42 \\times 10^{17} \\text{ s}$.\n• Mass $m = 1 \\text{ g}$, Molar mass $M = 238 \\text{ g/mol}$.\n• Number of nuclei $N = \\frac{N_A}{M} = \\frac{6.023 \\times 10^{23}}{238} = 2.53 \\times 10^{21}$.\n• Decay constant $\\lambda = \\frac{0.693}{T_{1/2}} = \\frac{0.693}{1.42 \\times 10^{17}} = 4.88 \\times 10^{-18} \\text{ s}^{-1}$.\n• Activity $A = \\lambda N = (4.88 \\times 10^{-18}) \\times (2.53 \\times 10^{21}) = 1.23 \\times 10^4 \\text{ Bq}$ (disintegrations/sec).",
      "formula": "A = \\lambda N = 1.23 \\times 10^4\\text{ Bq}",
      "telugu_hint": "kriyaasheelt $A = \\lambda N = 1.23 \\times 10^4\\text{ Bq}$.",
      "source_check": "verified",
      "tenglish_hint": "kriyaasheelt $A = \\lambda N = 1.23 \\times 10^4\\text{ Bq}$."
    },
    {
      "id": "phy-ch14-q006",
      "subject": "Physics",
      "chapter": "Nuclei",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "Which of the following materials is commonly used as a control rod in nuclear reactors?",
      "options": [
        "A) Heavy water",
        "B) Cadmium or Boron",
        "C) Graphite",
        "D) Liquid sodium"
      ],
      "correctOption": 1,
      "answer": "Correct Answer: B) Cadmium or Boron.\n• Cadmium and Boron have high neutron absorption cross-sections without undergoing fission.",
      "formula": "\\text{Control Rods: Cadmium / Boron}",
      "telugu_hint": "neutronlnu peelchukovdaaniki kaadmiym or boraan kddeelnu vadatharu.",
      "source_check": "verified",
      "tenglish_hint": "neutronlnu peelchukovdaaniki kaadmiym or boraan kddeelnu vadatharu."
    }
  ]
};

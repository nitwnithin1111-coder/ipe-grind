// IPE TS 2nd Year Physics - Chapter 13: Atoms
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch13"] = {
  "id": "phy-ch13",
  "subject": "Physics",
  "chapterNumber": 13,
  "chapter": "Atoms",
  "formulaSheet": [
    {
      "title": "Bohr's Postulates",
      "formula": "L = mvr = \\frac{nh}{2\\pi}, \\quad \\frac{m v^2}{r} = \\frac{1}{4\\pi \\varepsilon_0}\\frac{e^2}{r^2}, \\quad h\\nu = E_2 - E_1",
      "symbols": "n = 1, 2, 3, $\\dots = \\text{Principal quantum number}$",
      "units": "$\\text{J s, m, eV}$",
      "tip": "Angular momentum is quantized in integral multiples of $h/(2\\pi)$."
    },
    {
      "title": "Bohr Radius and Energy of Hydrogen Atom",
      "formula": "r_n = \\frac{\\varepsilon_0 n^2 h^2}{\\pi m e^2} = n^2 r_1 \\; (r_1 = 0.529\\text{ Å}), \\quad E_n = -\\frac{13.6}{n^2} \\text{ eV}",
      "symbols": "$E_1 = -13.6\\text{ eV} \\text{ (ground state)}$, $E_2 = -3.4\\text{ eV}$, $E_3 = -1.51\\text{ eV}$",
      "units": "$\\text{eV or Joule}$",
      "tip": "Negative sign indicates electron is bound to the nucleus. Ionization energy of H is +13.6 eV."
    },
    {
      "title": "Rydberg Formula for Spectral Lines",
      "formula": "\\frac{1}{\\lambda} = R \\left( \\frac{1}{n_1^2} - \\frac{1}{n_2^2} \\right)",
      "symbols": "$R = 1.097 \\times 10^7 \\text{ m}^{-1} = \\text{Rydberg constant}$",
      "units": "$\\text{m}^{-1}$",
      "tip": "Lyman: n_1=1 (UV); Balmer: n_1=2 (Visible); Paschen: n_1=3 (IR); Brackett: n_1=4 (IR); Pfund: n_1=5 (Far IR)."
    },
    {
      "title": "Bohr Orbit Radius and Electron Velocity",
      "formula": "r_n = 0.529 \\frac{n^2}{Z} \\text{ \\AA}, \\quad v_n = 2.18 \\times 10^6 \\frac{Z}{n} \\text{ m/s}",
      "symbols": "$n = \\text{Principal quantum number (1, 2, 3...)}$, $Z = \\text{Atomic number (Z=1 for Hydrogen)}$",
      "units": "$\\text{\\AA (radius) and m/s (velocity)}$",
      "tip": "First Bohr orbit radius of hydrogen ($n=1, Z=1$) is $a_0 = 0.529\\text{ \\AA} = 5.29 \\times 10^{-11}\\text{ m}$."
    },
    {
      "title": "Rydberg Formula for Hydrogen Spectral Series",
      "formula": "\\frac{1}{\\lambda} = R \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
      "symbols": "$R = 1.097 \\times 10^7 \\text{ m}^{-1} \\text{ (Rydberg constant)}$, $n_1 = \\text{Lower level}$, $n_2 = \\text{Upper level}$",
      "units": "$\\text{m}^{-1} \\text{ (Wave number)}$",
      "tip": "Lyman series ($n_1=1$) lies in UV region; Balmer series ($n_1=2$) lies in visible light; Paschen ($n_1=3$) in Infrared."
    }
  ],
  "questions": [
    {
      "id": "phy-ch13-q001",
      "subject": "Physics",
      "chapter": "Atoms",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2023, 2020 (4M Core)",
      "question": "State Bohr's quantization condition of angular momentum and frequency condition.",
      "answer": "1. Quantization Condition: An electron can revolve only in non-radiating orbits where its orbital angular momentum is an integral multiple of $\\frac{h}{2\\pi}$:\n$L = mvr = \\frac{nh}{2\\pi}$ ($n = 1, 2, 3, \\dots$).\n2. Frequency Condition: A photon is emitted or absorbed when an electron jumps between orbits:\n$h\\nu = E_2 - E_1$.",
      "formula": "mvr = \\frac{nh}{2\\pi}, \\quad h\\nu = E_2 - E_1",
      "telugu_hint": "Bohr postulate: Electron angular momentum $mvr = \\frac{nh}{2\\pi}$. Transition energy $h\\nu = E_2 - E_1$.",
      "source_check": "verified",
      "tenglish_hint": "Bohr postulate: Electron angular momentum $mvr = \\frac{nh}{2\\pi}$. Transition energy $h\\nu = E_2 - E_1$."
    },
    {
      "id": "phy-ch13-q002",
      "subject": "Physics",
      "chapter": "Atoms",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2023, 2022, 2019 (4M Core)",
      "question": "What is the physical meaning of negative energy of an electron in an atom?",
      "answer": "• The negative total energy signifies that the electron is bound to the positive nucleus by attractive electrostatic forces.\n• Energy must be supplied from outside (equal to $|E_n|$) to liberate the electron to infinity.",
      "formula": "E_n = -\\frac{13.6}{n^2}\\text{ eV}",
      "telugu_hint": "run energy anedi electron nucleusto bmdhimchbdi umdni soochistumdi.",
      "source_check": "verified",
      "tenglish_hint": "run energy anedi electron nucleusto bmdhimchbdi umdni soochistumdi."
    },
    {
      "id": "phy-ch13-q003",
      "subject": "Physics",
      "chapter": "Atoms",
      "type": "SAQ",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Explain the different spectral series of hydrogen atom using the Rydberg formula and identify their spectral regions.",
      "answer": "• **Rydberg Formula**: $\\frac{1}{\\lambda} = R \\left( \\frac{1}{n_1^2} - \\frac{1}{n_2^2} \\right)$1. **Lyman Series**: $n_1 = 1, n_2 = 2, 3, 4, \\dots$ lies in **Ultraviolet (UV)** region.\n2. **Balmer Series**: $n_1 = 2, n_2 = 3, 4, 5, \\dots$ lies in **Visible** region (only series visible to human eye).\n3. **Paschen Series**: $n_1 = 3, n_2 = 4, 5, 6, \\dots$ lies in **Infrared (IR)** region.\n4. **Brackett Series**: $n_1 = 4, n_2 = 5, 6, 7, \\dots$ lies in **Infrared** region.\n5. **Pfund Series**: $n_1 = 5, n_2 = 6, 7, 8, \\dots$ lies in **Far Infrared** region.",
      "formula": "\\frac{1}{\\lambda} = R \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
      "telugu_hint": "laimn (UV), baamr (drushy light), paashn (praarun), braaket (praarun), phmd (door praarun).",
      "source_check": "verified",
      "tenglish_hint": "laimn (UV), baamr (drushy light), paashn (praarun), braaket (praarun), phmd (door praarun)."
    },
    {
      "id": "phy-ch13-q004",
      "subject": "Physics",
      "chapter": "Atoms",
      "type": "Numerical",
      "marks": 4,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Calculate the shortest and longest wavelengths in the Balmer series of hydrogen spectrum ($R = 1.097 \\times 10^7 \\text{ m}^{-1}$).",
      "answer": "• For Balmer series: $n_1 = 2$.\n1. **Longest wavelength (First line, $n_2 = 3$)**:\n$\\frac{1}{\\lambda_{max}} = R\\left(\\frac{1}{2^2} - \\frac{1}{3^2}\\right) = R\\left(\\frac{1}{4} - \\frac{1}{9}\\right) = \\frac{5R}{36}$\n$\\lambda_{max} = \\frac{36}{5R} = \\frac{36}{5 \\times 1.097 \\times 10^7} \\approx 656.3 \\text{ nm} = 6563 \\text{ Å}$.\n2. **Shortest wavelength (Series limit, $n_2 = \\infty$)**:\n$\\frac{1}{\\lambda_{min}} = R\\left(\\frac{1}{4} - 0\\right) = \\frac{R}{4}$\n$\\lambda_{min} = \\frac{4}{R} = \\frac{4}{1.097 \\times 10^7} \\approx 364.6 \\text{ nm} = 3646 \\text{ Å}$.",
      "formula": "\\lambda_{max} = 656.3\\text{ nm}, \\quad \\lambda_{min} = 364.6\\text{ nm}",
      "telugu_hint": "deergh wavelength (n=3): 656.3 nm; hrsv wavelength ($n=\\infty$): 364.6 nm.",
      "source_check": "verified",
      "tenglish_hint": "deergh wavelength (n=3): 656.3 nm; hrsv wavelength ($n=\\infty$): 364.6 nm."
    },
    {
      "id": "phy-ch13-q005",
      "subject": "Physics",
      "chapter": "Atoms",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "The total energy of an electron in the first excited state ($n=2$) of hydrogen atom is:",
      "options": [
        "A) -13.6 eV",
        "B) -3.4 eV",
        "C) -1.51 eV",
        "D) -0.85 eV"
      ],
      "correctOption": 1,
      "answer": "Correct Answer: B) -3.4 eV.\n• $E_n = -\\frac{13.6}{n^2} \\text{ eV} \\implies E_2 = -\\frac{13.6}{4} = -3.4 \\text{ eV}$.",
      "formula": "E_2 = -\\frac{13.6}{2^2} = -3.4\\text{ eV}",
      "telugu_hint": "modti uttejit sthaayi amte n=2: E_2 = -13.6 / 4 = -3.4 eV.",
      "source_check": "verified",
      "tenglish_hint": "modti uttejit sthaayi amte n=2: E_2 = -13.6 / 4 = -3.4 eV."
    }
  ]
};

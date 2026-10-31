const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.resolve(__dirname, '..');
const phyDir = path.join(baseDir, 'data/physics');

function patchFile(fileName, replacements) {
  const filePath = path.join(phyDir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  replacements.forEach(({ target, replacement, label }) => {
    if (!content.includes(target)) {
      if (content.includes(replacement)) {
        console.log(`[ALREADY PATCHED] ${fileName} -> ${label}`);
        return;
      }
      console.error(`[ERROR] In ${fileName}: Target not found for "${label}":\n>>>${target}<<<`);
      process.exit(1);
    }
    const count = content.split(target).length - 1;
    if (count > 1) {
      console.warn(`[WARN] In ${fileName}: Target appears ${count} times for "${label}". Replacing all.`);
    }
    content = content.split(target).join(replacement);
    console.log(`[OK] ${fileName} -> Patched: ${label}`);
  });

  // Validate syntax in vm
  const ctx = { window: {}, document: {}, console: console };
  ctx.window = ctx;
  vm.createContext(ctx);
  try {
    vm.runInContext(content, ctx);
    console.log(`[VALIDATED VM] ${fileName} parsed cleanly.`);
  } catch (err) {
    console.error(`[SYNTAX ERROR] In ${fileName} after patching:`, err.message);
    process.exit(1);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[SAVED] ${fileName}\n`);
}

// 1. phy-ch03
patchFile('ch03-wave-optics.js', [
  {
    label: 'FS 0 symbols v_1, $v_2',
    target: '"symbols": "v_1, $v_2 = \\\\text{Speeds in media 1 and 2}$",',
    replacement: '"symbols": "$v_1, v_2 = \\\\text{Speeds in media 1 and 2}$",'
  },
  {
    label: 'phy-ch03-q006 telugu_hint i_p + r',
    target: '"telugu_hint": "$\\\\tan i_p = \\\\mu$ and snel law polchite i_p + r = $90^\\\\circ$ ani vasthundi.",',
    replacement: '"telugu_hint": "$\\\\tan i_p = \\\\mu$ and snel law polchite $i_p + r = 90^\\\\circ$ ani vasthundi.",'
  },
  {
    label: 'phy-ch03-q006 tenglish_hint i_p + r',
    target: '"tenglish_hint": "$\\\\tan i_p = \\\\mu$ and snel law polchite i_p + r = $90^\\\\circ$ ani vasthundi."',
    replacement: '"tenglish_hint": "$\\\\tan i_p = \\\\mu$ and snel law polchite $i_p + r = 90^\\\\circ$ ani vasthundi."'
  },
  {
    label: 'phy-ch03-q007 question units',
    target: '"question": "In Young\'s experiment, slits are separated by 0.28 mm and screen is placed 1.4 m away. Distance of 4th bright fringe from center is 1.2 cm. Calculate the wavelength of light.",',
    replacement: '"question": "In Young\'s experiment, slits are separated by $0.28\\\\text{ mm}$ and screen is placed $1.4\\\\text{ m}$ away. Distance of 4th bright fringe from center is $1.2\\\\text{ cm}$. Calculate the wavelength of light.",'
  }
]);

// 2. phy-ch04
patchFile('ch04-electric-charges.js', [
  {
    label: 'FS 0 tip F_m = F/K',
    target: '"tip": "In a dielectric medium of constant K, force decreases by K: F_m = F/K."',
    replacement: '"tip": "In a dielectric medium of constant $K$, force decreases by $K$: $F_m = F/K$."'
  },
  {
    label: 'FS 1 tip E_axial',
    target: '"tip": "E_{axial} = 2 E_{equatorial} for a short dipole at same distance r."',
    replacement: '"tip": "$E_{axial} = 2 E_{equatorial}$ for a short dipole at same distance $r$."'
  },
  {
    label: 'phy-ch04-q006 question 20 cm',
    target: '"question": "Two point charges $q_1 = +2\\\\mu\\\\text{C}$ and $q_2 = -2\\\\mu\\\\text{C}$ are separated by 20 cm in air. Find the electric field at the midpoint of the line joining them.",',
    replacement: '"question": "Two point charges $q_1 = +2\\\\mu\\\\text{C}$ and $q_2 = -2\\\\mu\\\\text{C}$ are separated by $20\\\\text{ cm}$ in air. Find the electric field at the midpoint of the line joining them.",'
  }
]);

// 3. phy-ch05
patchFile('ch05-potential-capacitance.js', [
  {
    label: 'FS 1 tip factor K',
    target: '"tip": "Introducing a dielectric increases capacitance by factor K."',
    replacement: '"tip": "Introducing a dielectric increases capacitance by factor $K$."'
  },
  {
    label: 'FS 3 tip charge Q and potential V',
    target: '"tip": "In series, charge Q is same. In parallel, potential V is same."',
    replacement: '"tip": "In series, charge $Q$ is same. In parallel, potential $V$ is same."'
  },
  {
    label: 'FS 5 symbols C_1, $C_2',
    target: '"symbols": "C_1, $C_2 = \\\\text{Capacitances of two capacitors}$, V_1, $V_2 = \\\\text{Initial potentials}$",',
    replacement: '"symbols": "$C_1, C_2 = \\\\text{Capacitances of two capacitors}$, $V_1, V_2 = \\\\text{Initial potentials}$",'
  },
  {
    label: 'phy-ch05-q006 option A',
    target: '"A) Increases K times"',
    replacement: '"A) Increases $K$ times"'
  },
  {
    label: 'phy-ch05-q006 option B',
    target: '"B) Decreases by a factor K"',
    replacement: '"B) Decreases by a factor $K$"'
  },
  {
    label: 'phy-ch05-q006 answer factor K',
    target: 'Correct Answer: B) Decreases by a factor K.',
    replacement: 'Correct Answer: B) Decreases by a factor $K$.'
  },
  {
    label: 'phy-ch05-q006 telugu_hint U/K',
    target: '"telugu_hint": "vivikt kepaasitr‌lo charge constantmgaa untundi, kepaasitens periginmdun energy U/K tagguthundi.",',
    replacement: '"telugu_hint": "vivikt kepaasitr‌lo charge constantmgaa untundi, kepaasitens periginmdun energy $U/K$ tagguthundi.",'
  },
  {
    label: 'phy-ch05-q006 tenglish_hint U/K',
    target: '"tenglish_hint": "vivikt kepaasitr‌lo charge constantmgaa untundi, kepaasitens periginmdun energy U/K tagguthundi."',
    replacement: '"tenglish_hint": "vivikt kepaasitr‌lo charge constantmgaa untundi, kepaasitens periginmdun energy $U/K$ tagguthundi."'
  }
]);

// 4. phy-ch06
patchFile('ch06-current-electricity.js', [
  {
    label: 'FS 2 symbols P, Q, R',
    target: '"symbols": "P, Q, R, $S = \\\\text{Four resistances arranged in quadrilateral}$",',
    replacement: '"symbols": "$P, Q, R, S = \\\\text{Four resistances arranged in quadrilateral}$",'
  },
  {
    label: 'FS 2 tip I_g = 0',
    target: '"tip": "When balanced, galvanometer current I_g = 0; no deflection."',
    replacement: '"tip": "When balanced, galvanometer current $I_g = 0$; no deflection."'
  },
  {
    label: 'FS 4 symbols R_1, $R_2',
    target: '"symbols": "R_1, $R_2 = \\\\text{Resistances at temperatures } t_1$, t_2, $\\\\Delta t = \\\\text{Temperature rise in } ^\\\\circ\\\\text{C}$",',
    replacement: '"symbols": "$R_1, R_2 = \\\\text{Resistances at temperatures } t_1, t_2$, $\\\\Delta t = \\\\text{Temperature rise in } ^\\\\circ\\\\text{C}$",'
  },
  {
    label: 'phy-ch06-q006 question units',
    target: '"question": "In a potentiometer arrangement, a cell of EMF 1.25 V gives a balance point at 35.0 cm length of the wire. If the cell is replaced by another cell and the balance point shifts to 63.0 cm, what is the EMF of the second cell?",',
    replacement: '"question": "In a potentiometer arrangement, a cell of EMF $1.25\\\\text{ V}$ gives a balance point at $35.0\\\\text{ cm}$ length of the wire. If the cell is replaced by another cell and the balance point shifts to $63.0\\\\text{ cm}$, what is the EMF of the second cell?",'
  },
  {
    label: 'phy-ch06-q007 option A',
    target: '"A) 2R"',
    replacement: '"A) $2R$"'
  },
  {
    label: 'phy-ch06-q007 option B',
    target: '"B) 4R"',
    replacement: '"B) $4R$"'
  },
  {
    label: 'phy-ch06-q007 option C',
    target: '"C) R/2"',
    replacement: '"C) $R/2$"'
  },
  {
    label: 'phy-ch06-q007 option D',
    target: '"D) R/4"',
    replacement: '"D) $R/4$"'
  },
  {
    label: 'phy-ch06-q007 answer 4R',
    target: 'Correct Answer: B) 4R.',
    replacement: 'Correct Answer: B) $4R$.'
  },
  {
    label: 'phy-ch06-q007 telugu_hint 4R',
    target: '"telugu_hint": "length rettimpu cheste addukot vaishaalym sgmvutumdi, resistance 4 times (4R) peruguthundi.",',
    replacement: '"telugu_hint": "length rettimpu cheste addukot vaishaalym sgmvutumdi, resistance 4 times ($4R$) peruguthundi.",'
  },
  {
    label: 'phy-ch06-q007 tenglish_hint 4R',
    target: '"tenglish_hint": "length rettimpu cheste addukot vaishaalym sgmvutumdi, resistance 4 times (4R) peruguthundi."',
    replacement: '"tenglish_hint": "length rettimpu cheste addukot vaishaalym sgmvutumdi, resistance 4 times ($4R$) peruguthundi."'
  }
]);

// 5. phy-ch07
patchFile('ch07-moving-charges.js', [
  {
    label: 'FS 5 symbols I_1, $I_2',
    target: '"symbols": "I_1, $I_2 = \\\\text{Currents in two wires}$, $d = \\\\text{Separation distance}$, $L = \\\\text{Length of wire}$",',
    replacement: '"symbols": "$I_1, I_2 = \\\\text{Currents in two wires}$, $d = \\\\text{Separation distance}$, $L = \\\\text{Length of wire}$",'
  }
]);

// 6. phy-ch08
patchFile('ch08-magnetism-matter.js', [
  {
    label: 'phy-ch08-q005 option D infty',
    target: '"D) \\\\infty"',
    replacement: '"D) $\\\\infty$"'
  },
  {
    label: 'phy-ch08-q005 telugu_hint chi = -1',
    target: '"telugu_hint": "ativaahkaalu smpoorn diasvbhaavaanni choopistaayi: $chi = -1$.",',
    replacement: '"telugu_hint": "ativaahkaalu smpoorn diasvbhaavaanni choopistaayi: $\\\\chi = -1$.",'
  },
  {
    label: 'phy-ch08-q005 tenglish_hint chi = -1',
    target: '"tenglish_hint": "ativaahkaalu smpoorn diasvbhaavaanni choopistaayi: $chi = -1$."',
    replacement: '"tenglish_hint": "ativaahkaalu smpoorn diasvbhaavaanni choopistaayi: $\\\\chi = -1$."'
  }
]);

// 7. phy-ch09
patchFile('ch09-induction.js', [
  {
    label: 'phy-ch09-q004 telugu_hint vertical tab',
    target: '"telugu_hint": "chln prerit EMF formula: $\u000barepsilon = B l v$.",',
    replacement: '"telugu_hint": "chln prerit EMF formula: $\\\\varepsilon = B l v$.",'
  },
  {
    label: 'phy-ch09-q004 tenglish_hint vertical tab',
    target: '"tenglish_hint": "chln prerit EMF formula: $\u000barepsilon = B l v$."',
    replacement: '"tenglish_hint": "chln prerit EMF formula: $\\\\varepsilon = B l v$."'
  }
]);

// 8. phy-ch10
patchFile('ch10-ac.js', [
  {
    label: 'FS 0 symbols I_0, $V_0',
    target: '"symbols": "I_0, $V_0 = \\\\text{Peak current and voltage}$",',
    replacement: '"symbols": "$I_0, V_0 = \\\\text{Peak current and voltage}$",'
  },
  {
    label: 'FS 3 tip transformer variables',
    target: '"tip": "Step-up transformer: k > 1 (N_s > N_p, V_s > V_p, I_s < I_p)."',
    replacement: '"tip": "Step-up transformer: $k > 1$ ($N_s > N_p, V_s > V_p, I_s < I_p$)."'
  },
  {
    label: 'phy-ch10-q005 telugu_hint tab in \\text',
    target: '"telugu_hint": "$I_{rms} = 220/100 = 2.2\text{ A}$, $V_0 = 220 \\\\times \\\\sqrt{2} \\\\approx 311\text{ V}$.",',
    replacement: '"telugu_hint": "$I_{rms} = 220/100 = 2.2\\\\text{ A}$, $V_0 = 220 \\\\times \\\\sqrt{2} \\\\approx 311\\\\text{ V}$.",'
  },
  {
    label: 'phy-ch10-q005 tenglish_hint tab in \\text',
    target: '"tenglish_hint": "$I_{rms} = 220/100 = 2.2\text{ A}$, $V_0 = 220 \\\\times \\\\sqrt{2} \\\\approx 311\text{ V}$."',
    replacement: '"tenglish_hint": "$I_{rms} = 220/100 = 2.2\\\\text{ A}$, $V_0 = 220 \\\\times \\\\sqrt{2} \\\\approx 311\\\\text{ V}$."'
  }
]);

// 9. phy-ch11
patchFile('ch11-em-waves.js', [
  {
    label: 'FS 0 tip I_c = 0 and I_d = I',
    target: '"tip": "Inside capacitor during charging, conduction current I_c = 0 and displacement current I_d = I."',
    replacement: '"tip": "Inside capacitor during charging, conduction current $I_c = 0$ and displacement current $I_d = I$."'
  }
]);

// 10. phy-ch12
patchFile('ch12-dual-nature.js', [
  {
    label: 'phy-ch12-q004 telugu_hint tab in \\text',
    target: '"telugu_hint": "$E = h\\\\nu = 2.49\text{ eV}$. $K_{max} = 2.49 - 2.14 = 0.35\text{ eV}$, $V_0 = 0.35\text{ V}$.",',
    replacement: '"telugu_hint": "$E = h\\\\nu = 2.49\\\\text{ eV}$. $K_{max} = 2.49 - 2.14 = 0.35\\\\text{ eV}$, $V_0 = 0.35\\\\text{ V}$.",'
  },
  {
    label: 'phy-ch12-q004 tenglish_hint tab in \\text',
    target: '"tenglish_hint": "$E = h\\\\nu = 2.49\text{ eV}$. $K_{max} = 2.49 - 2.14 = 0.35\text{ eV}$, $V_0 = 0.35\text{ V}$."',
    replacement: '"tenglish_hint": "$E = h\\\\nu = 2.49\\\\text{ eV}$. $K_{max} = 2.49 - 2.14 = 0.35\\\\text{ eV}$, $V_0 = 0.35\\\\text{ V}$."'
  }
]);

// 11. phy-ch13
patchFile('ch13-atoms.js', [
  {
    label: 'FS 0 symbols n = 1, 2, 3',
    target: '"symbols": "n = 1, 2, 3, $\\\\dots = \\\\text{Principal quantum number}$",',
    replacement: '"symbols": "$n = 1, 2, 3, \\\\dots = \\\\text{Principal quantum number}$",'
  },
  {
    label: 'FS 1 tip 13.6 eV',
    target: '"tip": "Negative sign indicates electron is bound to the nucleus. Ionization energy of H is +13.6 eV."',
    replacement: '"tip": "Negative sign indicates electron is bound to the nucleus. Ionization energy of H is $+13.6\\\\text{ eV}$."'
  },
  {
    label: 'FS 2 tip n_1=1',
    target: '"tip": "Lyman: n_1=1 (UV); Balmer: n_1=2 (Visible); Paschen: n_1=3 (IR); Brackett: n_1=4 (IR); Pfund: n_1=5 (Far IR)."',
    replacement: '"tip": "Lyman: $n_1=1$ (UV); Balmer: $n_1=2$ (Visible); Paschen: $n_1=3$ (IR); Brackett: $n_1=4$ (IR); Pfund: $n_1=5$ (Far IR)."'
  },
  {
    label: 'phy-ch13-q004 telugu_hint',
    target: '"telugu_hint": "deergh wavelength (n=3): 656.3 nm; hrsv wavelength ($n=\\\\infty$): 364.6 nm.",',
    replacement: '"telugu_hint": "deergh wavelength ($n=3$): $656.3\\\\text{ nm}$; hrsv wavelength ($n=\\\\infty$): $364.6\\\\text{ nm}$.",'
  },
  {
    label: 'phy-ch13-q004 tenglish_hint',
    target: '"tenglish_hint": "deergh wavelength (n=3): 656.3 nm; hrsv wavelength ($n=\\\\infty$): 364.6 nm."',
    replacement: '"tenglish_hint": "deergh wavelength ($n=3$): $656.3\\\\text{ nm}$; hrsv wavelength ($n=\\\\infty$): $364.6\\\\text{ nm}$."'
  },
  {
    label: 'phy-ch13-q005 option A',
    target: '"A) -13.6 eV",',
    replacement: '"A) $-13.6\\\\text{ eV}$",'
  },
  {
    label: 'phy-ch13-q005 option B',
    target: '"B) -3.4 eV",',
    replacement: '"B) $-3.4\\\\text{ eV}$",'
  },
  {
    label: 'phy-ch13-q005 option C',
    target: '"C) -1.51 eV",',
    replacement: '"C) $-1.51\\\\text{ eV}$",'
  },
  {
    label: 'phy-ch13-q005 option D',
    target: '"D) -0.85 eV"',
    replacement: '"D) $-0.85\\\\text{ eV}$"'
  },
  {
    label: 'phy-ch13-q005 answer -3.4 eV',
    target: 'Correct Answer: B) -3.4 eV.',
    replacement: 'Correct Answer: B) $-3.4\\\\text{ eV}$.'
  },
  {
    label: 'phy-ch13-q005 telugu_hint',
    target: '"telugu_hint": "modti uttejit sthaayi amte n=2: E_2 = -13.6 / 4 = -3.4 eV.",',
    replacement: '"telugu_hint": "modti uttejit sthaayi amte $n=2$: $E_2 = -13.6 / 4 = -3.4\\\\text{ eV}$.",'
  },
  {
    label: 'phy-ch13-q005 tenglish_hint',
    target: '"tenglish_hint": "modti uttejit sthaayi amte n=2: E_2 = -13.6 / 4 = -3.4 eV."',
    replacement: '"tenglish_hint": "modti uttejit sthaayi amte $n=2$: $E_2 = -13.6 / 4 = -3.4\\\\text{ eV}$."'
  }
]);

// 12. phy-ch14
patchFile('ch14-nuclei.js', [
  {
    label: 'FS 0 tip mass number A',
    target: '"tip": "Nuclear density is independent of mass number A; constant for all nuclei."',
    replacement: '"tip": "Nuclear density is independent of mass number $A$; constant for all nuclei."'
  },
  {
    label: 'FS 1 tip E_bn and 8.75 MeV',
    target: '"tip": "E_bn has maximum value of 8.75 MeV/nucleon for Iron-56 (most stable nucleus)."',
    replacement: '"tip": "$E_{bn}$ has maximum value of $8.75\\\\text{ MeV/nucleon}$ for Iron-56 (most stable nucleus)."'
  },
  {
    label: 'phy-ch14-q003 answer MeV & eV & m units',
    target: 'Slows down high-energy fast neutrons (~2 MeV) to thermal energies (~0.025 eV).',
    replacement: 'Slows down high-energy fast neutrons (~$2\\\\text{ MeV}$) to thermal energies (~$0.025\\\\text{ eV}$).'
  },
  {
    label: 'phy-ch14-q003 answer concrete wall m',
    target: 'Heavy concrete walls (~2 m thick)',
    replacement: 'Heavy concrete walls (~$2\\\\text{ m}$ thick)'
  },
  {
    label: 'phy-ch14-q003 telugu_hint D_2O',
    target: '"telugu_hint": "nyookliyr riyaaktr bhaagaalu: 1. imdhnm (U-235), 2. maadretr (bhaarjlm D_2O), 3. niymtrn kddeelu (kaadmiym, boraan), 4. sheetleekaari (drv sodiym), 5. rkshn kvchm (kaamkreet).",',
    replacement: '"telugu_hint": "nyookliyr riyaaktr bhaagaalu: 1. imdhnm (U-235), 2. maadretr (bhaarjlm $\\\\text{D}_2\\\\text{O}$), 3. niymtrn kddeelu (kaadmiym, boraan), 4. sheetleekaari (drv sodiym), 5. rkshn kvchm (kaamkreet).",'
  },
  {
    label: 'phy-ch14-q003 tenglish_hint D_2O',
    target: '"tenglish_hint": "nyookliyr riyaaktr bhaagaalu: 1. imdhnm (U-235), 2. maadretr (bhaarjlm D_2O), 3. niymtrn kddeelu (kaadmiym, boraan), 4. sheetleekaari (drv sodiym), 5. rkshn kvchm (kaamkreet)."',
    replacement: '"tenglish_hint": "nyookliyr riyaaktr bhaagaalu: 1. imdhnm (U-235), 2. maadretr (bhaarjlm $\\\\text{D}_2\\\\text{O}$), 3. niymtrn kddeelu (kaadmiym, boraan), 4. sheetleekaari (drv sodiym), 5. rkshn kvchm (kaamkreet)."'
  }
]);

// 13. phy-ch15
patchFile('ch15-semiconductors.js', [
  {
    label: 'FS 1 tip ripple freq',
    target: '"tip": "Full-wave ripple frequency = 2f (100 Hz for 50 Hz input); Half-wave ripple frequency = f (50 Hz)."',
    replacement: '"tip": "Full-wave ripple frequency = $2f$ ($100\\\\text{ Hz}$ for $50\\\\text{ Hz}$ input); Half-wave ripple frequency = $f$ ($50\\\\text{ Hz}$)."'
  },
  {
    label: 'FS 3 symbols n_e, $n_h',
    target: '"symbols": "n_e, $n_h = \\\\text{Electron and hole number densities}$, $\\\\mu_e$, $\\\\mu_h = \\\\text{Electron and hole mobilities}$",',
    replacement: '"symbols": "$n_e, n_h = \\\\text{Electron and hole number densities}$, $\\\\mu_e, \\\\mu_h = \\\\text{Electron and hole mobilities}$",'
  },
  {
    label: 'FS 4 symbols I_E, I_B',
    target: '"symbols": "I_E, I_B, $I_C = \\\\text{Emitter, Base, Collector currents}$, $\\\\alpha = \\\\text{CB gain } (<1)$, $\\\\beta = \\\\text{CE gain } (20-500)$",',
    replacement: '"symbols": "$I_E, I_B, I_C = \\\\text{Emitter, Base, Collector currents}$, $\\\\alpha = \\\\text{CB gain } (<1)$, $\\\\beta = \\\\text{CE gain } (20-500)$",'
  },
  {
    label: 'phy-ch15-q003 answer ripple freq',
    target: 'Ripple frequency = $2f$ (100 Hz for 50 Hz input).',
    replacement: 'Ripple frequency = $2f$ ($100\\\\text{ Hz}$ for $50\\\\text{ Hz}$ input).'
  }
]);

// 14. phy-ch16
patchFile('ch16-communication.js', [
  {
    label: 'FS 0 tip BW = 2 f_m',
    target: '"tip": "Modulated wave bandwidth BW = 2 f_m."',
    replacement: '"tip": "Modulated wave bandwidth $\\\\text{BW} = 2 f_m$."'
  },
  {
    label: 'phy-ch16-q003 question 80 m',
    target: '"question": "A TV transmitting antenna has a height of 80 m. What is the maximum distance up to which TV transmission can be received? ($R = 6.4 \\\\times 10^6 \\\\text{ m}$)",',
    replacement: '"question": "A TV transmitting antenna has a height of $80\\\\text{ m}$. What is the maximum distance up to which TV transmission can be received? ($R = 6.4 \\\\times 10^6 \\\\text{ m}$)",'
  },
  {
    label: 'phy-ch16-q004 answer 3 MHz to 30 MHz',
    target: '• Sky waves (3 MHz to 30 MHz) undergo total internal reflection from the ionospheric plasma layers.',
    replacement: '• Sky waves ($3\\\\text{ MHz}$ to $30\\\\text{ MHz}$) undergo total internal reflection from the ionospheric plasma layers.'
  }
]);

console.log('ALL CHAPTERS PATCHED AND VALIDATED SUCCESSFULLY!');

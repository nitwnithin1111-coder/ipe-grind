const fs = require('fs');
const path = require('path');
const vm = require('vm');

const phyDir = path.resolve(__dirname, '../data/physics');

function patch(fileName, replacements) {
  const filePath = path.join(phyDir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  replacements.forEach(({ target, replacement, label }) => {
    if (!content.includes(target)) {
      if (content.includes(replacement)) {
        console.log(`[ALREADY APPLIED] ${fileName} -> ${label}`);
        return;
      }
      console.error(`[ERROR] Missing target in ${fileName}: ${label}`);
      process.exit(1);
    }
    content = content.split(target).join(replacement);
    console.log(`[PATCHED] ${fileName} -> ${label}`);
  });

  // Validate VM syntax
  const ctx = { window: {}, document: {}, console: console };
  ctx.window = ctx;
  vm.createContext(ctx);
  try {
    vm.runInContext(content, ctx);
    console.log(`[VM OK] ${fileName}`);
  } catch (err) {
    console.error(`[VM SYNTAX ERROR] ${fileName}:`, err.message);
    process.exit(1);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

// ch09
patch('ch09-induction.js', [
  {
    label: 'vertical tab in varepsilon',
    target: '\\u000barepsilon = B l v',
    replacement: '\\\\varepsilon = B l v'
  }
]);

// ch10
patch('ch10-ac.js', [
  {
    label: 'FS 0 symbols I_0',
    target: '"symbols": "I_0, $V_0 = \\\\text{Peak current and voltage}$",',
    replacement: '"symbols": "$I_0, V_0 = \\\\text{Peak current and voltage}$",'
  },
  {
    label: 'FS 3 tip transformer vars',
    target: '"tip": "Step-up transformer: k > 1 (N_s > N_p, V_s > V_p, I_s < I_p)."',
    replacement: '"tip": "Step-up transformer: $k > 1$ ($N_s > N_p, V_s > V_p, I_s < I_p$)."'
  },
  {
    label: 'phy-ch10-q005 \\text{ A}',
    target: '2.2\\text{ A}',
    replacement: '2.2\\\\text{ A}'
  }
]);

// ch11
patch('ch11-em-waves.js', [
  {
    label: 'FS 0 tip I_c, I_d',
    target: '"tip": "Inside capacitor during charging, conduction current I_c = 0 and displacement current I_d = I."',
    replacement: '"tip": "Inside capacitor during charging, conduction current $I_c = 0$ and displacement current $I_d = I$."'
  }
]);

// ch12
patch('ch12-dual-nature.js', [
  {
    label: 'phy-ch12-q004 \\text{ eV}',
    target: '0.35\\text{ eV}',
    replacement: '0.35\\\\text{ eV}'
  },
  {
    label: 'phy-ch12-q004 \\text{ V}',
    target: '0.35\\text{ V}',
    replacement: '0.35\\\\text{ V}'
  }
]);

// ch13
patch('ch13-atoms.js', [
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
    label: 'phy-ch13-q004 hints',
    target: 'deergh wavelength (n=3): 656.3 nm; hrsv wavelength ($n=\\\\infty$): 364.6 nm.',
    replacement: 'deergh wavelength ($n=3$): $656.3\\\\text{ nm}$; hrsv wavelength ($n=\\\\infty$): $364.6\\\\text{ nm}$.'
  },
  {
    label: 'phy-ch13-q005 opt A',
    target: '"A) -13.6 eV",',
    replacement: '"A) $-13.6\\\\text{ eV}$",'
  },
  {
    label: 'phy-ch13-q005 opt B',
    target: '"B) -3.4 eV",',
    replacement: '"B) $-3.4\\\\text{ eV}$",'
  },
  {
    label: 'phy-ch13-q005 opt C',
    target: '"C) -1.51 eV",',
    replacement: '"C) $-1.51\\\\text{ eV}$",'
  },
  {
    label: 'phy-ch13-q005 opt D',
    target: '"D) -0.85 eV"',
    replacement: '"D) $-0.85\\\\text{ eV}$"'
  },
  {
    label: 'phy-ch13-q005 ans',
    target: 'Correct Answer: B) -3.4 eV.',
    replacement: 'Correct Answer: B) $-3.4\\\\text{ eV}$.'
  },
  {
    label: 'phy-ch13-q005 hints',
    target: 'modti uttejit sthaayi amte n=2: E_2 = -13.6 / 4 = -3.4 eV.',
    replacement: 'modti uttejit sthaayi amte $n=2$: $E_2 = -13.6 / 4 = -3.4\\\\text{ eV}$.'
  }
]);

// ch14
patch('ch14-nuclei.js', [
  {
    label: 'FS 0 tip mass number A',
    target: '"tip": "Nuclear density is independent of mass number A; constant for all nuclei."',
    replacement: '"tip": "Nuclear density is independent of mass number $A$; constant for all nuclei."'
  },
  {
    label: 'FS 1 tip E_bn, 8.75 MeV',
    target: '"tip": "E_bn has maximum value of 8.75 MeV/nucleon for Iron-56 (most stable nucleus)."',
    replacement: '"tip": "$E_{bn}$ has maximum value of $8.75\\\\text{ MeV/nucleon}$ for Iron-56 (most stable nucleus)."'
  },
  {
    label: 'phy-ch14-q003 neutrons MeV & eV',
    target: 'Slows down high-energy fast neutrons (~2 MeV) to thermal energies (~0.025 eV).',
    replacement: 'Slows down high-energy fast neutrons (~$2\\\\text{ MeV}$) to thermal energies (~$0.025\\\\text{ eV}$).'
  },
  {
    label: 'phy-ch14-q003 concrete wall m',
    target: 'Heavy concrete walls (~2 m thick)',
    replacement: 'Heavy concrete walls (~$2\\\\text{ m}$ thick)'
  },
  {
    label: 'phy-ch14-q003 D_2O hint',
    target: 'nyookliyr riyaaktr bhaagaalu: 1. imdhnm (U-235), 2. maadretr (bhaarjlm D_2O)',
    replacement: 'nyookliyr riyaaktr bhaagaalu: 1. imdhnm (U-235), 2. maadretr (bhaarjlm $\\\\text{D}_2\\\\text{O}$)'
  }
]);

// ch15
patch('ch15-semiconductors.js', [
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
    label: 'phy-ch15-q003 ans ripple freq',
    target: 'Ripple frequency = $2f$ (100 Hz for 50 Hz input).',
    replacement: 'Ripple frequency = $2f$ ($100\\\\text{ Hz}$ for $50\\\\text{ Hz}$ input).'
  }
]);

// ch16
patch('ch16-communication.js', [
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
    label: 'phy-ch16-q004 ans MHz',
    target: '• Sky waves (3 MHz to 30 MHz) undergo total internal reflection from the ionospheric plasma layers.',
    replacement: '• Sky waves ($3\\\\text{ MHz}$ to $30\\\\text{ MHz}$) undergo total internal reflection from the ionospheric plasma layers.'
  }
]);

console.log('\n>>> ALL REMAINING PHYSICS CHAPTERS PATCHED AND VERIFIED SUCCESSFULLY! <<<');

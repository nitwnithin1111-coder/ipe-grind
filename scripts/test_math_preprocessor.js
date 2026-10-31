// Test math preprocessor logic for KaTeX auto-render
function autoWrapScientificNotation(text) {
  if (!text) return '';
  
  // Protect existing math blocks
  const mathBlocks = [];
  let tokenized = text.replace(/\$\$[\s\S]*?\$\$|\$[\s\S]*?\$/g, (m) => {
    mathBlocks.push(m);
    return `___MATH_BLOCK_${mathBlocks.length - 1}___`;
  });

  // 1. Raw LaTeX greek/symbols outside math: \lambda, \nu, \lambda / 2, 2\lambda
  tokenized = tokenized.replace(/(\b|(?<=\s)|(?<=[(\[]))(\d*\\(?:lambda|nu|mu|alpha|beta|gamma|Delta|delta|theta|omega|pi|approx|pm)(?:\s*[\/\*]\s*\d+)?)(?=[)\].,;:\s]|$)/g, '$$$2$$');

  // 2. Scientific notation with units: 4.077 x 10^-8 cm, 6.022 x 10^23 mol^-1, 2.418 x 10^24 atoms
  tokenized = tokenized.replace(/\b(\d+(?:\.\d+)?)\s*[xX]\s*10\^([-+]?\d+)(?:\s*(cm\^3|g\/cm\^3|g\s*cm\^-3|mol\^-1|s\^-1|m\/s|m\/s\^2|m\^2|m\^3|kg\s*m\^-3|cm|pm|nm|m|g|kg|mol|s|Hz|u|atoms|molecules|unit cells))?\b/g, (match, coeff, exp, unit) => {
    let unitLatex = '';
    if (unit) {
      if (unit === 'g/cm^3') unitLatex = '\\text{ g/cm}^3';
      else if (unit === 'cm^3') unitLatex = '\\text{ cm}^3';
      else if (unit === 'mol^-1') unitLatex = '\\text{ mol}^{-1}';
      else if (unit === 's^-1') unitLatex = '\\text{ s}^{-1}';
      else if (unit === 'm/s') unitLatex = '\\text{ m/s}';
      else if (unit === 'm/s^2') unitLatex = '\\text{ m/s}^2';
      else unitLatex = `\\text{ ${unit}}`;
    }
    return `$${coeff} \\times 10^{${exp}}${unitLatex}$`;
  });

  // 3. Isolated units with exponents: 10.5 g/cm^3, 288 pm, 2.39e-23 cm^3
  tokenized = tokenized.replace(/\b(\d+(?:\.\d+)?)\s*(g\/cm\^3|cm\^3|mol\^-1|s\^-1)\b/g, (match, val, unit) => {
    let unitLatex = '';
    if (unit === 'g/cm^3') unitLatex = '\\text{ g/cm}^3';
    else if (unit === 'cm^3') unitLatex = '\\text{ cm}^3';
    else if (unit === 'mol^-1') unitLatex = '\\text{ mol}^{-1}';
    else if (unit === 's^-1') unitLatex = '\\text{ s}^{-1}';
    return `$${val}${unitLatex}$`;
  });

  // 4. Subscript constants like N_A = 6.022 x 10^23
  tokenized = tokenized.replace(/\bN_A\b/g, '$N_A$');
  tokenized = tokenized.replace(/\bDelta H_mix\b/g, '$\\Delta H_{\\text{mix}}$');
  tokenized = tokenized.replace(/\bDelta V_mix\b/g, '$\\Delta V_{\\text{mix}}$');

  // Restore protected math blocks
  tokenized = tokenized.replace(/___MATH_BLOCK_(\d+)___/g, (m, idx) => mathBlocks[parseInt(idx, 10)]);

  return tokenized;
}

// Test cases
const test1 = "Silver forms an FCC lattice. The edge length of its unit cell is 4.077 x 10^-8 cm and its density is 10.5 g/cm^3. Calculate the atomic mass of silver (N_A = 6.022 x 10^23 mol^-1).";
console.log("Original 1:\n", test1);
console.log("\nProcessed 1:\n", autoWrapScientificNotation(test1));

const test2 = "Option A: \\lambda, Option B: \\lambda / 2, Option C: \\lambda / 4, Option D: 2\\lambda";
console.log("\nOriginal 2:\n", test2);
console.log("\nProcessed 2:\n", autoWrapScientificNotation(test2));

const test3 = "Non-ideal solution has Delta H_mix < 0 and Delta V_mix < 0";
console.log("\nOriginal 3:\n", test3);
console.log("\nProcessed 3:\n", autoWrapScientificNotation(test3));

const test4 = "Already rendered $E = mc^2$ and $$\\frac{a}{b}$$ with 4.077 x 10^-8 cm outside.";
console.log("\nOriginal 4:\n", test4);
console.log("\nProcessed 4:\n", autoWrapScientificNotation(test4));

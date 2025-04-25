/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all', // Changed from 'es5' to 'all' to encourage parameter breaking
  printWidth: 100, // Reduced from 100 to encourage more line breaks
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
};

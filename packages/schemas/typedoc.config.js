/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: ['./src/legacy-types.ts'],
  out: 'docs-generated',
  plugin: ['typedoc-plugin-markdown'],
  readme: 'none', // Prevents TypeDoc from copying the README.md file
};

export default config;

/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: ['./src/index.ts'],
  out: 'docs-generated',
  plugin: ['typedoc-plugin-markdown'],
};

export default config;
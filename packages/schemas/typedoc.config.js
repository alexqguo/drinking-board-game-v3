/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: ['./src/legacy-types.ts'],
  out: 'docs-generated',
  plugin: ['typedoc-plugin-markdown'],
};

export default config;

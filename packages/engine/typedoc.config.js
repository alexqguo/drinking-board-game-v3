/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: [
    './src/actions/index.ts',
    './src/gamestate/index.ts',
    './src/rules/index.ts',
    './src/boards/index.ts',
    './src/context.ts',
    './src/index.ts',
  ],
  out: 'docs-generated',
  plugin: ['typedoc-plugin-markdown'],
};

export default config;
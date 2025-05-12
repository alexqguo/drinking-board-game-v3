import { config } from '@repo/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      /**
       * Ensure that each of the actions/, gamestate/ and rules/ directories
       * have all exports set in index.ts
       */
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/engine/src/rules/*', '!**/rules/index.*', '!**/rules/rules.types.*'],
              message: 'Can only import "rule" from index or types',
            },
            {
              group: [
                '**/engine/src/gamestate/*',
                '!**/gamestate/index.*',
                '!**/gamestate/gamestate.types.*',
              ],
              message: 'Can only import "gamestate" from index or types',
            },
            {
              group: [
                '**/engine/src/actions/*',
                '!**/actions/index.*',
                '!**/actions/actions.types.*',
              ],
              message: 'Can only import "actions" from index or types',
            },
            {
              group: ['**/engine/src/boards/*', '!**/boards/index.*', '!**/boards/boards.types.*'],
              message: 'Can only import "boards" from index or types',
            },
          ],
        },
      ],
    },
  },
];

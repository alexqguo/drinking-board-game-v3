import { config } from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      // ...(config.rules || undefined),
      /**
       * Ensure that each of the actions/, gamestate/ and rules/ directories
       * have all exports set in index.ts
       */
      'no-restricted-imports': [
        'error',
        {
          'patterns': [
            {
              group: [
                '**/rule/*',
                '!**/rule/index.*'
              ],
              message: 'Can only import "rule" from index'
            }, {
              group: [
                '**/gamestate/*',
                '!**/gamestate/index.*'
              ],
              message: 'Can only import "gamestate" from index'
            }, {
              group: [
                '**/actions/*',
                '!**/actions/index.*',
              ],
              message: 'Can only import "actions" from index'
            }
          ]
        }
      ]
    }
  }
];

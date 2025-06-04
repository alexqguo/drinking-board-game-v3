/**
 * Validation utilities for board schemas
 */
import typia from 'typia';
import { BoardModule, BoardSchema, RuleSchema } from './legacy-types.js';

/**
 * Simple i18n validation - checks that required translation keys exist
 */
function validateI18n(boardSchema: BoardSchema): void {
  const locales = Object.keys(boardSchema.i18n);
  if (locales.length === 0) {
    throw new Error('Board schema must have at least one locale in i18n');
  }

  const missingKeys: string[] = [];

  // Helper to collect all rule IDs recursively
  const collectRuleIds = (rule: RuleSchema): string[] => {
    const ids: string[] = [];
    if (rule.id) ids.push(rule.id);
    if (rule.helperTextId) ids.push(rule.helperTextId);

    if ('choices' in rule && rule.choices) {
      rule.choices.forEach((choice) => {
        if (choice.rule.id) ids.push(choice.rule.id);
        ids.push(...collectRuleIds(choice.rule));
      });
    }

    if ('diceRolls' in rule && rule.diceRolls?.outcomes) {
      rule.diceRolls.outcomes.forEach((outcome) => {
        if (outcome.rule.id) ids.push(outcome.rule.id);
        ids.push(...collectRuleIds(outcome.rule));
      });
    }

    if ('conditions' in rule && rule.conditions) {
      rule.conditions.forEach(([, , conditionRule]) => {
        ids.push(...collectRuleIds(conditionRule));
      });
    }

    return ids;
  };

  locales.forEach((locale) => {
    const keys = new Set(Object.keys(boardSchema.i18n[locale] || {}));

    // Check rule IDs
    [...boardSchema.tiles, ...boardSchema.zones].forEach((item) => {
      collectRuleIds(item.rule).forEach((ruleId) => {
        if (!keys.has(ruleId)) {
          missingKeys.push(`${locale}: ${ruleId}`);
        }
      });
    });

    // Check zone IDs
    boardSchema.zones.forEach((zone) => {
      if (!keys.has(zone.id)) {
        missingKeys.push(`${locale}: ${zone.id}`);
      }
    });

    // Check item keys
    boardSchema.items.forEach((item) => {
      if (!keys.has(item.nameStrId)) {
        missingKeys.push(`${locale}: ${item.nameStrId}`);
      }
      if (!keys.has(item.descriptionStrId)) {
        missingKeys.push(`${locale}: ${item.descriptionStrId}`);
      }
    });
  });

  if (missingKeys.length > 0) {
    throw new Error(`Missing translation keys: ${missingKeys.join(', ')}`);
  }
}

/**
 * Validates a board module strictly, throwing an error if invalid
 *
 * @param data The data to validate
 * @throws Error if the data is invalid
 */
export function validateBoardModule(data: unknown): void {
  typia.assertEquals<BoardModule>(data);
  const boardModule = data as BoardModule;
  validateI18n(boardModule.board);
}

/**
 * Validates a board schema strictly, throwing an error if invalid
 *
 * @param data The data to validate
 * @throws Error if the data is invalid
 */
export function validateBoardSchema(data: unknown): void {
  typia.assertEquals<BoardSchema>(data);
  const boardSchema = data as BoardSchema;

  validateI18n(boardSchema);
}

import { BoardSchema, RuleSchema } from './legacy-types.js';

/**
 * Recursively extracts all rules from a board schema, including nested rules
 * within choices, dice roll outcomes, conditions, and grants.
 *
 * This replicates the logic from BoardHelper.processRulesIntoLookupMap()
 * but without engine dependencies.
 */
export function extractAllRulesFromBoard(boardSchema: BoardSchema): Map<string, RuleSchema> {
  const rulesById = new Map<string, RuleSchema>();

  const addRuleToMap = (rule: RuleSchema) => {
    rulesById.set(rule.id, rule);

    // Extract nested rules from various rule types
    const childRules: RuleSchema[] = [];

    // ChoiceRule choices
    const choiceRule = rule as any;
    if (choiceRule.choices) {
      childRules.push(...choiceRule.choices.map((c: any) => c.rule).filter(Boolean));
    }

    // DiceRollRule outcomes
    const diceRollRule = rule as any;
    if (diceRollRule.diceRolls?.outcomes) {
      childRules.push(...diceRollRule.diceRolls.outcomes.map((o: any) => o.rule).filter(Boolean));
    }

    // ItemBasedRule conditions
    const itemBasedRule = rule as any;
    if (itemBasedRule.conditions) {
      childRules.push(...itemBasedRule.conditions.map((c: any) => c[2]).filter(Boolean));
    }

    // ApplyMoveConditionRule consequence
    const moveConditionRule = rule as any;
    if (moveConditionRule.condition?.consequence) {
      childRules.push(moveConditionRule.condition.consequence);
    }

    // TurnStartRule definitions from grants
    if (rule.grants) {
      rule.grants.forEach((grant) => {
        const [, grantObj] = grant;
        if (grantObj.effects?.turnStartRule && grantObj.effects.turnStartRule.numTurns !== -1) {
          childRules.push(grantObj.effects.turnStartRule.rule);
        }
      });
    }

    // Recursively process child rules
    childRules.forEach(addRuleToMap);
  };

  // Process rules from tiles
  boardSchema.tiles.forEach((tile) => addRuleToMap(tile.rule));

  // Process rules from zones
  boardSchema.zones.forEach((zone) => addRuleToMap(zone.rule));

  return rulesById;
}

/**
 * Find a rule by ID within a board schema, including nested rules.
 *
 * @param boardSchema The board schema to search
 * @param ruleId The ID of the rule to find
 * @returns The rule if found, undefined otherwise
 */
export function findRuleById(boardSchema: BoardSchema, ruleId: string): RuleSchema | undefined {
  const allRules = extractAllRulesFromBoard(boardSchema);
  return allRules.get(ruleId);
}

import {
  ApplyMoveConditionRule,
  BoardModule,
  ChoiceRule,
  DiceRollRule,
  ItemBasedRule,
  ItemSchema,
  RuleSchema,
  validateBoardModule,
  ZoneSchema,
} from '@repo/schemas';
import { boardRegistry } from './registry.js';

/**
 * Get a board module by name from the registry
 *
 * @param name Board name
 * @returns Board module
 * @throws Error if board not found
 */
export const getBoard = (name: string): BoardModule => {
  const board = boardRegistry.getBoard(name);
  if (!board) {
    throw new Error(`Board not found for board name ${JSON.stringify(name)}`);
  }
  return board;
};

/**
 * Check if a board exists in the registry
 *
 * @param name Board name
 * @returns True if board exists
 */
export const hasBoard = (name: string): boolean => {
  return boardRegistry.hasBoard(name);
};

export class BoardHelper {
  readonly itemsById: Map<string, ItemSchema> = new Map();
  readonly rulesById: Map<string, RuleSchema> = new Map();
  readonly zonesById: Map<string, ZoneSchema> = new Map();
  readonly module: BoardModule;

  constructor(boardName: string | null) {
    if (boardName === null) {
      // Cast null to BoardModule, this class should never be used in a create game action
      // which is the only legit null case
      this.module = {} as BoardModule;
      return;
    }

    // Get the board module from the registry
    const boardModule = getBoard(boardName);
    this.module = boardModule;

    // Validate and process the board module
    if (this.module) {
      // Validate board structure and i18n requirements
      validateBoardModule(this.module);
      this.processRulesIntoLookupMap();
      this.processItemsIntoLookupMap();
      this.processZonesIntoLookupMap();
    }
  }

  private processRulesIntoLookupMap() {
    const addRuleToMap = (rule: RuleSchema) => {
      this.rulesById.set(rule.id, rule);

      const childRules = [
        ...((rule as ChoiceRule).choices?.map((c) => c.rule) || []),
        ...((rule as DiceRollRule).diceRolls?.outcomes?.map((o) => o.rule) || []),
        ...((rule as ItemBasedRule).conditions?.map((c) => c[2]) || []),
      ];

      if ((rule as ApplyMoveConditionRule).condition?.consequence) {
        childRules.push((rule as ApplyMoveConditionRule).condition?.consequence!);
      }

      childRules.forEach(addRuleToMap);
    };

    this.module.board.tiles.forEach((t) => addRuleToMap(t.rule));
    this.module.board.zones.forEach((z) => addRuleToMap(z.rule));
  }

  private processItemsIntoLookupMap() {
    this.module.board.items.forEach((i) => {
      this.itemsById.set(i.id, i);
    });
  }

  private processZonesIntoLookupMap() {
    this.module.board.zones.forEach((z) => {
      this.zonesById.set(z.id, z);
    });
  }
}

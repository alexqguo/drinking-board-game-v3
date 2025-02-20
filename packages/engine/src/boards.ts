import { BoardModule, BoardName, RuleSchema } from './types.js';
import { gen1 } from '@boards/pokemon-gen1/config';

export const getBoard = (name: string): BoardModule => {
  if (name === BoardName.PokemonGen1) return gen1;
  throw `Board not found for board name ${name}`;
}

export const hasBoard = (name: string): boolean => {
  try {
    const board = getBoard(name);
    return true;
  } catch (e){
    return false;
  }
};

export class BoardHelper {
  readonly rulesById: Map<string, RuleSchema> = new Map();
  readonly boardModule: BoardModule;

  constructor(boardModule: BoardModule | null) {
    // Cast null to BoardModule, this class should never be used in a create game action
    // which is the only legit null case
    this.boardModule = boardModule as BoardModule;

    if (this.boardModule) {
      this.processRulesIntoLookupMap();
    }
  }

  private processRulesIntoLookupMap() {
    const addRuleToMap = (rule: RuleSchema) => {
      this.rulesById.set(rule.id, rule);

      const childRules = [
        ...rule.choices?.map(c => c.rule) || [],
        ...rule.diceRolls?.outcomes?.map(o => o.rule) || [],
        // todo: rule.consequence? for ilex forest
      ];
      childRules.forEach(addRuleToMap);
    };

    this.boardModule.board.tiles.forEach(t => addRuleToMap(t.rule));
    this.boardModule.board.zones.forEach(z => addRuleToMap(z.rule));
  }
}
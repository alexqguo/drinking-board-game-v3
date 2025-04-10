import { BoardName } from '@repo/enums';
import typia from 'typia';
import { ChoiceRule, DiceRollRule, RuleSchema } from '../rules/rules.types.js';
import { BoardModule, ItemSchema, ZoneSchema } from './boards.types.js';
import { gen1 } from './pokemon-gen1/config.js';
import { zelda } from './zelda/config.js';

export const getBoard = (name: string): BoardModule => {
  if (name === BoardName.PokemonGen1) return gen1;
  if (name === BoardName.Zelda) return zelda;
  throw `Board not found for board name ${name}`;
}

export const hasBoard = (name: string): boolean => {
  try {
    getBoard(name);
    return true;
  } catch (e){
    return false;
  }
};

export class BoardHelper {
  readonly itemsById: Map<string, ItemSchema> = new Map();
  readonly rulesById: Map<string, RuleSchema> = new Map();
  readonly zonesById: Map<string, ZoneSchema> = new Map();
  readonly module: BoardModule;

  constructor(boardModule: BoardModule | null) {
    // Cast null to BoardModule, this class should never be used in a create game action
    // which is the only legit null case
    this.module = boardModule as BoardModule;

    if (this.module) {
      typia.assertEquals<BoardModule>(this.module);
      this.processRulesIntoLookupMap();
      this.processItemsIntoLookupMap();
      this.processZonesIntoLookupMap();
    }
  }

  private processRulesIntoLookupMap() {
    const addRuleToMap = (rule: RuleSchema) => {
      this.rulesById.set(rule.id, rule);

      const childRules = [
        ...(rule as ChoiceRule).choices?.map(c => c.rule) || [],
        ...(rule as DiceRollRule).diceRolls?.outcomes?.map(o => o.rule) || [],
        // todo: rule.consequence? for ilex forest
      ];
      childRules.forEach(addRuleToMap);
    };

    this.module.board.tiles.forEach(t => addRuleToMap(t.rule));
    this.module.board.zones.forEach(z => addRuleToMap(z.rule));
  }

  private processItemsIntoLookupMap() {
    this.module.board.items.forEach(i => {
      this.itemsById.set(i.id, i);
    });
  }

  private processZonesIntoLookupMap() {
    this.module.board.zones.forEach(z => {
      this.zonesById.set(z.id, z);
    });
  }
}
import { BoardName } from './enums.js';
import { gen1 } from '@boards/pokemon-gen1/config';
export const getBoard = (name) => {
    if (name === BoardName.PokemonGen1)
        return gen1;
    throw `Board not found for board name ${name}`;
};
export const hasBoard = (name) => {
    try {
        const board = getBoard(name);
        return true;
    }
    catch (e) {
        return false;
    }
};
export class BoardHelper {
    rulesById = new Map();
    boardModule;
    constructor(boardModule) {
        // Cast null to BoardModule, this class should never be used in a create game action
        // which is the only legit null case
        this.boardModule = boardModule;
        if (this.boardModule) {
            this.processRulesIntoLookupMap();
        }
    }
    processRulesIntoLookupMap() {
        const addRuleToMap = (rule) => {
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

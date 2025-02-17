import { ActionType } from '../enums.js';
import { createId } from './ids.js';
export const createNDiceRollActionObjects = ({ n, }) => {
    const actions = [];
    for (let i = 0; i < n; i++) {
        actions.push({
            id: createId(),
            type: ActionType.turnRoll,
        });
    }
    return actions;
};

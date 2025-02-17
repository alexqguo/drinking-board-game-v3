import { ActionType, GameState } from '../enums.js';
import { createId } from '../utils/ids.js';
// This should really be called like "RollReady" or something
export const RollStart = (ctx) => ({
    execute: () => {
        const currentPlayer = ctx.currentPlayer;
        ctx.update_setPlayerActions(currentPlayer.id, [
            {
                id: createId(),
                type: ActionType.turnRoll,
            },
            {
                id: createId(),
                type: ActionType.turnRollSkip,
            },
        ], 'setNew', 'turnActions');
    },
    gameState: GameState.RollStart
});

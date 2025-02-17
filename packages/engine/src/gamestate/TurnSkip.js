import { findGameStateHandler } from './index.js';
import { GameState } from '../enums.js';
export const TurnSkip = (ctx) => ({
    execute: () => {
        // Clear out turn actions
        ctx.update_setPlayerActions(ctx.currentPlayer.id, [], 'setNew', 'turnActions');
        return findGameStateHandler(ctx, GameState.TurnEnd).execute();
    },
    gameState: GameState.TurnSkip,
});

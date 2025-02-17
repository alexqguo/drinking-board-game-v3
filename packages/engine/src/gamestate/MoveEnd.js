import { findGameStateHandler } from './index.js';
import { GameState } from '../enums.js';
export const MoveEnd = (ctx) => ({
    execute: () => {
        return findGameStateHandler(ctx, GameState.RuleTrigger).execute();
    },
    gameState: GameState.MoveEnd,
});

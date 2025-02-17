import { findGameStateHandler } from './index.js';
import { GameState } from '../enums.js';
export const MoveStart = (ctx) => ({
    execute: () => {
        return findGameStateHandler(ctx, GameState.MoveEnd).execute();
    },
    gameState: GameState.MoveStart,
});

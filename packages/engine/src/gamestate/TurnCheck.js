import { findGameStateHandler } from './index.js';
import { GameState } from '../enums.js';
export const TurnCheck = (ctx) => ({
    execute: () => {
        const currentPlayer = ctx.currentPlayer;
        if (currentPlayer?.hasWon) {
            return findGameStateHandler(ctx, GameState.TurnEnd).execute();
        }
        return findGameStateHandler(ctx, GameState.ZoneCheck).execute();
    },
    gameState: GameState.TurnCheck
});

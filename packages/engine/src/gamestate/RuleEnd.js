import { findGameStateHandler } from './index.js';
import { GameState } from '../enums.js';
export const RuleEnd = (ctx) => ({
    execute: () => {
        return findGameStateHandler(ctx, GameState.TurnEnd).execute();
    },
    gameState: GameState.RuleEnd,
});

import z from 'zod';
import { GameState } from '../enums.js';
import { findGameStateHandler } from '../gamestate/index.js';
export const startHandler = (ctx) => ({
    execute: () => {
        // TODO- if there is a starter selection rule at index 0
        // 1. set game state to STARTER_SELECT (has no handler, maybe unnecessary)
        // 2. execute rule handler for rule
        if (ctx.boardHelper.boardModule.board.tiles[0]?.rule.type === 'StarterSelectionRule') {
        }
        findGameStateHandler(ctx, GameState.GameStart).execute();
    },
    prevalidate: () => {
        z.literal(GameState.NotStarted).parse(ctx.prevGame?.metadata.state);
    }
});

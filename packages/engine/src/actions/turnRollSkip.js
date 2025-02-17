import { GameState } from '../enums.js';
import { findGameStateHandler } from '../gamestate/index.js';
export const turnRollSkipHandler = (ctx) => ({
    execute: () => {
        findGameStateHandler(ctx, GameState.TurnSkip).execute();
    },
    prevalidate: () => { }
});

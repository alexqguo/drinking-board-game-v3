import { ActionType, GameState } from '../enums.js';
import { findGameStateHandler } from '../gamestate/index.js';
import { z } from 'zod';
export const turnRollHandler = (ctx) => ({
    execute: (ctx, args) => {
        const { actionId } = args;
        const rollEndHandler = findGameStateHandler(ctx, GameState.RollEnd);
        ctx.update_setActionResult(actionId, ctx.rollDie());
        rollEndHandler.execute();
        return ctx.nextGame;
    },
    prevalidate: () => {
        const { nextGame, currentPlayer, prevGame } = ctx;
        const currentPlayerCanRoll = nextGame.availableActions[currentPlayer.id]?.turnActions
            .some(a => a.type === ActionType.turnRoll);
        z.literal(GameState.RollStart).parse(prevGame?.metadata.state);
        z.literal(true).parse(currentPlayerCanRoll, {
            errorMap: () => ({
                message: 'Player must have an available roll action'
            }),
        });
    },
});

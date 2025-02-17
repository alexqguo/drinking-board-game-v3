import { ActionType } from '../enums.js';
import { findGameStateHandler } from '../gamestate/index.js';
import { z } from 'zod';
export const promptCloseHandler = (ctx) => ({
    execute: () => {
        const { nextGameState } = ctx.nextGame.prompt;
        const handler = findGameStateHandler(ctx, nextGameState);
        ctx.update_setGamePrompt(null);
        ctx.update_clearActions();
        handler.execute();
        return ctx.nextGame;
    },
    prevalidate: (ctx, args) => {
        const { nextGame, currentPlayer, allActions } = ctx;
        const { availableActions, prompt } = nextGame;
        const hasPendingActions = allActions.some(a => (a.type !== ActionType.promptClose && !a.result));
        const hasValidAction = availableActions[args.playerId]
            ?.promptActions
            .some(a => a.type === ActionType.promptClose);
        z.literal(true).parse(!!prompt, {
            errorMap: () => ({
                message: 'Prompt must exist.'
            }),
        });
        z.literal(false).parse(hasPendingActions, {
            errorMap: () => ({
                message: 'Cannot have any other pending actions before closing prompt.'
            }),
        });
        z.literal(true).parse(hasValidAction, {
            errorMap: () => ({
                message: `${currentPlayer.name} must have an available prompt close action.`
            }),
        });
    },
});

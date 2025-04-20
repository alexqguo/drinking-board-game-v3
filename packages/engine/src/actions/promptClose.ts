import { ActionType } from '@repo/enums';
import { Context } from '../context.js';
import { findGameStateHandler, Game } from '../gamestate/index.js';

export interface PromptCloseArguments {
  playerId: string
}

export const promptCloseHandler = (ctx: Context) => ({
  execute: (): Game => {
    const { nextGameState } = ctx.nextGame.prompt!;
    const handler = findGameStateHandler(ctx, nextGameState);

    ctx.update_setGamePrompt(null);
    ctx.update_clearActions();

    handler.execute();

    return ctx.nextGame;
  },
  prevalidate: (ctx: Context, args: PromptCloseArguments) => {
    const { nextGame, currentPlayer, arePromptActionsCompleted } = ctx;
    const { availableActions, prompt } = nextGame;

    const hasValidAction = availableActions[args.playerId]
      ?.promptActions
      .some(a => a.type === ActionType.promptClose);

    [
      [true, !!prompt, 'Prompt must exist'],
      [false, arePromptActionsCompleted, 'Cannot have any other pending prompt actions before closing prompt.'],
      [true, hasValidAction, `${currentPlayer.name} must have an available prompt close action.`]
    ].forEach(validation => {
      const [expected, actual, msg] = validation;
      if (expected !== actual) throw new Error(String(msg))
    });
  },
});
import { Context } from '../context.js';
import { findGameStateHandler, Game } from '../gamestate/index.js';
import { ActionType } from './actions.types.js';

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
    const { nextGame, currentPlayer, allActions } = ctx;
    const { availableActions, prompt } = nextGame;

    const hasPendingActions = allActions.some(a => (
      a.type !== ActionType.promptClose && !a.result
    ));

    const hasValidAction = availableActions[args.playerId]
      ?.promptActions
      .some(a => a.type === ActionType.promptClose);

    [
      [true, !!prompt, 'Prompt must exist'],
      [false, hasPendingActions, 'Cannot have any other pending actions before closing prompt.'],
      [true, hasValidAction, `${currentPlayer.name} must have an available prompt close action.`]
    ].forEach(validation => {
      const [expected, actual, msg] = validation;
      if (expected !== actual) throw new Error(String(msg))
    });
  },
});
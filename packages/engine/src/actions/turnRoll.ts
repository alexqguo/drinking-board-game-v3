import { GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { ValidationError } from '../errors/ValidationError.js';
import { findGameStateHandler, Game } from '../gamestate/index.js';
import { ActionType } from './actions.types.js';

export interface TurnRollArguments {
  actionId: string;
}

export const turnRollHandler = (ctx: Context) => ({
  execute: (ctx: Context, args: TurnRollArguments): Game => {
    const { actionId } = args;
    const rollEndHandler = findGameStateHandler(ctx, GameState.RollEnd);

    const roll = ctx.rollDie();
    ctx.update_setActionResult(actionId, roll);

    rollEndHandler.execute();
    return ctx.nextGame;
  },
  prevalidate: () => {
    const { nextGame, currentPlayer, prevGame } = ctx;

    const currentPlayerCanRoll = nextGame.availableActions[currentPlayer.id]?.turnActions.some(
      (a) => a.type === ActionType.turnRoll,
    );
    if (!currentPlayerCanRoll) throw new ValidationError('Current player cannot roll.');
    if (prevGame?.metadata.state !== GameState.RollStart)
      throw new ValidationError('Game state invalid');
  },
});

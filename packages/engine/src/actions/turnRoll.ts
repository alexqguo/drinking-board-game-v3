import { ActionType, GameState } from '../types.js';
import { Context } from '../context.js';
import { findGameStateHandler, Game } from '../gamestate/index.js';
import { z } from 'zod';

export interface TurnRollArguments {
  actionId: string
}

export const turnRollHandler = (ctx: Context) => ({
  execute: (ctx: Context, args: TurnRollArguments): Game => {
    const { actionId } = args;
    const rollEndHandler = findGameStateHandler(ctx, GameState.RollEnd);

    ctx.update_setActionResult(
      actionId,
      ctx.rollDie(),
    );

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
import { ActionType, GameState } from '../enums.js';
import { Context } from '../context.js';
import { findGameStateHandler } from '../gamestate/index.js';
import { z } from 'zod';

export interface TurnRollArguments {

}

export const turnRollHandler = (ctx: Context) => ({
  execute: (): Game => {
    const rollEndHandler = findGameStateHandler(ctx, GameState.RollEnd);

    ctx.update_setActionResult(
      ctx.currentPlayer.id,
      'turnActions',
      ActionType.turnRoll,
      ctx.rollDie(),
    );

    rollEndHandler.execute();
    return ctx.nextGame;
  },
  prevalidate: () => {
    const { nextGame, currentPlayer, prevGame } = ctx;

    const currentPlayerCanRoll = nextGame.availableActions[currentPlayer.id]?.turnActions
      .some(a => a.actionType === ActionType.turnRoll);
    z.literal(GameState.RollStart).parse(prevGame?.metadata.state);
    z.literal(true).parse(currentPlayerCanRoll, {
      errorMap: () => ({
        message: 'Player must have an available roll action'
      }),
    });
  },
});
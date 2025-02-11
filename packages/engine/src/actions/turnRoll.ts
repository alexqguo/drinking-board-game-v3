import { ActionType, GameState } from '../enums.js';
import { Context } from '../engine.js';
import { findGameStateHandler } from '../gamestate/index.js';

export interface TurnRollArguments {

}

export const turnRollHandler = (ctx: Context<ActionType.gameCreate>) => ({
  execute: (): Game => {
    const rollEndHandler = findGameStateHandler(ctx, GameState.RollEnd);

    ctx.updateActionResult(
      ctx.currentPlayer.id,
      'turnActions',
      ActionType.turnRoll,
      ctx.rollDie(),
    );

    rollEndHandler.execute();
    return ctx.nextGame;
  },
  prevalidate: () => {
    // z.nativeEnum(BoardName).parse(ctx.actionArgs.board);
  },
});
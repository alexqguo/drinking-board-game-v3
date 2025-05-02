import { ActionType } from '@repo/enums';
import { GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { findGameStateHandler, Game } from '../gamestate/index.js';

export interface TurnRollArguments {
  actionId: string;
}

export const turnRollHandler = (ctx: Context) => ({
  execute: (ctx: Context, args: TurnRollArguments): Game => {
    const { actionId } = args;
    const rollEndHandler = findGameStateHandler(ctx, GameState.RollEnd);

    ctx.update_setActionResult(actionId, ctx.rollDie());

    rollEndHandler.execute();
    return ctx.nextGame;
  },
  prevalidate: () => {
    const { nextGame, currentPlayer, prevGame } = ctx;

    const currentPlayerCanRoll = nextGame.availableActions[currentPlayer.id]?.turnActions.some(
      (a) => a.type === ActionType.turnRoll,
    );

    // typia.assert<true>(currentPlayerCanRoll);
    // typia.assert<GameState.RollStart>(prevGame?.metadata.state);
  },
});

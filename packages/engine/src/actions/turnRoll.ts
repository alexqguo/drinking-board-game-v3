import { ActionType } from '@repo/enums';
import typia from 'typia';
import { Context } from '../context.js';
import { findGameStateHandler, Game, GameState } from '../gamestate/index.js';

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

    typia.assert<true>(currentPlayerCanRoll);
    typia.assert<GameState.RollStart>(prevGame?.metadata.state);
  },
});

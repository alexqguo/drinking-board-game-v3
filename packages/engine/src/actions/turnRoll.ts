import { GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { ValidationError } from '../errors/ValidationError.js';
import { findGameStateHandler, Game } from '../gamestate/index.js';
import { getUpdatedValue } from '../utils/math.js';
import { ActionType } from './actions.types.js';

export interface TurnRollArguments {
  actionId: string;
}

export const turnRollHandler = (ctx: Context) => ({
  execute: (ctx: Context, args: TurnRollArguments): Game => {
    const { actionId } = args;
    const { allActions, currentPlayer } = ctx;
    const action = allActions.find((a) => a.id === actionId);
    const rollEndHandler = findGameStateHandler(ctx, GameState.RollEnd);

    const roll = ctx.rollDie();
    ctx.loggers.display(`${currentPlayer.name} rolls a ${roll}.`);

    if (action?.type === ActionType.turnRollAugment) {
      const { rollAugmentation } = currentPlayer.effects;
      const newRoll = getUpdatedValue(rollAugmentation.operation, roll, rollAugmentation.modifier);

      ctx.loggers.display(`${currentPlayer.name}'s roll is updated to ${newRoll}!`);
      ctx.update_setActionResult(actionId, newRoll);
      ctx.update_setPlayerEffectsPartial(currentPlayer.id, {
        rollAugmentation: {
          ...rollAugmentation,
          numTurns: rollAugmentation.numTurns - 1,
        },
      });
    } else {
      ctx.update_setActionResult(actionId, roll);
    }

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

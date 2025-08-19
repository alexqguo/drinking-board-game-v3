import { ApplyMoveConditionRule, GameState } from '@repo/schemas';
import { ActionType } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { canPlayerMove } from '../utils/movability.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const RollEnd: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const { currentPlayer } = ctx;
    const { moveCondition } = currentPlayer.effects;

    // TODO- Ugly!
    const turnRollActions =
      ctx.nextGame.availableActions[currentPlayer.id]?.turnActions.filter((a) =>
        [ActionType.turnRoll, ActionType.turnRollAugment].includes(a.type),
      ) ?? [];
    const actionWithRollResult = turnRollActions.find((a) => typeof a.result === 'number');
    const roll = actionWithRollResult?.result as number;

    if (!moveCondition.ruleId) {
      return findGameStateHandler(ctx, GameState.MoveCalculate).execute();
    }

    const conditionSchema = (
      ctx.boardHelper.rulesById.get(moveCondition.ruleId) as ApplyMoveConditionRule
    )?.condition;

    // If there is a move condition, process it
    if (conditionSchema) {
      const result = canPlayerMove(ctx, currentPlayer.id, conditionSchema, [roll]);
      if (!result.canMove) {
        ctx.update_setGamePrompt({
          nextGameState: GameState.TurnEnd,
          messageOverride: result.message,
        });
        ctx.update_setPromptActionsClosable();
        return;
      }
    }

    // Otherwise, they can move normally
    return findGameStateHandler(ctx, GameState.MoveCalculate).execute();
  },
  gameState: GameState.RollEnd,
});

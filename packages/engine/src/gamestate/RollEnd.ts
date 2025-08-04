import { ApplyMoveConditionRule, GameState } from '@repo/schemas';
import { ActionType } from '../actions/actions.types.js';
import { Context } from '../context.js';
import { canPlayerMove } from '../utils/movability.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const RollEnd: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const { moveCondition } = ctx.currentPlayer.effects;
    // TODO- Ugly!
    const roll = ctx.nextGame.availableActions[ctx.currentPlayer.id]?.turnActions.find(
      (a) => a.type === ActionType.turnRoll,
    )?.result as number;

    ctx.loggers.display(`${ctx.currentPlayer.name} rolls a ${roll}.`);

    if (!moveCondition.ruleId) {
      return findGameStateHandler(ctx, GameState.MoveCalculate).execute();
    }

    const conditionSchema = (
      ctx.boardHelper.rulesById.get(moveCondition.ruleId) as ApplyMoveConditionRule
    )?.condition;

    // If there is a move condition, process it
    if (conditionSchema) {
      const result = canPlayerMove(ctx, ctx.currentPlayer.id, conditionSchema, [roll]);
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

import { ActionType } from '@repo/enums';
import { ApplyMoveConditionRule, GameState } from '@repo/schemas';
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

    // If there is a move condition with either no diceRolls specified or only requiring 1
    if (
      conditionSchema &&
      (!conditionSchema.diceRolls ||
        !conditionSchema.diceRolls.numRequired ||
        conditionSchema.diceRolls?.numRequired === 1)
    ) {
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

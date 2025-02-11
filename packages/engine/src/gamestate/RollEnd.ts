import { ActionType, GameState } from '../enums.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';
import { findGameStateHandler } from './index.js';
import { canPlayerMove } from '../utils/movability.js';

export const RollEnd: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    const { moveCondition } = ctx.currentPlayer.effects;
    // TODO- Ugly!
    const roll = ctx.nextGame
      .availableActions[ctx.currentPlayer.id]?.turnActions
      .find(a => a.actionType === ActionType.turnRoll)
      ?.actionResult as number;

    ctx.loggers.display(`${ctx.currentPlayer.name} rolls a ${roll}.`);

    if (!moveCondition.ruleId) {
      return findGameStateHandler(ctx, GameState.MoveCalculate).execute();
    }

    const conditionSchema = ctx.boardHelper.rulesById.get(moveCondition.ruleId)?.condition;

    // If there is a move condition with either no diceRolls specified or only requiring 1
    if (conditionSchema
      && (
        !conditionSchema.diceRolls
        || !conditionSchema.diceRolls.numRequired
        || conditionSchema.diceRolls?.numRequired === 1
      )
    ) {
      const result = canPlayerMove(ctx, ctx.currentPlayer.id, conditionSchema, [roll]);
      if (!result.canMove) {
       ctx.updateGamePrompt({
        nextGameState: GameState.TurnEnd,
        messageOverride: result.message,
       });
       ctx.updatePromptActions_canClose();
      }
    }

    // Otherwise, they can move normally
    return findGameStateHandler(ctx, GameState.MoveCalculate).execute();
  },
  gameState: GameState.RollEnd
});
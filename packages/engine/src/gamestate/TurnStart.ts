import { findGameStateHandler } from './index.js';
import { GameState } from '../enums.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';

export const TurnStart: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;
    const { effects } = currentPlayer;
    const { moveCondition, skippedTurns } = effects;
    const isSkipped = skippedTurns.numTurns > 0;

    if (isSkipped) {
      // trigger lost turn start
      findGameStateHandler(ctx, GameState.LostTurnStart).execute();
      return;
    }

    const conditionSchema = ctx.boardHelper.rulesById.get(moveCondition.ruleId)?.condition;

    if (Number(conditionSchema?.diceRolls?.numRequired) > 1) {
      /**
       * If player has a move condition, and the ruleId of the condition is a multi roll:
       * - This means you need to roll multiple times to determine if you can even take your turn
       *   - Used for elite four and legendary birds
       *   - Arguably it's not really a move condition, it's more of a turn condition
       *   - (maybe create a different rule type for this in the future)
       */
      findGameStateHandler(ctx, GameState.TurnMultirollConditionCheck).execute();
      return;
    }

    findGameStateHandler(ctx, GameState.RollStart).execute();
  },
  gameState: GameState.TurnStart
});
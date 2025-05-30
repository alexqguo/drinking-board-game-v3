import { GameState, RuleType } from '@repo/schemas';
import { Context } from '../context.js';
import { findRuleHandler } from '../rules/index.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const GameStart: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    const { boardHelper, sortedPlayers } = ctx;
    const { module } = boardHelper;
    const firstRule = module.board.tiles[0]?.rule;
    const firstPlayer = sortedPlayers[0];

    ctx.update_setGameMetadataPartial({
      currentPlayerId: firstPlayer?.id || '',
    });

    // If there is a rule at tile 0 that actually means something, execute it
    // TODO- should rules on tiles be optional?
    if (firstRule?.type !== RuleType.DisplayRule || firstRule?.grants) {
      findRuleHandler(ctx, firstRule).execute(GameState.TurnCheck);
    } else {
      return findGameStateHandler(ctx, GameState.TurnCheck).execute();
    }
  },
  gameState: GameState.GameStart,
});

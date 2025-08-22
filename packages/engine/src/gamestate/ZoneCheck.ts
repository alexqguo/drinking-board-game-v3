import { GameState, ZoneType } from '@repo/schemas';
import { Context } from '../context.js';
import { findRuleHandler } from '../rules/index.js';
import { GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const ZoneCheck: GameStateHandlerFactory = (ctx: Context) => ({
  gameState: GameState.ZoneCheck,
  execute: () => {
    const { tiles } = ctx.boardHelper.module.board;
    const currentTile = tiles[ctx.currentPlayer.tileIndex];
    const currentZone = ctx.boardHelper.zonesById.get(currentTile?.zoneId ?? '');

    if (currentZone?.rule && currentZone.type === ZoneType.active) {
      const ruleHandler = findRuleHandler(ctx, currentZone.rule);

      ctx.update_setGamePrompt({
        ruleId: currentZone.rule.id,
        nextGameState: GameState.TurnStartRuleCheck,
      });

      ruleHandler.execute();
      return;
    }

    return findGameStateHandler(ctx, GameState.TurnStartRuleCheck).execute();
  },
});

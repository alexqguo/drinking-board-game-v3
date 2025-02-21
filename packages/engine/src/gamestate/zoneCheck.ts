
import { ZoneSchema, ZoneType } from '../boards/boards.types.js';
import { Context } from '../context.js';
import { findRuleHandler } from '../rules/index.js';
import { GameState, GameStateHandlerFactory } from './gamestate.types.js';
import { findGameStateHandler } from './index.js';

export const ZoneCheck: GameStateHandlerFactory = (ctx: Context) => ({
  gameState: GameState.ZoneCheck,
  execute: () => {
    const { tiles, zones } = ctx.boardHelper.boardModule.board;
    const currentTile = tiles[ctx.currentPlayer.tileIndex];
    const currentZone = zones.find((z: ZoneSchema) => z.name === currentTile?.zone);

    if (currentZone?.rule && currentZone.type === ZoneType.active) {
      const ruleHandler = findRuleHandler(ctx, currentZone.rule);

      ctx.update_setGamePrompt({
        ruleId: currentZone.rule.id,
        nextGameState: GameState.TurnStart,
      });

      ruleHandler.execute();
      return;
    }

    return findGameStateHandler(ctx, GameState.TurnStart).execute();
  }
});
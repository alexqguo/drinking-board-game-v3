
import { findGameStateHandler } from './index.js';
import { GameState, ZoneType } from '../enums.js';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './types.js';
import { findRuleHandler } from '../rules/index.js';

export const ZoneCheck: GameStateHandlerFactory = (ctx: Context) => ({
  gameState: GameState.ZoneCheck,
  execute: () => {
    const { tiles, zones } = ctx.boardHelper.boardModule.board;
    const currentTile = tiles[ctx.currentPlayer.tileIndex];
    const currentZone = zones.find((z: ZoneSchema) => z.name === currentTile?.zone);

    if (currentZone?.rule && currentZone.type === ZoneType.active) {
      const ruleHandler = findRuleHandler(ctx, currentZone.rule);

      // todo- probably not needed if the rule engine does
      // ctx.updateGamePrompt({
      //   ruleId: currentZone.rule.id,
      //   nextGameState: GameState.TurnStart,
      //   actions: {} // Rule handler should set these
      // });

      ruleHandler.execute();
      return;
    }

    return findGameStateHandler(ctx, GameState.TurnStart).execute();
  }
});
import { findGameStateHandler } from './index.js';
import { GameState, ZoneType } from '../enums.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';

export const ZoneCheck: GameStateHandlerFactory = (ctx: BaseContext) => ({
  gameState: GameState.ZoneCheck,
  execute: () => {
    // TODO if player is in a zone with a rule and active type
    // execute rule handler
    // otherwise,
    const { tiles, zones } = ctx.boardSchema.board;
    const currentTile = tiles[ctx.currentPlayer.tileIndex];
    const currentZone = zones.find((z: ZoneSchema) => z.name === currentTile?.zone);

    if (currentZone?.rule && currentZone.type === ZoneType.active) {
      const ruleHandler = 
      ctx.updateGamePrompt({
        ruleId: currentZone.rule.id,
        nextGameState: GameState.TurnStart,
        actions: {} // Rule handler should set these
      });


    }

    return findGameStateHandler(ctx, GameState.TurnStart).execute();
  }
});
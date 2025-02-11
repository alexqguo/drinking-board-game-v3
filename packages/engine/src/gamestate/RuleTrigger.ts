import { findGameStateHandler } from './index.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';
import { GameState } from '../enums.js';
import { findRuleHandler } from '../rules/index.js';

export const RuleTrigger: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    const idx = ctx.currentPlayer.tileIndex;
    return findRuleHandler(ctx, ctx.boardHelper.boardModule.board.tiles[idx]?.rule).execute();
  },
  gameState: GameState.RuleTrigger,
});
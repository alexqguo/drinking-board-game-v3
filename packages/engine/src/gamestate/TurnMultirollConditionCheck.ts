import { findGameStateHandler } from './index.js';
import { GameState } from '../enums.js';
import { BaseContext } from '../engine.js';
import { GameStateHandlerFactory } from './types.js';

export const TurnMultirollConditionCheck: GameStateHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    const currentPlayer = ctx.currentPlayer;
    const turnConditionRule = ctx.boardHelper.boardModule.board.tiles[currentPlayer.tileIndex]?.rule;

    // TODO- create turn condition roll actions
  },
  gameState: GameState.TurnMultirollConditionCheck
});
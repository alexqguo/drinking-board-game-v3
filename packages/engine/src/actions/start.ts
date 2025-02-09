import z from 'zod';
import { GameState } from '../enums.js';
import { BaseContext } from '../engine.js';
import { findGameStateHandler } from '../gamestate/index.js';

export interface StartGameArguments {}

export const startHandler = (ctx: BaseContext) => ({
  execute: () => {
    // TODO- if there is a starter selection rule at index 0
    // 1. set game state to STARTER_SELECT (has no handler, maybe unnecessary)
    // 2. execute rule handler for rule

    if (ctx.boardSchema.board.tiles[0]?.rule.type === 'StarterSelectionRule') {

    }

    findGameStateHandler(ctx, GameState.GameStart).execute();
  },
  prevalidate: () => {
    z.literal(GameState.NotStarted).parse(ctx.prevGame?.metadata.state);
  }
})
import { GameState } from '../enums.js';
import { Context } from '../context.js';
import { findGameStateHandler } from '../gamestate/index.js';

export interface PromptRollArguments {}

export const promptRollHandler = (ctx: Context) => ({
  execute: () => {
    findGameStateHandler(ctx, GameState.TurnStart).execute();
  },
  prevalidate: () => {}
})
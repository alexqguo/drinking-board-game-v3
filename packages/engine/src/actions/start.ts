import { GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { findGameStateHandler } from '../gamestate/index.js';

export interface StartGameArguments {}

export const startHandler = (ctx: Context) => ({
  execute: () => {
    findGameStateHandler(ctx, GameState.GameStart).execute();
  },
  prevalidate: () => {
    // TODO- typia.assert<GameState.NotStarted>(ctx.prevGame?.metadata.state);
  },
});

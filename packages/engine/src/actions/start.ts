import { GameStateEnum } from '@repo/schemas';
import { Context } from '../context.js';
import { findGameStateHandler } from '../gamestate/index.js';

export interface StartGameArguments {}

export const startHandler = (ctx: Context) => ({
  execute: () => {
    findGameStateHandler(ctx, GameStateEnum.GameStart).execute();
  },
  prevalidate: () => {
    // TODO- typia.assert<GameStateEnum.NotStarted>(ctx.prevGame?.metadata.state);
  },
});

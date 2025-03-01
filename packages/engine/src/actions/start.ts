import typia from 'typia';
import { Context } from '../context.js';
import { GameState } from '../gamestate/gamestate.types.js';
import { findGameStateHandler } from '../gamestate/index.js';

export interface StartGameArguments {}

export const startHandler = (ctx: Context) => ({
  execute: () => {
    findGameStateHandler(ctx, GameState.GameStart).execute();
  },
  prevalidate: () => {
    typia.assert<GameState.NotStarted>(ctx.prevGame?.metadata.state);
  }
})
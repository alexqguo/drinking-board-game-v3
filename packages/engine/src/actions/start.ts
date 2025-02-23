import z from 'zod';
import { Context } from '../context.js';
import { GameState } from '../gamestate/gamestate.types.js';
import { findGameStateHandler } from '../gamestate/index.js';

export interface StartGameArguments {}

export const startHandler = (ctx: Context) => ({
  execute: () => {
    findGameStateHandler(ctx, GameState.GameStart).execute();
  },
  prevalidate: () => {
    z.literal(GameState.NotStarted).parse(ctx.prevGame?.metadata.state);
  }
})
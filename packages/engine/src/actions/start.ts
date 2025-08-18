import { GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { ValidationError } from '../errors/ValidationError.js';
import { findGameStateHandler } from '../gamestate/index.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StartGameArguments {}

export const startHandler = (ctx: Context) => ({
  execute: () => {
    findGameStateHandler(ctx, GameState.GameStart).execute();
  },
  prevalidate: () => {
    if (ctx.prevGame?.metadata.state !== GameState.NotStarted) {
      throw new ValidationError('Game state invalid');
    }
  },
});

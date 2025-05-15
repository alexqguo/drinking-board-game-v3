import { GameState } from '@repo/schemas';
import { Context } from '../context.js';
import { GameStateHandlerFactory } from './gamestate.types.js';

// This is actually only invoked when EVERYONE has won the game, if that does every happen
export const GameOver: GameStateHandlerFactory = (ctx: Context) => ({
  execute: () => {
    ctx.update_setGamePrompt({
      messageOverride: {
        stringId: 'engine_everyoneWins',
      },
      nextGameState: GameState.GameOver,
    });
  },
  gameState: GameState.GameOver,
});

import { describe, expect, it } from 'vitest';
import { ActionType } from './actions/actions.types.js';
import { BoardName } from './boards/boards.types.js';
import { requestHandler } from './engine.js';

describe('engine', () => {
  describe('creating a game', () => {
    it('creates a game', () => {
      const result = requestHandler({
        action: ActionType.gameCreate,
        actionArgs: {
          playerNames: ['Player 1', 'Player 2'],
          board: BoardName.PokemonGen1,
        },
        prevGame: null,
      });

      expect(result).not.toBe(null); //todo
    });
  });
});
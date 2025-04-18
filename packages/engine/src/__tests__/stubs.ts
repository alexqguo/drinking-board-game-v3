import { ActionType, BoardName } from '@repo/enums';
import { getNextGame } from '../requestHandler.js';

export const createdGameResponse = Object.freeze(getNextGame({
  action: ActionType.gameCreate,
  actionArgs: {
    playerNames: ['Player 1', 'Player 2'],
    board: BoardName.PokemonGen1,
  },
  prevGame: null,
}));
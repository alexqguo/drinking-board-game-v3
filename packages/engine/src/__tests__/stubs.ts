import { ActionType } from '../actions/actions.types.js';
import { BoardName } from '../boards/boards.types.js';
import { requestHandler } from '../requestHandler.js';

export const createdGameResponse = Object.freeze(requestHandler({
  action: ActionType.gameCreate,
  actionArgs: {
    playerNames: ['Player 1', 'Player 2'],
    board: BoardName.PokemonGen1,
  },
  prevGame: null,
}));
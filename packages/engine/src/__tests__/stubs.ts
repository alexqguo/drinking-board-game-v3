import { ActionType } from '@repo/enums';
import { getNextGame } from '../requestHandler.js';

export const createdGameResponse = Object.freeze(
  getNextGame({
    action: ActionType.gameCreate,
    actionArgs: {
      playerNames: ['Player 1', 'Player 2'],
      board: 'pokemon-gen1',
    },
    prevGame: null,
  }),
);

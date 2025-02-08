import { v4 } from 'uuid';
import { defaultGame, defaultPlayer } from '../utils/defaults';

export interface CreateGameArguments {
  playerNames: string[],
  board: Board,
}

export const create = (args: CreateGameArguments): Game => {
  const { playerNames, board } = args;
  const newGame = {
    ...defaultGame,
    board,
  };

  newGame.players = playerNames.reduce<PlayerData>((acc, cur) => {
    const id = v4();
    acc[id] = {
      ...defaultPlayer,
      id,
      name: cur,
    }
    return acc;
  }, {});

  return newGame;
};
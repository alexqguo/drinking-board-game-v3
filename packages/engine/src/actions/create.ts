import { v4 } from 'uuid';
import { defaultGame, defaultPlayer } from '../utils/defaults';
import { BoardName } from '../enums';
import z from 'zod';

export interface CreateGameArguments {
  playerNames: string[],
  board: BoardName,
}

const execute = (args: CreateGameArguments): Game => {
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

const prevalidate = (args: CreateGameArguments) => {
  z.nativeEnum(BoardName).parse(args.board);
}

export const createHandler = {
  execute,
  prevalidate,
}
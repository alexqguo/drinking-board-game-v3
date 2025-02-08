import { v4 } from 'uuid';
import { defaultGame, defaultPlayer } from '../utils/defaults';
import { ActionType, BoardName } from '../enums';
import { BaseRequest, Request } from '../request';
import z from 'zod';

export interface CreateGameArguments {
  playerNames: string[],
  board: BoardName,
}

const execute = (req: Request<ActionType.gameCreate>): Game => {
  const { playerNames, board } = req.actionArgs;
  const newGame = {
    ...defaultGame,
  };

  newGame.metadata = {
    ...newGame.metadata,
    id: v4(),
    board,
  }

  newGame.players = playerNames.reduce<PlayerData>((acc, cur, idx) => {
    const id = v4();
    acc[id] = {
      ...defaultPlayer,
      id,
      name: cur,
      order: idx,
    }
    return acc;
  }, {});

  return newGame;
};

const prevalidate = (req: Request<ActionType.gameCreate>) => {
  z.nativeEnum(BoardName).parse(req.actionArgs.board);
}

export const createHandler = {
  execute,
  prevalidate,
}
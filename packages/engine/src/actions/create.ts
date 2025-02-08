import { v4 } from 'uuid';
import { defaultPlayer } from '../utils/defaults.js';
import { ActionType, BoardName } from '../enums.js';
import { Request } from '../request.js';
import z from 'zod';

export interface CreateGameArguments {
  playerNames: string[],
  board: BoardName,
}

const execute = (req: Request<ActionType.gameCreate>): Game => {
  const { playerNames, board } = req.actionArgs;

  req.nextGame.metadata = {
    ...req.nextGame.metadata,
    id: v4(),
    board,
  }

  req.nextGame.players = playerNames.reduce<PlayerData>((acc, cur, idx) => {
    const id = v4();
    acc[id] = {
      ...defaultPlayer,
      id,
      name: cur,
      order: idx,
    }
    return acc;
  }, {});

  return req.nextGame;
};

const prevalidate = (req: Request<ActionType.gameCreate>) => {
  z.nativeEnum(BoardName).parse(req.actionArgs.board);
}

export const createHandler = {
  execute,
  prevalidate,
}
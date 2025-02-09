import { v4 } from 'uuid';
import { defaultPlayer } from '../utils/defaults.js';
import { ActionType, BoardName } from '../enums.js';
import { BaseContext, Context } from '../request.js';
import z from 'zod';

export interface CreateGameArguments {
  playerNames: string[],
  board: BoardName,
}

export const createHandler = (ctx: Context<ActionType.gameCreate>) => ({
  execute: (): Game => {
    const { playerNames, board } = ctx.actionArgs;

    ctx.nextGame.metadata = {
      ...ctx.nextGame.metadata,
      id: v4(),
      board,
    }

    ctx.nextGame.players = playerNames.reduce<PlayerData>((acc, cur, idx) => {
      const id = v4();
      acc[id] = {
        ...defaultPlayer,
        id,
        name: cur,
        order: idx,
      }
      return acc;
    }, {});

    return ctx.nextGame;
  },
  prevalidate: () => {
    z.nativeEnum(BoardName).parse(ctx.actionArgs.board);
  },
});
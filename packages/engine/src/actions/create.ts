import { defaultPlayer } from '../utils/defaults.js';
import { Actions, BoardName, Game, PlayerData } from '../types.js';
import { Context } from '../context.js';
import { createId } from '../utils/ids.js';
import z from 'zod';

export interface CreateGameArguments {
  playerNames: string[],
  board: BoardName,
}

export const createHandler = (ctx: Context) => ({
  execute: (ctx: Context, args: CreateGameArguments): Game => {
    const { playerNames, board } = args;

    ctx.nextGame.metadata = {
      ...ctx.nextGame.metadata,
      id: createId(),
      board,
    }

    ctx.nextGame.players = playerNames.reduce<PlayerData>((acc, cur, idx) => {
      const id = createId();
      acc[id] = {
        ...defaultPlayer,
        id,
        name: cur,
        order: idx,
      }
      return acc;
    }, {});

    const playerIds = Object.keys(ctx.nextGame.players);

    ctx.nextGame.availableActions = playerIds.reduce<Actions>((acc, cur) => {
      acc[cur] = {
        turnActions: [],
        promptActions: [],
      };
      return acc;
    }, {});

    return ctx.nextGame;
  },
  prevalidate: (ctx: Context, args: CreateGameArguments) => {
    z.nativeEnum(BoardName).parse(args.board);
  },
});
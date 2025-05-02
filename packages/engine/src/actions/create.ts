import { BoardName } from '@repo/enums';
import { Context } from '../context.js';
import { Game, PlayerData } from '../gamestate/gamestate.types.js';
import { defaultPlayer } from '../utils/defaults.js';
import { createId } from '../utils/ids.js';
import { Actions } from './actions.types.js';

export interface CreateGameArguments {
  playerNames: string[];
  board: BoardName;
}

export const createHandler = () => ({
  execute: (ctx: Context, args: CreateGameArguments): Game => {
    const { playerNames, board } = args;

    ctx.nextGame.metadata = {
      ...ctx.nextGame.metadata,
      id: createId(),
      board,
    };

    ctx.nextGame.players = playerNames.reduce<PlayerData>((acc, cur, idx) => {
      const id = createId();
      acc[id] = {
        ...defaultPlayer,
        id,
        name: cur,
        order: idx,
      };
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
});

import z from 'zod';
import { GameState } from '../enums.js';
import { BaseRequest } from '../request.js';
import { getHandler } from '../gamestate/index.js';

export interface StartGameArguments {
}

const execute = (req: BaseRequest) => {
  // TODO- if there is a starter selection rule at index 0
  // 1. set game state to STARTER_SELECT (has no handler, maybe unnecessary)
  // 2. execute rule handler for rule

  const gameStartHandler = getHandler(req, GameState.GAME_START);
  gameStartHandler(req);
}

const prevalidate = (req: BaseRequest) => {
  z.literal(GameState.NOT_STARTED).parse(req.prevGame?.metadata.state);
}

export const startHandler = {
  execute,
  prevalidate,
};
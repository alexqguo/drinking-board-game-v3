import z from 'zod';
import { ActionType, GameState } from '../enums';
import { BaseRequest } from '../request';

export interface StartGameArguments {
}

const execute = (req: BaseRequest) => {
  const { currentGame } = req;
  return currentGame!;
}

const prevalidate = (req: BaseRequest) => {
  z.literal(GameState.NOT_STARTED).parse(req.currentGame?.metadata.state);
}

export const startHandler = {
  execute,
  prevalidate,
};
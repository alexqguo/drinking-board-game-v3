import z from 'zod';
import { ActionType } from '../enums';
import { Request } from '../';

export interface StartGameArguments {
  currentGame: Game,
}

const execute = (req: Request<ActionType.gameStart>) => {
  const { currentGame } = req.actionArgs;
  return currentGame;
}

const prevalidate = (args: StartGameArguments) => {
  const { currentGame } = args;

}

export const startHandler = {
  execute,
};
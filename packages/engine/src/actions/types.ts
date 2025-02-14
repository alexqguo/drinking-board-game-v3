import { Context } from '../context.js';
import { ActionType } from '../enums.js';
import { CreateGameArguments, createHandler } from './create.js';
import { PromptCloseArguments } from './promptClose.js';
import { StartGameArguments, startHandler } from './start.js';
import { TurnRollArguments, turnRollHandler } from './turnRoll.js';

export interface Payloads {
  [ActionType.gameCreate]: CreateGameArguments,
  [ActionType.gameStart]: StartGameArguments,
  [ActionType.turnRoll]: TurnRollArguments,
  [ActionType.turnRollSkip]: {},
  [ActionType.turnRollAugment]: {},
  [ActionType.promptClose]: PromptCloseArguments,
  [ActionType.promptAction]: {},
}

export type ActionHandler<T extends ActionType> = ({
  execute: (ctx: Context, args: Payloads[T]) => void,
  prevalidate?: (ctx: Context, args: Payloads[T]) => void,
  postvalidate?: (game: Game) => void,
});

export type ActionHandlerFactory<T extends ActionType> = (ctx: Context) => ActionHandler<T>;
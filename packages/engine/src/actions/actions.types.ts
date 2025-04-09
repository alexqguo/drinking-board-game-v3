import { Context } from '../context.js';
import { Game } from '../gamestate/gamestate.types.js';
import { CreateGameArguments } from './create.js';
import { PromptActionCommonArguments } from './promptActionCommon.js';
import { PromptCloseArguments } from './promptClose.js';
import { StartGameArguments } from './start.js';
import { TurnRollArguments } from './turnRoll.js';
import { TurnRollSkipArguments } from './turnRollSkip.js';

/**
 * The types of actions that can go into the engine
 */
export enum ActionType {
  gameCreate = 'gameCreate',
  gameStart = 'gameStart',
  turnRoll = 'turnRoll',
  turnRollSkip = 'turnRollSkip',
  turnRollAugment = 'turnRollAugment',
  promptClose = 'promptClose',
  promptRoll = 'promptRoll',
  promptSelectPlayer = 'promptSelectPlayer',
  promptGrantSelectPlayer = 'promptGrantSelectPlayer',
  promptSelectCustom = 'promptSelectCustom',
  battleRoll = 'battleRoll',
}

export interface Payloads {
  [ActionType.gameCreate]: CreateGameArguments,
  [ActionType.gameStart]: StartGameArguments,
  [ActionType.turnRoll]: TurnRollArguments,
  [ActionType.turnRollSkip]: TurnRollSkipArguments,
  [ActionType.promptClose]: PromptCloseArguments,
  [ActionType.promptRoll]: PromptActionCommonArguments
  [ActionType.promptSelectPlayer]: PromptActionCommonArguments
  [ActionType.promptSelectCustom]: PromptActionCommonArguments
  [ActionType.promptGrantSelectPlayer]: PromptActionCommonArguments
  // eslint-disable-next-line
  [ActionType.turnRollAugment]: {}, // todo
  [ActionType.battleRoll]: PromptActionCommonArguments,
}

export type ActionHandler<T extends ActionType> = ({
  execute: (ctx: Context, args: Payloads[T]) => void,
  prevalidate?: (ctx: Context, args: Payloads[T]) => void,
  postvalidate?: (game: Game) => void,
});

export type ActionHandlerFactory<T extends ActionType> = (ctx: Context) => ActionHandler<T>;

////////////////////////////////////////////////////////////////////


export interface Actions {
  [key: string]: {
    turnActions: TurnAction[],
    promptActions: PromptAction[]
  }
}

export interface BaseAction {
  id: string;
  playerId: string;
  type: ActionType;
  // eslint-disable-next-line
  result?: any; // TODO- fix any
}

export interface PromptAction extends BaseAction {
  initiator: string;
  candidateIds?: string[]
  result?: string | number
}

export interface TurnAction extends BaseAction {
  result?: number;
}

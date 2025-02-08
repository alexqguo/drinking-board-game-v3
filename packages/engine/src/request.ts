import { ActionType } from './enums.js';
import { createHandler, CreateGameArguments } from './actions/create.js';
import { StartGameArguments, startHandler } from './actions/start.js';
import { defaultGame } from './utils/defaults.js';
import { getBoard, hasBoard } from './boards.js';

interface Payloads {
  [ActionType.gameCreate]: CreateGameArguments,
  [ActionType.gameStart]: StartGameArguments,
  [ActionType.turnRoll]: {},
  [ActionType.turnRollSkip]: {},
  [ActionType.turnRollAugment]: {},
  [ActionType.alertClose]: {},
  [ActionType.alertAction]: {},
}

const handlers: {
  [T in ActionType]: ActionHandler<T>;
} = {
  [ActionType.gameCreate]: createHandler,
  [ActionType.gameStart]: startHandler,
  // @ts-expect-error not implemented yet
  [ActionType.turnRoll]: () => undefined,
  // @ts-expect-error not implemented yet
  [ActionType.turnRollSkip]: () => undefined,
  // @ts-expect-error not implemented yet
  [ActionType.turnRollAugment]: () => undefined,
  // @ts-expect-error not implemented yet
  [ActionType.alertClose]: () => undefined,
  // @ts-expect-error not implemented yet
  [ActionType.alertAction]: () => undefined,
}

/**
 * create request object, with properties for
 * - actionHandler?
 * - stores (and instantiate them)
 * - loggers
 * -
 */

interface Loggers {
  display: (s: string) => void,
  debug: (s: string) => void,
  error: (s: string) => void,
}

type RequestArgs<T extends ActionType> = {
  action: T,
  actionArgs: Payloads[T],
  prevGame: Game | null,
  loggers: Loggers
}

type ActionHandler<T extends ActionType> = {
  execute: (req: Request<T>) => void,
  prevalidate?: (payload: Request<T>) => void,
  postvalidate?: (game: Game) => void,
}

export class Request<T extends ActionType> {
  readonly action: T;
  readonly loggers: Loggers;
  readonly prevGame: Game | null; // Null when creating a game
  readonly actionArgs: Payloads[T];
  readonly board: BoardModule | null; // Null when creating a game
  private readonly actionHandler: ActionHandler<T>;
  nextGame: Game;

  constructor(args: RequestArgs<T>) {
    this.loggers = args.loggers;
    this.action = args.action;
    this.actionArgs = args.actionArgs;
    this.prevGame = args.prevGame;
    this.actionHandler = handlers[this.action];
    this.board = args.prevGame?.metadata.board ? getBoard(args.prevGame?.metadata.board!) : null;
    this.nextGame = this.prevGame || { ...defaultGame };

    if (!this.actionHandler?.execute) throw `Could not find action handler for ${this.action} action.`;
  }

  prevalidate() {
    // General logic could go here
    this.actionHandler.prevalidate?.(this);
  }

  execute() {
    this.loggers.debug(`Executing action ${this.action} with request arguments ${JSON.stringify(this.actionArgs)}`);
    this.actionHandler.execute(this);

    return this.nextGame;
  }

  postvalidate(result: Game) {
    // General logic could go here
    this.actionHandler.postvalidate?.(result);
  }

  get currentPlayer() {
    const currentPlayerId = this.nextGame.metadata.currentPlayerId;
    return this.nextGame.players[currentPlayerId];
  }
}

// So consumers don't always have to specify a generic type
export type BaseRequest = Omit<Request<any>, 'actionArgs'>

export const requestHandler = <T extends ActionType>(args: RequestArgs<T>): Game => {
  const req = new Request<T>(args);

  req.prevalidate();

  const result = req.execute();

  req.postvalidate(result);

  req.loggers.debug(`Completed action ${req.action} with result ${JSON.stringify(result)}`);
  return result;
};
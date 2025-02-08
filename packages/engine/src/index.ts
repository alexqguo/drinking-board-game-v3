import { ActionType } from './enums';
import { createHandler, CreateGameArguments } from './actions/create';
import { StartGameArguments, startHandler } from './actions/start';

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
  loggers: Loggers
}

type ActionHandler<T extends ActionType> = {
  execute: (req: Request<T>) => Game,
  prevalidate?: (payload: Payloads[T]) => void,
  postvalidate?: (game: Game) => void,
}

export class Request<T extends ActionType> {
  readonly action: T;
  readonly loggers: Loggers;
  readonly actionArgs: Payloads[T];
  readonly actionHandler: ActionHandler<T>;

  constructor(args: RequestArgs<T>) {
    this.loggers = args.loggers;
    this.action = args.action;
    this.actionArgs = args.actionArgs;
    this.actionHandler = handlers[this.action];

    if (!this.actionHandler?.execute) throw `Could not find action handler for ${this.action} action.`;
  }

  prevalidate() {
    // General logic could go here
    this.actionHandler.prevalidate?.(this.actionArgs);
  }

  execute() {
    this.loggers.debug(`Executing action ${this.action} with request arguments ${JSON.stringify(this.actionArgs)}`);
    return this.actionHandler.execute(this);
  }

  postvalidate(result: Game) {
    // General logic could go here
    this.actionHandler.postvalidate?.(result);
  }
}

export const requestHandler = <T extends ActionType>(args: RequestArgs<T>): Game => {
  const req = new Request<T>(args);

  req.prevalidate();

  const result = req.execute();

  req.postvalidate(result);

  req.loggers.debug(`Completed action ${req.action} with result ${JSON.stringify(result)}`);
  return result;
};
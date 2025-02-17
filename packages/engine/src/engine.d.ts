import { ActionType } from './enums.js';
import { Loggers } from './context.js';
import { Payloads } from './actions/index.js';
type RequestArgs<T extends ActionType> = {
    action: T;
    actionArgs: Payloads[T];
    prevGame: Game | null;
    loggers: Loggers;
};
type Response = {
    game: Game;
    animationHints?: any[];
};
export declare const requestHandler: <T extends ActionType>(args: RequestArgs<T>) => Response;
export {};
//# sourceMappingURL=engine.d.ts.map
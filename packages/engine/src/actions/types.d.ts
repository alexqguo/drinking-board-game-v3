import { Context } from '../context.js';
import { ActionType } from '../enums.js';
import { CreateGameArguments } from './create.js';
import { PromptActionCommonArguments } from './promptActionCommon.js';
import { PromptCloseArguments } from './promptClose.js';
import { StartGameArguments } from './start.js';
import { TurnRollArguments } from './turnRoll.js';
import { TurnRollSkipArguments } from './turnRollSkip.js';
export interface Payloads {
    [ActionType.gameCreate]: CreateGameArguments;
    [ActionType.gameStart]: StartGameArguments;
    [ActionType.turnRoll]: TurnRollArguments;
    [ActionType.turnRollSkip]: TurnRollSkipArguments;
    [ActionType.turnRollAugment]: {};
    [ActionType.promptClose]: PromptCloseArguments;
    [ActionType.promptRoll]: PromptActionCommonArguments;
    [ActionType.promptSelectPlayer]: PromptActionCommonArguments;
    [ActionType.promptSelectStarter]: PromptActionCommonArguments;
    [ActionType.promptSelectCustom]: PromptActionCommonArguments;
}
export type ActionHandler<T extends ActionType> = ({
    execute: (ctx: Context, args: Payloads[T]) => void;
    prevalidate?: (ctx: Context, args: Payloads[T]) => void;
    postvalidate?: (game: Game) => void;
});
export type ActionHandlerFactory<T extends ActionType> = (ctx: Context) => ActionHandler<T>;
//# sourceMappingURL=types.d.ts.map
import { Context } from '../context.js';
export interface PromptCloseArguments {
    playerId: string;
}
export declare const promptCloseHandler: (ctx: Context) => {
    execute: () => Game;
    prevalidate: (ctx: Context, args: PromptCloseArguments) => void;
};
//# sourceMappingURL=promptClose.d.ts.map
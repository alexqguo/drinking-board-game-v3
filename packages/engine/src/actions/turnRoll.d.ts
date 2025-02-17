import { Context } from '../context.js';
export interface TurnRollArguments {
    actionId: string;
}
export declare const turnRollHandler: (ctx: Context) => {
    execute: (ctx: Context, args: TurnRollArguments) => Game;
    prevalidate: () => void;
};
//# sourceMappingURL=turnRoll.d.ts.map
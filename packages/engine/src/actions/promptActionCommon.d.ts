import { Context } from '../context.js';
export interface PromptActionCommonArguments {
    actionId: string;
    result: unknown;
}
export declare const promptActionCommonHandler: (ctx: Context) => {
    execute: (ctx: Context, args: PromptActionCommonArguments) => void;
    prevalidate: () => void;
};
//# sourceMappingURL=promptActionCommon.d.ts.map
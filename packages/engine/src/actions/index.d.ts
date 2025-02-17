import { Context } from '../context.js';
import { ActionType } from '../enums.js';
import { ActionHandler } from './types.js';
export declare const findActionHandler: <T extends ActionType>(ctx: Context, action: ActionType) => ActionHandler<T>;
export * from './types.js';
//# sourceMappingURL=index.d.ts.map
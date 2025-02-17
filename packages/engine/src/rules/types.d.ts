import { Context } from '../context.js';
import { GameState } from '../enums.js';
export interface RuleHandler {
    rule: RuleSchema;
    ruleType: string;
    execute: (nextGameState?: GameState) => void;
    postActionExecute?: () => void;
}
export type RuleHandlerFactory = (ctx: Context, rule: RuleSchema) => RuleHandler;
//# sourceMappingURL=types.d.ts.map
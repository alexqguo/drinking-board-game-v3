import { BaseContext } from '../engine.js'
import { GameState } from '../enums.js';

export interface RuleHandler {
  rule: RuleSchema,
  ruleType: string,

  execute: (nextGameState?: GameState) => void,
  postActionExecute?: () => void,
}

export type RuleHandlerFactory = (ctx: BaseContext, rule: RuleSchema) => RuleHandler;
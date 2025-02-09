import { BaseContext } from '../engine.js'

export interface RuleHandler {
  execute: () => void,
  postActionExecute?: () => void,
}

export type RuleHandlerFactory = (ctx: BaseContext) => RuleHandler;
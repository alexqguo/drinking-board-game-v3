import { BaseContext } from '../engine.js'

export type RuleHandler = (ctx: BaseContext) => {
  execute: () => void;
  postActionExecute?: () => void;
}
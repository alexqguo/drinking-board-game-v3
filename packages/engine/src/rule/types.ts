import { BaseContext } from '../request.js'

export type RuleHandler = (ctx: BaseContext) => {
  execute: () => void;
  postActionExecute?: () => void;
}
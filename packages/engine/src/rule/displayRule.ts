import { BaseContext } from '../request.js';
import { RuleHandler } from './types.js';

export const DisplayRule: RuleHandler = (ctx: BaseContext) => ({
  execute: () => {
    return;
  }
})
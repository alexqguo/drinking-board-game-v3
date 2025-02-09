import { BaseContext } from '../engine.js';
import { RuleHandlerFactory } from './types.js';

export const DisplayRule: RuleHandlerFactory = (ctx: BaseContext) => ({
  execute: () => {
    return;
  },
})
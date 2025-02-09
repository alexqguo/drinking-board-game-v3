import { BaseContext } from '../engine.js';
import { RuleHandler } from './types.js';

export const DisplayRule: RuleHandler = (ctx: BaseContext) => ({
  execute: () => {
    return;
  }
})
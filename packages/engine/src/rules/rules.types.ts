import type { BaseRule, GameState } from '@repo/schemas';
import { PromptAction } from '../actions/actions.types.js';
import { Context } from '../context.js';

export interface RuleHandler<T extends BaseRule> {
  rule: T;
  ruleType: string;

  execute: (nextGameState?: GameState) => void;
  postActionExecute?: (lastAction?: PromptAction) => void;
}

export type RuleHandlerFactory<T extends BaseRule> = (ctx: Context, rule: T) => RuleHandler<T>;

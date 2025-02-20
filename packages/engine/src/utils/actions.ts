import { ActionType, PromptAction } from '../types.js';
import { createId } from './ids.js';

export const createNDiceRollActionObjects = ({
  n,
}: { n: number }): PromptAction[] => {
  const actions: PromptAction[] = [];
  for (let i = 0; i < n; i++) {
    actions.push({
      id: createId(),
      type: ActionType.promptRoll,
    });
  }

  return actions;
}
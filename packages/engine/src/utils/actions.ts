import { ActionType, PromptAction } from '../actions/actions.types.js';
import { createId } from './ids.js';

export const createNActionObjects = ({
  n,
  type = ActionType.promptRoll
}: {
  n: number,
  type?: ActionType
}): PromptAction[] => {
  const actions: PromptAction[] = [];
  for (let i = 0; i < n; i++) {
    actions.push({
      id: createId(),
      type,
    });
  }

  return actions;
}
import { ActionType } from '../enums.js';

export const createNDiceRollActionObjects = ({
  n,
}: { n: number }): PromptAction[] => {
  const actions: PromptAction[] = [];
  for (let i = 0; i < n; i++) {
    actions.push({
      actionType: ActionType.turnRoll,
    });
  }

  return actions;
}
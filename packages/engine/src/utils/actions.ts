import { ActionType, PromptAction } from '../actions/actions.types.js';
import { createId } from './ids.js';

export const createNActionObjects = ({
  n,
  playerId,
  initiator,
  type = ActionType.promptRoll,
}: {
  n: number;
  playerId: string;
  initiator: string;
  type?: ActionType;
}): PromptAction[] => {
  const actions: PromptAction[] = [];
  for (let i = 0; i < n; i++) {
    actions.push({
      id: createId(),
      initiator,
      playerId,
      type,
    });
  }

  return actions;
};

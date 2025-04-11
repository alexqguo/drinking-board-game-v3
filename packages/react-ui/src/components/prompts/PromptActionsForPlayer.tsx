import type { PromptAction as EnginePromptAction } from '@repo/engine';
import { ActionType } from '@repo/enums';
import { FC } from 'react';
import { useUI } from '../../context/UIEnvironmentContext';

interface Props {
  actions: EnginePromptAction[]
  playerId: string;
}

const validActionTypes = [
  ActionType.promptClose,
  ActionType.promptRoll,
  ActionType.promptSelectPlayer,
  ActionType.promptSelectCustom,
  ActionType.promptGrantSelectPlayer,
  ActionType.battleRoll
]

export const PromptActionsForPlayer: FC<Props> = ({ actions, playerId }) => {
  const ui = useUI();

  return (
    <div>
      {JSON.stringify(playerId)}
    </div>
  );
};
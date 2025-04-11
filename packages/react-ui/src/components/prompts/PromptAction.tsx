import type { PromptAction as EnginePromptAction } from '@repo/engine';
import { ActionType } from '@repo/enums';
import { FC } from 'react';
import { useUI } from '../../context/UIEnvironmentContext';

interface Props {
  action: EnginePromptAction
}

const validActionTypes = [
  ActionType.promptClose,
  ActionType.promptRoll,
  ActionType.promptSelectPlayer,
  ActionType.promptSelectCustom,
  ActionType.promptGrantSelectPlayer,
  ActionType.battleRoll
]

export const PromptAction: FC<Props> = ({ action }) => {
  const ui = useUI();

  return (
    <div>{JSON.stringify(action)}</div>
  );
};
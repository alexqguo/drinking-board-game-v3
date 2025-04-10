import type { PromptAction as EnginePromptAction } from '@repo/engine';
import { FC } from 'react';
import { useUI } from '../../context/UIEnvironmentContext';

interface Props {
  action: EnginePromptAction
}

export const PromptAction: FC<Props> = ({ action }) => {
  const ui = useUI();
  return (
    <div>{JSON.stringify(action)}</div>
  );
};
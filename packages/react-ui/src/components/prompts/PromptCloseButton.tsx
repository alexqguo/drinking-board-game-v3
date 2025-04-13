import type { PromptAction } from '@repo/engine';
import { ActionType } from '@repo/enums';
import React from 'react';
import { useGameActionHandler } from '../../context/GameContext';
import { useI18n } from '../../context/LocalizationContext';
import { useUI } from '../../context/UIEnvironmentContext';

interface Props {
  promptCloseAction?: PromptAction
  playerId?: string;
}

export const PromptCloseButton: React.FC<Props> = ({ promptCloseAction, playerId }) => {
  const ui = useUI();
  const handler = useGameActionHandler();
  const { getMessage } = useI18n();

  const handleClick = () => {
    handler(ActionType.promptClose, { playerId: playerId! });
  };

  return (
    <ui.Button disabled={!promptCloseAction} onClick={handleClick}>
      {getMessage('promptClose')}
    </ui.Button>
  );
}
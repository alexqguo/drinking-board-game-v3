import type { PromptAction } from '@repo/engine';
import { ActionType } from '@repo/enums';
import React, { useState } from 'react';
import { useGameActionHandler } from '../../context/GameContext';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  promptCloseAction?: PromptAction;
  playerId?: string;
}

export const PromptCloseButton: React.FC<Props> = ({ promptCloseAction, playerId }) => {
  const ui = useUI();
  const handler = useGameActionHandler();
  const { getMessage } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    setIsSubmitting(true);
    try {
      await handler(ActionType.promptClose, { playerId: playerId! });
    } catch (e) {
      console.error('Error closing prompt: ', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ui.Button disabled={!promptCloseAction || isSubmitting} onClick={handleClick}>
      {getMessage('promptClose')}
      {isSubmitting && <ui.Spinner size={UISize.xs} />}
    </ui.Button>
  );
};

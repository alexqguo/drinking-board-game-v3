import type { Payloads, PromptAction } from '@repo/engine';
import React, { useState } from 'react';
import { useExecuteGameRequestAction } from '../../context/AppActionsContext';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  promptCloseAction?: PromptAction;
  playerId?: string;
}

export const PromptCloseButton: React.FC<Props> = ({ promptCloseAction, playerId }) => {
  const ui = useUI();
  const handler = useExecuteGameRequestAction();
  const { getMessage } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    setIsSubmitting(true);
    try {
      await handler('promptClose' as keyof Payloads, { playerId: playerId! });
    } catch (e) {
      console.error('Error closing prompt: ', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ui.Button disabled={!promptCloseAction || isSubmitting} onClick={handleClick}>
      {getMessage('webapp_promptClose')}
      {isSubmitting && <ui.Spinner size={UISize.xs} />}
    </ui.Button>
  );
};

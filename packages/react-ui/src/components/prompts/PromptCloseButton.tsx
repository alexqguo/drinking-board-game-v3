import type { Payloads, PromptAction } from '@repo/engine';
import React, { useState } from 'react';
import { useExecuteGameRequestAction } from '../../context/AppActionsContext';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { testIds } from '../../constants/testIds';

interface Props {
  promptCloseAction?: PromptAction;
  playerId?: string;
  hasPermissions: boolean;
}

export const PromptCloseButton: React.FC<Props> = ({ promptCloseAction, playerId, hasPermissions }) => {
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
    <ui.Button disabled={!promptCloseAction || !hasPermissions || isSubmitting} onClick={handleClick} data-testid={testIds.promptCloseBtn}>
      {getMessage('webapp_promptClose')}
      {isSubmitting && <ui.Spinner size={UISize.xs} />}
    </ui.Button>
  );
};

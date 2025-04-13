import type { PromptAction } from '@repo/engine';
import React from 'react';
import { useI18n } from '../../context/LocalizationContext';
import { useUI } from '../../context/UIEnvironmentContext';

interface Props {
  promptCloseAction?: PromptAction
  playerId?: string;
}

export const PromptCloseButton: React.FC<Props> = ({ promptCloseAction, playerId }) => {
  const ui = useUI();
  const { i18n } = useI18n();

  return (
    <ui.Button disabled={!promptCloseAction}>
      {i18n.getMessage('promptClose')}
    </ui.Button>
  );
}
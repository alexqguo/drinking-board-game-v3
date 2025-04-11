import type { PromptAction } from '@repo/engine';
import React from 'react';
import { useUI } from '../../context/UIEnvironmentContext';

interface Props {
  promptCloseAction?: PromptAction
  playerId?: string;
}

export const PromptCloseButton: React.FC<Props> = ({ promptCloseAction, playerId }) => {
  const ui = useUI();

  return (
    <ui.Button disabled={!promptCloseAction}>asdf</ui.Button>
  );
}
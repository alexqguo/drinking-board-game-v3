import React from 'react';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { StatusContainer } from './StatusContainer';
import { MessageList } from './MessageList';

export const GameSidebar: React.FC = () => {
  const ui = useUI();

  return (
    <aside>
      <ui.Row padding={UISize.m} justifyContent="space-between">
        <StatusContainer />
        <ui.Row>
          <MessageList />
        </ui.Row>
      </ui.Row>
    </aside>
  );
};

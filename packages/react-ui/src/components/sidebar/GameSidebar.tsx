import React from 'react';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { MessageList } from './MessageList';
import { StatusContainer } from './StatusContainer';

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

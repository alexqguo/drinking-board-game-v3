import React from 'react';
import { UISize, useUI } from '../context/UIEnvironmentContext';
import { MessageList } from './sidebar/MessageList';
import { StatusContainer } from './sidebar/StatusContainer';

export const GameSidebar: React.FC = () => {
  const ui = useUI();

  return (
    <ui.Col padding={UISize.m}>
      <StatusContainer />
      <MessageList />
    </ui.Col>
  );
};

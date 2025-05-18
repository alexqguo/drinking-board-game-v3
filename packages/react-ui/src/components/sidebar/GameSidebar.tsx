import React from 'react';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';
import { MessageList } from './MessageList';
import { StatusContainer } from './StatusContainer';

export const GameSidebar: React.FC = () => {
  const ui = useUI();
  const { screenSize } = useScreenSize();

  return (
    <ui.Col style={{ height: '100%' }} padding={UISize.m}>
      <ui.Col>
        <StatusContainer />
      </ui.Col>
      {screenSize === 'l' && (
        <ui.Col flex="1 1 0%" marginTop={UISize.m}>
          <MessageList />
        </ui.Col>
      )}
    </ui.Col>
  );
};

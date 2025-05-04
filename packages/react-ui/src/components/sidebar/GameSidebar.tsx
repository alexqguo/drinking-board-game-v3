import React from 'react';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';
import { MessageList } from './MessageList';
import { StatusContainer } from './StatusContainer';

const containerStyles = {
  s: undefined,
  l: {
    flex: '0 0 50%',
  },
};

export const GameSidebar: React.FC = () => {
  const ui = useUI();
  const { screenSize } = useScreenSize();

  return (
    <ui.Col style={{ height: '100%' }} padding={UISize.m}>
      <ui.Col style={containerStyles[screenSize]}>
        <StatusContainer />
      </ui.Col>
      {screenSize === 'l' && (
        <ui.Col style={containerStyles[screenSize]}>
          <MessageList />
        </ui.Col>
      )}
    </ui.Col>
  );
};

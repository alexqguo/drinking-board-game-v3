import React from 'react';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { StatusContainer } from './StatusContainer';

export const GameSidebar: React.FC = () => {
  const ui = useUI();

  return (
    <aside>
      <ui.Row padding={UISize.m} justifyContent="space-between">
        <StatusContainer />
        <ui.Row>
          <ui.Button size={UISize.xs}>todo- msg list</ui.Button>
        </ui.Row>
      </ui.Row>
    </aside>
  );
};

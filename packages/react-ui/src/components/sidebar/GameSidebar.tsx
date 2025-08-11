import React from 'react';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';
import { MessageList } from './MessageList';
import { StatusContainer } from './StatusContainer';
import { DonationWidget } from '../donation/DonationWidget';

export const GameSidebar: React.FC = () => {
  const ui = useUI();
  const { screenSize } = useScreenSize();

  return (
    <aside>
      <ui.Row padding={UISize.m} justifyContent="space-between">
        <StatusContainer />
        {screenSize === 'l' && (
          <ui.Row>
            <MessageList />
            <DonationWidget buttonText="❤️" />
          </ui.Row>
        )}
      </ui.Row>
    </aside>
  );
};

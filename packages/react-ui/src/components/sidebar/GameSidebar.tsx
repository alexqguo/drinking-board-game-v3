import React from 'react';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';
import { DonationWidget } from '../donation/DonationWidget';
import { MessageList } from './MessageList';
import { StatusContainer } from './StatusContainer';

export const GameSidebar: React.FC = () => {
  const ui = useUI();
  const { screenSize } = useScreenSize();

  return (
    <aside>
      <ui.Row padding={UISize.m} justifyContent="space-between">
        <StatusContainer />
        {screenSize === 'l' && (
          <ui.Row alignItems="center" gap={UISize.s}>
            <MessageList />
            <DonationWidget buttonText="❤️" buttonVariant="secondary" />
          </ui.Row>
        )}
      </ui.Row>
    </aside>
  );
};

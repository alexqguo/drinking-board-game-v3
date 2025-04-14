import React from 'react';
import { StatusContainer } from './sidebar/StatusContainer';

export const GameSidebar: React.FC = () => {
  return (
    <div>
      <StatusContainer />
      <p>[[message list]]</p>
    </div>
  );
};

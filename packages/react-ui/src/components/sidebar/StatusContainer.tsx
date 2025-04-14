import React from 'react';
import { useCurrentPlayers } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';
import { PlayerStatus } from './PlayerStatus';

export const StatusContainer: React.FC = () => {
  const ui = useUI();
  const players = useCurrentPlayers();

  return (
    <ui.Flex direction='column'>
      {Object.values(players).map(p => (
        <PlayerStatus player={p} key={p.id} />
      ))}
    </ui.Flex>
  );
};

import React from 'react';
import { useCurrentPlayers } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { PlayerStatus } from './PlayerStatus';

export const StatusContainer: React.FC = () => {
  const ui = useUI();
  const players = useCurrentPlayers();

  return (
    <ui.Col padding={UISize.m}>
      {Object.values(players).map(p => (
        <PlayerStatus player={p} key={p.id} />
      ))}
    </ui.Col>
  );
};

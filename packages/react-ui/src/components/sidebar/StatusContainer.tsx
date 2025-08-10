import type { Player } from '@repo/engine';
import React from 'react';
import { useCurrentGame, useCurrentPlayers } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { PlayerStatus } from './PlayerStatus';

// todo?
const getOrderedPlayers = (players: Player[]) => {
  return players.sort((playerA, playerB) => playerA.order - playerB.order);
};

export const StatusContainer: React.FC = () => {
  const ui = useUI();
  const players = useCurrentPlayers();
  const currentPlayerId = useCurrentGame((g) => g.metadata.currentPlayerId);
  const currentPlayer = Object.values(players).find((p) => p.id === currentPlayerId);

  return (
    <ui.Row gap={UISize.xl}>
      <PlayerStatus player={currentPlayer!} />
    </ui.Row>
  );
};

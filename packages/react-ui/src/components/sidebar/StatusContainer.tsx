import type { Player } from '@repo/engine';
import React from 'react';
import { useCurrentGame, useCurrentPlayers } from '../../context/GameContext';
import { PlayerStatus } from './PlayerStatus';

// todo?
const getOrderedPlayers = (players: Player[]) => {
  return players.sort((playerA, playerB) => playerA.order - playerB.order);
};

export const StatusContainer: React.FC = () => {
  const players = useCurrentPlayers();
  const currentPlayerId = useCurrentGame((g) => g.metadata.currentPlayerId);
  const currentPlayer = Object.values(players).find((p) => p.id === currentPlayerId);

  return <PlayerStatus player={currentPlayer!} />;
};

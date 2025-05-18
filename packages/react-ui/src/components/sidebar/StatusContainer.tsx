import type { Player } from '@repo/engine';
import React from 'react';
import { useCurrentGame, useCurrentPlayers } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';
import { PlayerStatus } from './PlayerStatus';

const getOrderedPlayers = (players: Player[]) => {
  return players.sort((playerA, playerB) => playerA.order - playerB.order);
};

export const StatusContainer: React.FC = () => {
  const ui = useUI();
  const players = useCurrentPlayers();
  const { screenSize } = useScreenSize();
  const currentPlayerId = useCurrentGame((g) => g.metadata.currentPlayerId);
  const playersToShow =
    screenSize === 'l' ? getOrderedPlayers(Object.values(players)) : [players[currentPlayerId]!];

  return (
    <ui.Col>
      {playersToShow.map((p) => (
        <ui.Col marginBottom={UISize.m} key={p.id}>
          <PlayerStatus player={p} isCurrent={currentPlayerId === p.id} />
        </ui.Col>
      ))}
    </ui.Col>
  );
};

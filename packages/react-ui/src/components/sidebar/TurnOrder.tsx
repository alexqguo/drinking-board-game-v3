import type { Player } from '@repo/engine';
import { useMemo } from 'react';
import { useCurrentGame, useCurrentPlayers } from '../../context/GameContext';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

const getOrderedPlayers = (players: Player[]) => {
  return players.sort((playerA, playerB) => playerA.order - playerB.order);
};

export const TurnOrder = () => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const players = useCurrentPlayers();
  const currentPlayerId = useCurrentGame((g) => g.metadata.currentPlayerId);
  const orderedPlayers = useMemo(() => getOrderedPlayers(Object.values(players)), [players]);

  return (
    <ui.Row gap={UISize.s}>
      <ui.Text>{getMessage('webapp_turnOrder')}</ui.Text>
      {orderedPlayers.map((p) => (
        <ui.Text>{p.id === currentPlayerId ? <u>{p.name}</u> : <>{p.name}</>}</ui.Text>
      ))}
    </ui.Row>
  );
};

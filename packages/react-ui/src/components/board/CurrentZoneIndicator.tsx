import { useBoardI18n, useCurrentBoard, useCurrentGame } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';

export const CurrentZoneIndicator = () => {
  const ui = useUI();
  const currentPlayer = useCurrentGame((g) => g.players[g.metadata.currentPlayerId]);
  const zone = useCurrentBoard((b) => b.zones.find((z) => z.id === currentPlayer?.zoneId));
  const { getMessage } = useBoardI18n();

  if (!zone) return null;
  // TODO - don't overlap the sidebar
  return (
    <div style={{ width: '100%', padding: 10 }}>
      <ui.Alert title={getMessage(zone.id) + ': ' + getMessage(zone.rule.id)} />
    </div>
  );
};

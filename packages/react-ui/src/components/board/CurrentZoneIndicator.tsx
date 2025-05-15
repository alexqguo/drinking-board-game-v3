import { useBoardI18n, useCurrentBoard, useCurrentGame } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';

export const CurrentZoneIndicator = () => {
  const ui = useUI();
  const currentPlayer = useCurrentGame((g) => g.players[g.metadata.currentPlayerId]);
  const zone = useCurrentBoard((b) => b.zones.find((z) => z.id === currentPlayer?.zoneId));
  const { getMessage } = useBoardI18n();

  if (!zone) return null;
  return (
    <div style={{ position: 'fixed', bottom: 0, padding: 10, zIndex: 99 }}>
      <ui.Alert title={getMessage(zone.id) + ': ' + getMessage(zone.rule.id)} />
    </div>
  );
};

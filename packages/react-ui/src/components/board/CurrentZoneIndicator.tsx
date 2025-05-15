import { useBoardI18n, useCurrentBoard, useCurrentGame } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';

export const CurrentZoneIndicator = () => {
  const ui = useUI();
  const currentPlayer = useCurrentGame((g) => g.players[g.metadata.currentPlayerId]);
  const zone = useCurrentBoard((b) => b.zones.find((z) => z.id === currentPlayer?.zoneId));
  const { getMessage } = useBoardI18n();

  if (!zone) return null;
  return (
    <div className="zone-indicator">
      <ui.Alert title={getMessage(zone.id) + ': ' + getMessage(zone.rule.id)} />
      <style>
        {`
          .zone-indicator {
            position: fixed;
            bottom: 0;
            padding: 10px;
            z-index: 99;
            transition: 0.5s;
            cursor: pointer;
          }
          .zone-indicator:hover {
            opacity: 30%;
          }
        `}
      </style>
    </div>
  );
};

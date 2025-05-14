import { useBoardI18n, useCurrentBoard } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';

interface Props {
  zoneId: string;
}

export const CurrentZoneIndicator = ({ zoneId }: Props) => {
  const ui = useUI();
  const zone = useCurrentBoard((b) => b.zones.find((z) => z.id === zoneId));
  const { getMessage } = useBoardI18n();

  if (!zone) return null;
  // TODO - don't overlap the sidebar
  return (
    <div style={{ left: 0, bottom: 0, position: 'absolute', width: '100%', padding: 10 }}>
      <ui.Alert title={getMessage(zone.id) + ': ' + getMessage(zone.rule.id)} />
    </div>
  );
};

import { FC } from 'react';
import { useBoardI18n, useCurrentBoard } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  ruleId?: string;
}

export const RuleHelperText: FC<Props> = ({ ruleId }) => {
  const ui = useUI();
  const { getMessage } = useBoardI18n();
  const tile = useCurrentBoard((b) => b.tiles.find((t) => t.rule.id === ruleId));
  if (!tile?.rule || !tile?.rule.helperText) return null;

  return (
    <ui.Col margin={UISize.l}>
      <ui.Alert title={getMessage(tile.rule.helperText)} />
    </ui.Col>
  );
};

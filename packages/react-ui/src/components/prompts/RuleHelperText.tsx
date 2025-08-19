import { FC } from 'react';
import { useBoardI18n, useCurrentBoard } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  ruleId?: string;
  overrideHelperText?: string;
}

export const RuleHelperText: FC<Props> = ({ ruleId, overrideHelperText }) => {
  const ui = useUI();
  const { getMessage } = useBoardI18n();
  // TODO- need to fetch from other sources as well
  const tile = useCurrentBoard((b) => b.tiles.find((t) => t.rule.id === ruleId));
  const stringId = overrideHelperText || tile?.rule.helperTextId;
  if (!stringId) return null;

  return (
    <ui.Col margin={UISize.l}>
      <ui.Alert title={getMessage(stringId)} />
    </ui.Col>
  );
};

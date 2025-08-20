import { FC } from 'react';
import { findRuleById } from '@repo/schemas';
import { useBoardI18n, useCurrentBoard } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  ruleId?: string;
  overrideHelperText?: string;
}

export const RuleHelperText: FC<Props> = ({ ruleId, overrideHelperText }) => {
  const ui = useUI();
  const { getMessage } = useBoardI18n();
  const boardSchema = useCurrentBoard((b) => b);
  const rule = ruleId ? findRuleById(boardSchema, ruleId) : undefined;
  const stringId = overrideHelperText || rule?.helperTextId;
  if (!stringId) return null;

  return (
    <ui.Col margin={UISize.l}>
      <ui.Alert title={getMessage(stringId)} />
    </ui.Col>
  );
};

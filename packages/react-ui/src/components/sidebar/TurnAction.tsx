import type { TurnAction as EngineTurnAction } from '@repo/engine';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

export interface ActionComponentProps {
  playerId: string;
  hasPermissions: boolean;
  action: EngineTurnAction;
  handleAction: (action: EngineTurnAction) => Promise<void>;
  isSubmitting: boolean;
}

export const TurnAction = ({
  hasPermissions,
  action,
  handleAction,
  isSubmitting,
}: ActionComponentProps) => {
  const ui = useUI();
  const { getMessage } = useI18n();

  if (!hasPermissions) return null;

  return (
    <ui.Button
      size={UISize.s}
      onClick={() => handleAction(action)}
      disabled={isSubmitting}
      variant={action.type === 'turnRollSkip' ? 'secondary' : 'primary'}
    >
      {getMessage(action.type)}
    </ui.Button>
  );
};

import type { TurnAction as EngineTurnAction } from '@repo/engine';
import { ActionType } from '@repo/enums';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

export interface ActionComponentProps {
  playerId: string;
  hasPermissions: boolean;
  action: EngineTurnAction;
  handleAction: (action: EngineTurnAction) => Promise<void>;
}

export const TurnAction = ({ hasPermissions, action, handleAction }: ActionComponentProps) => {
  const ui = useUI();
  const { getMessage } = useI18n();

  if (!hasPermissions) return null;

  // todo- submission state once button is clicked

  return (
    <ui.Button
      size={UISize.s}
      onClick={() => handleAction(action)}
      variant={action.type === ActionType.turnRollSkip ? 'secondary' : 'primary'}
    >
      {getMessage(action.type)}
    </ui.Button>
  );
};

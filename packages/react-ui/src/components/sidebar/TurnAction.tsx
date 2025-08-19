import type { TurnAction as EngineTurnAction } from '@repo/engine';
import type { PlayerEffects } from '@repo/schemas';
import { testIds } from '../../constants/testIds';
import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

export interface ActionComponentProps {
  playerId: string;
  playerEffects: PlayerEffects;
  hasPermissions: boolean;
  action: EngineTurnAction;
  handleAction: (action: EngineTurnAction) => Promise<void>;
  isSubmitting: boolean;
}

export const TurnAction = ({
  playerEffects,
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
      data-testid={testIds.turnActionBtn(action.type)}
    >
      {getMessage(action.type, {
        operation: playerEffects.rollAugmentation.operation,
        mod: playerEffects.rollAugmentation.modifier,
      })}
    </ui.Button>
  );
};

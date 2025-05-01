import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { ActionComponentProps } from './PromptActionsForPlayer';

export const RollAction = ({
  hasPermissions,
  action,
  handleAction,
  isSubmitting,
}: ActionComponentProps) => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const hasResult = !!action.result;

  return (
    <ui.Button
      size={UISize.xs}
      disabled={!hasPermissions || hasResult || isSubmitting}
      onClick={() => handleAction(action)}
    >
      {hasResult ? action.result : getMessage(action.type)}
      {isSubmitting && <ui.Spinner size={UISize.xs} />}
    </ui.Button>
  );
};

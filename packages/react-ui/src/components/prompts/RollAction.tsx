import { useI18n } from '../../context/LocalizationContext';
import { useUI } from '../../context/UIEnvironmentContext';
import { ActionComponentProps } from './PromptActionsForPlayer';

export const RollAction = ({
  hasPermissions,
  action,
  handleAction,
}: ActionComponentProps) => {
  const ui = useUI();
  const { getMessage } = useI18n();
  const hasResult = !!action.result;

  return (
    <ui.Button
      disabled={!hasPermissions || hasResult}
      onClick={() => handleAction(action)}
    >
      {hasResult ? action.result : getMessage(action.type)}
    </ui.Button>
  );
}
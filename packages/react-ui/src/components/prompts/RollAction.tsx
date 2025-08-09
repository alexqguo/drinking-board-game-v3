import { useI18n } from '../../context/LocalizationContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { ActionComponentProps } from './PromptActionsForPlayer';
import { testIds } from '../../constants/testIds';

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
      data-testid={testIds.promptRollBtn}
    >
      {hasResult ? action.result : getMessage(action.type)}
      {isSubmitting && <ui.Spinner size={UISize.xs} />}
    </ui.Button>
  );
};

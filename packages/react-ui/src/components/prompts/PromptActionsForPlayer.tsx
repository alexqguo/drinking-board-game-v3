import type { PromptAction as EnginePromptAction, PromptAction } from '@repo/engine';
import { FC, useContext, useState } from 'react';
import { useExecuteGameRequestAction } from '../../context/AppActionsContext';
import { useBoardI18n, useCurrentPlayers } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { UserContext } from '../../context/UserContext';
import { RollAction } from './RollAction';
import { SelectionAction } from './SelectionAction';

interface Props {
  actions: EnginePromptAction[];
  playerId: string;
}

export interface ActionComponentProps {
  playerId: string;
  hasPermissions: boolean;
  action: EnginePromptAction;
  isSubmitting: boolean;
  handleAction: (action: PromptAction, newValue?: string | number) => Promise<void>;
}

const getActionComponentForActionType = (type: string) => {
  switch (type) {
    case 'promptRoll':
    case 'battleRoll':
      return RollAction;
    case 'promptSelectPlayer':
    case 'promptGrantSelectPlayer':
    case 'promptSelectCustom':
      return SelectionAction;
    default:
      throw new Error(`No action component found for ${type}`);
  }
};

export const PromptActionsForPlayer: FC<Props> = ({ actions, playerId }) => {
  const ui = useUI();
  const { getMessage } = useBoardI18n();
  const handler = useExecuteGameRequestAction();
  const players = useCurrentPlayers();
  const userContext = useContext(UserContext);
  const player = players[playerId]!;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isBattle = actions.some((a) => a.type === 'battleRoll');

  const nonClosePromptActions = actions.filter((a) => a.type !== 'promptClose');
  // TODO - consider doing something nicer?
  if (!nonClosePromptActions.length) return null;

  const handleAction = async (action: PromptAction, value?: string | number) => {
    try {
      setIsSubmitting(true);
      return await handler(action.type, { actionId: action.id, result: value });
    } catch (e) {
      console.error('Error submitting prompt action: ', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAction = (a: PromptAction) => {
    const Component = getActionComponentForActionType(a.type);
    return (
      <Component
        key={a.id}
        action={a}
        isSubmitting={isSubmitting}
        hasPermissions={
          userContext.selectedRole === 'host' || userContext.selectedRole === playerId
        }
        playerId={playerId}
        handleAction={handleAction}
      />
    );
  };

  return (
    <>
      <ui.Separator
        label={
          <u>
            {player.name}
            {isBattle && `: ${getMessage(player.effects.itemIds[0])}`}
          </u>
        }
      />
      <ui.Row wrap="wrap" gap={UISize.l} alignItems="center">
        {actions.map((a) => renderAction(a))}
      </ui.Row>
    </>
  );
};

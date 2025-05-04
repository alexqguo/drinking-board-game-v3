import type { PromptAction as EnginePromptAction, PromptAction } from '@repo/engine';
import { ActionType } from '@repo/enums';
import { FC, useState } from 'react';
import { useCurrentPlayers, useGameActionHandler } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
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

const getActionComponentForActionType = (type: ActionType) => {
  switch (type) {
    case ActionType.promptRoll:
    case ActionType.battleRoll:
      return RollAction;
    case ActionType.promptSelectPlayer:
    case ActionType.promptGrantSelectPlayer:
    case ActionType.promptSelectCustom:
      return SelectionAction;
    default:
      throw new Error(`No action component found for ${type}`);
  }
};

export const PromptActionsForPlayer: FC<Props> = ({ actions, playerId }) => {
  const ui = useUI();
  const handler = useGameActionHandler();
  const players = useCurrentPlayers();
  const player = players[playerId]!;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nonClosePromptActions = actions.filter((a) => a.type !== ActionType.promptClose);
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
        hasPermissions={true} // TODO!!
        playerId={playerId}
        handleAction={handleAction}
      />
    );
  };

  return (
    <>
      <ui.Separator label={<u>{player.name}</u>} />
      <ui.Row wrap="wrap" gap={UISize.l} alignItems="center">
        {actions.map((a) => renderAction(a))}
      </ui.Row>
    </>
  );
};

import type { PromptAction as EnginePromptAction, PromptAction } from '@repo/engine';
import { ActionType } from '@repo/enums';
import { FC } from 'react';
import { useCurrentPlayers, useGameActionHandler } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';
import { RollAction } from './RollAction';
import { SelectionAction } from './SelectionAction';

interface Props {
  actions: EnginePromptAction[]
  playerId: string;
}

export interface ActionComponentProps {
  playerId: string;
  hasPermissions: boolean;
  action: EnginePromptAction;
  handleAction: (action: PromptAction, newValue: string | number) => Promise<void>
}

const getActionComponentForActionType = (type: ActionType) => {
  switch(type) {
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
}

export const PromptActionsForPlayer: FC<Props> = ({ actions, playerId }) => {
  const ui = useUI();
  const handler = useGameActionHandler();
  const players = useCurrentPlayers();
  const player = players[playerId]!;

  const handleAction = (action: PromptAction, value: string | number) => {
    console.log('asdf handling an action', value);
    return handler(action.type, { actionId: action.id, result: value });
  }

  const renderAction = (a: PromptAction) => {
    const Component = getActionComponentForActionType(a.type);
    return (
      <Component
        key={a.id}
        action={a}
        hasPermissions={true} // TODO!!
        playerId={playerId}
        handleAction={handleAction}
      />
    );
  }

  return (
    <>
      <ui.Separator label={player.name} />
      {actions.map(a => renderAction(a))}
    </>
  );
};
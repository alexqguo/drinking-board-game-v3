import { type PlayerData } from '@repo/engine';
import { ActionType } from '@repo/enums';
import React, { useState } from 'react';
import { useCurrentPlayers } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';
import { ActionComponentProps } from './PromptActionsForPlayer';

/**
 * This component can be invoked for player selection or custom selection.
 * For player selection, just take the player name.
 * For custom selection, it can be either an item or a rule. Both derived from the board.
 */

const getLabel = (
  id: string,
  actionType: ActionType,
  players: PlayerData
) => {
  if (
    actionType === ActionType.promptSelectPlayer
    || actionType === ActionType.promptGrantSelectPlayer
  ) return players[id]?.name ?? id;

  return id; // TODO
}

export const SelectionAction: React.FC<ActionComponentProps> = ({
  action,
  playerId,
  handleAction,
  hasPermissions,
}) => {
  const ui = useUI();
  const players = useCurrentPlayers();
  const [curValue, setCurValue] = useState('');
  const formattedOptions = (action.candidateIds ?? []).map(id => ({
    value: id,
    label: getLabel(id, action.type, players)
  }));

  const handleClick = () => {
    handleAction(curValue);
  }

  return (
    <ui.RadioField label="todo-chooseone">
      <ui.RadioGroup
        options={formattedOptions}
        value={curValue}
        disabled={!hasPermissions}
        onChange={(newValue) => setCurValue(newValue)}
      />

      <ui.Button disabled={!hasPermissions} onClick={handleClick}>
        todo- choose
      </ui.Button>
    </ui.RadioField>
  );
}
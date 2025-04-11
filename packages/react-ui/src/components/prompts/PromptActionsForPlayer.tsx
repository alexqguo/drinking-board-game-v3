import type { PromptAction as EnginePromptAction } from '@repo/engine';
import { ActionType } from '@repo/enums';
import { FC } from 'react';
import { useCurrentPlayers } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';

interface Props {
  actions: EnginePromptAction[]
  playerId: string;
}

const validActionTypes = [
  // Button to roll a die
  ActionType.promptRoll,
  ActionType.battleRoll,

  // Selecting something
  ActionType.promptSelectPlayer,
  ActionType.promptGrantSelectPlayer,
  ActionType.promptSelectCustom,
]

export const PromptActionsForPlayer: FC<Props> = ({ actions, playerId }) => {
  const ui = useUI();
  const players = useCurrentPlayers();
  const player = players[playerId]!;

  return (
    <div style={{ width: '100%' }}>
      <ui.Separator label={player.name} />
      this is the action for the player
    </div>
  );
};
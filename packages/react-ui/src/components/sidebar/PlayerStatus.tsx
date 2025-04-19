import type { TurnAction as EngineTurnAction, Player } from '@repo/engine';
import { useCurrentActions, useGameActionHandler } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { PlayerEffects } from './PlayerEffects';
import { TurnAction } from './TurnAction';

interface Props {
  player: Player
}

export const PlayerStatus = ({ player }: Props) => {
  const ui = useUI();
  const actions = useCurrentActions();
  const handler = useGameActionHandler();
  const { turnActions = [] } = actions[player.id] || {};

  const handleAction = (action: EngineTurnAction) => {
    return handler(action.type, {
      actionId: action.id,
      playerId: player.id
    });
  }

  return (
    <ui.Col gap={UISize.s}>
      <ui.Text>{player.name}</ui.Text>
      <PlayerEffects effects={player.effects} />
      {turnActions.map(a => (
        <TurnAction
          playerId={player.id}
          action={a}
          key={a.id}
          hasPermissions={true} // todo
          handleAction={handleAction}
        />
      ))}
    </ui.Col>
  );
};
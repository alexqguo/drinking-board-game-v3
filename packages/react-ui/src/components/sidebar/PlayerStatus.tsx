import type { TurnAction as EngineTurnAction, Player } from '@repo/engine';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { useExecuteGameRequestAction } from '../../context/AppActionsContext';
import { useCurrentActions } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { UserContext } from '../../context/UserContext';
import { PlayerEffects } from './PlayerEffects';
import { TurnAction } from './TurnAction';
import { TurnOrder } from './TurnOrder';

interface Props {
  player: Player;
  withActions?: boolean;
  flexDirection?: CSSProperties['flexDirection'];
}

export const PlayerStatus = ({ player, withActions = true, flexDirection = 'row' }: Props) => {
  const ui = useUI();
  const actions = useCurrentActions();
  const handler = useExecuteGameRequestAction();
  const { selectedRole } = useContext(UserContext);
  const { turnActions = [] } = actions[player.id] || {};
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset submission state once actions change
    setIsSubmitting(false);
  }, [turnActions]);

  const handleAction = async (action: EngineTurnAction) => {
    try {
      setIsSubmitting(true);

      return handler(action.type, {
        actionId: action.id,
        playerId: player.id,
      });
    } catch (e) {
      // Only reset submitting state if call fails
      // Game will update and remove the button on a successful call
      setIsSubmitting(false);
      console.error('Error submitting turn action: ', e);
    }
  };
  const icon = selectedRole === 'host' ? '🎮' : selectedRole === player.id ? '👤' : '';

  return (
    <ui.Flex direction={flexDirection} gap={UISize.m} alignItems="center">
      <ui.HoverTooltip content={<TurnOrder />}>
        <ui.Text>
          {icon} {player.hasWon && '👑 '}
          {player.name}
        </ui.Text>
      </ui.HoverTooltip>
      <PlayerEffects effects={player.effects} zoneId={player.zoneId} />
      {withActions &&
        turnActions.map((a) => (
          <TurnAction
            playerId={player.id}
            action={a}
            key={a.id}
            hasPermissions={selectedRole === 'host' || selectedRole === player.id}
            handleAction={handleAction}
            isSubmitting={isSubmitting}
          />
        ))}
    </ui.Flex>
  );
};

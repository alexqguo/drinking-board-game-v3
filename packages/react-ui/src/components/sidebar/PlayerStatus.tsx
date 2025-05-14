import type { TurnAction as EngineTurnAction, Player } from '@repo/engine';
import { useEffect, useState } from 'react';
import { useExecuteGameRequestAction } from '../../context/AppActionsContext';
import { useBoardI18n, useCurrentActions } from '../../context/GameContext';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { CurrentZoneIndicator } from './CurrentZoneIndicator';
import { PlayerEffects } from './PlayerEffects';
import { TurnAction } from './TurnAction';

interface Props {
  player: Player;
  isCurrent: boolean;
}

export const PlayerStatus = ({ player, isCurrent }: Props) => {
  const ui = useUI();
  const actions = useCurrentActions();
  const handler = useExecuteGameRequestAction();
  const { getMessage } = useBoardI18n();
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

  return (
    <ui.Col gap={UISize.s}>
      <ui.Text>{player.name}</ui.Text>
      {player.zoneId && (
        <>
          <ui.Row>
            <ui.Chip color="purple">
              <ui.Text fontSize={UISize.xs}>{getMessage(player.zoneId)}</ui.Text>
            </ui.Chip>
          </ui.Row>
          {isCurrent && <CurrentZoneIndicator zoneId={player.zoneId} />}
        </>
      )}
      <PlayerEffects effects={player.effects} />
      {turnActions.map((a) => (
        <TurnAction
          playerId={player.id}
          action={a}
          key={a.id}
          hasPermissions={true} // todo
          handleAction={handleAction}
          isSubmitting={isSubmitting}
        />
      ))}
    </ui.Col>
  );
};

import { type Actions } from '@repo/engine';
import { ActionType } from '@repo/enums';
import { useCurrentGame } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';
import { PromptActionsForPlayer } from './PromptActionsForPlayer';
import { PromptCloseButton } from './PromptCloseButton';

// Returns the first promptClose action that's found (should only be one) along with its playerId
const getPromptCloseActionsWithPlayerId = (availableActions: Actions) => {
  return Object.entries(availableActions).flatMap(([playerId, actionObj]) =>
    actionObj.promptActions
      .filter(action => action.type === ActionType.promptClose)
      .map(action => ({ playerId, action }))
  )[0];
};

export const Prompt = () => {
  const ui = useUI();
  const game = useCurrentGame();
  const { prompt, availableActions } = game;
  const promptCloseAction = getPromptCloseActionsWithPlayerId(availableActions);

  return (
    <div>
      <ui.Modal
        isOpen={!!prompt}
        headerText='hello'
        footerContent={
          <PromptCloseButton
            playerId={promptCloseAction?.playerId}
            promptCloseAction={promptCloseAction?.action}
          />
        }
      >
        {/* For each player, render all their available actions */}
        {Object.entries(availableActions).map(([playerId, actionObj]) =>
          <PromptActionsForPlayer
            actions={actionObj.promptActions}
            playerId={playerId}
            key={playerId}
          />
        )}
      </ui.Modal>
    </div>
  );
};

// create action component
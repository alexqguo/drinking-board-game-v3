import { type Actions } from '@repo/engine';
import { ActionType } from '@repo/enums';
import { useCurrentGame } from '../../context/GameContext';
import { UIEnvironment, useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';
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

const flexProps: Record<string, Partial<Parameters<UIEnvironment['Flex']>[0]>> = {
  s: {
    direction: 'column'
  },
  l: {
    direction: 'row',
    wrap: 'wrap',
    justifyContent: 'space-between'
  }
}

export const Prompt = () => {
  const ui = useUI();
  const game = useCurrentGame();
  const screenSize = useScreenSize();
  const { prompt, availableActions } = game;
  const promptCloseAction = getPromptCloseActionsWithPlayerId(availableActions);

  return (
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

      <ui.Flex {...flexProps[screenSize]}>
        {/* For each player, render all their available actions */}
        {Object.entries(availableActions).map(([playerId, actionObj]) =>
          <ui.Flex
            key={playerId}
            flex={screenSize === 'l' ? '0 1 calc(50% - 0.5rem)' : '1 1 100%'}
          >
            <PromptActionsForPlayer
              actions={actionObj.promptActions}
              playerId={playerId}
            />
          </ui.Flex>
        )}
      </ui.Flex>
    </ui.Modal>
  );
};

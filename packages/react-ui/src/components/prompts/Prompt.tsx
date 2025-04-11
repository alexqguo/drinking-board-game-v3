import { type Actions, type PromptAction as EnginePromptAction } from '@repo/engine';
import { ActionType } from '@repo/enums';
import { useCurrentGame } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';
import { PromptAction } from './PromptAction';

const getAllPromptActions = (availableActions: Actions) =>
  Object.values(availableActions).flatMap(actionObj => actionObj.promptActions);

const getPromptCloseAction = (actions: EnginePromptAction[]) => actions
  .find(a => a.type === ActionType.promptClose);

export const Prompt = () => {
  const ui = useUI();
  const game = useCurrentGame();
  const { prompt, availableActions } = game;
  const promptActions = getAllPromptActions(availableActions);
  const promptCloseAction = getPromptCloseAction(promptActions);

  return (
    <div>
      <ui.Modal
        isOpen={!!prompt}
        footerContent={null}
        headerText='hello'
      >
        {promptActions.map(a => (
          <PromptAction action={a} key={a.id} />
        ))}
      </ui.Modal>
    </div>
  );
};

// create action component
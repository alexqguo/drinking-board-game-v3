import type { Actions } from '@repo/engine';
import { useCurrentGame } from '../../context/GameContext';
import { useUI } from '../../context/UIEnvironmentContext';
import { PromptAction } from './PromptAction';

const getAllPromptActions = (availableActions: Actions) =>
  Object.values(availableActions).flatMap(actionObj => actionObj.promptActions);

export const Prompt = () => {
  const ui = useUI();
  const game = useCurrentGame();
  const { prompt, availableActions } = game;
  const promptActions = getAllPromptActions(availableActions);

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
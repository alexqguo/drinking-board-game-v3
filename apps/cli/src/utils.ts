import { BaseAction, Game } from '@repo/engine';

interface ActionForPlayer {
  pid: string,
  action: BaseAction,
}

export const getAllActions = (game: Game): ActionForPlayer[] => {
  const allActions: ActionForPlayer[] = [];

  Object.keys(game.availableActions).forEach(pid => {
    const actionsForPlayer = [
      ...game.availableActions[pid]?.promptActions || [],
      ...game.availableActions[pid]?.turnActions || [],
    ];
    actionsForPlayer.forEach(a => {
      allActions.push({
        pid,
        action: a
      });
    });
  });

  return allActions;
}
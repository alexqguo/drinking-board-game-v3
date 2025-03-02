import { BaseAction, BoardModule, Game, Player } from '@repo/engine';

export const testLoggers = {
  display: (...args: any[]) => console.log('[DISPLAY]', ...args, '\n'),
  debug: (...args: any[]) => console.log('[DEBUG]', ...args, '\n'),
  // debug: () => {},
  error: console.error,
}

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

export const printGameStatus = (game: Game, module: BoardModule) => {
  // TODO- print out player statuses
  // TODO- print out prompt nicely if it exists
  const printBoard = () => {
    const currentLocations = Object.values(game.players).reduce<{[key: string]: Player[]}>((acc, cur) => {
      const currentPlayerIdx = cur.tileIndex;
      if (!acc[currentPlayerIdx]) acc[currentPlayerIdx] = [];
      acc[currentPlayerIdx]!.push(cur);

      return acc;
    }, {});

    const boardTiles: string[] = [];
    module.board.tiles.forEach((t, i) => {
      const mandatoryStr = t.mandatory ? 'm' : '';
      const playersAtLocation = currentLocations[String(i)]?.map(p => p.name);
      boardTiles.push(`[ ${i}${mandatoryStr} ${playersAtLocation || ''}]`);
    });

    console.log(boardTiles);
    console.log();
  }

  const printPlayers = () => {
    const playersStr = Object.values(game.players).map(p => {
      const isCurrentPlayer = game.metadata.currentPlayerId === p.id;
      if (isCurrentPlayer) return `[${p.name}]`;
      return p.name
    });

    console.log(playersStr.join(', '));
    console.log();
  }

  const printPrompt = () => {
    const { prompt } = game;
    if (!prompt) return;

    const tile = module.board.tiles.find(t => t.rule.id === prompt.ruleId);

    console.log(tile?.rule.displayText);
    console.log(prompt);
    console.log();
  }

  printBoard();
  printPlayers();
  printPrompt();
}
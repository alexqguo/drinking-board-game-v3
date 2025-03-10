import { BaseAction, BoardHelper, Game, Player } from '@repo/engine';
import { bgGray, bgMagenta, bold } from 'yoctocolors';

const displayMessages: string[] = [];

export const testLoggers = {
  display: (...args: string[]) => {
    displayMessages.push(...args);
  },
  debug: (...args: string[]) => {
    displayMessages.push(...args);
  },
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

export const printGameStatus = (game: Game, bHelper: BoardHelper) => {
  const printBoard = () => {
    const numTiles = bHelper.module.board.tiles.length;

    const currentLocations = Object.values(game.players).reduce<{[key: string]: Player[]}>((acc, cur) => {
      const currentPlayerIdx = cur.tileIndex;
      if (!acc[currentPlayerIdx]) acc[currentPlayerIdx] = [];
      acc[currentPlayerIdx]!.push(cur);

      return acc;
    }, {});

    // Lowest current idx of a player
    const minTileIdxToDisplay = Math.min(...Object.keys(currentLocations).map(i => Number(i)));
    // Highest current idx of a player + 10
    const maxTileIdxToDisplay = Math.min(
      Math.max(...Object.keys(currentLocations).map(i => Number(i))) + 10,
      numTiles - 1
    );

    const boardTilesToDisplay = bHelper.module.board.tiles.slice(minTileIdxToDisplay, maxTileIdxToDisplay);
    let tilesDisplayStr = boardTilesToDisplay.map((t, i) => {
      const actualIdx = i + minTileIdxToDisplay;
      let str = `[ ${actualIdx}`;
      if (t.mandatoryType) str += 'm';
      if (t.zone) str += 'z';

      const playersAtLocation = currentLocations[String(actualIdx)]?.map(p => {
        const colorDecorator = p.id === game.metadata.currentPlayerId ? bgMagenta : bgGray;
        return bold(colorDecorator(p.name));
      });
      if (playersAtLocation) str += ' ' + playersAtLocation.join('|');

      str += ' ]'

      return str;
    }).join(' ');
    if (maxTileIdxToDisplay < numTiles - 1) tilesDisplayStr += ' ... ';

    console.log(tilesDisplayStr);
    console.log();
  }

  const printMessages = () => {
    displayMessages.forEach(m => console.log(m));
    console.log();
    displayMessages.splice(0, displayMessages.length);
  };

  const printPlayers = () => {
    const currentPlayer = game.players[game.metadata.currentPlayerId];
    const { effects: currentEffects } = currentPlayer!;
    // Print player names
    const playersStr = Object.values(game.players).map(p => {
      const isCurrentPlayer = game.metadata.currentPlayerId === p.id;
      if (isCurrentPlayer) return bold(bgMagenta(p.name));
      return p.name
    });
    console.log(playersStr.join(', '));

    // Print current player effects
    if (currentEffects.extraTurns) console.log(`- Extra turn!`);
    if (currentEffects.mandatorySkips) console.log(`- Skips next mandatory space!`);
    if (currentEffects.customMandatoryTileIndex >= 0) console.log(`- Tile ${currentEffects.customMandatoryTileIndex} is now mandatory!`);
    if (currentEffects.skippedTurns.numTurns) console.log(`- Misses next turn!`);
    if (currentEffects.speedModifier.numTurns) console.log(`- Next roll is modified!`);
    if (currentEffects.rollAugmentation.numTurns) console.log(`- Can augment roll`);
    if (currentEffects.moveCondition.ruleId) console.log(`- Has move condition!`); // TODO- describe
    if (currentEffects.itemIds.length) console.log(currentEffects.itemIds);
    // TODO- log anchor)

    console.log();
  }

  const printPrompt = () => {
    const { prompt } = game;
    if (!prompt) return;

    const latestRule = [...prompt.subsequentRuleIds || ''].pop();
    const rule = bHelper.rulesById.get(latestRule || prompt.ruleId || '');

    console.log(rule?.displayText || prompt.messageOverride);
    console.log(prompt);
    console.log();
  }

  printBoard();
  printMessages();
  printPlayers();
  printPrompt();
}
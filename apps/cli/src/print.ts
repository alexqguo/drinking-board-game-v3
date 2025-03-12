import { BoardHelper, Game, Player } from '@repo/engine';
import { bgGray, bgMagenta, bold } from 'yoctocolors';

const GRID_WIDTH = 9;
const displayMessages: string[] = [];
const nextDirections: { [key: string]: string } = Object.freeze({
  up: 'right',
  right: 'down',
  down: 'left',
  left: 'up',
});
const stripAnsi = (str: string | null) => (str || '').replace(/\x1B\[\d+m/g, ''); // For Yoctocolors

const createGrid = () => {
  const grid = new Array(GRID_WIDTH);
  for (let i = 0; i < GRID_WIDTH; i++) {
    grid[i] = new Array(GRID_WIDTH).fill(null);
  }

  return grid;
}

const isValidTile = (grid: (string | null[][]), x: number, y: number) => {
  try {
    // @ts-expect-error
    const isValid = grid[x][y] === null;

    return isValid;
  } catch (e) { return false; }
}

const getNextCoords = (dir: string, x: number, y: number): [number, number] => {
  if (dir === 'up') return [x, y - 1];
  if (dir === 'right') return [x + 1, y];
  if (dir === 'down') return [x, y + 1];
  if (dir === 'left') return [x - 1, y];
  throw new Error(`dir ${dir} is not correct`);
}

const printGrid = (grid: (string | null)[][]) => {
  // Determine the number of rows (Y) based on the length of the first column
  const numRows = grid[0]?.length || GRID_WIDTH;

  // Find the maximum width of any cell for formatting. yoctocolors skews this so hardcoding to 10
  const maxWidth = Math.max(...grid.flat().map(cell => stripAnsi(cell).length));
  // const maxWidth = 12;

  // Print each row
  for (let y = 0; y < numRows; y++) {
    const row = grid
      .map(column => {
        const originalStr = String(column[y] || '');
        const strippedStr = stripAnsi(originalStr); // needed for length calculation
        return strippedStr.padStart(maxWidth).replace(strippedStr, originalStr);
      })
      .join(' | ');
    console.log(row);

    // Print a separator line after each row (except the last)
    if (y < numRows - 1) {
      console.log('-'.repeat(stripAnsi(row).length));
    }
  }
}

export const testLoggers = {
  display: (...args: string[]) => {
    displayMessages.push(...args);
  },
  debug: (...args: string[]) => {
    // displayMessages.push(...args);
  },
  error: console.error,
}

export const printGameStatus = (game: Game, bHelper: BoardHelper) => {
  const currentLocations = Object.values(game.players).reduce<{[key: string]: Player[]}>((acc, cur) => {
    const currentPlayerIdx = cur.tileIndex;
    if (!acc[currentPlayerIdx]) acc[currentPlayerIdx] = [];
    acc[currentPlayerIdx]!.push(cur);

    return acc;
  }, {});

  const printBoard = () => {
    const grid = createGrid();
    let curY = grid.length - 1;
    let curX = 0;
    let curDirection = 'up';

    bHelper.module.board.tiles.forEach((t, idx) => {
      let tileDisplayStr = `[${idx}`;
      if (t.mandatoryType) tileDisplayStr += 'm';
      if (t.zone) tileDisplayStr += 'z';

      const playersAtLocation = currentLocations[String(idx)]?.map(p => {
        const colorDecorator = p.id === game.metadata.currentPlayerId ? bgMagenta : bgGray;
        return bold(colorDecorator(p.name));
        // return p.name;
      });

      if (playersAtLocation) tileDisplayStr += ' ' + playersAtLocation.join('|');
      tileDisplayStr += ']'

      grid[curX][curY] = tileDisplayStr;
      const [nextX, nextY] = getNextCoords(curDirection, curX, curY);
      if (isValidTile(grid, nextX, nextY)) {
        curX = nextX;
        curY = nextY;
      } else {
        curDirection = nextDirections[curDirection]!;
        const nextCoords = getNextCoords(curDirection, curX, curY);
        curX = nextCoords[0];
        curY = nextCoords[1];
      }
    });

    printGrid(grid);
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
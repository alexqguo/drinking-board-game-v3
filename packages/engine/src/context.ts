import { Locale } from '@repo/i18n';
import { ActionType, BaseAction, PromptAction, TurnAction } from './actions/actions.types.js';
import { BoardHelper, getBoard } from './boards/index.js';
import { AnimationHint, Game, GameMetadata, Player, PlayerData, PlayerEffects, Prompt } from './gamestate/gamestate.types.js';
import { defaultGame } from './utils/defaults.js';
import { createId } from './utils/ids.js';

export interface Loggers {
  display: (s: string) => void,
  debug: (s: string) => void,
  error: (s: string) => void,
}

export interface ContextArgs {
  prevGame: Game | null
  loggers?: Loggers,
  locale?: Locale,
  seeds?: number[],
}

const defaultLoggers: Loggers = {
  display: console.log,
  debug: console.info,
  error: console.error,
}

export class Context {
  readonly locale: Locale;
  readonly loggers: Loggers;
  readonly prevGame: Game | null; // Null when creating a game
  readonly boardHelper: BoardHelper;
  readonly seeds: number[];
  nextGame: Game;
  animationHints: AnimationHint[];

  constructor(args: ContextArgs) {
    const {
      prevGame,
      locale = Locale.en,
      loggers = defaultLoggers,
      seeds = [],
    } = args;

    this.seeds = seeds;
    this.locale = locale;
    this.loggers = loggers;
    this.prevGame = prevGame;
    this.boardHelper = new BoardHelper(prevGame?.metadata.board ? getBoard(prevGame?.metadata.board!) : null);
    // TODO- this could be a proxy to track updates?
    this.nextGame = structuredClone(this.prevGame || defaultGame);
    this.animationHints = [];
  }

  // Not a great place for this?
  rollDie() {
    const seededRoll = this.seeds.shift();
    if (typeof seededRoll === 'number') return seededRoll;

    return Math.floor(Math.random() * 6) + 1;
  }

  get currentPlayer() {
    const currentPlayerId = this.nextGame.metadata.currentPlayerId;
    return this.nextGame.players[currentPlayerId]!;
  }

  get otherPlayerIds() {
    return Object.values(this.nextGame.players)
      .map(p => p.id)
      .filter(id => id !== this.currentPlayer.id);
  }

  get allPlayerIds() {
    return this.sortedPlayers.map(p => p.id);
  }

  get sortedPlayers() {
    return Object.values(this.nextGame.players)
      .sort((a, b) => a.order - b.order);
  }

  get allActions(): (TurnAction | PromptAction)[] {
    const actions: BaseAction[] = [];

    Object.values(this.nextGame.availableActions).forEach(actionObj => {
      actions.push(...actionObj.promptActions);
      actions.push(...actionObj.turnActions);
    });

    return actions;
  }

  // Used mostly for post action handlers
  get arePromptActionsCompleted() {
    const allPromptActions = Object.values(this.nextGame.availableActions)
      .map(playerActions => playerActions.promptActions)
      .flat();

    return allPromptActions
      .every(a => typeof a.result !== 'undefined');
  }

  // These updaters exist to centralize logic to have one place for updating behavior
  // Could use a proxy if this gets annoying
  update_setGameMetadataPartial(newMetadata: Partial<GameMetadata>) {
    this.nextGame.metadata = {
      ...this.nextGame.metadata,
      ...newMetadata,
    };
  }

  update_setGamePlayers(newPlayers: PlayerData) {
    this.nextGame.players = newPlayers;
  }

  update_setPlayerDataPartial(playerId: string, newData: Partial<Player>) {
    this.nextGame.players[playerId] = {
      ...this.nextGame.players[playerId]!,
      ...newData,
    };

    if (newData.tileIndex) {
      // For some reason doing .push updated visitedTiles for all players...?
      this.nextGame.players[playerId].visitedTiles = [
        ...this.nextGame.players[playerId].visitedTiles,
        newData.tileIndex,
      ]

      this.animationHints.push({
        playerId,
        newTileIndex: newData.tileIndex,
      });
    }
  }

  update_setPlayerEffectsPartial(playerId: string, newEffects: Partial<PlayerEffects>) {
    this.nextGame.players[playerId]!.effects = {
      ...this.nextGame.players[playerId]!.effects,
      ...newEffects
    };
  }

  update_setGamePrompt(newPrompt: Prompt | null) {
    this.nextGame.prompt = newPrompt;
  }

  update_setGamePromptPartial(newPrompt: Partial<Prompt>) {
    this.nextGame.prompt = {
      ...this.nextGame.prompt,
      ...newPrompt,
    } as Prompt;
  }

  update_clearActions(playerId?: string) {
    // If no player ID provided, clear all actions for everyone
    if (!playerId) {
      for (const [, actionObj] of Object.entries(this.nextGame.availableActions)) {
        actionObj.promptActions = [];
        actionObj.turnActions = [];
      }
      return;
    }

    // If player ID provided, clear actions just for them
    this.nextGame.availableActions[playerId]!.turnActions = [];
    this.nextGame.availableActions[playerId]!.promptActions = [];
  }

  update_setPlayerActions<T extends BaseAction = PromptAction>(
    newActions: T[],
    actionCategory: 'promptActions' | 'turnActions' = 'promptActions',
  ) {
    newActions.forEach(a => {
      this.nextGame.availableActions[a.playerId]![actionCategory]
        .push(a as any);
    });
  }

  update_setActionResult(
    actionId: string,
    result: string | number,
  ) {
    const action = this.allActions.find(a => a.id === actionId);

    if (!action) {
      const msg = `Error: actionId ${actionId} not found.`;
      this.loggers.error(msg);
      throw new Error(msg);
    }

    action.result = result;
  }

  update_setPromptActionsClosable() {
    const availableActions = this.nextGame.availableActions[this.currentPlayer.id]!;
    availableActions.promptActions = [
      {
        id: createId(),
        initiator: 'engine', // TODO- what should this be?
        playerId: this.currentPlayer.id,
        type: ActionType.promptClose,
      },
      ...availableActions.promptActions,
    ];
  }
}
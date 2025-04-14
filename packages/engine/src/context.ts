import { ActionType } from '@repo/enums';
import { Locale } from '@repo/i18n';
import { BaseAction, PromptAction, TurnAction } from './actions/actions.types.js';
import { ZoneType } from './boards/boards.types.js';
import { BoardHelper, getBoard } from './boards/index.js';
import { AnimationHint, Game, GameMetadata, Player, PlayerData, PlayerEffects, Prompt } from './gamestate/gamestate.types.js';
import { defaultGame } from './utils/defaults.js';
import { createId } from './utils/ids.js';
import { isPlayerLeading } from './utils/movability.js';

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
    this.nextGame = structuredClone(this.prevGame || defaultGame);
    this.animationHints = [];

    // NOTE! When instantiating nextGame here, we should check if all fields exist. It's possible that
    // fields with null-ish values were stripped out by the DAL (aka Firebase). TODO
    // This happens for any empty array or object field I think. May want to hacky reinstantiate those
    // Known examples- availableActions and itemIds
  }

  // Not a great place for this?
  rollDie() {
    const seededRoll = this.seeds.shift();
    if (typeof seededRoll === 'number') {
      this.loggers.display(`Seeded roll of ${seededRoll}.`);
      return seededRoll;
    }

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
      actions.push(...actionObj.promptActions || []);
      actions.push(...actionObj.turnActions || []);
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

    // SIDE EFFECTS: place for common logic when a player moves locations
    if (typeof newData.tileIndex === 'number') {
      const newZoneId = this.boardHelper.module.board.tiles[newData.tileIndex]?.zoneId;
      const newZone = this.boardHelper.zonesById.get(newZoneId ?? '');

      if (newZoneId && newZone) {
        if (newZone.type === ZoneType.active || newZone.type === ZoneType.passive) {
          // For active or passive zones, just set the current player's zoneId
          this.nextGame.players[playerId].zoneId = newZoneId;
        } else if (newZone.type === ZoneType.passiveLeader && isPlayerLeading(this, playerId)) {
          // For passive leader zones, set everyone's zoneId, if this player is leading
          this.allPlayerIds.forEach(pid => {
            this.nextGame.players[pid]!.zoneId = newZoneId;
          })
        }
      }

      // For some reason doing .push updated visitedTiles for all players...?
      this.nextGame.players[playerId].visitedTiles = [
        ...this.nextGame.players[playerId].visitedTiles,
        newData.tileIndex,
      ];

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

    this.nextGame.availableActions[playerId] = {
      turnActions: [],
      promptActions: [],
    };
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
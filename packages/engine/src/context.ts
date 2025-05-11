import { ActionType } from '@repo/enums';
import { Locale } from '@repo/i18n';
import { GameMetadata, PlayerEffects, ZoneType } from '@repo/schemas';
import { BaseAction, PromptAction, TurnAction } from './actions/actions.types.js';
import { BoardHelper } from './boards/index.js';
import { AnimationHint, Game, Player, PlayerData, Prompt } from './gamestate/gamestate.types.js';
import { defaultGame } from './utils/defaults.js';
import { createId } from './utils/ids.js';
import { isPlayerLeading } from './utils/movability.js';

export interface Loggers {
  display: (s: string) => void;
  debug: (s: string) => void;
  error: (s: string) => void;
}

export interface ContextArgs {
  prevGame: Game | null;
  loggers?: Loggers;
  locale?: Locale;
  seeds?: number[];
}

const defaultLoggers: Loggers = {
  display: console.log,
  debug: () => {},
  error: console.error,
};

export class Context {
  readonly locale: Locale;
  readonly loggers: Loggers;
  readonly prevGame: Game | null; // Null when creating a game
  readonly boardHelper: BoardHelper;
  readonly seeds: number[];
  nextGame: Game;
  animationHints: AnimationHint[];

  constructor(args: ContextArgs) {
    const { prevGame, locale = Locale.en, loggers = defaultLoggers, seeds = [] } = args;

    this.seeds = seeds;
    this.locale = locale;
    this.loggers = loggers;
    this.prevGame = prevGame;
    this.boardHelper = new BoardHelper(prevGame?.metadata.board || null);
    this.nextGame = structuredClone(this.prevGame || defaultGame);
    this.nextGame.actionNumber += 1; // Increment actionNumber
    this.animationHints = [];

    // NOTE! When instantiating nextGame here, we should check if all fields exist. It's possible that
    // fields with null-ish values were stripped out by the DAL, aka Firebase, which does not support empty arrays or objects.
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
      .map((p) => p.id)
      .filter((id) => id !== this.currentPlayer.id);
  }

  get allPlayerIds() {
    return this.sortedPlayers.map((p) => p.id);
  }

  get sortedPlayers() {
    return Object.values(this.nextGame.players).sort((a, b) => a.order - b.order);
  }

  get allActions(): (TurnAction | PromptAction)[] {
    const actions: BaseAction[] = [];

    Object.values(this.nextGame.availableActions).forEach((actionObj) => {
      actions.push(...(actionObj.promptActions || []));
      actions.push(...(actionObj.turnActions || []));
    });

    return actions;
  }

  // Used mostly for post action handlers
  get arePromptActionsCompleted() {
    const allPromptActions = Object.values(this.nextGame.availableActions)
      .map((playerActions) => playerActions.promptActions)
      .flat();

    return allPromptActions.every((a) => typeof a.result !== 'undefined');
  }

  update_addAnimationHint(hint: AnimationHint) {
    this.animationHints.push(hint);
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
      const oldZoneId = this.prevGame?.players[playerId]?.zoneId;
      const oldZone = this.boardHelper.zonesById.get(oldZoneId ?? '');
      const newZoneId = this.boardHelper.module.board.tiles[newData.tileIndex]?.zoneId;
      const newZone = this.boardHelper.zonesById.get(newZoneId ?? '');
      const isPlayerInLeadingPos = isPlayerLeading(this, playerId);

      // If the user is entering a zone
      if (newZoneId && newZone) {
        if (newZone.type === ZoneType.active || newZone.type === ZoneType.passive) {
          // For active or passive zones, just set the current player's zoneId
          this.nextGame.players[playerId].zoneId = newZoneId;
        } else if (newZone.type === ZoneType.passiveLeader && isPlayerInLeadingPos) {
          // For passive leader zones, set everyone's zoneId, if this player is leading
          this.allPlayerIds.forEach((pid) => {
            this.nextGame.players[pid]!.zoneId = newZoneId;
          });
        }
      } else if (oldZone?.type === ZoneType.passiveLeader && isPlayerInLeadingPos) {
        // If player is leaving a passiveLeader zone and is in the leading position, clear out for all
        this.allPlayerIds.forEach((pid) => {
          this.nextGame.players[pid]!.zoneId = null;
        });
      } else {
        // User is leaving a zone- clear out the zoneId
        this.nextGame.players[playerId].zoneId = null;
      }

      // For some reason doing .push updated visitedTiles for all players...?
      this.nextGame.players[playerId].visitedTiles = [
        ...this.nextGame.players[playerId].visitedTiles,
        newData.tileIndex,
      ];

      this.update_addAnimationHint({
        type: 'playerMove',
        payload: {
          playerId,
          fromTileIndex: this.prevGame?.players[playerId]!.tileIndex,
          toTileIndex: newData.tileIndex,
        },
      });
    }
  }

  update_setPlayerEffectsPartial(playerId: string, newEffects: Partial<PlayerEffects>) {
    this.nextGame.players[playerId]!.effects = {
      ...this.nextGame.players[playerId]!.effects,
      ...newEffects,
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
    newActions.forEach((a) => {
      this.nextGame.availableActions[a.playerId]![actionCategory].push(a as any);
    });
  }

  update_setActionResult(actionId: string, result: string | number) {
    const action = this.allActions.find((a) => a.id === actionId);

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

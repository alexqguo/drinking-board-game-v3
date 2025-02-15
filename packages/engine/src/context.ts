import { defaultGame } from './utils/defaults.js';
import { BoardHelper, getBoard } from './boards.js';
import { ActionType } from './enums.js';

export interface Loggers {
  display: (s: string) => void,
  debug: (s: string) => void,
  error: (s: string) => void,
}

export interface ContextArgs {
  loggers: Loggers,
  prevGame: Game | null
}

export class Context {
  readonly loggers: Loggers;
  readonly prevGame: Game | null; // Null when creating a game
  readonly boardHelper: BoardHelper;
  nextGame: Game;
  animationHints: AnimationHint[];

  constructor(args: ContextArgs) {
    this.loggers = args.loggers;
    this.prevGame = args.prevGame;
    this.boardHelper = new BoardHelper(args.prevGame?.metadata.board ? getBoard(args.prevGame?.metadata.board!) : null);
    // TODO- this could be a proxy to track updates?
    this.nextGame = structuredClone(this.prevGame || defaultGame);
    this.animationHints = [];
  }

  // Not a great place for this
  rollDie() {
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

  get sortedPlayers() {
    return Object.values(this.nextGame.players)
      .sort((a, b) => a.order - b.order);
  }

  get allActions() {
    const actions: BaseAction[] = [];

    Object.values(this.nextGame.availableActions).forEach(actionObj => {
      actions.push(...actionObj.promptActions);
      actions.push(...actionObj.turnActions);
    });

    return actions;
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

  update_clearActions() {
    for (const [, actionObj] of Object.entries(this.nextGame.availableActions)) {
      actionObj.promptActions = [];
      actionObj.turnActions = [];
    }
  }

  update_setPlayerActions<T extends PromptAction | TurnAction = BaseAction>(
    playerId: string,
    newActions: T[],
    actionUpdateType: 'add' | 'setNew',
    actionCategory: 'promptActions' | 'turnActions',
  ) {
    if (actionUpdateType === 'add') {
      this.nextGame.availableActions[playerId]![actionCategory].push(...newActions);
    } else if (actionUpdateType === 'setNew') {
      this.nextGame.availableActions[playerId]![actionCategory] = newActions;
    }
  }

  update_setActionResult(
    playerId: string,
    actionCategory: 'promptActions' | 'turnActions',
    actionType: ActionType,
    result: unknown,
  ) {
      const actionIdx = this.nextGame.availableActions[playerId]![actionCategory]
        .findIndex(a => a.actionType === actionType);
        // ^^ important to note this finds the first. Actions are meant to be done sequentially
        // TODO- wouldn't this then only ever update the first action
      if (actionIdx >= 0) {
        this.nextGame.availableActions[playerId]![actionCategory][actionIdx]!.actionResult = result;
      }
  }

  update_setPromptActionsClosable() {
    const availableActions = this.nextGame.availableActions[this.currentPlayer.id]!;
    availableActions.promptActions = [
      { actionType: ActionType.promptClose },
      ...availableActions.promptActions,
    ];
  }
}
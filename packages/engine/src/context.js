import { defaultGame } from './utils/defaults.js';
import { BoardHelper, getBoard } from './boards.js';
import { ActionType } from './enums.js';
import { createId } from './utils/ids.js';
export class Context {
    loggers;
    prevGame; // Null when creating a game
    boardHelper;
    nextGame;
    animationHints;
    constructor(args) {
        this.loggers = args.loggers;
        this.prevGame = args.prevGame;
        this.boardHelper = new BoardHelper(args.prevGame?.metadata.board ? getBoard(args.prevGame?.metadata.board) : null);
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
        return this.nextGame.players[currentPlayerId];
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
        const actions = [];
        Object.values(this.nextGame.availableActions).forEach(actionObj => {
            actions.push(...actionObj.promptActions);
            actions.push(...actionObj.turnActions);
        });
        return actions;
    }
    // Does not include closing. Should it?
    get allPromptActions() {
        // TODO- this isn't great. needs to be updated whenever new types are added
        const promptActionTypes = new Set([
            ActionType.promptRoll,
            ActionType.promptSelectCustom,
            ActionType.promptSelectPlayer,
            ActionType.promptSelectStarter,
        ]);
        return this.allActions.filter(a => promptActionTypes.has(a.type));
    }
    // Used mostly for post action handlers
    get arePromptActionsCompleted() {
        return this.allPromptActions
            .every(a => typeof a.result !== 'undefined');
    }
    // These updaters exist to centralize logic to have one place for updating behavior
    // Could use a proxy if this gets annoying
    update_setGameMetadataPartial(newMetadata) {
        this.nextGame.metadata = {
            ...this.nextGame.metadata,
            ...newMetadata,
        };
    }
    update_setGamePlayers(newPlayers) {
        this.nextGame.players = newPlayers;
    }
    update_setPlayerDataPartial(playerId, newData) {
        this.nextGame.players[playerId] = {
            ...this.nextGame.players[playerId],
            ...newData,
        };
        if (newData.tileIndex) {
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
    update_setPlayerEffectsPartial(playerId, newEffects) {
        this.nextGame.players[playerId].effects = {
            ...this.nextGame.players[playerId].effects,
            ...newEffects
        };
    }
    update_setGamePrompt(newPrompt) {
        this.nextGame.prompt = newPrompt;
    }
    update_setGamePromptPartial(newPrompt) {
        this.nextGame.prompt = {
            ...this.nextGame.prompt,
            ...newPrompt,
        };
    }
    update_clearActions() {
        for (const [, actionObj] of Object.entries(this.nextGame.availableActions)) {
            actionObj.promptActions = [];
            actionObj.turnActions = [];
        }
    }
    update_setPlayerActions(playerId, newActions, actionUpdateType = 'add', actionCategory = 'promptActions') {
        if (actionUpdateType === 'add') {
            this.nextGame.availableActions[playerId][actionCategory].push(...newActions);
        }
        else if (actionUpdateType === 'setNew') {
            this.nextGame.availableActions[playerId][actionCategory] = newActions;
        }
    }
    update_setActionResult(actionId, result) {
        const action = this.allActions.find(a => a.id === actionId);
        if (!action) {
            const msg = `Error: actionId ${actionId} not found.`;
            this.loggers.error(msg);
            throw new Error(msg);
        }
        action.result = result;
    }
    update_setPromptActionsClosable() {
        const availableActions = this.nextGame.availableActions[this.currentPlayer.id];
        availableActions.promptActions = [
            {
                id: createId(),
                type: ActionType.promptClose,
            },
            ...availableActions.promptActions,
        ];
    }
}

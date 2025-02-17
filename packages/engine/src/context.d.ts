import { BoardHelper } from './boards.js';
export interface Loggers {
    display: (s: string) => void;
    debug: (s: string) => void;
    error: (s: string) => void;
}
export interface ContextArgs {
    loggers: Loggers;
    prevGame: Game | null;
}
export declare class Context {
    readonly loggers: Loggers;
    readonly prevGame: Game | null;
    readonly boardHelper: BoardHelper;
    nextGame: Game;
    animationHints: AnimationHint[];
    constructor(args: ContextArgs);
    rollDie(): number;
    get currentPlayer(): Player;
    get otherPlayerIds(): string[];
    get sortedPlayers(): Player[];
    get allActions(): BaseAction[];
    get allPromptActions(): BaseAction[];
    get arePromptActionsCompleted(): boolean;
    update_setGameMetadataPartial(newMetadata: Partial<GameMetadata>): void;
    update_setGamePlayers(newPlayers: PlayerData): void;
    update_setPlayerDataPartial(playerId: string, newData: Partial<Player>): void;
    update_setPlayerEffectsPartial(playerId: string, newEffects: Partial<PlayerEffects>): void;
    update_setGamePrompt(newPrompt: Prompt | null): void;
    update_setGamePromptPartial(newPrompt: Partial<Prompt>): void;
    update_clearActions(): void;
    update_setPlayerActions<T extends PromptAction | TurnAction = BaseAction>(playerId: string, newActions: T[], actionUpdateType?: 'add' | 'setNew', actionCategory?: 'promptActions' | 'turnActions'): void;
    update_setActionResult(actionId: string, result: unknown): void;
    update_setPromptActionsClosable(): void;
}
//# sourceMappingURL=context.d.ts.map
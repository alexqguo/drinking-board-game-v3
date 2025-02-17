export declare enum BoardName {
    PokemonGen1 = "pokemon-gen1"
}
/**
 * The types of actions that can go into the engine
 */
export declare enum ActionType {
    gameCreate = "gameCreate",
    gameStart = "gameStart",
    turnRoll = "turnRoll",
    turnRollSkip = "turnRollSkip",
    turnRollAugment = "turnRollAugment",
    promptClose = "promptClose",
    promptRoll = "promptRoll",
    promptSelectPlayer = "promptSelectPlayer",
    promptSelectStarter = "promptSelectStarter",
    promptSelectCustom = "promptSelectCustom"
}
export declare enum GameState {
    NotStarted = "NotStarted",
    GameStart = "GameStart",
    StarterSelect = "StarterSelect",
    TurnCheck = "TurnCheck",
    ZoneCheck = "ZoneCheck",
    TurnStart = "TurnStart",
    TurnMultirollConditionCheck = "TurnMultirollConditionCheck",
    RollStart = "RollStart",
    RollEnd = "RollEnd",
    MoveCalculate = "MoveCalculate",
    MoveStart = "MoveStart",
    MoveEnd = "MoveEnd",
    RuleTrigger = "RuleTrigger",
    RuleEnd = "RuleEnd",
    TurnEnd = "TurnEnd",
    GameOver = "GameOver",
    TurnSkip = "TurnSkip",
    LostTurnStart = "LostTurnStart",
    Battle = "Battle"
}
export declare enum TurnOrder {
    normal = 1,
    reverse = -1
}
export declare enum ModifierOperation {
    addition = "+",
    multiplication = "*",
    subtraction = "-",
    equal = "="
}
export declare enum PlayerTarget {
    custom = "custom",
    self = "self",
    allOthers = "allOthers"
}
export declare enum ZoneType {
    passive = "passive",
    active = "active"
}
export declare enum Direction {
    forward = "forward",
    back = "back"
}
export declare enum DiceRollType {
    cumulative = "cumulative",
    default = "default",
    allMatch = "allMatch"
}
//# sourceMappingURL=enums.d.ts.map
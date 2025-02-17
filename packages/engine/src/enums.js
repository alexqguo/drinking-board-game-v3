// v3 stuff
export var BoardName;
(function (BoardName) {
    BoardName["PokemonGen1"] = "pokemon-gen1";
})(BoardName || (BoardName = {}));
/**
 * The types of actions that can go into the engine
 */
export var ActionType;
(function (ActionType) {
    ActionType["gameCreate"] = "gameCreate";
    ActionType["gameStart"] = "gameStart";
    ActionType["turnRoll"] = "turnRoll";
    ActionType["turnRollSkip"] = "turnRollSkip";
    ActionType["turnRollAugment"] = "turnRollAugment";
    ActionType["promptClose"] = "promptClose";
    ActionType["promptRoll"] = "promptRoll";
    ActionType["promptSelectPlayer"] = "promptSelectPlayer";
    ActionType["promptSelectStarter"] = "promptSelectStarter";
    ActionType["promptSelectCustom"] = "promptSelectCustom";
})(ActionType || (ActionType = {}));
export var GameState;
(function (GameState) {
    GameState["NotStarted"] = "NotStarted";
    GameState["GameStart"] = "GameStart";
    GameState["StarterSelect"] = "StarterSelect";
    GameState["TurnCheck"] = "TurnCheck";
    GameState["ZoneCheck"] = "ZoneCheck";
    GameState["TurnStart"] = "TurnStart";
    GameState["TurnMultirollConditionCheck"] = "TurnMultirollConditionCheck";
    GameState["RollStart"] = "RollStart";
    GameState["RollEnd"] = "RollEnd";
    GameState["MoveCalculate"] = "MoveCalculate";
    GameState["MoveStart"] = "MoveStart";
    GameState["MoveEnd"] = "MoveEnd";
    GameState["RuleTrigger"] = "RuleTrigger";
    GameState["RuleEnd"] = "RuleEnd";
    GameState["TurnEnd"] = "TurnEnd";
    GameState["GameOver"] = "GameOver";
    GameState["TurnSkip"] = "TurnSkip";
    GameState["LostTurnStart"] = "LostTurnStart";
    GameState["Battle"] = "Battle";
})(GameState || (GameState = {}));
export var TurnOrder;
(function (TurnOrder) {
    TurnOrder[TurnOrder["normal"] = 1] = "normal";
    TurnOrder[TurnOrder["reverse"] = -1] = "reverse";
})(TurnOrder || (TurnOrder = {}));
////////////////////////////////////////////////////////////////
// Shared between both schemas and engine code
////////////////////////////////////////////////////////////////
export var ModifierOperation;
(function (ModifierOperation) {
    ModifierOperation["addition"] = "+";
    ModifierOperation["multiplication"] = "*";
    ModifierOperation["subtraction"] = "-";
    ModifierOperation["equal"] = "=";
})(ModifierOperation || (ModifierOperation = {}));
export var PlayerTarget;
(function (PlayerTarget) {
    PlayerTarget["custom"] = "custom";
    PlayerTarget["self"] = "self";
    PlayerTarget["allOthers"] = "allOthers";
})(PlayerTarget || (PlayerTarget = {}));
export var ZoneType;
(function (ZoneType) {
    ZoneType["passive"] = "passive";
    ZoneType["active"] = "active";
})(ZoneType || (ZoneType = {}));
export var Direction;
(function (Direction) {
    Direction["forward"] = "forward";
    Direction["back"] = "back";
})(Direction || (Direction = {}));
export var DiceRollType;
(function (DiceRollType) {
    DiceRollType["cumulative"] = "cumulative";
    DiceRollType["default"] = "default";
    DiceRollType["allMatch"] = "allMatch";
})(DiceRollType || (DiceRollType = {}));

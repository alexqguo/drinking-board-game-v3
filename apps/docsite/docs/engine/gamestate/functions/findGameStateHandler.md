[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [gamestate](../README.md) / findGameStateHandler

# Function: findGameStateHandler()

> **findGameStateHandler**(`ctx`, `state`): [`GameStateHandler`](../interfaces/GameStateHandler.md)

Defined in: [packages/engine/src/gamestate/index.ts:65](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/index.ts#L65)

## Parameters

### ctx

[`Context`](../../context/classes/Context.md)

### state

`"NotStarted"` | `"GameStart"` | `"StarterSelect"` | `"TurnCheck"` | `"ZoneCheck"` | `"TurnStart"` | `"TurnMultirollConditionCheck"` | `"RollStart"` | `"RollEnd"` | `"MoveCalculate"` | `"MoveStart"` | `"MoveEnd"` | `"RuleTrigger"` | `"RuleEnd"` | `"TurnEnd"` | `"GameOver"` | `"TurnSkip"` | `"LostTurnStart"` | `"Battle"`

## Returns

[`GameStateHandler`](../interfaces/GameStateHandler.md)

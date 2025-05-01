[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [gamestate](../README.md) / GameStateHandler

# Interface: GameStateHandler\<THandlerArgs\>

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:9](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L9)

## Type Parameters

• **THandlerArgs** = `void`

## Properties

### execute()

> **execute**: (`args`) => `void`

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:10](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L10)

#### Parameters

##### args

`THandlerArgs`

#### Returns

`void`

***

### gameState

> **gameState**: `"NotStarted"` \| `"GameStart"` \| `"StarterSelect"` \| `"TurnCheck"` \| `"ZoneCheck"` \| `"TurnStart"` \| `"TurnMultirollConditionCheck"` \| `"RollStart"` \| `"RollEnd"` \| `"MoveCalculate"` \| `"MoveStart"` \| `"MoveEnd"` \| `"RuleTrigger"` \| `"RuleEnd"` \| `"TurnEnd"` \| `"GameOver"` \| `"TurnSkip"` \| `"LostTurnStart"` \| `"Battle"`

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:11](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L11)

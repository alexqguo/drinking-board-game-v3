[**@repo/engine**](../../README.md)

---

[@repo/engine](../../modules.md) / [gamestate](../README.md) / GameMetadata

# Interface: GameMetadata

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:73](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L73)

## Properties

### board

> **board**: `string`

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:76](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L76)

---

### currentPlayerId

> **currentPlayerId**: `string`

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:78](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L78)

---

### id

> **id**: `string`

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:74](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L74)

---

### state

> **state**: `"NotStarted"` \| `"GameStart"` \| `"StarterSelect"` \| `"TurnCheck"` \| `"ZoneCheck"` \| `"TurnStart"` \| `"TurnMultirollConditionCheck"` \| `"RollStart"` \| `"RollEnd"` \| `"MoveCalculate"` \| `"MoveStart"` \| `"MoveEnd"` \| `"RuleTrigger"` \| `"RuleEnd"` \| `"TurnEnd"` \| `"GameOver"` \| `"TurnSkip"` \| `"LostTurnStart"` \| `"Battle"`

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:77](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L77)

---

### turnOrder

> **turnOrder**: [`TurnOrder`](../enumerations/TurnOrder.md)

Defined in: [packages/engine/src/gamestate/gamestate.types.ts:79](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/gamestate/gamestate.types.ts#L79)

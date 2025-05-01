[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [boards](../README.md) / BoardHelper

# Class: BoardHelper

Defined in: [packages/engine/src/boards/index.ts:23](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/boards/index.ts#L23)

## Constructors

### new BoardHelper()

> **new BoardHelper**(`boardModule`): [`BoardHelper`](BoardHelper.md)

Defined in: [packages/engine/src/boards/index.ts:29](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/boards/index.ts#L29)

#### Parameters

##### boardModule

`null` | \{ `board`: \{ `i18n`: `Record`\<`string`, `Record`\<`string`, `string`\>\>; `imageUrl`: `string`; `items`: `object`[]; `tiles`: `object`[]; `zones`: `object`[]; \}; `gameExtensionInfo`: \{ `actions`: `Record`\<`string`, `any`\>; `gameState`: `Record`\<`string`, `any`\>; \}; \}

#### Returns

[`BoardHelper`](BoardHelper.md)

## Properties

### itemsById

> `readonly` **itemsById**: `Map`\<`string`, \{ `descriptionStrId`: `string`; `id`: `string`; `nameStrId`: `string`; \}\>

Defined in: [packages/engine/src/boards/index.ts:24](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/boards/index.ts#L24)

***

### module

> `readonly` **module**: `object`

Defined in: [packages/engine/src/boards/index.ts:27](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/boards/index.ts#L27)

#### board

> **board**: `object`

##### board.i18n

> **i18n**: `Record`\<`string`, `Record`\<`string`, `string`\>\>

##### board.imageUrl

> **imageUrl**: `string`

##### board.items

> **items**: `object`[]

##### board.tiles

> **tiles**: `object`[]

##### board.zones

> **zones**: `object`[]

#### gameExtensionInfo?

> `optional` **gameExtensionInfo**: `object`

##### gameExtensionInfo.actions?

> `optional` **actions**: `Record`\<`string`, `any`\>

##### gameExtensionInfo.gameState?

> `optional` **gameState**: `Record`\<`string`, `any`\>

***

### rulesById

> `readonly` **rulesById**: `Map`\<`string`, \{ `grants`: \[`PlayerTarget`, \{ `effects`: \{ `anchors`: \[... \| ... \| ... \| ..., `number`\]; `customMandatoryTileIndex`: \[... \| ... \| ... \| ..., `number`\]; `extraTurns`: \[... \| ... \| ... \| ..., `number`\]; `immediateTurns`: \[... \| ... \| ... \| ..., `number`\]; `itemIds`: \[`"+"`, `string`\] \| \[`"="`, ...[]\]; `mandatorySkips`: \[... \| ... \| ... \| ..., `number`\]; `rollAugmentation`: \[... \| ... \| ... \| ..., `number`\]; `skippedTurns`: \[... \| ... \| ... \| ..., `number`\]; `speedModifier`: \{ `modifier`: \[..., ...\]; `numTurns`: `number`; \}; \}; `metadata`: \{ `turnOrder`: \[... \| ... \| ... \| ..., `number`\]; \}; \}\][]; `id`: `string`; `type`: `"DisplayRule"` \| `"MoveRule"` \| `"RollUntilRule"` \| `"DiceRollRule"` \| `"GameOverRule"` \| `"DrinkDuringLostTurnsRule"` \| `"ApplyMoveConditionRule"` \| `"ChoiceRule"` \| `"ChallengeRule"` \| `"GroupActionRule"` \| `"ProxyRule"` \| `"ItemBasedRule"`; \}\>

Defined in: [packages/engine/src/boards/index.ts:25](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/boards/index.ts#L25)

***

### zonesById

> `readonly` **zonesById**: `Map`\<`string`, \{ `id`: `string`; `name`: `string`; `rule`: \{ `grants`: \[`PlayerTarget`, \{ `effects`: \{ `anchors`: \[..., ...\]; `customMandatoryTileIndex`: \[..., ...\]; `extraTurns`: \[..., ...\]; `immediateTurns`: \[..., ...\]; `itemIds`: \[..., ...\] \| \[..., ...\]; `mandatorySkips`: \[..., ...\]; `rollAugmentation`: \[..., ...\]; `skippedTurns`: \[..., ...\]; `speedModifier`: \{ `modifier`: ...; `numTurns`: ...; \}; \}; `metadata`: \{ `turnOrder`: \[..., ...\]; \}; \}\][]; `id`: `string`; `type`: `"DisplayRule"` \| `"MoveRule"` \| `"RollUntilRule"` \| `"DiceRollRule"` \| `"GameOverRule"` \| `"DrinkDuringLostTurnsRule"` \| `"ApplyMoveConditionRule"` \| `"ChoiceRule"` \| `"ChallengeRule"` \| `"GroupActionRule"` \| `"ProxyRule"` \| `"ItemBasedRule"`; \}; `type`: `"passive"` \| `"active"` \| `"passiveLeader"`; \}\>

Defined in: [packages/engine/src/boards/index.ts:26](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/boards/index.ts#L26)

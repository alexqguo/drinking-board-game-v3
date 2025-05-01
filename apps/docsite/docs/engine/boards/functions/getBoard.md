[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [boards](../README.md) / getBoard

# Function: getBoard()

> **getBoard**(`name`): `object`

Defined in: [packages/engine/src/boards/index.ts:8](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/boards/index.ts#L8)

## Parameters

### name

`string`

## Returns

`object`

### board

> **board**: `object`

#### board.i18n

> **i18n**: `Record`\<`string`, `Record`\<`string`, `string`\>\>

#### board.imageUrl

> **imageUrl**: `string`

#### board.items

> **items**: `object`[]

#### board.tiles

> **tiles**: `object`[]

#### board.zones

> **zones**: `object`[]

### gameExtensionInfo?

> `optional` **gameExtensionInfo**: `object`

#### gameExtensionInfo.actions?

> `optional` **actions**: `Record`\<`string`, `any`\>

#### gameExtensionInfo.gameState?

> `optional` **gameState**: `Record`\<`string`, `any`\>

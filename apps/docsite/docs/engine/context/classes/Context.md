[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [context](../README.md) / Context

# Class: Context

Defined in: [packages/engine/src/context.ts:38](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L38)

## Constructors

### new Context()

> **new Context**(`args`): [`Context`](Context.md)

Defined in: [packages/engine/src/context.ts:47](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L47)

#### Parameters

##### args

[`ContextArgs`](../interfaces/ContextArgs.md)

#### Returns

[`Context`](Context.md)

## Properties

### animationHints

> **animationHints**: [`AnimationHint`](../../gamestate/interfaces/AnimationHint.md)[]

Defined in: [packages/engine/src/context.ts:45](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L45)

***

### boardHelper

> `readonly` **boardHelper**: [`BoardHelper`](../../boards/classes/BoardHelper.md)

Defined in: [packages/engine/src/context.ts:42](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L42)

***

### locale

> `readonly` **locale**: `Locale`

Defined in: [packages/engine/src/context.ts:39](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L39)

***

### loggers

> `readonly` **loggers**: [`Loggers`](../interfaces/Loggers.md)

Defined in: [packages/engine/src/context.ts:40](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L40)

***

### nextGame

> **nextGame**: [`Game`](../../gamestate/type-aliases/Game.md)

Defined in: [packages/engine/src/context.ts:44](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L44)

***

### prevGame

> `readonly` **prevGame**: `null` \| [`Game`](../../gamestate/type-aliases/Game.md)

Defined in: [packages/engine/src/context.ts:41](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L41)

***

### seeds

> `readonly` **seeds**: `number`[]

Defined in: [packages/engine/src/context.ts:43](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L43)

## Accessors

### allActions

#### Get Signature

> **get** **allActions**(): ([`PromptAction`](../../actions/interfaces/PromptAction.md) \| [`TurnAction`](../../actions/interfaces/TurnAction.md))[]

Defined in: [packages/engine/src/context.ts:96](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L96)

##### Returns

([`PromptAction`](../../actions/interfaces/PromptAction.md) \| [`TurnAction`](../../actions/interfaces/TurnAction.md))[]

***

### allPlayerIds

#### Get Signature

> **get** **allPlayerIds**(): `string`[]

Defined in: [packages/engine/src/context.ts:88](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L88)

##### Returns

`string`[]

***

### arePromptActionsCompleted

#### Get Signature

> **get** **arePromptActionsCompleted**(): `boolean`

Defined in: [packages/engine/src/context.ts:108](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L108)

##### Returns

`boolean`

***

### currentPlayer

#### Get Signature

> **get** **currentPlayer**(): [`Player`](../../gamestate/interfaces/Player.md)

Defined in: [packages/engine/src/context.ts:77](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L77)

##### Returns

[`Player`](../../gamestate/interfaces/Player.md)

***

### otherPlayerIds

#### Get Signature

> **get** **otherPlayerIds**(): `string`[]

Defined in: [packages/engine/src/context.ts:82](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L82)

##### Returns

`string`[]

***

### sortedPlayers

#### Get Signature

> **get** **sortedPlayers**(): [`Player`](../../gamestate/interfaces/Player.md)[]

Defined in: [packages/engine/src/context.ts:92](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L92)

##### Returns

[`Player`](../../gamestate/interfaces/Player.md)[]

## Methods

### rollDie()

> **rollDie**(): `number`

Defined in: [packages/engine/src/context.ts:67](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L67)

#### Returns

`number`

***

### update\_clearActions()

> **update\_clearActions**(`playerId`?): `void`

Defined in: [packages/engine/src/context.ts:187](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L187)

#### Parameters

##### playerId?

`string`

#### Returns

`void`

***

### update\_setActionResult()

> **update\_setActionResult**(`actionId`, `result`): `void`

Defined in: [packages/engine/src/context.ts:212](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L212)

#### Parameters

##### actionId

`string`

##### result

`string` | `number`

#### Returns

`void`

***

### update\_setGameMetadataPartial()

> **update\_setGameMetadataPartial**(`newMetadata`): `void`

Defined in: [packages/engine/src/context.ts:118](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L118)

#### Parameters

##### newMetadata

`Partial`\<[`GameMetadata`](../../gamestate/interfaces/GameMetadata.md)\>

#### Returns

`void`

***

### update\_setGamePlayers()

> **update\_setGamePlayers**(`newPlayers`): `void`

Defined in: [packages/engine/src/context.ts:125](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L125)

#### Parameters

##### newPlayers

[`PlayerData`](../../gamestate/interfaces/PlayerData.md)

#### Returns

`void`

***

### update\_setGamePrompt()

> **update\_setGamePrompt**(`newPrompt`): `void`

Defined in: [packages/engine/src/context.ts:176](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L176)

#### Parameters

##### newPrompt

`null` | [`Prompt`](../../gamestate/type-aliases/Prompt.md)

#### Returns

`void`

***

### update\_setGamePromptPartial()

> **update\_setGamePromptPartial**(`newPrompt`): `void`

Defined in: [packages/engine/src/context.ts:180](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L180)

#### Parameters

##### newPrompt

`Partial`\<[`Prompt`](../../gamestate/type-aliases/Prompt.md)\>

#### Returns

`void`

***

### update\_setPlayerActions()

> **update\_setPlayerActions**\<`T`\>(`newActions`, `actionCategory`): `void`

Defined in: [packages/engine/src/context.ts:203](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L203)

#### Type Parameters

• **T** *extends* [`BaseAction`](../../actions/interfaces/BaseAction.md) = [`PromptAction`](../../actions/interfaces/PromptAction.md)

#### Parameters

##### newActions

`T`[]

##### actionCategory

`"promptActions"` | `"turnActions"`

#### Returns

`void`

***

### update\_setPlayerDataPartial()

> **update\_setPlayerDataPartial**(`playerId`, `newData`): `void`

Defined in: [packages/engine/src/context.ts:129](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L129)

#### Parameters

##### playerId

`string`

##### newData

`Partial`\<[`Player`](../../gamestate/interfaces/Player.md)\>

#### Returns

`void`

***

### update\_setPlayerEffectsPartial()

> **update\_setPlayerEffectsPartial**(`playerId`, `newEffects`): `void`

Defined in: [packages/engine/src/context.ts:169](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L169)

#### Parameters

##### playerId

`string`

##### newEffects

`Partial`\<[`PlayerEffects`](../../gamestate/interfaces/PlayerEffects.md)\>

#### Returns

`void`

***

### update\_setPromptActionsClosable()

> **update\_setPromptActionsClosable**(): `void`

Defined in: [packages/engine/src/context.ts:224](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/context.ts#L224)

#### Returns

`void`

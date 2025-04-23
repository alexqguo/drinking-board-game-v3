[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [context](../README.md) / Context

# Class: Context

Defined in: [context.ts:30](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L30)

## Constructors

### new Context()

> **new Context**(`args`): [`Context`](Context.md)

Defined in: [context.ts:39](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L39)

#### Parameters

##### args

[`ContextArgs`](../interfaces/ContextArgs.md)

#### Returns

[`Context`](Context.md)

## Properties

### animationHints

> **animationHints**: [`AnimationHint`](../../gamestate/type-aliases/AnimationHint.md)[]

Defined in: [context.ts:37](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L37)

***

### boardHelper

> `readonly` **boardHelper**: [`BoardHelper`](../../boards/classes/BoardHelper.md)

Defined in: [context.ts:34](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L34)

***

### locale

> `readonly` **locale**: `Locale`

Defined in: [context.ts:31](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L31)

***

### loggers

> `readonly` **loggers**: [`Loggers`](../interfaces/Loggers.md)

Defined in: [context.ts:32](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L32)

***

### nextGame

> **nextGame**: [`Game`](../../gamestate/type-aliases/Game.md)

Defined in: [context.ts:36](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L36)

***

### prevGame

> `readonly` **prevGame**: `null` \| [`Game`](../../gamestate/type-aliases/Game.md)

Defined in: [context.ts:33](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L33)

***

### seeds

> `readonly` **seeds**: `number`[]

Defined in: [context.ts:35](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L35)

## Accessors

### allActions

#### Get Signature

> **get** **allActions**(): ([`PromptAction`](../../actions/interfaces/PromptAction.md) \| [`TurnAction`](../../actions/interfaces/TurnAction.md))[]

Defined in: [context.ts:91](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L91)

##### Returns

([`PromptAction`](../../actions/interfaces/PromptAction.md) \| [`TurnAction`](../../actions/interfaces/TurnAction.md))[]

***

### allPlayerIds

#### Get Signature

> **get** **allPlayerIds**(): `string`[]

Defined in: [context.ts:82](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L82)

##### Returns

`string`[]

***

### arePromptActionsCompleted

#### Get Signature

> **get** **arePromptActionsCompleted**(): `boolean`

Defined in: [context.ts:103](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L103)

##### Returns

`boolean`

***

### currentPlayer

#### Get Signature

> **get** **currentPlayer**(): [`Player`](../../gamestate/interfaces/Player.md)

Defined in: [context.ts:71](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L71)

##### Returns

[`Player`](../../gamestate/interfaces/Player.md)

***

### otherPlayerIds

#### Get Signature

> **get** **otherPlayerIds**(): `string`[]

Defined in: [context.ts:76](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L76)

##### Returns

`string`[]

***

### sortedPlayers

#### Get Signature

> **get** **sortedPlayers**(): [`Player`](../../gamestate/interfaces/Player.md)[]

Defined in: [context.ts:86](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L86)

##### Returns

[`Player`](../../gamestate/interfaces/Player.md)[]

## Methods

### rollDie()

> **rollDie**(): `number`

Defined in: [context.ts:61](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L61)

#### Returns

`number`

***

### update\_clearActions()

> **update\_clearActions**(`playerId`?): `void`

Defined in: [context.ts:179](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L179)

#### Parameters

##### playerId?

`string`

#### Returns

`void`

***

### update\_setActionResult()

> **update\_setActionResult**(`actionId`, `result`): `void`

Defined in: [context.ts:205](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L205)

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

Defined in: [context.ts:114](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L114)

#### Parameters

##### newMetadata

`Partial`\<[`GameMetadata`](../../gamestate/interfaces/GameMetadata.md)\>

#### Returns

`void`

***

### update\_setGamePlayers()

> **update\_setGamePlayers**(`newPlayers`): `void`

Defined in: [context.ts:121](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L121)

#### Parameters

##### newPlayers

[`PlayerData`](../../gamestate/interfaces/PlayerData.md)

#### Returns

`void`

***

### update\_setGamePrompt()

> **update\_setGamePrompt**(`newPrompt`): `void`

Defined in: [context.ts:168](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L168)

#### Parameters

##### newPrompt

`null` | [`Prompt`](../../gamestate/type-aliases/Prompt.md)

#### Returns

`void`

***

### update\_setGamePromptPartial()

> **update\_setGamePromptPartial**(`newPrompt`): `void`

Defined in: [context.ts:172](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L172)

#### Parameters

##### newPrompt

`Partial`\<[`Prompt`](../../gamestate/type-aliases/Prompt.md)\>

#### Returns

`void`

***

### update\_setPlayerActions()

> **update\_setPlayerActions**\<`T`\>(`newActions`, `actionCategory`): `void`

Defined in: [context.ts:195](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L195)

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

Defined in: [context.ts:125](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L125)

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

Defined in: [context.ts:161](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L161)

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

Defined in: [context.ts:220](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/context.ts#L220)

#### Returns

`void`

[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [context](../README.md) / Context

# Class: Context

Defined in: [context.ts:30](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L30)

## Constructors

### new Context()

> **new Context**(`args`): [`Context`](Context.md)

Defined in: [context.ts:39](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L39)

#### Parameters

##### args

[`ContextArgs`](../interfaces/ContextArgs.md)

#### Returns

[`Context`](Context.md)

## Properties

### animationHints

> **animationHints**: [`AnimationHint`](../../gamestate/interfaces/AnimationHint.md)[]

Defined in: [context.ts:37](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L37)

***

### boardHelper

> `readonly` **boardHelper**: [`BoardHelper`](../../boards/classes/BoardHelper.md)

Defined in: [context.ts:34](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L34)

***

### locale

> `readonly` **locale**: `Locale`

Defined in: [context.ts:31](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L31)

***

### loggers

> `readonly` **loggers**: [`Loggers`](../interfaces/Loggers.md)

Defined in: [context.ts:32](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L32)

***

### nextGame

> **nextGame**: [`Game`](../../gamestate/type-aliases/Game.md)

Defined in: [context.ts:36](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L36)

***

### prevGame

> `readonly` **prevGame**: `null` \| [`Game`](../../gamestate/type-aliases/Game.md)

Defined in: [context.ts:33](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L33)

***

### seeds

> `readonly` **seeds**: `number`[]

Defined in: [context.ts:35](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L35)

## Accessors

### allActions

#### Get Signature

> **get** **allActions**(): ([`TurnAction`](../../actions/interfaces/TurnAction.md) \| [`PromptAction`](../../actions/interfaces/PromptAction.md))[]

Defined in: [context.ts:88](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L88)

##### Returns

([`TurnAction`](../../actions/interfaces/TurnAction.md) \| [`PromptAction`](../../actions/interfaces/PromptAction.md))[]

***

### allPlayerIds

#### Get Signature

> **get** **allPlayerIds**(): `string`[]

Defined in: [context.ts:80](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L80)

##### Returns

`string`[]

***

### arePromptActionsCompleted

#### Get Signature

> **get** **arePromptActionsCompleted**(): `boolean`

Defined in: [context.ts:100](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L100)

##### Returns

`boolean`

***

### currentPlayer

#### Get Signature

> **get** **currentPlayer**(): [`Player`](../../gamestate/interfaces/Player.md)

Defined in: [context.ts:69](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L69)

##### Returns

[`Player`](../../gamestate/interfaces/Player.md)

***

### otherPlayerIds

#### Get Signature

> **get** **otherPlayerIds**(): `string`[]

Defined in: [context.ts:74](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L74)

##### Returns

`string`[]

***

### sortedPlayers

#### Get Signature

> **get** **sortedPlayers**(): [`Player`](../../gamestate/interfaces/Player.md)[]

Defined in: [context.ts:84](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L84)

##### Returns

[`Player`](../../gamestate/interfaces/Player.md)[]

## Methods

### rollDie()

> **rollDie**(): `number`

Defined in: [context.ts:59](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L59)

#### Returns

`number`

***

### update\_clearActions()

> **update\_clearActions**(`playerId`?): `void`

Defined in: [context.ts:179](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L179)

#### Parameters

##### playerId?

`string`

#### Returns

`void`

***

### update\_setActionResult()

> **update\_setActionResult**(`actionId`, `result`): `void`

Defined in: [context.ts:204](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L204)

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

Defined in: [context.ts:110](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L110)

#### Parameters

##### newMetadata

`Partial`\<`GameMetadata`\>

#### Returns

`void`

***

### update\_setGamePlayers()

> **update\_setGamePlayers**(`newPlayers`): `void`

Defined in: [context.ts:117](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L117)

#### Parameters

##### newPlayers

[`PlayerData`](../../gamestate/interfaces/PlayerData.md)

#### Returns

`void`

***

### update\_setGamePrompt()

> **update\_setGamePrompt**(`newPrompt`): `void`

Defined in: [context.ts:168](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L168)

#### Parameters

##### newPrompt

`null` | [`Prompt`](../../gamestate/type-aliases/Prompt.md)

#### Returns

`void`

***

### update\_setGamePromptPartial()

> **update\_setGamePromptPartial**(`newPrompt`): `void`

Defined in: [context.ts:172](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L172)

#### Parameters

##### newPrompt

`Partial`\<[`Prompt`](../../gamestate/type-aliases/Prompt.md)\>

#### Returns

`void`

***

### update\_setPlayerActions()

> **update\_setPlayerActions**\<`T`\>(`newActions`, `actionCategory`): `void`

Defined in: [context.ts:195](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L195)

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

Defined in: [context.ts:121](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L121)

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

Defined in: [context.ts:161](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L161)

#### Parameters

##### playerId

`string`

##### newEffects

`Partial`\<`PlayerEffects`\>

#### Returns

`void`

***

### update\_setPromptActionsClosable()

> **update\_setPromptActionsClosable**(): `void`

Defined in: [context.ts:216](https://github.com/alexqguo/drinking-board-game-v3/blob/8be889bb524f73726fb953525e85e1fb94e42ee9/packages/engine/src/context.ts#L216)

#### Returns

`void`

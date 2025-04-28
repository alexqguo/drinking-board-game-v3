[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [context](../README.md) / Context

# Class: Context

Defined in: [context.ts:38](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L38)

## Constructors

### new Context()

> **new Context**(`args`): [`Context`](Context.md)

Defined in: [context.ts:47](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L47)

#### Parameters

##### args

[`ContextArgs`](../interfaces/ContextArgs.md)

#### Returns

[`Context`](Context.md)

## Properties

### animationHints

> **animationHints**: [`AnimationHint`](../../gamestate/interfaces/AnimationHint.md)[]

Defined in: [context.ts:45](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L45)

***

### boardHelper

> `readonly` **boardHelper**: [`BoardHelper`](../../boards/classes/BoardHelper.md)

Defined in: [context.ts:42](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L42)

***

### locale

> `readonly` **locale**: `Locale`

Defined in: [context.ts:39](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L39)

***

### loggers

> `readonly` **loggers**: [`Loggers`](../interfaces/Loggers.md)

Defined in: [context.ts:40](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L40)

***

### nextGame

> **nextGame**: [`Game`](../../gamestate/type-aliases/Game.md)

Defined in: [context.ts:44](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L44)

***

### prevGame

> `readonly` **prevGame**: `null` \| [`Game`](../../gamestate/type-aliases/Game.md)

Defined in: [context.ts:41](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L41)

***

### seeds

> `readonly` **seeds**: `number`[]

Defined in: [context.ts:43](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L43)

## Accessors

### allActions

#### Get Signature

> **get** **allActions**(): ([`PromptAction`](../../actions/interfaces/PromptAction.md) \| [`TurnAction`](../../actions/interfaces/TurnAction.md))[]

Defined in: [context.ts:95](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L95)

##### Returns

([`PromptAction`](../../actions/interfaces/PromptAction.md) \| [`TurnAction`](../../actions/interfaces/TurnAction.md))[]

***

### allPlayerIds

#### Get Signature

> **get** **allPlayerIds**(): `string`[]

Defined in: [context.ts:87](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L87)

##### Returns

`string`[]

***

### arePromptActionsCompleted

#### Get Signature

> **get** **arePromptActionsCompleted**(): `boolean`

Defined in: [context.ts:107](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L107)

##### Returns

`boolean`

***

### currentPlayer

#### Get Signature

> **get** **currentPlayer**(): [`Player`](../../gamestate/interfaces/Player.md)

Defined in: [context.ts:76](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L76)

##### Returns

[`Player`](../../gamestate/interfaces/Player.md)

***

### otherPlayerIds

#### Get Signature

> **get** **otherPlayerIds**(): `string`[]

Defined in: [context.ts:81](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L81)

##### Returns

`string`[]

***

### sortedPlayers

#### Get Signature

> **get** **sortedPlayers**(): [`Player`](../../gamestate/interfaces/Player.md)[]

Defined in: [context.ts:91](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L91)

##### Returns

[`Player`](../../gamestate/interfaces/Player.md)[]

## Methods

### rollDie()

> **rollDie**(): `number`

Defined in: [context.ts:66](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L66)

#### Returns

`number`

***

### update\_clearActions()

> **update\_clearActions**(`playerId`?): `void`

Defined in: [context.ts:186](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L186)

#### Parameters

##### playerId?

`string`

#### Returns

`void`

***

### update\_setActionResult()

> **update\_setActionResult**(`actionId`, `result`): `void`

Defined in: [context.ts:211](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L211)

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

Defined in: [context.ts:117](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L117)

#### Parameters

##### newMetadata

`Partial`\<[`GameMetadata`](../../gamestate/interfaces/GameMetadata.md)\>

#### Returns

`void`

***

### update\_setGamePlayers()

> **update\_setGamePlayers**(`newPlayers`): `void`

Defined in: [context.ts:124](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L124)

#### Parameters

##### newPlayers

[`PlayerData`](../../gamestate/interfaces/PlayerData.md)

#### Returns

`void`

***

### update\_setGamePrompt()

> **update\_setGamePrompt**(`newPrompt`): `void`

Defined in: [context.ts:175](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L175)

#### Parameters

##### newPrompt

`null` | [`Prompt`](../../gamestate/type-aliases/Prompt.md)

#### Returns

`void`

***

### update\_setGamePromptPartial()

> **update\_setGamePromptPartial**(`newPrompt`): `void`

Defined in: [context.ts:179](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L179)

#### Parameters

##### newPrompt

`Partial`\<[`Prompt`](../../gamestate/type-aliases/Prompt.md)\>

#### Returns

`void`

***

### update\_setPlayerActions()

> **update\_setPlayerActions**\<`T`\>(`newActions`, `actionCategory`): `void`

Defined in: [context.ts:202](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L202)

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

Defined in: [context.ts:128](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L128)

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

Defined in: [context.ts:168](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L168)

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

Defined in: [context.ts:223](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/context.ts#L223)

#### Returns

`void`

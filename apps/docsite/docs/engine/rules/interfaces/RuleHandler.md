[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [rules](../README.md) / RuleHandler

# Interface: RuleHandler\<T\>

Defined in: [rules/rules.types.ts:6](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/rules/rules.types.ts#L6)

## Type Parameters

• **T** *extends* [`RuleSchema`](../type-aliases/RuleSchema.md)

## Properties

### execute()

> **execute**: (`nextGameState`?) => `void`

Defined in: [rules/rules.types.ts:10](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/rules/rules.types.ts#L10)

#### Parameters

##### nextGameState?

[`GameState`](../../gamestate/enumerations/GameState.md)

#### Returns

`void`

***

### postActionExecute()?

> `optional` **postActionExecute**: (`lastAction`?) => `void`

Defined in: [rules/rules.types.ts:11](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/rules/rules.types.ts#L11)

#### Parameters

##### lastAction?

[`PromptAction`](../../actions/interfaces/PromptAction.md)

#### Returns

`void`

***

### rule

> **rule**: `T`

Defined in: [rules/rules.types.ts:7](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/rules/rules.types.ts#L7)

***

### ruleType

> **ruleType**: `string`

Defined in: [rules/rules.types.ts:8](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/rules/rules.types.ts#L8)

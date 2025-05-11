[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [rules](../README.md) / RuleHandler

# Interface: RuleHandler\<T\>

Defined in: [rules/rules.types.ts:5](https://github.com/alexqguo/drinking-board-game-v3/blob/8a71edc417ebda66bb565d91aba07ca306b3e490/packages/engine/src/rules/rules.types.ts#L5)

## Type Parameters

• **T** *extends* `BaseRule`

## Properties

### execute()

> **execute**: (`nextGameState`?) => `void`

Defined in: [rules/rules.types.ts:9](https://github.com/alexqguo/drinking-board-game-v3/blob/8a71edc417ebda66bb565d91aba07ca306b3e490/packages/engine/src/rules/rules.types.ts#L9)

#### Parameters

##### nextGameState?

`GameState`

#### Returns

`void`

***

### postActionExecute()?

> `optional` **postActionExecute**: (`lastAction`?) => `void`

Defined in: [rules/rules.types.ts:10](https://github.com/alexqguo/drinking-board-game-v3/blob/8a71edc417ebda66bb565d91aba07ca306b3e490/packages/engine/src/rules/rules.types.ts#L10)

#### Parameters

##### lastAction?

[`PromptAction`](../../actions/interfaces/PromptAction.md)

#### Returns

`void`

***

### rule

> **rule**: `T`

Defined in: [rules/rules.types.ts:6](https://github.com/alexqguo/drinking-board-game-v3/blob/8a71edc417ebda66bb565d91aba07ca306b3e490/packages/engine/src/rules/rules.types.ts#L6)

***

### ruleType

> **ruleType**: `string`

Defined in: [rules/rules.types.ts:7](https://github.com/alexqguo/drinking-board-game-v3/blob/8a71edc417ebda66bb565d91aba07ca306b3e490/packages/engine/src/rules/rules.types.ts#L7)

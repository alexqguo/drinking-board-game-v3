[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [rules](../README.md) / RuleHandler

# Interface: RuleHandler\<T\>

Defined in: [packages/engine/src/rules/rules.types.ts:29](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/rules/rules.types.ts#L29)

## Type Parameters

• **T** *extends* [`BaseRuleSchema`](../type-aliases/BaseRuleSchema.md)

## Properties

### execute()

> **execute**: (`nextGameState`?) => `void`

Defined in: [packages/engine/src/rules/rules.types.ts:33](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/rules/rules.types.ts#L33)

#### Parameters

##### nextGameState?

`"NotStarted"` | `"GameStart"` | `"StarterSelect"` | `"TurnCheck"` | `"ZoneCheck"` | `"TurnStart"` | `"TurnMultirollConditionCheck"` | `"RollStart"` | `"RollEnd"` | `"MoveCalculate"` | `"MoveStart"` | `"MoveEnd"` | `"RuleTrigger"` | `"RuleEnd"` | `"TurnEnd"` | `"GameOver"` | `"TurnSkip"` | `"LostTurnStart"` | `"Battle"`

#### Returns

`void`

***

### postActionExecute()?

> `optional` **postActionExecute**: (`lastAction`?) => `void`

Defined in: [packages/engine/src/rules/rules.types.ts:34](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/rules/rules.types.ts#L34)

#### Parameters

##### lastAction?

[`PromptAction`](../../actions/interfaces/PromptAction.md)

#### Returns

`void`

***

### rule

> **rule**: `T`

Defined in: [packages/engine/src/rules/rules.types.ts:30](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/rules/rules.types.ts#L30)

***

### ruleType

> **ruleType**: `string`

Defined in: [packages/engine/src/rules/rules.types.ts:31](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/rules/rules.types.ts#L31)

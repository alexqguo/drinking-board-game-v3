[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [rules](../README.md) / RollUntilCriteria

# Type Alias: RollUntilCriteria

> **RollUntilCriteria**: \[`"match"`, `number`[]\] \| \[`"consecutiveMatch"`, `number`\]

Defined in: [rules/rules.types.ts:188](https://github.com/alexqguo/drinking-board-game-v3/blob/7f2d27c7cff47bd1f99b310eade07186901fdb07/packages/engine/src/rules/rules.types.ts#L188)

`['match', number[]]` is the primary behavior, where you roll until you match something from `number[]`.
`['consecutiveMatch', number]` means rolling until you get the same roll `number` times in a row.

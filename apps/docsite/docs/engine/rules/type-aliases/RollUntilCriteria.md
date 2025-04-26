[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [rules](../README.md) / RollUntilCriteria

# Type Alias: RollUntilCriteria

> **RollUntilCriteria**: \[`"match"`, `number`[]\] \| \[`"consecutiveMatch"`, `number`\]

Defined in: [rules/rules.types.ts:189](https://github.com/alexqguo/drinking-board-game-v3/blob/56df34968617deee505d881352afe56efb53b2a4/packages/engine/src/rules/rules.types.ts#L189)

`['match', number[]]` is the primary behavior, where you roll until you match something from `number[]`.
`['consecutiveMatch', number]` means rolling until you get the same roll `number` times in a row.

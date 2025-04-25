[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [rules](../README.md) / RollUntilCriteria

# Type Alias: RollUntilCriteria

> **RollUntilCriteria**: \[`"match"`, `number`[]\] \| \[`"consecutiveMatch"`, `number`\]

Defined in: [rules/rules.types.ts:190](https://github.com/alexqguo/drinking-board-game-v3/blob/c54738830b911cea80ee4f6fef46ab8be3a3f8a1/packages/engine/src/rules/rules.types.ts#L190)

`['match', number[]]` is the primary behavior, where you roll until you match something from `number[]`.
`['consecutiveMatch', number]` means rolling until you get the same roll `number` times in a row.

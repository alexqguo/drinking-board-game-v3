[**@repo/engine**](../../README.md)

---

[@repo/engine](../../modules.md) / [rules](../README.md) / RollUntilCriteria

# Type Alias: RollUntilCriteria

> **RollUntilCriteria**: \[`"match"`, `number`[]\] \| \[`"consecutiveMatch"`, `number`\]

Defined in: [rules/rules.types.ts:189](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/rules/rules.types.ts#L189)

`['match', number[]]` is the primary behavior, where you roll until you match something from `number[]`.
`['consecutiveMatch', number]` means rolling until you get the same roll `number` times in a row.

[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [rules](../README.md) / PlayerTarget

# Type Alias: PlayerTarget

> **PlayerTarget**: \{ `candidates`: [`PlayerTarget`](PlayerTarget.md); `type`: [`custom`](../enumerations/PlayerTargetType.md#custom); \} \| \{ `type`: [`self`](../enumerations/PlayerTargetType.md#self); \} \| \{ `type`: [`allOthers`](../enumerations/PlayerTargetType.md#allothers); \} \| \{ `type`: [`all`](../enumerations/PlayerTargetType.md#all); \} \| \{ `type`: [`closestAhead`](../enumerations/PlayerTargetType.md#closestahead); \} \| \{ `type`: [`zone`](../enumerations/PlayerTargetType.md#zone); `zoneId`: `string`; \} \| \{ `range`: \[`number`, `number`\]; `type`: [`range`](../enumerations/PlayerTargetType.md#range); \}

Defined in: [rules/rules.types.ts:49](https://github.com/alexqguo/drinking-board-game-v3/blob/423d7f07a24c1ecc390d54885c4978f1235ed349/packages/engine/src/rules/rules.types.ts#L49)

## Type declaration

\{ `candidates`: [`PlayerTarget`](PlayerTarget.md); `type`: [`custom`](../enumerations/PlayerTargetType.md#custom); \}

### candidates?

> `optional` **candidates**: [`PlayerTarget`](PlayerTarget.md)

### type

> **type**: [`custom`](../enumerations/PlayerTargetType.md#custom)

\{ `type`: [`self`](../enumerations/PlayerTargetType.md#self); \}

### type

> **type**: [`self`](../enumerations/PlayerTargetType.md#self)

\{ `type`: [`allOthers`](../enumerations/PlayerTargetType.md#allothers); \}

### type

> **type**: [`allOthers`](../enumerations/PlayerTargetType.md#allothers)

\{ `type`: [`all`](../enumerations/PlayerTargetType.md#all); \}

### type

> **type**: [`all`](../enumerations/PlayerTargetType.md#all)

\{ `type`: [`closestAhead`](../enumerations/PlayerTargetType.md#closestahead); \}

### type

> **type**: [`closestAhead`](../enumerations/PlayerTargetType.md#closestahead)

\{ `type`: [`zone`](../enumerations/PlayerTargetType.md#zone); `zoneId`: `string`; \}

### type

> **type**: [`zone`](../enumerations/PlayerTargetType.md#zone)

### zoneId

> **zoneId**: `string`

\{ `range`: \[`number`, `number`\]; `type`: [`range`](../enumerations/PlayerTargetType.md#range); \}

### range

> **range**: \[`number`, `number`\]

### type

> **type**: [`range`](../enumerations/PlayerTargetType.md#range)

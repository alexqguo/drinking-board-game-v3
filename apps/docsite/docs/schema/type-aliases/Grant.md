[**@repo/schemas**](../README.md)

***

[@repo/schemas](../README.md) / Grant

# Type Alias: Grant

> **Grant**: `object`

Defined in: [legacy-types.ts:274](https://github.com/alexqguo/drinking-board-game-v3/blob/4f4a12dcb42e0861ffa9f989554e8e3dfe2a43b8/packages/schemas/src/legacy-types.ts#L274)

A grant denotes certain fields of game Metadata or PlayerEffects that can be "granted" immediately without
any outside logic upon rule execution. It is meant to be completely independent from a rule's logic.

Anything that requires user choices/prompts, or would grant to only certain players, needs to be handled
within a rule.

## Type declaration

### effects?

> `optional` **effects**: `{ [K in keyof PlayerEffects]?: K extends "anchors" ? BasicEffectGrant : K extends "extraTurns" ? BasicEffectGrant : K extends "immediateTurns" ? BasicEffectGrant : K extends "skippedTurns" ? BasicEffectGrant : K extends "mandatorySkips" ? BasicEffectGrant : K extends "customMandatoryTileIndex" ? BasicEffectGrant : K extends "rollAugmentation" ? BasicEffectGrant : K extends "speedModifier" ? { modifier: ...; numTurns: ... } : (...) extends (...) ? (...) : (...) }`

### metadata?

> `optional` **metadata**: `{ [K in keyof Pick<GameMetadata, "turnOrder">]?: K extends "turnOrder" ? BasicEffectGrant : never }`

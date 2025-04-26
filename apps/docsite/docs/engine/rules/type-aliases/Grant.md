[**@repo/engine**](../../README.md)

---

[@repo/engine](../../modules.md) / [rules](../README.md) / Grant

# Type Alias: Grant

> **Grant**: `object`

Defined in: [rules/rules.types.ts:127](https://github.com/alexqguo/drinking-board-game-v3/blob/56df34968617deee505d881352afe56efb53b2a4/packages/engine/src/rules/rules.types.ts#L127)

A grant denotes certain fields of game Metadata or PlayerEffects that can be "granted" immediately without
any outside logic upon rule execution. It is meant to be completely independent from a rule's logic.

Anything that requires user choices/prompts, or would grant to only certain players, needs to be handled
within a rule.

## Type declaration

### effects?

> `optional` **effects**: `{ [K in keyof PlayerEffects]?: K extends "anchors" ? BasicEffectGrant : K extends "extraTurns" ? BasicEffectGrant : K extends "immediateTurns" ? BasicEffectGrant : K extends "skippedTurns" ? BasicEffectGrant : K extends "mandatorySkips" ? BasicEffectGrant : K extends "customMandatoryTileIndex" ? BasicEffectGrant : K extends "rollAugmentation" ? BasicEffectGrant : K extends "speedModifier" ? { modifier: ...; numTurns: ... } : (...) extends (...) ? (...) : (...) }`

### metadata?

> `optional` **metadata**: `{ [K in keyof Pick<GameMetadata, "turnOrder">]?: K extends "turnOrder" ? BasicEffectGrant : never }`

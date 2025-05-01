[**@repo/engine**](../../README.md)

***

[@repo/engine](../../modules.md) / [rules](../README.md) / findRuleHandler

# Function: findRuleHandler()

> **findRuleHandler**(`ctx`, `rule`): [`RuleHandler`](../interfaces/RuleHandler.md)\<\{ `grants`: \[`PlayerTarget`, \{ `effects`: \{ `anchors`: \[... \| ... \| ... \| ..., `number`\]; `customMandatoryTileIndex`: \[... \| ... \| ... \| ..., `number`\]; `extraTurns`: \[... \| ... \| ... \| ..., `number`\]; `immediateTurns`: \[... \| ... \| ... \| ..., `number`\]; `itemIds`: \[`"+"`, `string`\] \| \[`"="`, ...[]\]; `mandatorySkips`: \[... \| ... \| ... \| ..., `number`\]; `rollAugmentation`: \[... \| ... \| ... \| ..., `number`\]; `skippedTurns`: \[... \| ... \| ... \| ..., `number`\]; `speedModifier`: \{ `modifier`: \[..., ...\]; `numTurns`: `number`; \}; \}; `metadata`: \{ `turnOrder`: \[... \| ... \| ... \| ..., `number`\]; \}; \}\][]; `id`: `string`; `type`: `"DisplayRule"` \| `"MoveRule"` \| `"RollUntilRule"` \| `"DiceRollRule"` \| `"GameOverRule"` \| `"DrinkDuringLostTurnsRule"` \| `"ApplyMoveConditionRule"` \| `"ChoiceRule"` \| `"ChallengeRule"` \| `"GroupActionRule"` \| `"ProxyRule"` \| `"ItemBasedRule"`; \}\>

Defined in: [packages/engine/src/rules/index.ts:87](https://github.com/alexqguo/drinking-board-game-v3/blob/4f69b8a1b2b5f97159c705ca0c84ae01560eec1b/packages/engine/src/rules/index.ts#L87)

## Parameters

### ctx

[`Context`](../../context/classes/Context.md)

### rule

`undefined` | \{ `grants`: \[`PlayerTarget`, \{ `effects`: \{ `anchors`: \[... \| ... \| ... \| ..., `number`\]; `customMandatoryTileIndex`: \[... \| ... \| ... \| ..., `number`\]; `extraTurns`: \[... \| ... \| ... \| ..., `number`\]; `immediateTurns`: \[... \| ... \| ... \| ..., `number`\]; `itemIds`: \[`"+"`, `string`\] \| \[`"="`, ...[]\]; `mandatorySkips`: \[... \| ... \| ... \| ..., `number`\]; `rollAugmentation`: \[... \| ... \| ... \| ..., `number`\]; `skippedTurns`: \[... \| ... \| ... \| ..., `number`\]; `speedModifier`: \{ `modifier`: \[..., ...\]; `numTurns`: `number`; \}; \}; `metadata`: \{ `turnOrder`: \[... \| ... \| ... \| ..., `number`\]; \}; \}\][]; `id`: `string`; `type`: `"DisplayRule"` \| `"MoveRule"` \| `"RollUntilRule"` \| `"DiceRollRule"` \| `"GameOverRule"` \| `"DrinkDuringLostTurnsRule"` \| `"ApplyMoveConditionRule"` \| `"ChoiceRule"` \| `"ChallengeRule"` \| `"GroupActionRule"` \| `"ProxyRule"` \| `"ItemBasedRule"`; \}

## Returns

[`RuleHandler`](../interfaces/RuleHandler.md)\<\{ `grants`: \[`PlayerTarget`, \{ `effects`: \{ `anchors`: \[... \| ... \| ... \| ..., `number`\]; `customMandatoryTileIndex`: \[... \| ... \| ... \| ..., `number`\]; `extraTurns`: \[... \| ... \| ... \| ..., `number`\]; `immediateTurns`: \[... \| ... \| ... \| ..., `number`\]; `itemIds`: \[`"+"`, `string`\] \| \[`"="`, ...[]\]; `mandatorySkips`: \[... \| ... \| ... \| ..., `number`\]; `rollAugmentation`: \[... \| ... \| ... \| ..., `number`\]; `skippedTurns`: \[... \| ... \| ... \| ..., `number`\]; `speedModifier`: \{ `modifier`: \[..., ...\]; `numTurns`: `number`; \}; \}; `metadata`: \{ `turnOrder`: \[... \| ... \| ... \| ..., `number`\]; \}; \}\][]; `id`: `string`; `type`: `"DisplayRule"` \| `"MoveRule"` \| `"RollUntilRule"` \| `"DiceRollRule"` \| `"GameOverRule"` \| `"DrinkDuringLostTurnsRule"` \| `"ApplyMoveConditionRule"` \| `"ChoiceRule"` \| `"ChallengeRule"` \| `"GroupActionRule"` \| `"ProxyRule"` \| `"ItemBasedRule"`; \}\>

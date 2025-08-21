# ItemBasedRule

## Purpose

Executes different rules based on whether the current player has specific items.

## Capabilities/Options

### Condition Structure

- **conditions**: Array of `[itemId, hasItem, rule]` tuples
- **itemId**: Item to check for
- **hasItem**: true/false - whether player should have the item
- **rule**: Rule to execute when condition matches

### Execution Flow

1. Check each condition in order
2. Execute first matching condition's rule
3. Stop after first match (no fallthrough)

## Examples

### Team-Based Actions

```json
{
  "id": "rule_team_magma_space",
  "type": "ItemBasedRule",
  "conditions": [
    [
      "team_magma",
      true,
      {
        "id": "rule_magma_member",
        "type": "DisplayRule"
      }
    ],
    [
      "team_aqua",
      true,
      {
        "id": "rule_aqua_penalty",
        "type": "DisplayRule",
        "grants": [[{ "type": "self" }, { "effects": { "skippedTurns": ["+", 1] } }]]
      }
    ],
    [
      "team_magma",
      false,
      {
        "id": "rule_join_magma",
        "type": "DisplayRule",
        "grants": [[{ "type": "self" }, { "effects": { "itemIds": ["+", "team_magma"] } }]]
      }
    ]
  ]
}
```

### Item-Gated Content

```json
{
  "id": "rule_requires_key",
  "type": "ItemBasedRule",
  "conditions": [
    [
      "golden_key",
      true,
      {
        "id": "rule_unlock_door",
        "type": "MoveRule",
        "playerTarget": { "type": "self" },
        "numSpaces": 5
      }
    ],
    [
      "golden_key",
      false,
      {
        "id": "rule_door_locked",
        "type": "DisplayRule"
      }
    ]
  ]
}
```

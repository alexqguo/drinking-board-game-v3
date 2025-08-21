# Grants System

## Purpose

Applies immediate effects to players or game state without requiring user prompts or complex logic.

## Capabilities/Options

### Grant Structure

```
grants: [[PlayerTarget, Grant], [PlayerTarget, Grant], ...]
```

### Player Targets

- **self**: Current player only
- **allOthers**: All players except current
- **all**: All players including current
- **custom**: Prompt current player to select target
- **closestAhead**: Player closest ahead of current
- **zone**: Players in specific zone
- **range**: Players within position range

### Grant Types

- **metadata**: Game-level effects (turnOrder)
- **effects**: Player-level effects (PlayerEffects)

## Player Effects

### Movement Effects

- **extraTurns**: `["+", count]` - Additional turns after this one
- **immediateTurns**: `["+", count]` - Take turns immediately
- **skippedTurns**: `["+", count]` - Lose turns (with message)
- **mandatorySkips**: `["+", count]` - Skip moves but keep turns

### Position Effects

- **customMandatoryTileIndex**: `["=", index]` - Must move to specific tile
- **anchors**: `["+", count]` - Resist being moved by others

### Dice Effects

- **rollAugmentation**: Temporary dice roll modifiers
- **speedModifier**: Temporary movement distance modifiers

### Items

- **itemIds**: Add `["+", "itemId"]`, replace `["=", ["id1", "id2"]]`, or swap `["swap"]`

### Special Effects

- **turnStartRule**: Execute rule at beginning of player's turns

## Modifier Operations

- **"+"**: Add to existing value
- **"="**: Replace existing value
- **"-"**: Subtract from existing value
- **"\*"**: Multiply existing value

## Examples

### Basic Player Effects

```json
{
  "grants": [
    [
      { "type": "self" },
      {
        "effects": {
          "extraTurns": ["+", 1],
          "skippedTurns": ["+", 2]
        }
      }
    ]
  ]
}
```

### Multiple Target Grants

```json
{
  "grants": [
    [{ "type": "self" }, { "effects": { "itemIds": ["+", "reward_item"] } }],
    [{ "type": "allOthers" }, { "effects": { "skippedTurns": ["+", 1] } }]
  ]
}
```

### Complex Modifiers

```json
{
  "grants": [
    [
      { "type": "self" },
      {
        "effects": {
          "rollAugmentation": {
            "numTurns": 3,
            "modifier": ["+", 2]
          },
          "speedModifier": {
            "numTurns": 2,
            "modifier": ["*", 2]
          }
        }
      }
    ]
  ]
}
```

### TurnStartRule Grant (Elite Four Pattern)

```json
{
  "grants": [[
    {"type": "self"},
    {
      "effects": {
        "turnStartRule": {
          "numTurns": 999,
          "rule": {
            "id": "retry_challenge",
            "type": "DiceRollRule",
            "diceRolls": {
              "type": "allMatch",
              "numRequired": 4,
              "outcomes": [...]
            }
          }
        }
      }
    }
  ]]
}
```

### TurnStartRule Cancellation

```json
{
  "grants": [
    [
      { "type": "self" },
      {
        "effects": {
          "turnStartRule": {
            "numTurns": -1,
            "rule": { "id": "__dummy", "type": "DisplayRule" }
          }
        }
      }
    ]
  ]
}
```

### Game Metadata Effects

```json
{
  "grants": [
    [
      { "type": "self" },
      {
        "metadata": {
          "turnOrder": ["*", -1]
        }
      }
    ]
  ]
}
```

### Item Management

```json
{
  "grants": [
    [{ "type": "self" }, { "effects": { "itemIds": ["+", "new_item"] } }],
    [{ "type": "custom" }, { "effects": { "itemIds": ["=", ["replacement_item"]] } }],
    [{ "type": "closestAhead" }, { "effects": { "itemIds": ["swap"] } }]
  ]
}
```

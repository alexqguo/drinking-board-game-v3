# ChoiceRule

## Purpose

Presents player with multiple choice options, each executing different rules.

## Capabilities/Options

### Choice Types

- **Manual selection**: Player chooses from presented options
- **Dice-based**: Roll dice to determine choice outcome

### Choice Structure

- **choices**: Array of choice options with associated rules
- **diceRolls**: Optional dice rolling for random selection

### Execution Flow

1. If `diceRolls` specified: Player rolls dice, choice determined by result
2. If no `diceRolls`: Player manually selects from choice options
3. Selected choice rule executes

## Examples

### Manual Choice Selection

```json
{
  "id": "rule_drink_or_dare",
  "type": "ChoiceRule",
  "choices": [
    {
      "rule": {
        "id": "rule_take_drink",
        "type": "DisplayRule"
      }
    },
    {
      "rule": {
        "id": "rule_do_dare",
        "type": "DisplayRule"
      }
    }
  ]
}
```

### Dice-Based Choice (Champion Steven Pattern)

```json
{
  "id": "rule_champion_steven",
  "type": "ChoiceRule",
  "choices": [
    {
      "rule": {
        "id": "rule_finished_drink",
        "type": "DisplayRule"
      }
    },
    {
      "rule": {
        "id": "rule_skip_turn",
        "type": "DisplayRule",
        "grants": [[{ "type": "self" }, { "effects": { "skippedTurns": ["+", 1] } }]]
      }
    }
  ]
}
```

### Complex Choice with Grants

```json
{
  "id": "rule_team_selection",
  "type": "ChoiceRule",
  "choices": [
    {
      "rule": {
        "id": "rule_join_team_red",
        "type": "DisplayRule",
        "grants": [[{ "type": "self" }, { "effects": { "itemIds": ["+", "team_red_badge"] } }]]
      }
    },
    {
      "rule": {
        "id": "rule_join_team_blue",
        "type": "DisplayRule",
        "grants": [[{ "type": "self" }, { "effects": { "itemIds": ["+", "team_blue_badge"] } }]]
      }
    }
  ]
}
```

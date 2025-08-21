# DiceRollRule

## Purpose

Prompts player to roll dice and executes outcome rules based on results.

## Capabilities/Options

### Dice Roll Types

- **default**: Individual dice results checked against criteria
- **cumulative**: Sum of all dice checked against criteria
- **allMatch**: ALL dice must match criteria (or ANY if `isAny: true`)

### Outcome Matching

- **criteria**: Array of values that trigger this outcome
- **isAny**: If true, ANY dice matching criteria triggers outcome (even in allMatch mode)
- **rule**: Rule to execute when outcome matches

### Execution Flow

1. Player rolls `numRequired` dice
2. Results processed based on `type`
3. First matching outcome rule executes
4. `isAny` outcomes take priority over regular outcomes

## Examples

### Basic Roll with Outcomes

```json
{
  "id": "rule_basic_roll",
  "type": "DiceRollRule",
  "diceRolls": {
    "numRequired": 1,
    "type": "default",
    "outcomes": [
      {
        "criteria": [1, 2, 3],
        "rule": { "id": "rule_low", "type": "DisplayRule" }
      },
      {
        "criteria": [4, 5, 6],
        "rule": { "id": "rule_high", "type": "DisplayRule" }
      }
    ]
  }
}
```

### Cumulative Roll

```json
{
  "id": "rule_sum_roll",
  "type": "DiceRollRule",
  "diceRolls": {
    "numRequired": 2,
    "type": "cumulative",
    "outcomes": [
      {
        "criteria": [2, 3, 4, 5, 6],
        "rule": { "id": "rule_low_sum", "type": "DisplayRule" }
      },
      {
        "criteria": [7, 8, 9, 10, 11, 12],
        "rule": { "id": "rule_high_sum", "type": "DisplayRule" }
      }
    ]
  }
}
```

### AllMatch with isAny Fallback (Elite Four Pattern)

```json
{
  "id": "rule_elite_four",
  "type": "DiceRollRule",
  "diceRolls": {
    "numRequired": 4,
    "type": "allMatch",
    "outcomes": [
      {
        "criteria": [1, 2, 3, 4],
        "rule": { "id": "rule_success", "type": "DisplayRule" }
      },
      {
        "criteria": [5, 6],
        "isAny": true,
        "rule": { "id": "rule_failure", "type": "DisplayRule" }
      }
    ]
  }
}
```

### No Outcomes (Roll for Display Only)

```json
{
  "id": "rule_roll_no_outcome",
  "type": "DiceRollRule",
  "diceRolls": {
    "numRequired": 1,
    "type": "default"
  }
}
```

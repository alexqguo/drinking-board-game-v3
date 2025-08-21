# RollUntilRule

## Purpose

Forces player to keep rolling dice until specific criteria are met.

## Capabilities/Options

### Criteria Types

- **["match", [values]]**: Keep rolling until any roll matches one of the values
- **["consecutiveMatch", count]**: Keep rolling until getting `count` consecutive matching rolls

### Execution Flow

1. Player rolls one die
2. Check if criteria met
3. If not met, roll again
4. Continue until criteria satisfied
5. No outcome rules - purely for rolling mechanics

## Examples

### Roll Until Specific Value

```json
{
  "id": "rule_roll_until_six",
  "type": "RollUntilRule",
  "criteria": ["match", [6]]
}
```

### Roll Until Multiple Options

```json
{
  "id": "rule_roll_until_high",
  "type": "RollUntilRule",
  "criteria": ["match", [4, 5, 6]]
}
```

### Roll Until Consecutive Matches

```json
{
  "id": "rule_roll_consecutive",
  "type": "RollUntilRule",
  "criteria": ["consecutiveMatch", 3]
}
```

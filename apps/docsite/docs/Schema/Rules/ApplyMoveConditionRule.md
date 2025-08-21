# ApplyMoveConditionRule

## Purpose

Prevents players from moving normally until they satisfy dice roll criteria.

## Capabilities/Options

### Basic Properties

- **playerTarget**: Who gets the move condition
- **criteria**: Dice values that count as success (e.g., [2,3,4,5,6])
- **numSuccessesRequired**: How many successful rolls needed
- **description**: i18n string ID for condition display
- **consequence**: Optional rule executed on failed rolls

### Timing Options

- **immediate: false** (default): Condition applied, player rolls on next turn
- **immediate: true**: Player must roll immediately as part of this rule

### Rolling Modes (when immediate: true)

- **allowIterativeRolling: false** (default): Roll all dice at once
- **allowIterativeRolling: true**: Roll one die at a time until success

### Success Criteria Behavior

- **numSuccessesRequired: 0**: Single attempt, condition clears regardless of result
- **numSuccessesRequired: 1+**: Must accumulate this many successes

## Examples

### Basic Delayed Condition

```json
{
  "id": "rule_boss_battle",
  "type": "ApplyMoveConditionRule",
  "playerTarget": { "type": "self" },
  "condition": {
    "criteria": [6],
    "numSuccessesRequired": 1,
    "description": "rule_boss_battle_condition"
  }
}
```

### Immediate Single Roll

```json
{
  "id": "rule_skill_check",
  "type": "ApplyMoveConditionRule",
  "playerTarget": { "type": "self" },
  "condition": {
    "immediate": true,
    "criteria": [4, 5, 6],
    "numSuccessesRequired": 1,
    "description": "rule_skill_check_condition"
  }
}
```

### Iterative Rolling (Poe Sisters Pattern)

```json
{
  "id": "rule_poe_sisters",
  "type": "ApplyMoveConditionRule",
  "playerTarget": { "type": "self" },
  "condition": {
    "immediate": true,
    "criteria": [2, 3, 4, 5, 6],
    "numSuccessesRequired": 4,
    "allowIterativeRolling": true,
    "description": "rule_poe_sisters_condition",
    "consequence": {
      "id": "rule_poe_sisters_penalty",
      "type": "DisplayRule"
    }
  }
}
```

### Multiple Successes Required

```json
{
  "id": "rule_legendary_birds",
  "type": "ApplyMoveConditionRule",
  "playerTarget": { "type": "self" },
  "condition": {
    "immediate": true,
    "criteria": [4, 5, 6],
    "numSuccessesRequired": 2,
    "description": "rule_legendary_birds_condition"
  }
}
```

### Custom Player Selection

```json
{
  "id": "rule_curse_someone",
  "type": "ApplyMoveConditionRule",
  "playerTarget": { "type": "custom" },
  "condition": {
    "criteria": [5, 6],
    "numSuccessesRequired": 1,
    "description": "rule_curse_condition"
  }
}
```

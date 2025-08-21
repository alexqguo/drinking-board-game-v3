# GroupActionRule

## Purpose

Affects multiple players simultaneously through dice rolls or item distributions.

## Capabilities/Options

### Action Types (AtLeastOneOf)

- **diceRolls**: All players roll dice based on configuration
- **itemIds**: Distribute specific items to players

### Dice Roll Behavior

- All players roll simultaneously
- Uses same `DiceRollSchema` format as DiceRollRule
- No outcome processing - rolls are for effect only

### Item Distribution

- Specified items given to all players
- Uses grants system for item application

## Examples

### Group Dice Rolling

```json
{
  "id": "rule_everyone_rolls",
  "type": "GroupActionRule",
  "diceRolls": {
    "numRequired": 1,
    "type": "default"
  }
}
```

### Item Distribution to All

```json
{
  "id": "rule_give_everyone_items",
  "type": "GroupActionRule",
  "itemIds": ["healing_potion", "energy_drink"]
}
```

### Complex Group Roll

```json
{
  "id": "rule_group_challenge",
  "type": "GroupActionRule",
  "diceRolls": {
    "numRequired": 2,
    "type": "cumulative"
  }
}
```

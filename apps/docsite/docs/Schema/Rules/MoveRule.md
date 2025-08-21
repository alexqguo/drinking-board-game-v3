# MoveRule

## Purpose

Moves players on the board using fixed distances, dice rolls, or tile indices.

## Capabilities/Options

### Movement Types

- **numSpaces**: Fixed number of spaces to move
- **diceRolls**: Roll dice for movement distance
- **tileIndex**: Move to specific tile position
- **direction**: forward/back (used with diceRolls)
- **isSwap**: Swap positions with target player

### Player Targeting

- **self**: Move current player
- **allOthers**: Move all other players
- **custom**: Prompt to select player to move
- **closestAhead**: Move player closest ahead
- **zone**: Move players in specific zone
- **range**: Move players within position range

### Movement Behavior

- Uses `AtLeastOneOf` - must specify one movement type
- Can combine `direction` with `diceRolls` only
- Grants applied after movement

## Examples

### Fixed Movement

```json
{
  "id": "rule_move_forward_3",
  "type": "MoveRule",
  "playerTarget": { "type": "self" },
  "numSpaces": 3
}
```

### Dice-Based Movement

```json
{
  "id": "rule_roll_move",
  "type": "MoveRule",
  "playerTarget": { "type": "self" },
  "direction": "forward",
  "diceRolls": {
    "numRequired": 1,
    "type": "default"
  }
}
```

### Move to Specific Tile

```json
{
  "id": "rule_teleport",
  "type": "MoveRule",
  "playerTarget": { "type": "self" },
  "tileIndex": 25
}
```

### Swap with Another Player

```json
{
  "id": "rule_swap_positions",
  "type": "MoveRule",
  "playerTarget": { "type": "custom" },
  "isSwap": true
}
```

### Move Others Back

```json
{
  "id": "rule_push_others",
  "type": "MoveRule",
  "playerTarget": { "type": "allOthers" },
  "direction": "back",
  "numSpaces": 2
}
```

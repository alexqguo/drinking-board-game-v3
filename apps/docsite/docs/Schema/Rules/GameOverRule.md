# GameOverRule

## Purpose

Ends the game and declares the current player as the winner.

## Capabilities/Options

- **Immediate game termination**: Game state transitions to GameOver
- **Winner declaration**: Current player becomes the winner
- **With grants**: Can apply final effects before game ends

## Examples

### Basic Game Over

```json
{
  "id": "rule_pokemon_master",
  "type": "GameOverRule"
}
```

### Game Over with Final Effects

```json
{
  "id": "rule_victory_celebration",
  "type": "GameOverRule",
  "grants": [[{ "type": "all" }, { "effects": { "extraTurns": ["+", 1] } }]]
}
```

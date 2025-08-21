# DisplayRule

## Purpose

Shows a message to the player with a close button. No game logic or state changes.

## Capabilities/Options

- **Basic display**: Shows rule text via i18n string
- **With grants**: Can apply immediate effects while displaying message
- **Helper text**: Optional `helperTextId` for additional context

## Examples

### Basic Display

```json
{
  "id": "rule_welcome",
  "type": "DisplayRule"
}
```

### Display with Grants

```json
{
  "id": "rule_drink_penalty",
  "type": "DisplayRule",
  "grants": [[{ "type": "self" }, { "effects": { "skippedTurns": ["+", 1] } }]]
}
```

### Display with Helper Text

```json
{
  "id": "rule_complex_instruction",
  "type": "DisplayRule",
  "helperTextId": "rule_complex_instruction_help"
}
```

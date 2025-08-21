# ProxyRule

## Purpose

References and executes another rule by its ID. Used for rule reuse and organization.

## Capabilities/Options

- **proxyRuleId**: ID of the rule to execute
- **Rule lookup**: Searches all rules in the board schema
- **Execution delegation**: Proxied rule executes as if it were directly triggered

## Examples

### Basic Rule Reference

```json
{
  "id": "rule_common_penalty_proxy",
  "type": "ProxyRule",
  "proxyRuleId": "rule_common_penalty"
}
```

### Reusing Complex Rules

```json
{
  "id": "rule_elite_four_retry_proxy",
  "type": "ProxyRule",
  "proxyRuleId": "rule_elite_four_challenge"
}
```

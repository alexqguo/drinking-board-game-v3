[**@repo/schemas**](../README.md)

***

[@repo/schemas](../README.md) / ApplyMoveConditionRule

# Type Alias: ApplyMoveConditionRule

> **ApplyMoveConditionRule**: [`BaseRule`](BaseRule.md) & `object`

Defined in: [legacy-types.ts:449](https://github.com/alexqguo/drinking-board-game-v3/blob/4f4a12dcb42e0861ffa9f989554e8e3dfe2a43b8/packages/schemas/src/legacy-types.ts#L449)

ApplyMoveConditionRule creates a condition that prevents players from moving normally until they satisfy specific criteria.
This rule is used for scenarios where players must "prove themselves" before advancing, such as boss battles or skill challenges.

## Core Behavior:
- Applies a MoveCondition to the target player(s)
- The condition is checked whenever the affected player attempts to move on their turn
- Players cannot advance until they satisfy the condition criteria

## Key Properties:

### playerTarget
Determines who receives the move condition:
- `self`: Current player gets the condition
- `custom`: Prompts current player to select who gets the condition
- Other targets: All matching players get the condition

### condition.criteria
Array of dice roll values that count as "success" (e.g., [2,3,4,5,6] means rolling 1 is failure)

### condition.numSuccessesRequired
How many successful rolls are needed to clear the condition:
- 0: Single roll attempt, pass or fail (condition clears either way)
- 1+: Must accumulate this many successes to clear the condition

### condition.immediate
When true, forces immediate dice rolling within the rule execution:
- false (default): Condition applied, player rolls on their next turn start
- true: Player must roll immediately as part of this rule

### condition.allowIterativeRolling
Only applies when immediate=true and numSuccessesRequired > 1:
- false (default): All required rolls happen at once, then rule ends
- true: After each roll, player gets another roll action if more successes needed

### condition.consequence
Optional rule to execute when a player fails a roll (useful for penalties like taking drinks)

## Flow Examples:

### Basic Delayed Condition:
```
immediate: false, numSuccessesRequired: 1, criteria: [6]
```
1. Player lands on tile, gets move condition applied
2. On their next turn, they must roll a 6 to move
3. If they fail, they stay put and try again next turn
4. If they succeed, condition clears and they move normally

### Immediate Single Roll:
```
immediate: true, numSuccessesRequired: 1, criteria: [4,5,6]
```
1. Player lands on tile
2. Immediately forced to roll a die
3. Success (4-6): Turn continues normally
4. Failure (1-3): Move condition applied, must retry on next turn

### Immediate Multiple Rolls (Traditional):
```
immediate: true, numSuccessesRequired: 3, criteria: [2,3,4,5,6], allowIterativeRolling: false
```
1. Player lands on tile
2. Forced to roll 3 dice immediately
3. Count successes across all rolls
4. If enough successes: Turn continues
5. If not enough: Move condition applied for remaining successes

### Iterative Rolling (Poe Sisters):
```
immediate: true, numSuccessesRequired: 4, criteria: [2,3,4,5,6], allowIterativeRolling: true
```
1. Player lands on tile
2. Forced to roll one die
3. Success: Increment success count, roll again if < 4 total successes
4. Failure: Execute consequence rule, roll again
5. Repeat until 4 successes achieved
6. Once complete: Turn continues normally

## State Management:
The condition is stored in player.effects.moveCondition with:
- ruleId: Reference to this rule for validation logic
- numCurrentSuccesses: Progress toward numSuccessesRequired
- descriptionStrId: Display text for UI

The condition is automatically cleared when:
- Required successes are achieved
- numSuccessesRequired is 0 (regardless of success/failure)
- Player moves to a different tile (in some game states)

## Type declaration

### condition

> **condition**: [`MoveConditionSchema`](../interfaces/MoveConditionSchema.md)

### playerTarget

> **playerTarget**: [`PlayerTarget`](PlayerTarget.md)

### type

> **type**: [`ApplyMoveConditionRule`](../enumerations/RuleType.md#applymoveconditionrule)

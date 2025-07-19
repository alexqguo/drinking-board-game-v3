Feature: Apply move condition rule

  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: basic move condition on self
    When I remember the game state
    And the current player rolls to land on ruleId "applyMoveConditionRuleId_basicSelf"
    Then the prompt should reference ruleId "applyMoveConditionRuleId_basicSelf"
    And the current player should have a "promptClose" prompt action
    And "P1" should have a move condition for ruleId "applyMoveConditionRuleId_basicSelf" with no other effect changes
    And "P2" game state data should be unchanged

  Scenario: rolling after basic condition: fail
    When I remember the game state
    And the current player rolls to land on ruleId "applyMoveConditionRuleId_basicSelf"
    And the current player closes the prompt
    # P2's turn
    And the current player skips their turn
    # Back to P1's turn
    Then the current player should be "P1"
    When the current player rolls a 2 for their turn
    Then "P1" should have a move condition for ruleId "applyMoveConditionRuleId_basicSelf" with no other effect changes
    And the prompt should reference messageOverride "engine_unsuccessfulMoveConditionRoll"

  Scenario: rolling after basic condition: success
    When I remember the game state
    And the current player rolls to land on ruleId "applyMoveConditionRuleId_basicSelf"
    And the current player closes the prompt
    # P2's turn
    And the current player skips their turn
    # Back to P1's turn
    Then the current player should be "P1"
    When the current player rolls a 1 for their turn
    # Unchanged since the move condition went away
    Then "P1" game state data should be unchanged except for location and visited tiles

  Scenario: immediate roll required
    When I remember the game state
    And the current player rolls to land on ruleId "applyMoveConditionRuleId_immediate"
    Then the prompt should reference ruleId "applyMoveConditionRuleId_immediate"
    And the current player should have a "promptRoll" prompt action
    And "P1" should have a move condition for ruleId "applyMoveConditionRuleId_immediate" with no other effect changes
    When the current player prompt rolls a 1
    # Unchanged here meaning the move condition went away
    Then "P1" game state data should be unchanged except for location and visited tiles

  Scenario: basic condition on custom target
    When I remember the game state
    And the current player rolls to land on ruleId "applyMoveConditionRuleId_basicCustom"
    Then the prompt should reference ruleId "applyMoveConditionRuleId_basicCustom"
    And the current player should have a "promptSelectPlayer" prompt action
    When the current player selects custom option "uuid-for-P2"
    Then the current player should have a "promptClose" prompt action
    And "P1" game state data should be unchanged except for location and visited tiles
    And "P2" should have a move condition for ruleId "applyMoveConditionRuleId_basicCustom" with no other effect changes

  Scenario: invalid custom target should be immediately closable
    When the current player rolls to land on ruleId "applyMoveConditionRuleId_invalidCustom"
    Then the current player should have a "promptClose" prompt action

  Scenario: iterative rolling - failure on first roll
    When I remember the game state
    And the current player rolls to land on ruleId "applyMoveConditionRuleId_iterative"
    Then the prompt should reference ruleId "applyMoveConditionRuleId_iterative"
    And the current player should have a "promptRoll" prompt action
    And "P1" should have a move condition for ruleId "applyMoveConditionRuleId_iterative" with no other effect changes
    When the current player prompt rolls a 1
    # Failure! Turn should end, move condition should persist
    Then the current player should have a "promptClose" prompt action
    And "P1" should have a move condition for ruleId "applyMoveConditionRuleId_iterative" with no other effect changes

  Scenario: iterative rolling - two consecutive successes
    When I remember the game state
    And the current player rolls to land on ruleId "applyMoveConditionRuleId_iterative"
    Then the prompt should reference ruleId "applyMoveConditionRuleId_iterative"
    And the current player should have a "promptRoll" prompt action
    And "P1" should have a move condition for ruleId "applyMoveConditionRuleId_iterative" with no other effect changes
    When the current player prompt rolls a 3
    # First success! Should continue rolling
    Then the current player should have a "promptRoll" prompt action
    And "P1" should have a move condition for ruleId "applyMoveConditionRuleId_iterative" with no other effect changes
    When the current player prompt rolls a 4
    # Second success! Move condition should be cleared, prompt should be closable
    Then the current player should have a "promptClose" prompt action
    And "P1" game state data should be unchanged except for location and visited tiles

  Scenario: iterative rolling - complex flow with partial success and failures
    When I remember the game state
    And the current player rolls to land on ruleId "applyMoveConditionRuleId_iterative"
    Then the prompt should reference ruleId "applyMoveConditionRuleId_iterative"
    And the current player should have a "promptRoll" prompt action
    And "P1" should have a move condition for ruleId "applyMoveConditionRuleId_iterative" with no other effect changes
    When the current player prompt rolls a 3
    # First success! Should continue rolling
    Then the current player should have a "promptRoll" prompt action
    And "P1" should have a move condition for ruleId "applyMoveConditionRuleId_iterative" with no other effect changes
    When the current player prompt rolls a 1
    # Failure after partial success! Turn should end, move condition should persist
    Then the current player should have a "promptClose" prompt action
    And "P1" should have a move condition for ruleId "applyMoveConditionRuleId_iterative" with no other effect changes
    When the current player closes the prompt
    # P2's turn - should be next player
    Then the current player should be "P2"
    When the current player skips their turn
    # Back to P1's turn - should immediately need to roll again for move condition
    Then the current player should be "P1"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 1
    # Failure again! Turn should end, move condition should persist
    Then the current player should have a "promptClose" prompt action
    And "P1" should have a move condition for ruleId "applyMoveConditionRuleId_iterative" with no other effect changes
    When the current player closes the prompt
    # P2's turn again
    Then the current player should be "P2"
    When the current player skips their turn
    # Back to P1's turn - should need to roll again
    Then the current player should be "P1"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 4
    # Final success- close the prompt and should get their turn now
    Then the current player should have a "promptClose" prompt action
    When the current player closes the prompt
    Then the current player should be "P1"
    And "P1" game state data should be unchanged except for location and visited tiles

# when moving:
# - consequence
# - multirollconditioncheck
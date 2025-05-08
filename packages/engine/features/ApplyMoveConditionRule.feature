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

  Scenario: basic move condition on custom target
    When I remember the game state
    And the current player rolls to land on ruleId "applyMoveConditionRuleId_immediate"
    Then the prompt should reference ruleId "applyMoveConditionRuleId_immediate"
    And the current player should have a "promptRoll" prompt action
    And "P1" should have a move condition for ruleId "applyMoveConditionRuleId_immediate" with no other effect changes
    When the current player prompt rolls a 1
    # Unchanged here meaning the move condition went away
    Then "P1" game state data should be unchanged except for location and visited tiles

  Scenario: immediate roll required


# when moving:
# - consequence
# - multirollconditioncheck
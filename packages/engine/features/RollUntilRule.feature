Feature: Display rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: match
    When I remember the game state
    And the current player rolls to land on ruleId "rollUntilRuleId_match"
    Then the prompt should reference ruleId "rollUntilRuleId_match"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 4
    Then the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 4
    Then the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 6
    Then the current player should have a "promptClose" prompt action
    And "P2" game state data should be unchanged
    And "P1" game state data should be unchanged except for location and visited tiles

  Scenario: consecutive match
    When I remember the game state
    And the current player rolls to land on ruleId "rollUntilRuleId_consecutiveMatch"
    Then the prompt should reference ruleId "rollUntilRuleId_consecutiveMatch"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 1
    Then the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 2
    Then the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 3
    Then the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 3
    Then the current player should have a "promptClose" prompt action
    And "P2" game state data should be unchanged
    And "P1" game state data should be unchanged except for location and visited tiles
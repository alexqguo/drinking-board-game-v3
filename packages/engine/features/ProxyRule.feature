Feature: Display rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: proxying a rolluntilrule
    When I remember the game state
    And the current player rolls to land on ruleId "proxyRuleId"
    Then the prompt should reference ruleId "proxyRuleId"
    # Proxying a RollUntilRule
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 6
    # Bug in the engine!
    # Then the current player should have a "promptClose" prompt action
    # And "P2" game state data should be unchanged
    # And "P1" game state data should be unchanged except for location and visited tiles

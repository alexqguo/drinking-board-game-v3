Feature: Challenge rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: challenge rule - P1 wins
    And the current player rolls to land on ruleId "challengeRuleId"
    Then the prompt should reference ruleId "challengeRuleId"
    Then the current player should have a "promptSelectPlayer" prompt action
    When I remember the game state
    And the current player chooses player "P2"
    Then the current player should have a "promptSelectPlayer" prompt action
    When the current player chooses player "P1"
    Then "P1" should have 1 extra turn with no other effect changes
    And "P2" should have 1 missed turn with no other effect changes
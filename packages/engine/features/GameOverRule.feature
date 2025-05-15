Feature: Game over rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: game over
    When the current player rolls to land on ruleId "gameOverRuleId"
    Then the prompt should reference ruleId "gameOverRuleId"
    And "P1" should have won the game
    When the current player closes the prompt
    Then the current player should be "P2"
    When the current player skips their turn
    Then the current player should be "P2"

  Scenario: everyone wins
    When the current player rolls to land on ruleId "gameOverRuleId"
    Then "P1" should have won the game
    When the current player closes the prompt
    Then the current player should be "P2"
    When the current player rolls to land on ruleId "gameOverRuleId"
    And the current player closes the prompt
    Then the game state should be "GameOver"
    And the prompt should reference messageOverride "engine_everyoneWins"
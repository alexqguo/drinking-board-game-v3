Feature: Dice roll rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: no outcomes
    When I remember the game state
    And the current player rolls to land on ruleId "diceRollRuleId_noOutcomes"
    Then the prompt should reference ruleId "diceRollRuleId_noOutcomes"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 3
    Then the current player should have a "promptClose" prompt action
    And "P1" game state data should be unchanged except for location and visited tiles
    And "P2" game state data should be unchanged

  Scenario: basic roll based outcome A
    When the current player rolls to land on ruleId "diceRollRuleId_basicOutcomes"
    Then the prompt should reference ruleId "diceRollRuleId_basicOutcomes"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 1
    Then the prompt should reference follow up ruleId "diceRollRuleId_basicOutcomes_A"

  Scenario: basic roll based outcome B
    When the current player rolls to land on ruleId "diceRollRuleId_basicOutcomes"
    Then the prompt should reference ruleId "diceRollRuleId_basicOutcomes"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 6
    Then the prompt should reference follow up ruleId "diceRollRuleId_basicOutcomes_B"

  Scenario: cumulative roll based outcome A
    When the current player rolls to land on ruleId "diceRollRuleId_cumulative"
    Then the prompt should reference ruleId "diceRollRuleId_cumulative"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 1
    And the current player prompt rolls a 1
    Then the prompt should reference follow up ruleId "diceRollRuleId_cumulative_A"

  Scenario: cumulative roll based outcome B
    When the current player rolls to land on ruleId "diceRollRuleId_cumulative"
    Then the prompt should reference ruleId "diceRollRuleId_cumulative"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 6
    And the current player prompt rolls a 6
    Then the prompt should reference follow up ruleId "diceRollRuleId_cumulative_B"

  Scenario: any match roll based outcome A
    When the current player rolls to land on ruleId "diceRollRuleId_isAny"
    Then the prompt should reference ruleId "diceRollRuleId_isAny"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 1
    And the current player prompt rolls a 5
    And the current player prompt rolls a 5
    Then the prompt should reference follow up ruleId "diceRollRuleId_isAny_A"

  Scenario: any match roll based outcome B
    When the current player rolls to land on ruleId "diceRollRuleId_isAny"
    Then the prompt should reference ruleId "diceRollRuleId_isAny"
    And the current player should have a "promptRoll" prompt action
    When the current player prompt rolls a 5
    And the current player prompt rolls a 5
    And the current player prompt rolls a 5
    Then the prompt should reference follow up ruleId "diceRollRuleId_isAny_B"

  # TODO - allMatch? Not currently used in DiceRollRule directly
Feature: Choice rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2" and board "testing-board"
    And the game is started

  Scenario: with dice rolls
    When the current player rolls to land on ruleId "choiceRuleId_diceRolls"
    Then the prompt should reference ruleId "choiceRuleId_diceRolls"
    And the current player should have a "promptRoll" prompt action

  Scenario: choosing a rule
    When the current player rolls to land on ruleId "choiceRuleId_choices"
    Then the prompt should reference ruleId "choiceRuleId_choices"
    And the current player should have a "promptSelectCustom" prompt action
    And the custom options should include "choiceRuleId_choices_A,choiceRuleId_choices_B"
    When the current player selects custom option "choiceRuleId_choices_A"
    Then the prompt should reference follow up ruleId "choiceRuleId_choices_A"
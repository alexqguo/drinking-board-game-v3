Feature: Group action rule
  Background:
    Given the game engine is initialized
    And the game is created with players "P1,P2,P3" and board "testing-board"
    And the game is started

  Scenario: dice rolls
    When I remember the game state
    And the current player rolls to land on ruleId "groupActionRuleId_diceRolls"
    Then the prompt should reference ruleId "groupActionRuleId_diceRolls"
    And "P1" should have a "promptRoll" prompt action
    And "P2" should have a "promptRoll" prompt action
    And "P3" should have a "promptRoll" prompt action
    When "P1" prompt rolls a 1
    And "P2" prompt rolls a 1
    And "P3" prompt rolls a 1
    Then the current player should have a "promptClose" prompt action
    And "P1" game state data should be unchanged except for location and visited tiles
    And "P2" game state data should be unchanged
    And "P3" game state data should be unchanged

  Scenario: items
    When I remember the game state
    And the current player rolls to land on ruleId "groupActionRuleId_items"
    Then the prompt should reference ruleId "groupActionRuleId_items"
    And "P1" should have a "promptSelectCustom" prompt action
    And "P2" should have a "promptSelectCustom" prompt action
    And "P3" should have a "promptSelectCustom" prompt action
    When "P1" selects custom option "test_item_1"
    And "P2" selects custom option "test_item_2"
    And "P3" selects custom option "test_item_3"
    Then the current player should have a "promptClose" prompt action
    And "P1" should have the item "test_item_1"
    And "P2" should have the item "test_item_2"
    And "P3" should have the item "test_item_3"
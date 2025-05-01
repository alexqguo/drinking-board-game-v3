/**
 * Rule schemas for board game validation
 */
import { z } from 'zod';
import {
  diceRollTypeSchema,
  directionSchema,
  grantSchema,
  playerTargetTypeSchema,
} from './basic-types.js';

// Player targeting - recursive schema
export const playerTargetSchema: z.ZodType<any> = z
  .lazy(() =>
    z
      .object({
        type: playerTargetTypeSchema,
      })
      .and(
        z.discriminatedUnion('type', [
          z.object({
            type: z.literal('custom'),
            candidates: playerTargetSchema.optional(),
          }),
          z.object({
            type: z.literal('self'),
          }),
          z.object({
            type: z.literal('allOthers'),
          }),
          z.object({
            type: z.literal('all'),
          }),
          z.object({
            type: z.literal('closestAhead'),
          }),
          z.object({
            type: z.literal('zone'),
            zoneId: z.string(),
          }),
          z.object({
            type: z.literal('range'),
            range: z.tuple([z.number(), z.number()]),
          }),
        ]),
      ),
  )
  .describe('Specifies which players a rule or effect targets');
export type PlayerTarget = z.infer<typeof playerTargetSchema>;

// ==========================================
// Core Rule schema (base definition)
// ==========================================
export const ruleSchemaBase = z
  .interface({
    type: z.string(),
    id: z.string(),
    'grants?': z.array(z.tuple([playerTargetSchema, grantSchema])),
  })
  .describe('Base schema for all rule types');

export type RuleSchema = z.infer<typeof ruleSchemaBase>;

// ==========================================
// Supporting schemas for rules
// ==========================================
export const rollUntilCriteriaSchema = z
  .union([
    z.tuple([z.literal('match'), z.array(z.number())]),
    z.tuple([z.literal('consecutiveMatch'), z.number()]),
  ])
  .describe('Criteria for continuing to roll dice');
export type RollUntilCriteria = z.infer<typeof rollUntilCriteriaSchema>;

export const outcomeSchema = z
  .lazy(() =>
    z.interface({
      rule: ruleSchemaBase,
      criteria: z.array(z.number()),
      'isAny?': z.boolean(),
    }),
  )
  .describe('Defines what happens based on a specific dice roll outcome');
export type OutcomeSchema = z.infer<typeof outcomeSchema>;

export const choiceSchema = z
  .lazy(() =>
    z.object({
      rule: ruleSchemaBase,
      textKey: z.string(),
    }),
  )
  .describe('A choice option that can be presented to a player');
export type ChoiceSchema = z.infer<typeof choiceSchema>;

export const diceRollSchema = z
  .interface({
    'outcomes?': z.array(outcomeSchema),
    numRequired: z.number(),
    'cumulative?': z.boolean(),
    type: diceRollTypeSchema,
  })
  .describe('Configuration for dice rolling behavior');
export type DiceRollSchema = z.infer<typeof diceRollSchema>;

export const moveConditionSchema = z
  .interface({
    criteria: z.array(z.number()),
    numSuccessesRequired: z.number(),
    'immediate?': z.boolean(),
    'consequence?': ruleSchemaBase,
    description: z.string(),
    'diceRolls?': diceRollSchema,
  })
  .describe('Condition that must be met for a player to move');
export type MoveConditionSchema = z.infer<typeof moveConditionSchema>;

// ==========================================
// Rule-specific schemas
// ==========================================

// Display Rule - simple rule that displays text to the player
export const displayRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('DisplayRule'),
    displayTextKey: z.string(),
    'skipPrompt?': z.boolean(),
  })
  .describe('A rule that displays text to the player');
export type DisplayRule = z.infer<typeof displayRuleSchema>;

// Move Rule - moves a player in a specified direction
export const moveRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('MoveRule'),
    playerTarget: playerTargetSchema,
  })
  .and(
    z.union([
      z.object({ numSpaces: z.number() }),
      z.object({ direction: directionSchema }),
      z.object({ diceRolls: diceRollSchema }),
      z.object({ tileIndex: z.number() }),
      z.object({ isSwap: z.boolean() }),
    ]),
  )
  .describe('A rule that moves players on the board');
export type MoveRule = z.infer<typeof moveRuleSchema>;

// Roll Until Rule - player rolls until a condition is met
export const rollUntilRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('RollUntilRule'),
    criteria: rollUntilCriteriaSchema,
  })
  .describe('A rule where players roll until a specific condition is met');
export type RollUntilRule = z.infer<typeof rollUntilRuleSchema>;

// Dice Roll Rule - outcomes depend on dice roll result
export const diceRollRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('DiceRollRule'),
    diceRolls: diceRollSchema,
  })
  .describe('A rule where different outcomes occur based on dice rolls');
export type DiceRollRule = z.infer<typeof diceRollRuleSchema>;

// Game Over Rule - ends the game
export const gameOverRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('GameOverRule'),
    winnerTextKey: z.string(),
  })
  .describe('A rule that ends the game');
export type GameOverRule = z.infer<typeof gameOverRuleSchema>;

// Drink During Lost Turns Rule - special rule for SS Anne
export const drinkDuringLostTurnsRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('DrinkDuringLostTurnsRule'),
    amount: z.number(),
  })
  .describe('A rule that applies an effect during lost turns');
export type DrinkDuringLostTurnsRule = z.infer<typeof drinkDuringLostTurnsRuleSchema>;

// Apply Move Condition Rule - applies a condition that must be met to move
export const applyMoveConditionRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('ApplyMoveConditionRule'),
    condition: moveConditionSchema,
    playerTarget: playerTargetSchema,
  })
  .describe('A rule that applies a condition that must be met before a player can move');
export type ApplyMoveConditionRule = z.infer<typeof applyMoveConditionRuleSchema>;

// Choice Rule - presents player with choices
export const choiceRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('ChoiceRule'),
    promptTextKey: z.string(),
    options: z.array(choiceSchema),
    diceRolls: diceRollSchema.optional(),
  })
  .describe('A rule that presents players with choices');
export type ChoiceRule = z.infer<typeof choiceRuleSchema>;

// Challenge Rule - player challenges another player
export const challengeRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('ChallengeRule'),
    promptTextKey: z.string(),
    successRule: ruleSchemaBase,
    failureRule: ruleSchemaBase,
  })
  .describe('A rule for player challenges with success and failure outcomes');
export type ChallengeRule = z.infer<typeof challengeRuleSchema>;

// Group Action Rule - all players perform an action
export const groupActionRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('GroupActionRule'),
    promptTextKey: z.string(),
    'groupSize?': z.number(),
  })
  .and(
    z
      .union([z.object({ diceRolls: diceRollSchema }), z.object({ itemIds: z.array(z.string()) })])
      .optional(),
  )
  .describe('A rule where all players perform an action');
export type GroupActionRule = z.infer<typeof groupActionRuleSchema>;

// Proxy Rule - redirects to another rule
export const proxyRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('ProxyRule'),
    targetRuleId: z.string(),
  })
  .describe('A rule that redirects to another rule');
export type ProxyRule = z.infer<typeof proxyRuleSchema>;

// Item Based Rule - rule behavior depends on if player has an item
export const itemBasedRuleSchema = ruleSchemaBase
  .extend({
    type: z.literal('ItemBasedRule'),
    conditions: z.array(z.tuple([z.string(), z.boolean(), ruleSchemaBase])),
  })
  .describe('A rule that behaves differently based on player items');
export type ItemBasedRule = z.infer<typeof itemBasedRuleSchema>;

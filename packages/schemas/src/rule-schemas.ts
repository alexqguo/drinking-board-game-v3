/**
 * Rule schemas for board game validation
 */
import { z } from 'zod';
import { diceRollTypeSchema, directionSchema, grantSchema, ruleTypeSchema } from './basic-types.js';

// Player targeting - recursive schema
import { PlayerTargetTypeEnum } from './basic-types.js';

// TypeScript recursive type for PlayerTarget
export type PlayerTarget =
  | { type: typeof PlayerTargetTypeEnum.custom; candidates?: PlayerTarget }
  | { type: typeof PlayerTargetTypeEnum.self }
  | { type: typeof PlayerTargetTypeEnum.allOthers }
  | { type: typeof PlayerTargetTypeEnum.all }
  | { type: typeof PlayerTargetTypeEnum.closestAhead }
  | { type: typeof PlayerTargetTypeEnum.zone; zoneId: string }
  | { type: typeof PlayerTargetTypeEnum.range; range: [number, number] };

export const playerTargetSchema: z.ZodType<PlayerTarget> = z
  .lazy(() =>
    z.union([
      z.object({
        type: z.literal(PlayerTargetTypeEnum.custom),
        candidates: playerTargetSchema.optional(),
      }),
      z.object({ type: z.literal(PlayerTargetTypeEnum.self) }),
      z.object({ type: z.literal(PlayerTargetTypeEnum.allOthers) }),
      z.object({ type: z.literal(PlayerTargetTypeEnum.all) }),
      z.object({ type: z.literal(PlayerTargetTypeEnum.closestAhead) }),
      z.object({
        type: z.literal(PlayerTargetTypeEnum.zone),
        zoneId: z.string(),
      }),
      z.object({
        type: z.literal(PlayerTargetTypeEnum.range),
        range: z.tuple([z.number(), z.number()]),
      }),
    ]),
  )
  .describe('Specifies which players a rule or effect targets');

// ==========================================
// Core Rule schema (base definition)
// ==========================================
export const baseRuleSchema = z
  .interface({
    id: z.string(),
    type: ruleTypeSchema,
    'grants?': z.array(z.tuple([playerTargetSchema, grantSchema])),
  })
  .describe('Base schema for all rule types');
// Nothing should really be referencing the Base schema directly...
export type BaseRuleSchema = z.infer<typeof baseRuleSchema>;

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
      rule: baseRuleSchema,
      criteria: z.array(z.number()),
      'isAny?': z.boolean(),
    }),
  )
  .describe('Defines what happens based on a specific dice roll outcome');
export type OutcomeSchema = z.infer<typeof outcomeSchema>;

export const choiceSchema = z
  .lazy(() =>
    z.object({
      rule: baseRuleSchema,
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
    'consequence?': baseRuleSchema,
    description: z.string(),
    'diceRolls?': diceRollSchema,
  })
  .describe('Condition that must be met for a player to move');
export type MoveConditionSchema = z.infer<typeof moveConditionSchema>;

// ==========================================
// Rule-specific schemas
// ==========================================

// Display Rule - simple rule that displays text to the player
export const displayRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('DisplayRule'),
    displayTextKey: z.string(),
    'skipPrompt?': z.boolean(),
  })
  .describe('A rule that displays text to the player');
export type DisplayRule = z.infer<typeof displayRuleSchema>;

// Move Rule - moves a player in a specified direction
export const moveRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('MoveRule'),
    playerTarget: playerTargetSchema,
    numSpaces: z.number().optional(),
    direction: directionSchema.optional(),
    diceRolls: diceRollSchema.optional(),
    tileIndex: z.number().optional(),
    isSwap: z.boolean().optional(),
  })
  // Ensures at least one is present
  // TODO - put this in a common utility
  .refine(
    (data) =>
      data.numSpaces !== undefined ||
      data.direction !== undefined ||
      data.diceRolls !== undefined ||
      data.tileIndex !== undefined ||
      data.isSwap !== undefined,
    {
      message:
        'At least one of numSpaces, direction, diceRolls, tileIndex, or isSwap must be provided',
      path: [], // applies to the whole object
    },
  )
  .describe('A rule that moves players on the board');
export type MoveRule = z.infer<typeof moveRuleSchema>;

// Roll Until Rule - player rolls until a condition is met
export const rollUntilRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('RollUntilRule'),
    criteria: rollUntilCriteriaSchema,
  })
  .describe('A rule where players roll until a specific condition is met');
export type RollUntilRule = z.infer<typeof rollUntilRuleSchema>;

// Dice Roll Rule - outcomes depend on dice roll result
export const diceRollRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('DiceRollRule'),
    diceRolls: diceRollSchema,
  })
  .describe('A rule where different outcomes occur based on dice rolls');
export type DiceRollRule = z.infer<typeof diceRollRuleSchema>;

// Game Over Rule - ends the game
export const gameOverRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('GameOverRule'),
    winnerTextKey: z.string(),
  })
  .describe('A rule that ends the game');
export type GameOverRule = z.infer<typeof gameOverRuleSchema>;

// Drink During Lost Turns Rule - special rule for SS Anne
export const drinkDuringLostTurnsRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('DrinkDuringLostTurnsRule'),
    diceRolls: diceRollSchema,
  })
  .describe('A rule that applies an effect during lost turns');
export type DrinkDuringLostTurnsRule = z.infer<typeof drinkDuringLostTurnsRuleSchema>;

// Apply Move Condition Rule - applies a condition that must be met to move
export const applyMoveConditionRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('ApplyMoveConditionRule'),
    condition: moveConditionSchema,
    playerTarget: playerTargetSchema,
  })
  .describe('A rule that applies a condition that must be met before a player can move');
export type ApplyMoveConditionRule = z.infer<typeof applyMoveConditionRuleSchema>;

// Choice Rule - presents player with choices
export const choiceRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('ChoiceRule'),
    promptTextKey: z.string(),
    choices: z.array(choiceSchema),
    diceRolls: diceRollSchema.optional(),
  })
  .describe('A rule that presents players with choices');
export type ChoiceRule = z.infer<typeof choiceRuleSchema>;

// Challenge Rule - player challenges another player
export const challengeRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('ChallengeRule'),
    promptTextKey: z.string(),
    successRule: baseRuleSchema,
    failureRule: baseRuleSchema,
  })
  .describe('A rule for player challenges with success and failure outcomes');
export type ChallengeRule = z.infer<typeof challengeRuleSchema>;

// Group Action Rule - all players perform an action
export const groupActionRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('GroupActionRule'),
    promptTextKey: z.string(),
    'groupSize?': z.number(),
    diceRolls: diceRollSchema.optional(),
    itemIds: z.array(z.string()).optional(),
  })
  // TODO - use common utility
  .refine(
    (data) =>
      data.itemIds !== undefined ||
      data.diceRolls !== undefined || {
        message: 'At least one of diceRolls or itemIds must be provided',
        path: [], // applies to the whole object
      },
  )
  .describe('A rule where all players perform an action');
export type GroupActionRule = z.infer<typeof groupActionRuleSchema>;

// Proxy Rule - redirects to another rule
export const proxyRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('ProxyRule'),
    proxyRuleId: z.string(),
  })
  .describe('A rule that redirects to another rule');
export type ProxyRule = z.infer<typeof proxyRuleSchema>;

// Item Based Rule - rule behavior depends on if player has an item
export const itemBasedRuleSchema = baseRuleSchema
  .extend({
    type: z.literal('ItemBasedRule'),
    conditions: z.array(z.tuple([z.string(), z.boolean(), baseRuleSchema])),
  })
  .describe('A rule that behaves differently based on player items');
export type ItemBasedRule = z.infer<typeof itemBasedRuleSchema>;

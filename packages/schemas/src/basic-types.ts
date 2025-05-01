/**
 * Basic types and enums for board game schemas
 */
import { z } from 'zod';

// ==========================================
// Basic types
// ==========================================
export const pointSchema = z
  .object({
    x: z.number(),
    y: z.number(),
  })
  .describe('A 2D coordinate point on the board');

export type Point = z.infer<typeof pointSchema>;

// ==========================================
// Enums - matching the ones from engine and @repo/enums
// ==========================================
export const mandatoryTypeSchema = z
  .enum(['always', 'once'])
  .describe('Determines how a tile behaves when landed on multiple times');
export const MandatoryType = mandatoryTypeSchema.enum;

export const zoneTypeSchema = z
  .enum(['passive', 'active', 'passiveLeader'])
  .describe('Determines how a zone activates for players');
/* export type ZoneType = z.infer<typeof zoneTypeSchema>; */
export const ZoneType = zoneTypeSchema.enum;

export const modifierOperationSchema = z
  .enum(['+', '*', '-', '='])
  .describe('Operations that can be applied to player attributes');
/* export type ModifierOperation = z.infer<typeof modifierOperationSchema>; */
export const ModifierOperation = modifierOperationSchema.enum;

export const gameStateSchema = z
  .enum([
    'NotStarted',
    'GameStart',
    'StarterSelect',
    'TurnCheck',
    'ZoneCheck',
    'TurnStart',
    'TurnMultirollConditionCheck',
    'RollStart',
    'RollEnd',
    'MoveCalculate',
    'MoveStart',
    'MoveEnd',
    'RuleTrigger',
    'RuleEnd',
    'TurnEnd',
    'GameOver',
    'TurnSkip',
    'LostTurnStart',
    'Battle',
  ])
  .describe('Represents the current state of the game');
export type GameState = z.infer<typeof gameStateSchema>;
export const GameStateEnum = gameStateSchema.enum;

export const actionTypeSchema = z
  .enum([
    'gameCreate',
    'gameStart',
    'turnRoll',
    'turnRollSkip',
    'turnRollAugment',
    'promptClose',
    'promptRoll',
    'promptSelectPlayer',
    'promptGrantSelectPlayer',
    'promptSelectCustom',
    'battleRoll',
  ])
  .describe('Types of actions that can be performed in the game');
/* export type ActionType = z.infer<typeof actionTypeSchema>; */
export const ActionType = actionTypeSchema.enum;

export const directionSchema = z
  .enum(['forward', 'back'])
  .describe('Direction of movement on the board');
/* export type Direction = z.infer<typeof directionSchema>; */
export const Direction = directionSchema.enum;

export const diceRollTypeSchema = z
  .enum(['cumulative', 'default', 'allMatch'])
  .describe('Types of dice roll behaviors');
/* export type DiceRollType = z.infer<typeof diceRollTypeSchema>; */
export const DiceRollType = diceRollTypeSchema.enum;

export const playerTargetTypeSchema = z
  .enum(['custom', 'self', 'allOthers', 'all', 'closestAhead', 'zone', 'range'])
  .describe('Types of player targeting for rules and effects');
/* export type PlayerTargetType = z.infer<typeof playerTargetTypeSchema>; */
export const PlayerTargetType = playerTargetTypeSchema.enum;

export const ruleTypeSchema = z
  .enum([
    'DisplayRule',
    'MoveRule',
    'RollUntilRule',
    'DiceRollRule',
    'GameOverRule',
    'DrinkDuringLostTurnsRule',
    'ApplyMoveConditionRule',
    'ChoiceRule',
    'ChallengeRule',
    'GroupActionRule',
    'ProxyRule',
    'ItemBasedRule',
  ])
  .describe('Types of rules that can be applied to tiles and zones');
/* export type RuleType = z.infer<typeof ruleTypeSchema>; */
export const RuleType = ruleTypeSchema.enum;

// ==========================================
// Grant schema (needed for rules)
// ==========================================
/**
 * Grant schema (Zod v4, key-optional, strict, matches engine)
 */
export const grantSchema = z
  .interface({
    'metadata?': z
      .interface({
        'turnOrder?': z.tuple([modifierOperationSchema, z.number()]),
      })
      .strict(),
    'effects?': z
      .interface({
        'anchors?': z.tuple([modifierOperationSchema, z.number()]),
        'extraTurns?': z.tuple([modifierOperationSchema, z.number()]),
        'immediateTurns?': z.tuple([modifierOperationSchema, z.number()]),
        'skippedTurns?': z.tuple([modifierOperationSchema, z.number()]),
        'mandatorySkips?': z.tuple([modifierOperationSchema, z.number()]),
        'customMandatoryTileIndex?': z.tuple([modifierOperationSchema, z.number()]),
        'rollAugmentation?': z.tuple([modifierOperationSchema, z.number()]),
        'speedModifier?': z.object({
          numTurns: z.number(),
          modifier: z.tuple([modifierOperationSchema, z.number()]),
        }),
        'itemIds?': z.union([
          z.tuple([z.literal('+'), z.string()]),
          z.tuple([z.literal('='), z.array(z.string())]),
        ]),
      })
      .strict(),
  })
  .strict()
  .describe('A grant represents an effect that can be applied to players or the game state');
export type Grant = z.infer<typeof grantSchema>;

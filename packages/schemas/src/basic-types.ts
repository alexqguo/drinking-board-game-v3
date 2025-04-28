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
// Enums - matching the ones from @repo/enums
// ==========================================
export const mandatoryTypeSchema = z
  .enum(['always', 'once'])
  .describe('Determines how a tile behaves when landed on multiple times');
export type MandatoryType = z.infer<typeof mandatoryTypeSchema>;

export const zoneTypeSchema = z
  .enum(['passive', 'active', 'passiveLeader'])
  .describe('Determines how a zone activates for players');
export type ZoneType = z.infer<typeof zoneTypeSchema>;

export const modifierOperationSchema = z
  .enum(['add', 'subtract', 'multiply', 'divide', 'set'])
  .describe('Operations that can be applied to player attributes');
export type ModifierOperation = z.infer<typeof modifierOperationSchema>;

export const gameStateSchema = z
  .enum([
    'waiting',
    'starting',
    'rollingDice',
    'moving',
    'tileRule',
    'zoneRuleActive',
    'zoneRulePassive',
    'endingTurn',
    'gameOver',
  ])
  .describe('Represents the current state of the game');
export type GameState = z.infer<typeof gameStateSchema>;

export const actionTypeSchema = z
  .enum(['roll', 'choice', 'challenge', 'groupAction', 'useItem', 'admin'])
  .describe('Types of actions that can be performed in the game');
export type ActionType = z.infer<typeof actionTypeSchema>;

export const directionSchema = z
  .enum(['forward', 'back'])
  .describe('Direction of movement on the board');
export type Direction = z.infer<typeof directionSchema>;

export const diceRollTypeSchema = z
  .enum(['cumulative', 'default', 'allMatch'])
  .describe('Types of dice roll behaviors');
export type DiceRollType = z.infer<typeof diceRollTypeSchema>;

export const playerTargetTypeSchema = z
  .enum(['custom', 'self', 'allOthers', 'all', 'closestAhead', 'zone', 'range'])
  .describe('Types of player targeting for rules and effects');
export type PlayerTargetType = z.infer<typeof playerTargetTypeSchema>;

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
export type RuleType = z.infer<typeof ruleTypeSchema>;

// ==========================================
// Grant schema (needed for rules)
// ==========================================
export const grantSchema = z
  .object({
    type: z.string(),
    value: z.number().or(z.string()).optional(),
    operation: modifierOperationSchema.optional(),
    duration: z.number().optional(),
  })
  .describe('A grant represents an effect that can be applied to players or the game state');
export type Grant = z.infer<typeof grantSchema>;

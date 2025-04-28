/**
 * Board schema definitions using Zod v4
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
// Grant schema (needed early)
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
// Core Rule schema (base definition moved up)
// ==========================================
export const ruleSchemaBase = z
  .object({
    type: z.string(),
    id: z.string().optional(),
    grants: z.array(z.tuple([playerTargetSchema, grantSchema])).optional(),
  })
  .passthrough() // Allow additional properties for different rule types
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
    z.object({
      rule: ruleSchemaBase,
      criteria: z.array(z.number()),
      isAny: z.boolean().optional(),
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
  .object({
    outcomes: z.array(outcomeSchema).optional(),
    numRequired: z.number(),
    cumulative: z.boolean().optional(),
    type: diceRollTypeSchema,
  })
  .describe('Configuration for dice rolling behavior');
export type DiceRollSchema = z.infer<typeof diceRollSchema>;

export const moveConditionSchema = z
  .object({
    criteria: z.array(z.number()),
    numSuccessesRequired: z.number(),
    immediate: z.boolean().optional(),
    consequence: ruleSchemaBase.optional(),
    description: z.string(),
    diceRolls: diceRollSchema.optional(),
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
    skipPrompt: z.boolean().optional(),
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
    groupSize: z.number().optional(),
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

// ==========================================
// Context-related schemas
// ==========================================

// Player schema
export const playerSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    position: z.number(),
    lostTurns: z.number().optional(),
    speed: z.number().optional(),
    items: z.array(z.string()).optional(),
    effects: z.record(z.string(), z.any()).optional(),
    isActive: z.boolean().optional(),
    isHost: z.boolean().optional(),
  })
  .describe('Player state in the game');
export type Player = z.infer<typeof playerSchema>;

// Prompt Action schema
export const promptActionSchema = z
  .object({
    type: z.string(),
    payload: z.record(z.string(), z.any()).optional(),
  })
  .describe('An action that prompts the player for input');
export type PromptAction = z.infer<typeof promptActionSchema>;

// Context schema - simplified version for validation
export const contextSchema = z
  .object({
    gameId: z.string(),
    players: z.array(playerSchema),
    currentPlayerIndex: z.number(),
    gameState: gameStateSchema,
    metadata: z.record(z.string(), z.any()).optional(),
    board: z.unknown().optional(), // Reference to BoardSchema, circular reference handled by making it unknown
    log: z.array(z.any()).optional(),
  })
  .describe('Current game state and context');
export type Context = z.infer<typeof contextSchema>;

// ==========================================
// Handlers and Factories (using a simpler approach for Zod v4)
// ==========================================

// Define handler interfaces manually to avoid Zod function schema issues
export interface ActionHandler {
  handle: (data: Record<string, any>) => Promise<Context>;
}

export interface GameStateHandler {
  handle: () => Promise<Context>;
}

// Define the factory types directly without using Zod function schemas
export interface ActionHandlerFactory<T = any> {
  (context: Context): ActionHandler;
}

export interface GameStateHandlerFactory {
  (context: Context): GameStateHandler;
}

// ==========================================
// Board Component schemas
// ==========================================

// Tile schema
export const tileSchema = z
  .object({
    mandatoryType: mandatoryTypeSchema.optional(),
    rule: ruleSchemaBase,
    position: z.array(pointSchema),
    zoneId: z.string().optional(),
  })
  .describe('A tile on the game board');

export type TileSchema = z.infer<typeof tileSchema>;

// Zone schema
export const zoneSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: zoneTypeSchema,
    rule: ruleSchemaBase,
  })
  .describe('A zone on the game board');

export type ZoneSchema = z.infer<typeof zoneSchema>;

// Item schema
export const itemSchema = z
  .object({
    id: z.string(),
    nameStrId: z.string(),
    descriptionStrId: z.string(),
  })
  .describe('An item that can be obtained in the game');

export type ItemSchema = z.infer<typeof itemSchema>;

// I18n schema
export const i18nSchema = z
  .record(z.string(), z.record(z.string(), z.string()))
  .describe('Internationalization strings for the game');

export type I18nSchema = z.infer<typeof i18nSchema>;

// ==========================================
// Board and Module schemas
// ==========================================

// Board schema
export const boardSchema = z
  .object({
    imageUrl: z.string().describe('URL to the board image'),
    tiles: z.array(tileSchema).describe('Tiles on the board'),
    zones: z.array(zoneSchema).describe('Zones on the board'),
    items: z.array(itemSchema).describe('Items available in the game'),
    i18n: i18nSchema.describe('Internationalization strings'),
  })
  .describe('The complete game board configuration');

export type BoardSchema = z.infer<typeof boardSchema>;

// Game extension info
export const gameExtensionInfoSchema = z
  .object({
    gameState: z
      .record(z.string(), z.object({}).passthrough())
      .optional()
      .describe('Custom game state handlers'),
    actions: z
      .record(z.string(), z.object({}).passthrough())
      .optional()
      .describe('Custom action handlers'),
  })
  .describe('Custom extensions to the game engine');

export type GameExtensionInfo = z.infer<typeof gameExtensionInfoSchema>;

// Board module - the main schema
export const boardModuleSchema = z
  .object({
    board: boardSchema.describe('The game board configuration'),
    gameExtensionInfo: gameExtensionInfoSchema.optional().describe('Custom game extensions'),
  })
  .describe('The complete board module including board schema and extensions');

export type BoardModule = z.infer<typeof boardModuleSchema>;

// Export validation functions
export function validateBoardModule(data: unknown): boolean {
  const result = boardModuleSchema.safeParse(data);
  return result.success;
}

export function validateBoardModuleStrict(data: unknown): void {
  boardModuleSchema.parse(data);
}

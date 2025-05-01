/**
 * Board component schemas for game board validation
 */
import { z } from 'zod';
import { mandatoryTypeSchema, pointSchema, zoneTypeSchema } from './basic-types.js';
import { ruleSchemaBase } from './rule-schemas.js';

// ==========================================
// Board Component schemas
// ==========================================

// Tile schema
export const tileSchema = z
  .interface({
    'mandatoryType?': mandatoryTypeSchema,
    rule: ruleSchemaBase,
    position: z.array(pointSchema),
    'zoneId?': z.string(),
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

// Game extension info schema - simplified to avoid circular dependencies
export const gameExtensionInfoSchema = z
  .interface({
    'gameState?': z
      .record(z.string(), z.any())
      .describe('Custom game state handlers as a map of state names to handler functions'),
    'actions?': z
      .record(z.string(), z.any())
      .describe('Custom action handlers as a map of action types to handler functions'),
  })
  .describe('Custom extensions to the game engine');

export type GameExtensionInfo = z.infer<typeof gameExtensionInfoSchema>;

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

// Board module - the main schema
export const boardModuleSchema = z
  .interface({
    board: boardSchema.describe('The game board configuration'),
    'gameExtensionInfo?': gameExtensionInfoSchema.describe('Custom game extensions'),
  })
  .describe('The complete board module including board schema and extensions');

export type BoardModule = z.infer<typeof boardModuleSchema>;

import { ActionHandlerFactory } from '../actions/actions.types.js';
import { GameStateHandlerFactory } from '../gamestate/gamestate.types.js';
import { RuleSchema } from '../rules/rules.types.js';

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface BoardModule {
  board: BoardSchema;
  gameExtensionInfo?: GameExtensionInfo;
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export enum MandatoryType {
  always = 'always',
  once = 'once',
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface GameExtensionInfo {
  gameState?: { [key: string]: GameStateHandlerFactory };
  actions?: { [key: string]: ActionHandlerFactory<any> }; //todo- fix the any?
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface BoardSchema {
  imageUrl: string;
  tiles: TileSchema[];
  zones: ZoneSchema[];
  items: ItemSchema[];
  i18n: I18nSchema;
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface Point {
  x: number;
  y: number;
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface TileSchema {
  mandatoryType?: MandatoryType;
  rule: RuleSchema;
  position: Point[];
  zoneId?: string;
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface ZoneSchema {
  id: string;
  name: string;
  type: ZoneType;
  rule: RuleSchema;
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface ItemSchema {
  id: string;
  nameStrId: string;
  descriptionStrId: string;
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export interface I18nSchema {
  // Locale
  [key: string]: {
    // String ID -> value
    [key: string]: string;
  };
}

/** SCHEMA_EQUIVALENT: Replace with @repo/schemas */
export enum ZoneType {
  passive = 'passive',
  active = 'active',
  passiveLeader = 'passiveLeader',
}

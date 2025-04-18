import { ActionHandlerFactory } from '../actions/actions.types.js';
import { GameStateHandlerFactory } from '../gamestate/gamestate.types.js';
import { RuleSchema } from '../rules/rules.types.js';

export interface BoardModule {
  board: BoardSchema,
  gameExtensionInfo?: GameExtensionInfo,
}

export enum MandatoryType {
  always = 'always',
  once = 'once',
}

export interface GameExtensionInfo {
  gameState?: { [key: string]: GameStateHandlerFactory },
  actions?: { [key: string]: ActionHandlerFactory<any> }, //todo- fix the any?
}

export interface BoardSchema {
  imageUrl: string;
  tiles: TileSchema[],
  zones: ZoneSchema[],
  items: ItemSchema[],
  i18n: I18nSchema
}

export interface Point {
  x: number,
  y: number,
}

export interface TileSchema {
  mandatoryType?: MandatoryType,
  rule: RuleSchema,
  position: Point[],
  zoneId?: string,
}

export interface ZoneSchema {
  id: string,
  name: string,
  type: ZoneType,
  rule: RuleSchema,
}

export interface ItemSchema {
  id: string;
  nameStrId: string;
  descriptionStrId: string;
}

export interface I18nSchema {
  // Locale
  [key: string]: {
    // String ID -> value
    [key: string]: string
  }
}

export enum ZoneType {
  passive = 'passive',
  active = 'active',
  passiveLeader = 'passiveLeader',
}
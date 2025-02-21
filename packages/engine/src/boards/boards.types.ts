import { RuleSchema } from '../rules/rules.types.js';

// v3 stuff
export enum BoardName {
  PokemonGen1 = 'pokemon-gen1'
}

export interface BoardModule {
  board: BoardSchema,
  gameExtensionInfo?: GameExtensionInfo,
}

export enum MandatoryType {
  always = 'always',
  once = 'once',
}

export interface GameExtensionInfo {
  gameEvents: { [key: string]: Function },
  battleHandler?: Function,
}


export interface BoardSchema {
  tiles: TileSchema[],
  zones: ZoneSchema[],
}

export interface Point {
  x: number,
  y: number,
}

export interface TileSchema {
  /**
   * @deprecated should use mandatoryType instead
   */
  mandatory?: boolean,
  mandatoryType?: MandatoryType,
  rule: RuleSchema,
  position: Point[],
  zone?: string,
}

export interface ZoneSchema {
  name: string,
  type: ZoneType,
  rule: RuleSchema,
}

export enum ZoneType {
  passive = 'passive',
  active = 'active'
}
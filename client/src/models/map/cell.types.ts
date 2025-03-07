export enum CellType {
  BUILDING = 'building',
  TERRAIN = 'terrain',
}

/**
 * Player name or 'none'
 */
export type CellOwner = string | CellOwnerType.NONE;

export enum CellOwnerType {
  NONE = 'none',
}

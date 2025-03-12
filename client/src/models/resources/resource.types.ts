export enum ResourceType {
  COAL = 'coal',
  BRONZE = 'bronze',
  IRON = 'iron',
  GOLD = 'gold',
  TURQUOISE = 'turquoise',
  ZAPHIRE = 'zaphire',
  EMERALD = 'emerald',
  RUBI = 'rubi',
  DIAMOND = 'diamond',
}

/**
 * Resource's Quantity
 */
export enum QuantityType {
  PIECE = 'piece',
  BAR = 'bar',
  QUARRY = 'quarry', // TODO is a RAW material need to be processed at the farm
}

import { ResourceType, QuantityType } from './resource.types';

/**
 * Resources mapping values conversions using ResourceType.COAL as a base
 */
export const map__Resources: Record<ResourceType, number> = {
  [ResourceType.COAL]: 1,
  [ResourceType.BRONZE]: 4,
  [ResourceType.IRON]: 16,
  [ResourceType.GOLD]: 32,
  [ResourceType.TURQUOISE]: 128,
  [ResourceType.ZAPHIRE]: 512,
  [ResourceType.EMERALD]: 2048,
  [ResourceType.RUBI]: 8192,
  [ResourceType.DIAMOND]: 32768,
};

// TODO FUTURE IMPROVEMENT
/**
 * Quantities mapping values conversions using QuantityType.PIECE as a base
 */
export const map__Quantities: Record<QuantityType, number> = {
  [QuantityType.PIECE]: 1,
  [QuantityType.BAR]: 10,
  [QuantityType.QUARRY]: 100,
};

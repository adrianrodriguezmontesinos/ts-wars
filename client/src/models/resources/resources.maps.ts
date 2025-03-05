import { ResourceType, QuantityType } from './resources.types';

/**
 * Resources mapping values conversions using ResourceType.COIL as a base
 */
export const map__Resources: Record<ResourceType, number> = {
  [ResourceType.COIL]: 1,
  [ResourceType.BRONZE]: 2,
  [ResourceType.IRON]: 4,
  [ResourceType.GOLD]: 8,
  [ResourceType.TURQUOISE]: 16,
  [ResourceType.ZAPHIRE]: 32,
  [ResourceType.EMERALD]: 64,
  [ResourceType.RUBI]: 128,
  [ResourceType.DIAMOND]: 256,
};

/**
 * Quantities mapping values conversions using QuantityType.PIECE as a base
 */
export const map__Quantities: Record<QuantityType, number> = {
  [QuantityType.PIECE]: 1,
  [QuantityType.BAR]: 10,
  [QuantityType.QUARRY]: 100,
};

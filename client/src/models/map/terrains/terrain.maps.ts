import { Cost } from '../../commons';
import { ResourceType } from '../../resources';
import { TerrainType } from './terrain.types';

/**
 * Terrain rare ratio for each type
 */
export const map__TerrainRare: Record<TerrainType, number> = {
  // Grass
  [TerrainType.GRASS]: 100,
  [TerrainType.GRASS2]: 50,
  [TerrainType.GRASS3]: 25,
  [TerrainType.GRASS4]: 12,
  [TerrainType.GRASS5]: 6,

  // Desert
  [TerrainType.DESERT]: 80,
  [TerrainType.DESERT2]: 40,
  [TerrainType.DESERT3]: 20,
  [TerrainType.DESERT4]: 10,
  [TerrainType.DESERT5]: 5,

  // Soil
  [TerrainType.SOIL]: 60,
  [TerrainType.SOIL2]: 30,
  [TerrainType.SOIL3]: 15,
  [TerrainType.SOIL4]: 7,
  [TerrainType.SOIL5]: 3,

  // Wax
  [TerrainType.WAX]: 40,
  [TerrainType.WAX2]: 20,
  [TerrainType.WAX3]: 10,
  [TerrainType.WAX4]: 5,
  [TerrainType.WAX5]: 2,
};

// TODO MD
/**
 * Building build cost discount or amount
 */
export const map__TerrainCost: Record<TerrainType, number> = {
  // Grass
  [TerrainType.GRASS]: 0.8,
  [TerrainType.GRASS2]: 0.6,
  [TerrainType.GRASS3]: 0.3,
  [TerrainType.GRASS4]: 0.1,
  [TerrainType.GRASS5]: 0,

  // Desert
  [TerrainType.DESERT]: 0.6,
  [TerrainType.DESERT2]: 0.4,
  [TerrainType.DESERT3]: 0.2,
  [TerrainType.DESERT4]: 0.1,
  [TerrainType.DESERT5]: 0,

  // Soil
  [TerrainType.SOIL]: 0,
  [TerrainType.SOIL2]: -0.1,
  [TerrainType.SOIL3]: -0.2,
  [TerrainType.SOIL4]: -0.4,
  [TerrainType.SOIL5]: -0.6,

  // Wax
  [TerrainType.WAX]: 0,
  [TerrainType.WAX2]: -0.1,
  [TerrainType.WAX3]: -0.3,
  [TerrainType.WAX4]: -0.6,
  [TerrainType.WAX5]: -0.8,
};

/**
 * Initial terrain
 */
export const map__TerrainResource: Record<TerrainType, Cost> = {
  // Grass
  [TerrainType.GRASS]: {
    [ResourceType.COAL]: 1000000,
    [ResourceType.BRONZE]: 500000,
    [ResourceType.IRON]: 100000,
    [ResourceType.GOLD]: 50000,
    [ResourceType.TURQUOISE]: 1,
    [ResourceType.ZAPHIRE]: 0,
    [ResourceType.EMERALD]: 0,
    [ResourceType.RUBI]: 0,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.GRASS2]: {
    [ResourceType.COAL]: 10000000,
    [ResourceType.BRONZE]: 1000000,
    [ResourceType.IRON]: 500000,
    [ResourceType.GOLD]: 100000,
    [ResourceType.TURQUOISE]: 2,
    [ResourceType.ZAPHIRE]: 0,
    [ResourceType.EMERALD]: 0,
    [ResourceType.RUBI]: 0,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.GRASS3]: {
    [ResourceType.COAL]: 50000000,
    [ResourceType.BRONZE]: 10000000,
    [ResourceType.IRON]: 1000000,
    [ResourceType.GOLD]: 500000,
    [ResourceType.TURQUOISE]: 4,
    [ResourceType.ZAPHIRE]: 1,
    [ResourceType.EMERALD]: 0,
    [ResourceType.RUBI]: 0,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.GRASS4]: {
    [ResourceType.COAL]: 100000000,
    [ResourceType.BRONZE]: 100000000,
    [ResourceType.IRON]: 10000000,
    [ResourceType.GOLD]: 1000000,
    [ResourceType.TURQUOISE]: 8,
    [ResourceType.ZAPHIRE]: 2,
    [ResourceType.EMERALD]: 1,
    [ResourceType.RUBI]: 0,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.GRASS5]: {
    [ResourceType.COAL]: 500000000,
    [ResourceType.BRONZE]: 900000000,
    [ResourceType.IRON]: 50000000,
    [ResourceType.GOLD]: 10000000,
    [ResourceType.TURQUOISE]: 10,
    [ResourceType.ZAPHIRE]: 3,
    [ResourceType.EMERALD]: 2,
    [ResourceType.RUBI]: 0,
    [ResourceType.DIAMOND]: 0,
  },

  // Desert (en la tabla aparece como "dessert")
  [TerrainType.DESERT]: {
    [ResourceType.COAL]: 100000,
    [ResourceType.BRONZE]: 50000,
    [ResourceType.IRON]: 5000000,
    [ResourceType.GOLD]: 100000,
    [ResourceType.TURQUOISE]: 2,
    [ResourceType.ZAPHIRE]: 20,
    [ResourceType.EMERALD]: 0,
    [ResourceType.RUBI]: 0,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.DESERT2]: {
    [ResourceType.COAL]: 100000,
    [ResourceType.BRONZE]: 100000,
    [ResourceType.IRON]: 50000000,
    [ResourceType.GOLD]: 500000,
    [ResourceType.TURQUOISE]: 4,
    [ResourceType.ZAPHIRE]: 200,
    [ResourceType.EMERALD]: 0,
    [ResourceType.RUBI]: 0,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.DESERT3]: {
    [ResourceType.COAL]: 100000,
    [ResourceType.BRONZE]: 500000,
    [ResourceType.IRON]: 100000000,
    [ResourceType.GOLD]: 1000000,
    [ResourceType.TURQUOISE]: 8,
    [ResourceType.ZAPHIRE]: 600,
    [ResourceType.EMERALD]: 1,
    [ResourceType.RUBI]: 0,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.DESERT4]: {
    [ResourceType.COAL]: 100000,
    [ResourceType.BRONZE]: 1000000,
    [ResourceType.IRON]: 500000000,
    [ResourceType.GOLD]: 10000000,
    [ResourceType.TURQUOISE]: 16,
    [ResourceType.ZAPHIRE]: 2000,
    [ResourceType.EMERALD]: 2,
    [ResourceType.RUBI]: 1,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.DESERT5]: {
    [ResourceType.COAL]: 100000,
    [ResourceType.BRONZE]: 10000000,
    [ResourceType.IRON]: 800000000,
    [ResourceType.GOLD]: 20000000,
    [ResourceType.TURQUOISE]: 32,
    [ResourceType.ZAPHIRE]: 20000,
    [ResourceType.EMERALD]: 4,
    [ResourceType.RUBI]: 2,
    [ResourceType.DIAMOND]: 0,
  },

  // Soil
  [TerrainType.SOIL]: {
    [ResourceType.COAL]: 500000,
    [ResourceType.BRONZE]: 1000000,
    [ResourceType.IRON]: 1000000,
    [ResourceType.GOLD]: 100000,
    [ResourceType.TURQUOISE]: 10,
    [ResourceType.ZAPHIRE]: 30,
    [ResourceType.EMERALD]: 20,
    [ResourceType.RUBI]: 1,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.SOIL2]: {
    [ResourceType.COAL]: 5000000,
    [ResourceType.BRONZE]: 10000000,
    [ResourceType.IRON]: 10000000,
    [ResourceType.GOLD]: 500000,
    [ResourceType.TURQUOISE]: 100,
    [ResourceType.ZAPHIRE]: 300,
    [ResourceType.EMERALD]: 200,
    [ResourceType.RUBI]: 2,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.SOIL3]: {
    [ResourceType.COAL]: 50000000,
    [ResourceType.BRONZE]: 80000000,
    [ResourceType.IRON]: 50000000,
    [ResourceType.GOLD]: 2000000,
    [ResourceType.TURQUOISE]: 1000,
    [ResourceType.ZAPHIRE]: 900,
    [ResourceType.EMERALD]: 600,
    [ResourceType.RUBI]: 3,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.SOIL4]: {
    [ResourceType.COAL]: 300000000,
    [ResourceType.BRONZE]: 300000000,
    [ResourceType.IRON]: 500000000,
    [ResourceType.GOLD]: 100000000,
    [ResourceType.TURQUOISE]: 10000,
    [ResourceType.ZAPHIRE]: 3000,
    [ResourceType.EMERALD]: 2000,
    [ResourceType.RUBI]: 4,
    [ResourceType.DIAMOND]: 0,
  },
  [TerrainType.SOIL5]: {
    [ResourceType.COAL]: 900000000,
    [ResourceType.BRONZE]: 600000000,
    [ResourceType.IRON]: 800000000,
    [ResourceType.GOLD]: 200000000,
    [ResourceType.TURQUOISE]: 100000,
    [ResourceType.ZAPHIRE]: 30000,
    [ResourceType.EMERALD]: 20000,
    [ResourceType.RUBI]: 5,
    [ResourceType.DIAMOND]: 1,
  },

  // Wax
  [TerrainType.WAX]: {
    [ResourceType.COAL]: 1000,
    [ResourceType.BRONZE]: 1000,
    [ResourceType.IRON]: 1000,
    [ResourceType.GOLD]: 1000,
    [ResourceType.TURQUOISE]: 1000,
    [ResourceType.ZAPHIRE]: 100,
    [ResourceType.EMERALD]: 50,
    [ResourceType.RUBI]: 10,
    [ResourceType.DIAMOND]: 1,
  },
  [TerrainType.WAX2]: {
    [ResourceType.COAL]: 8000,
    [ResourceType.BRONZE]: 4000,
    [ResourceType.IRON]: 2000,
    [ResourceType.GOLD]: 2000,
    [ResourceType.TURQUOISE]: 10000,
    [ResourceType.ZAPHIRE]: 1000,
    [ResourceType.EMERALD]: 10000,
    [ResourceType.RUBI]: 20,
    [ResourceType.DIAMOND]: 2,
  },
  [TerrainType.WAX3]: {
    [ResourceType.COAL]: 32000,
    [ResourceType.BRONZE]: 16000,
    [ResourceType.IRON]: 4000,
    [ResourceType.GOLD]: 3000,
    [ResourceType.TURQUOISE]: 100000,
    [ResourceType.ZAPHIRE]: 50000,
    [ResourceType.EMERALD]: 20000,
    [ResourceType.RUBI]: 30,
    [ResourceType.DIAMOND]: 4,
  },
  [TerrainType.WAX4]: {
    [ResourceType.COAL]: 256000,
    [ResourceType.BRONZE]: 64000,
    [ResourceType.IRON]: 8000,
    [ResourceType.GOLD]: 4000,
    [ResourceType.TURQUOISE]: 500000,
    [ResourceType.ZAPHIRE]: 100000,
    [ResourceType.EMERALD]: 30000,
    [ResourceType.RUBI]: 40,
    [ResourceType.DIAMOND]: 8,
  },
  [TerrainType.WAX5]: {
    [ResourceType.COAL]: 1000000,
    [ResourceType.BRONZE]: 256000,
    [ResourceType.IRON]: 16000,
    [ResourceType.GOLD]: 5000,
    [ResourceType.TURQUOISE]: 1000000,
    [ResourceType.ZAPHIRE]: 500000,
    [ResourceType.EMERALD]: 50000,
    [ResourceType.RUBI]: 50,
    [ResourceType.DIAMOND]: 16,
  },
};

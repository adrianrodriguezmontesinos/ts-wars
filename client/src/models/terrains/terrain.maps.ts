import { Cost } from "../costs";
import { ResourceType } from "../resources";
import { TerrainType } from "./terrain.types";

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

// TODO
/**
 * Initial terrain 
 */
// export const map__TerrainResources: Record<TerrainType, Cost> = {
//   // Grass
//   [TerrainType.GRASS]: {
//     [ResourceType.COIL]: 1000,
//     [ResourceType.BRONZE]: 500,
//     [ResourceType.IRON]: 0,
//     [ResourceType.GOLD]: 0,
//     [ResourceType.TURQUOISE]: 0,
//     [ResourceType.ZAPHIRE]: 0,
//     [ResourceType.EMERALD]: 0,
//     [ResourceType.RUBI]: 0,
//     [ResourceType.DIAMOND]: 0,
//   },
//   [TerrainType.GRASS2]: 50,
//   [TerrainType.GRASS3]: 25,
//   [TerrainType.GRASS4]: 12,
//   [TerrainType.GRASS5]: 6,

//   // Desert
//   [TerrainType.DESERT]: 80,
//   [TerrainType.DESERT2]: 40,
//   [TerrainType.DESERT3]: 20,
//   [TerrainType.DESERT4]: 10,
//   [TerrainType.DESERT5]: 5,

//   // Soil
//   [TerrainType.SOIL]: 60,
//   [TerrainType.SOIL2]: 30,
//   [TerrainType.SOIL3]: 15,
//   [TerrainType.SOIL4]: 7,
//   [TerrainType.SOIL5]: 3,

//   // Wax
//   [TerrainType.WAX]: 40,
//   [TerrainType.WAX2]: 20,
//   [TerrainType.WAX3]: 10,
//   [TerrainType.WAX4]: 5,
//   [TerrainType.WAX5]: 2,
// };

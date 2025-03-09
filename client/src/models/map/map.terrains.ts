import { Sprite, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH } from '../commons';
import { TerrainType } from '../terrains';

const buildingsTile = '/public/buildings/terrains.png';

export const terrainSprites: Record<TerrainType, Sprite> = {
  [TerrainType.GRASS]: new Sprite(buildingsTile, 5, 1, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [TerrainType.GRASS2]: new Sprite(
    buildingsTile,
    4,
    10,
    TERRAIN_SPRITE_WIDTH,
    TERRAIN_SPRITE_HEIGTH,
  ),
  [TerrainType.GRASS3]: new Sprite(
    buildingsTile,
    4,
    8,
    TERRAIN_SPRITE_WIDTH,
    TERRAIN_SPRITE_HEIGTH,
  ),
  [TerrainType.GRASS4]: new Sprite(
    buildingsTile,
    4,
    5,
    TERRAIN_SPRITE_WIDTH,
    TERRAIN_SPRITE_HEIGTH,
  ),
  [TerrainType.GRASS5]: new Sprite(
    buildingsTile,
    4,
    7,
    TERRAIN_SPRITE_WIDTH,
    TERRAIN_SPRITE_HEIGTH,
  ),

  [TerrainType.DESERT]: new Sprite(
    buildingsTile,
    2,
    3,
    TERRAIN_SPRITE_WIDTH,
    TERRAIN_SPRITE_HEIGTH,
  ),
  [TerrainType.DESERT2]: new Sprite(
    buildingsTile,
    1,
    11,
    TERRAIN_SPRITE_WIDTH,
    TERRAIN_SPRITE_HEIGTH,
  ),
  [TerrainType.DESERT3]: new Sprite(
    buildingsTile,
    1,
    9,
    TERRAIN_SPRITE_WIDTH,
    TERRAIN_SPRITE_HEIGTH,
  ),
  [TerrainType.DESERT4]: new Sprite(
    buildingsTile,
    1,
    6,
    TERRAIN_SPRITE_WIDTH,
    TERRAIN_SPRITE_HEIGTH,
  ),
  [TerrainType.DESERT5]: new Sprite(
    buildingsTile,
    1,
    7,
    TERRAIN_SPRITE_WIDTH,
    TERRAIN_SPRITE_HEIGTH,
  ),

  [TerrainType.SOIL]: new Sprite(buildingsTile, 6, 5, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [TerrainType.SOIL2]: new Sprite(buildingsTile, 5, 6, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [TerrainType.SOIL3]: new Sprite(buildingsTile, 5, 8, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [TerrainType.SOIL4]: new Sprite(buildingsTile, 5, 5, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [TerrainType.SOIL5]: new Sprite(buildingsTile, 5, 7, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),

  [TerrainType.WAX]: new Sprite(buildingsTile, 3, 8, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [TerrainType.WAX2]: new Sprite(buildingsTile, 2, 10, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [TerrainType.WAX3]: new Sprite(buildingsTile, 3, 0, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [TerrainType.WAX4]: new Sprite(buildingsTile, 3, 1, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [TerrainType.WAX5]: new Sprite(buildingsTile, 3, 2, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
};

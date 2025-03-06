import { BuildingType } from '../buildings';
import { Sprite, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH } from '../commons';

const buildingsTile = '/public/buildings/buildings.png';

export const buildingSprites: Record<BuildingType, Sprite> = {
  [BuildingType.HOUSE]: new Sprite(buildingsTile, 1, 5, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.HOUSE2]: new Sprite(buildingsTile, 1, 4, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.HOUSE3]: new Sprite(buildingsTile, 1, 2, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.FARM]: new Sprite(buildingsTile, 0, 7, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.FARM2]: new Sprite(buildingsTile, 4, 4, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.FARM3]: new Sprite(buildingsTile, 4, 6, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.CASTLE]: new Sprite(buildingsTile, 0, 9, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.CASTLE2]: new Sprite(buildingsTile, 0, 11, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.CASTLE3]: new Sprite(buildingsTile, 1, 0, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.BARRACKS]: new Sprite(buildingsTile, 1, 7, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.BARRACKS2]: new Sprite(buildingsTile, 1, 9, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.BARRACKS3]: new Sprite(buildingsTile, 1, 10, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.MINE]: new Sprite(buildingsTile, 4, 2, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.MINE2]: new Sprite(buildingsTile, 0, 10, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.MINE3]: new Sprite(buildingsTile, 0, 12, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.BLACKSMITH]: new Sprite(buildingsTile, 2, 4, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.BLACKSMITH2]: new Sprite(buildingsTile, 0, 13, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.BLACKSMITH3]: new Sprite(buildingsTile, 1, 11, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.CHURCH]: new Sprite(buildingsTile, 1, 7, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.CHURCH2]: new Sprite(buildingsTile, 3, 13, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  [BuildingType.CHURCH3]: new Sprite(buildingsTile, 1, 3, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
};

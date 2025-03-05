import { Sprite, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH } from '../commons';

const buildingsTile = '/public/buildings/buildings.png';

export interface BuildingSprites {
  house: Sprite;
  house2: Sprite;
  house3: Sprite;
  farm: Sprite;
  farm2: Sprite;
  farm3: Sprite;
  castle: Sprite;
  castle2: Sprite;
  castle3: Sprite;
  barracs: Sprite;
  barracs2: Sprite;
  barracs3: Sprite;
  mine: Sprite;
  mine2: Sprite;
  mine3: Sprite;
  blacksmith: Sprite;
  blacksmith2: Sprite;
  blacksmith3: Sprite;
  church: Sprite;
  church2: Sprite;
  church3: Sprite;
}

export const buildingSprites: BuildingSprites = {
  house: new Sprite(buildingsTile, 1, 5, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  house2: new Sprite(buildingsTile, 1, 4, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  house3: new Sprite(buildingsTile, 1, 2, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  farm: new Sprite(buildingsTile, 0, 7, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  farm2: new Sprite(buildingsTile, 4, 4, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  farm3: new Sprite(buildingsTile, 4, 6, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  castle: new Sprite(buildingsTile, 0, 9, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  castle2: new Sprite(buildingsTile, 0, 11, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  castle3: new Sprite(buildingsTile, 1, 0, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  barracs: new Sprite(buildingsTile, 1, 7, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  barracs2: new Sprite(buildingsTile, 1, 9, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  barracs3: new Sprite(buildingsTile, 1, 10, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  mine: new Sprite(buildingsTile, 4, 2, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  mine2: new Sprite(buildingsTile, 0, 10, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  mine3: new Sprite(buildingsTile, 0, 12, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  blacksmith: new Sprite(buildingsTile, 2, 4, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  blacksmith2: new Sprite(buildingsTile, 0, 13, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  blacksmith3: new Sprite(buildingsTile, 1, 11, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  church: new Sprite(buildingsTile, 1, 7, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  church2: new Sprite(buildingsTile, 3, 13, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  church3: new Sprite(buildingsTile, 1, 3, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
};

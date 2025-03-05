import { Sprite, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH } from '../commons';

const buildingsTile = '/public/buildings/terrains.png';

export interface TerrainSprites {
  grass: Sprite;
  grass2: Sprite;
  grass3: Sprite;
  grass4: Sprite;
  grass5: Sprite;
  desert: Sprite;
  desert2: Sprite;
  desert3: Sprite;
  desert4: Sprite;
  desert5: Sprite;
  wax: Sprite;
  wax2: Sprite;
  wax3: Sprite;
  wax4: Sprite;
  wax5: Sprite;
  soil: Sprite;
  soil2: Sprite;
  soil3: Sprite;
  soil4: Sprite;
  soil5: Sprite;
}

export const terrainSprites: TerrainSprites = {
  grass: new Sprite(buildingsTile, 5, 1, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  grass2: new Sprite(buildingsTile, 4, 10, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  grass3: new Sprite(buildingsTile, 4, 8, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  grass4: new Sprite(buildingsTile, 4, 5, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  grass5: new Sprite(buildingsTile, 4, 7, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  desert: new Sprite(buildingsTile, 2, 3, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  desert2: new Sprite(buildingsTile, 1, 11, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  desert3: new Sprite(buildingsTile, 1, 9, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  desert4: new Sprite(buildingsTile, 1, 6, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  desert5: new Sprite(buildingsTile, 1, 7, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  soil: new Sprite(buildingsTile, 6, 5, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  soil2: new Sprite(buildingsTile, 5, 6, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  soil3: new Sprite(buildingsTile, 5, 8, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  soil4: new Sprite(buildingsTile, 5, 5, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  soil5: new Sprite(buildingsTile, 5, 7, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  wax: new Sprite(buildingsTile, 3, 8, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  wax2: new Sprite(buildingsTile, 2, 10, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  wax3: new Sprite(buildingsTile, 3, 0, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  wax4: new Sprite(buildingsTile, 3, 1, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
  wax5: new Sprite(buildingsTile, 3, 2, TERRAIN_SPRITE_WIDTH, TERRAIN_SPRITE_HEIGTH),
};

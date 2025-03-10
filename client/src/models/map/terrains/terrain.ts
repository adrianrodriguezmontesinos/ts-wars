import { randomizeCost } from '../../../logic';
import { Cost, TERRAIN_SPRITE_HEIGTH, TERRAIN_SPRITE_WIDTH } from '../../commons';
import { ResourceType } from '../../resources';
import { Cell, CellOwnerType, CellType } from '../cells';
import { Coordinates } from '../coordinates';
import { map__TerrainRare, map__TerrainResource } from './terrain.maps';
import { terrainSprites } from './terrain.sprites';
import { TerrainType } from './terrain.types';

export class Terrain extends Cell {
  terrainType: TerrainType;
  resources: Cost;

  /**
   * Terrain cell
   * @param coords Coordinates {x, y} at the game map
   * @param pos Positions index {x, y} at the game map bidimensional Array
   * @param type Terrain type
   */
  constructor(coords: Coordinates, pos: Coordinates, type: TerrainType) {
    super(CellType.TERRAIN, CellOwnerType.NONE, coords, pos, terrainSprites[type]);
    this.terrainType = type;
    this.resources = randomizeCost(map__TerrainResource[this.terrainType], 0.1);
  }

  /**
   * Get the terrain types keys as an array
   * @returns Array of terrain types' keys
   */
  static getTerrainTypes(): TerrainType[] {
    return Object.values(TerrainType) as TerrainType[];
  }

  /**
   * Get the terrain total rarities (addition of all rarities)
   */
  static getTotalRarity(terrainTypes: TerrainType[]): number {
    return terrainTypes.reduce((acc, type) => acc + map__TerrainRare[type], 0);
  }

  /**
   * Get the canvas coords for a cell at position (i, j)
   */
  static calculateCoordinates(i: number, j: number): Coordinates {
    // Offset X (horizontally) at odd rows -> 50%
    const offsetX = j % 2 === 1 ? TERRAIN_SPRITE_WIDTH * 0.5 : 0;
    const x = i * TERRAIN_SPRITE_WIDTH + offsetX;
    // Each row displace 75% vertically
    const y = j * (TERRAIN_SPRITE_HEIGTH * 0.75);
    return { x, y };
  }

  /**
   * Perform a weighted selection and return a TerrainType
   * Note: this mehtod was made with chatGPT help mine was failing 😪
   * @param terrainTypes TerrainType's Array
   * @param totalRarity Total of rarities (addition of all rarities)
   */
  static chooseTerrainType(terrainTypes: TerrainType[], totalRarity: number): TerrainType {
    let rnd = Math.floor(Math.random() * totalRarity);
    let chosenType: TerrainType = terrainTypes[0];
    for (const type of terrainTypes) {
      rnd -= map__TerrainRare[type];
      if (rnd < 0) {
        chosenType = type;
        break;
      }
    }
    return chosenType;
  }

  /**
   * Mine resources from the terrain
   * @param minedResources mined resources requested
   * @returns Mined resorces requested or if they are less avaliables, the avaliable ones
   */
  mine(minedResources: Cost): Cost {
    const minedResult: Cost = {} as Cost;

    Object.values(ResourceType).forEach((resourceType) => {
      const available = this.resources[resourceType] || 0;
      const requested = minedResources[resourceType] || 0;
      // Extradted result
      const mined = Math.min(available, requested);
      // Update resource
      this.resources[resourceType] = available - mined;
      minedResult[resourceType] = mined;
    });

    return minedResult;
  }
}

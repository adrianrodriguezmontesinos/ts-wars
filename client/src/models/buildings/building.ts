import { Cell, CellOwner, CellType, Coordinates, map__TerrainCost, TerrainType } from '../map';
import { randomizeCost } from '../../logic';
import { Cost } from '../commons';
import { BuildingType } from './building.types';
import { buildingSprites } from './building.sprites';
import { map__BuildingCosts } from './building.costs';

export class Building extends Cell {
  buildingType: BuildingType;
  terrain: TerrainType; // Terrain type where the build is made

  /**
   * Building cell
   * @param owner Player owner of the cell
   * @param coords Coordinates {x, y} at the game map
   * @param pos Positions index {x, y} at the game map bidimensional Array
   * @param type Terrain type
   */
  constructor(owner: CellOwner, coords: Coordinates, pos: Coordinates, type: BuildingType, terrain: TerrainType) {
    super(CellType.BUILDING, owner, coords, pos, buildingSprites[type]);
    this.buildingType = type;
    this.terrain = terrain;
  }

  /**
   * Get the building types keys as an array
   * @returns Array of building types' keys
   */
  static getBuildingTypes(): BuildingType[] {
    return Object.values(BuildingType) as BuildingType[];
  }

  // TODO IF NOT USED!! DELETE
  /**
   * Get the BuildingType key from its value
   * @param value BuildingType value
   * @returns BuildingType key
   */
  static getBuildingTypeByValue(value: string): string {
    return Object.keys(BuildingType).find((key: string) => BuildingType[key] === value) ?? '';
  }

  /**
   *
   * @param building
   * @param terrain
   * @returns
   */
  static getCost(building: BuildingType, terrain: TerrainType): Cost {
    return randomizeCost(map__BuildingCosts[building], map__TerrainCost[terrain], true);
  }
}

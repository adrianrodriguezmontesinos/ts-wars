import { Cell, CellOwner, CellType, Coordinates, map__TerrainCost, TerrainType } from '../map';
import { randomizeCost } from '../../logic';
import { Cost } from '../commons';
import { BuildingType } from './building.types';
import { buildingSprites } from './building.sprites';
import { map__BuildingCosts } from './building.costs';
import { Upgrade } from '../upgrades';

export class Building extends Cell {
  buildingType: BuildingType;
  upgrades: Upgrade[];

  /**
   * Building cell
   * @param owner Player owner of the cell
   * @param coords Coordinates {x, y} at the game map
   * @param pos Positions index {x, y} at the game map bidimensional Array
   * @param type Terrain type
   */
  constructor(owner: CellOwner, coords: Coordinates, pos: Coordinates, type: BuildingType) {
    super(CellType.BUILDING, owner, coords, pos, buildingSprites[type]);
    this.buildingType = type;
    this.upgrades = [];
  }

  /**
   * Add an upgrade to the building
   * @param upgrade Upgrade to be added
   */
  addUpgrade(upgrade: Upgrade) {
    this.upgrades.push(upgrade);
  }

  /**
   * Get the building types keys as an array
   * @returns Array of building types' keys
   */
  static getBuildingTypes(): BuildingType[] {
    return Object.values(BuildingType) as BuildingType[];
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

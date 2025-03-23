import { houseTypes } from './houses/house.types';
import { randomizeCost } from '../../logic';
import { Cost } from '../commons';
import { BuildingType } from './building.types';
import { buildingSprites } from './building.sprites';
import { map__BuildingCosts } from './building.costs';
import { BookType, Tool, ToolType, Upgrade } from '../upgrades';
import { castleTypes } from './castles';
import { Cell, CellOwner, CellType, Coordinates, map__TerrainCost, TerrainType } from '../map';

export class Building extends Cell {
  buildingType: BuildingType;
  upgrades: Upgrade[];

  /**
   * Building cell,
   * @param owner Player owner of the cell.
   * @param coords Coordinates {x, y} at the game map.
   * @param pos Positions index {x, y} at the game map bidimensional Array.
   * @param type Terrain type.
   */
  constructor(owner: CellOwner, coords: Coordinates, pos: Coordinates, type: BuildingType) {
    super(CellType.BUILDING, owner, coords, pos, buildingSprites[type]);
    this.buildingType = type;
    this.upgrades = [];
  }

  /**
   * Add an upgrade to the building.
   * @param upgrade Upgrade to be added.
   */
  addUpgrade(upgrade: Upgrade) {
    this.upgrades.push(upgrade);
  }

  /**
   * Check if the upgrade has already been added to the building.
   * @param subType Upgrade SubType to be checked.
   * @returns True if the upgrade has been added. False otherwise.
   */
  hasTool(subType: ToolType | BookType): boolean {
    if (Tool.getToolTypes().includes(subType as ToolType)) {
      const tools: Tool[] = this.upgrades as Tool[];
      return tools.some((t: Tool) => t.toolType === subType);
    }
    return false;
  }

  /**
   * Get the building types values as an array.
   * @returns Array of building types' values.
   */
  static getBuildingTypes(): BuildingType[] {
    return Object.values(BuildingType) as BuildingType[];
  }

  /**
   * Get the building castle types values as an array.
   * @returns Array of building castle types' values.
   */
  static getCastleTypes(): BuildingType[] {
    return Object.values(castleTypes) as BuildingType[];
  }

  /**
   * Get a building randomized cost.
   * @param building Building type.
   * @param terrain Terrain Type.
   * @returns
   */
  static getCost(buildingType: BuildingType, terrainType: TerrainType): Cost {
    return randomizeCost(map__BuildingCosts[buildingType], map__TerrainCost[terrainType], true);
  }

  /**
   * Check if a Terrain Cell is a House or Castle Building.
   * @param cell Terrain Cell.
   * @returns True if it is a Building (House or Castle). False otherwise.
   */
  static isHouseOrCastle(cell: Cell): boolean {
    if (cell.cellType === CellType.BUILDING) {
      const type = (cell as Building).buildingType;
      if (castleTypes.includes(type) || houseTypes.includes(type)) {
        return true;
      }
    }
    return false;
  }
}

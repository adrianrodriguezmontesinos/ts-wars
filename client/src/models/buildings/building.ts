
import { Cell } from '../map/cell'; // AVOID BARREL CIRCULAR DEPENDECY (BARRELS)
import { buildingSprites, CellOwner, CellType, Coordinates } from "../map";
import { BuildingType } from "./building.types";
import { map__BuildingCosts } from '../costs';
import { map__TerrainCost, TerrainType } from '../terrains';
import { randomizeCost } from '../../logic';
import { Cost } from '../commons';

// TODO MD
export class Building extends Cell {
  buildingType: BuildingType;
  terrain: TerrainType; // Terrain type where the build is made

  /**
   * Building cell
   * @param owner Player owner of the cell
   * @param coords Coordinates {x, y} at the game map
   * @param type Terrain type
   */
  constructor(owner: CellOwner, coords: Coordinates, type: BuildingType, terrain: TerrainType) {
    super(CellType.BUILDING, owner, coords, buildingSprites[type]);
    this.buildingType = type;
    this.terrain = terrain;
  }

  static getCost(building: BuildingType, terrain: TerrainType): Cost {
    return randomizeCost(map__BuildingCosts[building], map__TerrainCost[terrain], true);
  } 

}


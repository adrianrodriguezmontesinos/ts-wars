import { Cost } from '../../commons';
import { CellOwner, Coordinates } from '../../map';
import { Resource } from '../../resources';
import { map__ToolMultiplicator, Tool, ToolType, Upgrade } from '../../upgrades';
import { Building } from '../building';
import { BuildingType } from '../building.types';
import {
  mineGemResources,
  mineGemResources2,
  mineGemResources3,
  mineResources,
  mineResources2,
  mineResources3,
} from './mine.quantities';

export type MineType = BuildingType.MINE | BuildingType.MINE2 | BuildingType.MINE3;

export class Mine extends Building {
  mineBasic: Cost;
  mineGem: Cost;
  resources: Cost;
  multiplicators: Cost;

  /**
   * Building cell
   * @param owner Player owner of the cell
   * @param coords Coordinates {x, y} at the game map
   * @param pos Positions index {x, y} at the game map bidimensional Array
   * @param resources Avaliable resources still to be mined to be mined
   * @param type Mine type (mine, mine 2 or mine 3)
   */
  constructor(
    owner: CellOwner,
    coords: Coordinates,
    pos: Coordinates,
    resources: Cost,
    type: MineType,
  ) {
    super(owner, coords, pos, type);
    this.resources = resources;
    this._setMineQuantity();
    this.multiplicators = Resource.initEmptyMultiplicators();
  }

  // TODO IMPLEMENT - WHAT HAPPEN WHEN THE MINE QUANTITY IS HIGHER THAN THE RESOURCES AVALIABLES!!!
  /**
   * Mine basic or gem resources
   * @param isGem True if we mine gem resources (slowlier). False (by default) if we mine basic resources (faster)
   * @returns resources mined
   */
  mine(isGem: boolean = false): Cost {
    const mineQuantity = isGem ? this.mineGem : this.mineBasic;

    for (const resource of Resource.getArrayResourceTypes()) {
      this.resources[resource] -= mineQuantity[resource];
    }

    return mineQuantity;
  }

  /**
   * Add a tool to the upgrades list of this building
   * @param tool Tool to be added at the upgrades list
   */
  addTool(tool: Tool) {
    super.addUpgrade(tool);
    this._boostProduction(tool.toolType);
  }

  /**
   * Upgrade / Boost the production
   */
  private _boostProduction(type: ToolType) {
    const mult = map__ToolMultiplicator[type];

    for (const resource of Resource.getArrayResourceTypes()) {
      this.multiplicators[resource] += mult[resource];
      this.mineBasic[resource] *= this.multiplicators[resource];
      this.mineGem[resource] *= this.multiplicators[resource];
    }

  }

  /**
   * Set the mine quantity
   */
  private _setMineQuantity() {
    if (this.buildingType === BuildingType.MINE) {
      this.mineBasic = mineResources;
      this.mineGem = mineGemResources;
    } else if (this.buildingType === BuildingType.MINE2) {
      this.mineBasic = mineResources2;
      this.mineGem = mineGemResources2;
    } else {
      this.mineBasic = mineResources3;
      this.mineGem = mineGemResources3;
    }
  }
}

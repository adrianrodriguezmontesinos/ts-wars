import { Building, BuildingType, Mine } from '../buildings';
import { Cost } from '../commons';
import { TerrainType } from '../map';
import { ResourceType, Resource } from '../resources';

export class Player {
  name: string;
  resources: Cost;
  buildings: Building[];

  constructor(name: string) {
    this.name = name;
    this.buildings = [];
    this.resources = this._getInitialResources();
  }

  /**
   * Check there is enough resources to build a building at an specific terrain
   * @param buildingType Type of building
   * @param terrainType Type of terrain (where the building will be built)
   * @returns True if I can build. False otehrwise
   */
  canIBuild(buildingType: BuildingType, terrainType: TerrainType): boolean {
    return Resource.canBeBuilt(this.resources, buildingType, terrainType);
  }

  /**
   * heck there is enough resources to buy a soldier/item/improvement
   * @param cost Cost to be paid
   * @returns True if I can pay. False otehrwise
   */
  canIPay(cost: Cost): boolean {
    return Resource.canBePaid(this.resources, cost);
  }

  /**
   * Pay the Cost of somethinfg
   * Note: MUST BE CHECKED FIRST WITH canIPay()
   * @param cost Resources' Cost to be paid
   */
  payCost(cost: Cost) {
    for (const resource of Resource.getArrayResourceTypes()) {
      const required = cost[resource];
      this.resources[resource] -= required;
    }
  }

  /**
   * Mine basic resources from all mines
   */
  mine() {
    for (const mine of this._getAllMines()) {
      this._addResources(mine.mine());
    }
  }

  /**
   * Mine gem resources from all mines
   */
  mineGems() {
    for (const mine of this._getAllMines()) {
      this._addResources(mine.mine(true));
    }
  }

  /**
   * Add resources
   * @param toAdd Resources to be added
   */
  private _addResources(toAdd: Cost) {
    for (const resource of Resource.getArrayResourceTypes()) {
      this.resources[resource] += toAdd[resource];
    }
  }

  /**
   * Get all mines the player owns
   * @returns All mines the player owns
   */
  private _getAllMines(): Mine[] {
    const farmTypes: BuildingType[] = [BuildingType.MINE, BuildingType.MINE2, BuildingType.MINE3];
    return this.buildings.filter((b: Building) => farmTypes.includes(b.buildingType)) as Mine[];
  }

  /**
   * Get initial resources for a player
   * @returns Initial resources
   */
  private _getInitialResources(): Cost {
    return {
      [ResourceType.COAL]: 1500,
      [ResourceType.BRONZE]: 1500,
      [ResourceType.IRON]: 600,
      [ResourceType.GOLD]: 150,
      [ResourceType.TURQUOISE]: 0,
      [ResourceType.ZAPHIRE]: 0,
      [ResourceType.EMERALD]: 0,
      [ResourceType.RUBI]: 0,
      [ResourceType.DIAMOND]: 0,
    };
  }
}

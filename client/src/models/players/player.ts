import { Building, BuildingType } from '../buildings';
import { Cost } from '../commons';
import { TerrainType } from '../map';
import { ResourceType } from '../resources';

export class Player {
  name: string;
  resources: Cost;
  buildings: Building[];

  constructor(name: string) {
    this.name = name;
    this.buildings = [];
    this.resources = this._getInitialResources();
  }

  // TODO
  /**
   *
   * @param buildingType
   * @param terrainType
   * @returns
   */
  canIPay(buildingType: BuildingType, terrainType: TerrainType): boolean {
    const cost = Building.getCost(buildingType, terrainType);
    const res = true;

    for (const resource of Object.values(ResourceType)) {
      const available = this.resources[resource];
      const required = cost[resource];

      if (available < required) {
        return false;
      }
    }

    return res;
  }

  /**
   * Pay the Cost of somethinfg
   * @param cost Resources' Cost to be paid
   */
  payCost(cost: Cost) {
    for (const resource of Object.values(ResourceType)) {
      const available = this.resources[resource];
      const required = cost[resource];

      this.resources[resource] -= required;
    }
  }

  // TODO
  /**
   *
   * @returns
   */
  private _getInitialResources(): Cost {
    return {
      [ResourceType.COAL]: 500,
      [ResourceType.BRONZE]: 500,
      [ResourceType.IRON]: 200,
      [ResourceType.GOLD]: 50,
      [ResourceType.TURQUOISE]: 0,
      [ResourceType.ZAPHIRE]: 0,
      [ResourceType.EMERALD]: 0,
      [ResourceType.RUBI]: 0,
      [ResourceType.DIAMOND]: 0,
    };
  }
}

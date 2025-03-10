import { Building, BuildingType, map__BuildingCosts } from '../buildings';
import { Cost } from '../commons';
import { ResourceType } from '../resources';

export class Player {
  name: string;
  resources: Cost;
  buildings: Building[];

  constructor(name: string, buildings: Building[]) {
    this.name = name;
    this.buildings = buildings;
    this.resources = this._getInitialResources();
  }

  // TODO
  /**
   * 
   * @param buildingType 
   * @returns 
   */
  canIPay(buildingType: BuildingType): boolean {
    const cost = map__BuildingCosts[buildingType];
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
  
  // TODO
  /**
   * 
   * @param cost 
   * @returns 
   */
  payCost(cost: Cost): Cost | null {
    const auxCost: Cost = {
      [ResourceType.COAL]: 0,
      [ResourceType.BRONZE]: 0,
      [ResourceType.IRON]: 0,
      [ResourceType.GOLD]: 0,
      [ResourceType.TURQUOISE]: 0,
      [ResourceType.ZAPHIRE]: 0,
      [ResourceType.EMERALD]: 0,
      [ResourceType.RUBI]: 0,
      [ResourceType.DIAMOND]: 0,
    };

    for (const resource of Object.values(ResourceType)) {
      const available = this.resources[resource];
      const required = cost[resource];

      if (available < required) {
        return null;
      }

      auxCost[resource] = available - required;
    }

    return auxCost;
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

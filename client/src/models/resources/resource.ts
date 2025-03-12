import { Building, BuildingType } from '../buildings';
import { Cost } from '../commons';
import { TerrainType } from '../map';
import { ResourceType } from './resource.types';

export class Resource {
  /**
   * Get an array of resource type values
   * @returns Array of resource type values
   */
  static getArrayResourceTypes(): ResourceType[] {
    return Object.values(ResourceType);
  }

  /**
   * Check there is enough resources to build a building at an specific terrain
   * @param avaliableResources Avaliable resources
   * @param buildingType Type of building
   * @param terrainType Type of terrain (where the building will be built)
   * @returns True if can be paid. False otehrwise
   */
  static canBeBuilt(
    avaliableResources: Cost,
    buildingType: BuildingType,
    terrainType: TerrainType,
  ): boolean {
    const cost = Building.getCost(buildingType, terrainType);
    return Resource.canBePaid(avaliableResources, cost);
  }

  /**
   * Check is something can be paid
   * @param resources Avaliable resourves
   * @param cost Cost to be paid
   * @returns True if can be paid. False otehrwise
   */
  static canBePaid(resources: Cost, cost: Cost): boolean {
    const res = true;

    for (const resource of Object.values(ResourceType)) {
      const available = resources[resource];
      const required = cost[resource];

      if (available < required) {
        return false;
      }
    }

    return res;
  }

  /**
   * Get an empty mult. resources object with 1 at each value
   * @returns Empty multiplicators resources object
   */
  static initEmptyMultiplicators(): Cost {
    return {
      [ResourceType.COAL]: 1,
      [ResourceType.BRONZE]: 1,
      [ResourceType.IRON]: 1,
      [ResourceType.GOLD]: 1,
      [ResourceType.TURQUOISE]: 1,
      [ResourceType.ZAPHIRE]: 1,
      [ResourceType.EMERALD]: 1,
      [ResourceType.RUBI]: 1,
      [ResourceType.DIAMOND]: 1,
    };
  }
}

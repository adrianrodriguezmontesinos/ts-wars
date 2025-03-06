import { randomizeCost } from "../../logic/resources/conversions";
import { Sprite } from "../commons";
import { Cost } from "../costs";
import { Cell, CellOwner, CellType, Coordinates, terrainSprites } from "../map";
import { ResourceType } from "../resources";
import { map__TerrainResource } from "./terrain.maps";
import { TerrainType } from "./terrain.types";

export class Terrain extends Cell {
  terrainType: TerrainType;
  resources: Cost;

  /**
   * Terrain cell
   * @param owner Player owner of the cell
   * @param coords Coordinates {x, y} at the game map
   * @param type Terrain type
   */
  constructor(
    owner: CellOwner,
    coords: Coordinates,
    type: TerrainType,
  ) {
    super(CellType.TERRAIN, owner, coords, terrainSprites[type]);
    this.terrainType = type;
    this.resources = randomizeCost(map__TerrainResource[this.terrainType], .1);
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

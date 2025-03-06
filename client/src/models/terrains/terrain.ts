import { Sprite } from "../commons";
import { Cost } from "../costs";
import { Cell, CellOwner, CellType, Coordinates } from "../map";
import { ResourceType } from "../resources";
import { TerrainType } from "./terrain.types";

export class Terrain extends Cell {
  terrainType: TerrainType;
  resources: Cost;

  /**
   * Terrain cell
   * @param owner Player owner of the cell
   * @param coords Coordinates {x, y} at the game map
   * @param sprite Terrain Sprite
   * @param type Terrain type
   * @param resources Resources available at the terrain
   */
  constructor(
    owner: CellOwner,
    coords: Coordinates,
    sprite: Sprite,
    type: TerrainType,
    resources: Cost,
  ) {
    super(CellType.TERRAIN, owner, coords, sprite);
    this.terrainType = type;
    this.resources = resources;
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

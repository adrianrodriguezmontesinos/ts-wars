import { Coordinates } from "../commons/coordinates";
import { ResourceType } from "../resources/resource.types";
import { TerrainType } from "./terrain.types";

export type Cost = Record<ResourceType, number>;

export class Terrain {
  type: TerrainType; 
  avaliableResources: Cost;
  image: HTMLImageElement;
  coordinates: Coordinates;

  /**
   * 
   * @param type 
   * @param resources 
   * @param image 
   * @param coords 
   */
  constructor(type: TerrainType, resources: Cost, image: HTMLImageElement, coords: Coordinates) {

  }
}

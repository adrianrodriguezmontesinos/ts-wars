import { BuildingType } from '../buildings';
import { Terrain } from '../map';

/**
 * Build Event data (custom event detail)
 */
export interface DataEvent__Build {
  playerName: string;
  buildingType: BuildingType;
  terrain: Terrain;
}

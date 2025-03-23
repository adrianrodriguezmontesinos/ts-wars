import { BuildingType } from "../buildings";
import { Terrain } from "../map";

export interface DataEvent__Build {
    playerName: string;
    buildingType: BuildingType;
    terrain: Terrain;
}
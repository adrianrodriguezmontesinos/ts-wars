import { Cost, castleCost } from '../costs';
import { BuildingType } from './buildings.types';

export class Building {
  type: BuildingType;
  desc: string;
  cost: Cost;
  sprite: string;

  constructor(type: BuildingType, desc: string) {
    this.type = type;
    this.desc = desc;
    this.cost = castleCost;
  }
}

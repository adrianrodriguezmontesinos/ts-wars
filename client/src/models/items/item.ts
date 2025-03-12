import { Cost, Sprite } from '../commons';
import { ItemType } from './item.types';

export class Item {
  type: ItemType;
  cost: Cost;
  sprite: Sprite;

  constructor(type: ItemType, cost: Cost, sprite: Sprite) {
    this.type = type;
    this.cost = cost;
    this.sprite = sprite;
  }

}

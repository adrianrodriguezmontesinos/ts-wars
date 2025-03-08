import { Sprite } from "../commons";
import { Cost } from "../costs";
import { ItemType } from "./item.types";

export class Item {
    itemType: ItemType;
    cost: Cost;
    sprite: Sprite;

    constructor(type: ItemType, cost: Cost, sprite: Sprite) {
        this.itemType = type;
        this.cost = cost;
        this.sprite = sprite;
    }

}
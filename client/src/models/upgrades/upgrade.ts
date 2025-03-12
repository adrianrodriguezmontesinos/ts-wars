import { Cost, Sprite } from "../commons";
import { UpgradeType } from "./upgrade.types";

export class Upgrade {
  upgradeType: UpgradeType;
  cost: Cost;
  sprite: Sprite;

  constructor(type: UpgradeType, cost: Cost, sprite: Sprite) {
    this.upgradeType = type;
    this.cost = cost;
    this.sprite = sprite;
  }

}
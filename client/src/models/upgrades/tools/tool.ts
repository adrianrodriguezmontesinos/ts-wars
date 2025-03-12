import { Cost, Sprite } from "../../commons";
import { Upgrade } from "../upgrade";
import { UpgradeType } from "../upgrade.types";
import { ToolType } from "./tool.types";

export class Tool extends Upgrade {
  toolType: ToolType;

  constructor(toolType: ToolType, cost: Cost, sprite: Sprite) {
    super(UpgradeType.TOOL, cost, sprite);
    this.toolType = toolType;
  }

}
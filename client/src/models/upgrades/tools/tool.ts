import { Cost, Sprite } from '../../commons';
import { BookType } from '../books';
import { Upgrade } from '../upgrade';
import { UpgradeType } from '../upgrade.types';
import { ToolType } from './tool.types';

export class Tool extends Upgrade {
  toolType: ToolType;

  constructor(toolType: ToolType, cost: Cost, sprite: Sprite) {
    super(UpgradeType.TOOL, cost, sprite);
    this.toolType = toolType;
  }

  /**
   * Get the tool types values as an array
   * @returns Array of tool types' values
   */
  static getToolTypes(): ToolType[] {
    return Object.values(ToolType) as ToolType[];
  }

  /**
   * Get the book types values as an array
   * @returns Array of book types' values
   */
  static getBookTypes(): BookType[] {
    return Object.values(BookType) as BookType[];
  }
}

import { BookType } from "./books";
import { ToolType } from "./tools";

export enum UpgradeType {
  TOOL = 'tool',
  BOOK = 'book',
}

export interface UpgradeTypeAndList {
  type: UpgradeType,
  list: ToolType[] | BookType[],
}
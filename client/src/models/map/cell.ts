import { Sprite } from "../commons";
import { CellOwner, CellOwnerType, CellType } from "./cell.types";
import { Coordinates } from "./coordinates";

export class Cell {
  coords: Coordinates;
  sprite: Sprite;
  cellType: CellType;
  private _owner: CellOwner;

  /**
   * Map hexagonal cell (where to put )
   * @param coords Coordinates {x, y} at the game map
   * @param owner Player owner of the cell
   * @param sprite Terrain Sprite
   */
  constructor(type: CellType, owner: CellOwner, coords: Coordinates, sprite: Sprite) {
    this.cellType = type;
    this._owner = owner;
    this.coords = coords;
    this.sprite = sprite;
  }

  setOwner(newOwner: CellOwner) {
    this._owner = newOwner;
  }

  /**
   * Get the owner of the cell or null if is not occupied yet
   * @returns player name or null
   */
  whoOccupied(): string | null {
    return this._owner !== CellOwnerType.NONE
        ? this._owner
        : null;
  }
}

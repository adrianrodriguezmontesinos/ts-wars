export const TERRAIN_SPRITE_WIDTH = 61;
export const TERRAIN_SPRITE_HEIGTH = 71;

export class Sprite {
  private _x: number;
  private _y: number;
  private _w: number;
  private _h: number;
  public image: HTMLImageElement;

  /**
   * Game sprite
   * @param tilesetUrl Tileset URL
   * @param indexX Sprite index at the tileset, starting at 0 (f.e. 1 is the 2nd column)
   * @param indexY Sprite index at the tileset, starting at 0 (f.e. 2 is the 3rd column)
   * @param width Sprite width
   * @param height Sprite height
   */
  constructor(tilesetUrl: string, indexX: number, indexY: number, width: number, heigth: number) {
    this._w = width;
    this._h = heigth;

    // Calc the coordenates at the tileset
    this._x = indexX * width;
    this._y = indexY * heigth;

    this.image = new Image();
    this.image.src = tilesetUrl;
  }

  /**
   * Draw an sprite at an canvas context at the set position
   * @param ctx Canvas context
   * @param posX X axis position at canvas
   * @param posY Y axis position at canvas
   */
  draw(ctx: CanvasRenderingContext2D, posX: number, posY: number) {
    ctx.drawImage(
      this.image,
      this._x,
      this._y, // Coordinates inside tileset
      this._w,
      this._h, // Sprite sizes at the tileset
      posX,
      posY, // Positions where to be drawed at canvas
      this._w,
      this._h, // Sprite sizes at canvas
    );
  }
}


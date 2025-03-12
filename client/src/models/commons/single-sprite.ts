export class SingleSprite {
    w: number;
    h: number; // dimensions (px)
    image: HTMLImageElement;
  
    /**
     * Game sprite
     * @param tilesetUrl Tileset URL
     * @param width Sprite width
     * @param height Sprite height
     */
    constructor(tilesetUrl: string, width: number, heigth: number) {
      this.w = width;
      this.h = heigth;
  
  
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
        this.w,
        this.h, // Coordinates inside tileset
        this.w,
        this.h, // Sprite sizes at the tileset
        posX,
        posY, // Positions where to be drawed at canvas
        this.w,
        this.h, // Sprite sizes at canvas
      );
    }
  }
  
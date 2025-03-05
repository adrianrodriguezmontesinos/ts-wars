import { TERRAIN_SPRITE_HEIGTH, TERRAIN_SPRITE_WIDTH } from "../commons";
import { buildingSprites, terrainSprites } from "./index";

export class GameMap {
  private _w: number;
  private _h: number;
  public _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D | null;

  /**
   * Game map
   * @param width Map width
   * @param heigth Map heigh
   */
  constructor(
    width: number = TERRAIN_SPRITE_WIDTH * 100,
    heigth: number = TERRAIN_SPRITE_HEIGTH * 100,
  ) {
    this._w = width;
    this._h = heigth;

    this._initCanvas();
  }

  /**
   * Init the canvas HTML element and its context, to draw the map on it
   */
  private _initCanvas() {
    this._canvas = document.createElement("canvas");
    this._canvas.id = "map";
    this._canvas.width = this._w;
    this._canvas.height = this._h;
    document.body.appendChild(this._canvas);
    this._ctx = this._canvas.getContext("2d");
  }

  // FOLLOWING STEPS
  // TODO 1 METHOD TO REDRAW AND SPROTE
  // TODO 2 DRAW RANDOM TERRAIN MAPS (SETTING A LIMITS FOR SPRITE TYPES)
  // TODO 3 OBJECT TERRAIN WITH ITS PROPERTIES - LINK WITH TERRAIN SPRITE
  // (ALSO WILL BE USED AT BUILDINGS)
  // TODO 4 CURSOR HOVER TERRAINS

  /**
   * Draw a Game Map
   */
  drawMap() {
    const ctx: CanvasRenderingContext2D | null = this._ctx;

    if (ctx) {
      // TODO TEMP - WE'LL CREATE A METHOD TO
      const testDraw = () => {
        // 1st line
        buildingSprites.house.draw(ctx, 0, 0);
        buildingSprites.house2.draw(ctx, TERRAIN_SPRITE_WIDTH, 0);
        buildingSprites.house3.draw(ctx, TERRAIN_SPRITE_WIDTH * 2, 0);
        buildingSprites.farm.draw(ctx, TERRAIN_SPRITE_WIDTH * 3, 0);

        // 2nd line
        buildingSprites.farm2.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 0.5,
          TERRAIN_SPRITE_HEIGTH - TERRAIN_SPRITE_HEIGTH * 0.25,
        );
        buildingSprites.farm3.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 1.5,
          TERRAIN_SPRITE_HEIGTH - TERRAIN_SPRITE_HEIGTH * 0.25,
        );
        buildingSprites.castle.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 2.5,
          TERRAIN_SPRITE_HEIGTH - TERRAIN_SPRITE_HEIGTH * 0.25,
        );

        // 3rd line
        buildingSprites.castle2.draw(
          ctx,
          0,
          TERRAIN_SPRITE_HEIGTH * 2 - TERRAIN_SPRITE_HEIGTH * (0.25 * 2),
        );
        buildingSprites.castle3.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH,
          TERRAIN_SPRITE_HEIGTH * 2 - TERRAIN_SPRITE_HEIGTH * (0.25 * 2),
        );
        buildingSprites.mine.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 2,
          TERRAIN_SPRITE_HEIGTH * 2 - TERRAIN_SPRITE_HEIGTH * (0.25 * 2),
        );
        buildingSprites.mine2.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 3,
          TERRAIN_SPRITE_HEIGTH * 2 - TERRAIN_SPRITE_HEIGTH * (0.25 * 2),
        );

        // 4th line
        buildingSprites.mine3.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 0.5,
          TERRAIN_SPRITE_HEIGTH * 3 - TERRAIN_SPRITE_HEIGTH * (0.25 * 3),
        );
        buildingSprites.barracs.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 1.5,
          TERRAIN_SPRITE_HEIGTH * 3 - TERRAIN_SPRITE_HEIGTH * (0.25 * 3),
        );
        buildingSprites.barracs2.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 2.5,
          TERRAIN_SPRITE_HEIGTH * 3 - TERRAIN_SPRITE_HEIGTH * (0.25 * 3),
        );
        buildingSprites.barracs3.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 3.5,
          TERRAIN_SPRITE_HEIGTH * 3 - TERRAIN_SPRITE_HEIGTH * (0.25 * 3),
        );

        // 5th line
        buildingSprites.blacksmith.draw(
          ctx,
          0,
          TERRAIN_SPRITE_HEIGTH * 4 - TERRAIN_SPRITE_HEIGTH * (0.25 * 4),
        );
        buildingSprites.blacksmith2.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH,
          TERRAIN_SPRITE_HEIGTH * 4 - TERRAIN_SPRITE_HEIGTH * (0.25 * 4),
        );
        buildingSprites.blacksmith3.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 2,
          TERRAIN_SPRITE_HEIGTH * 4 - TERRAIN_SPRITE_HEIGTH * (0.25 * 4),
        );
        buildingSprites.church.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 3,
          TERRAIN_SPRITE_HEIGTH * 4 - TERRAIN_SPRITE_HEIGTH * (0.25 * 4),
        );

        // 6th line
        buildingSprites.church2.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 0.5,
          TERRAIN_SPRITE_HEIGTH * 5 - TERRAIN_SPRITE_HEIGTH * (0.25 * 5),
        );
        buildingSprites.church3.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 1.5,
          TERRAIN_SPRITE_HEIGTH * 5 - TERRAIN_SPRITE_HEIGTH * (0.25 * 5),
        );
        terrainSprites.grass.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 2.5,
          TERRAIN_SPRITE_HEIGTH * 5 - TERRAIN_SPRITE_HEIGTH * (0.25 * 5),
        );
        terrainSprites.grass2.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 3.5,
          TERRAIN_SPRITE_HEIGTH * 5 - TERRAIN_SPRITE_HEIGTH * (0.25 * 5),
        );
        terrainSprites.grass3.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 4.5,
          TERRAIN_SPRITE_HEIGTH * 5 - TERRAIN_SPRITE_HEIGTH * (0.25 * 5),
        );
        terrainSprites.grass4.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 5.5,
          TERRAIN_SPRITE_HEIGTH * 5 - TERRAIN_SPRITE_HEIGTH * (0.25 * 5),
        );
        terrainSprites.grass5.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 6.5,
          TERRAIN_SPRITE_HEIGTH * 5 - TERRAIN_SPRITE_HEIGTH * (0.25 * 5),
        );

        // 7th line
        terrainSprites.desert.draw(
          ctx,
          0,
          TERRAIN_SPRITE_HEIGTH * 6 - TERRAIN_SPRITE_HEIGTH * (0.25 * 6),
        );
        terrainSprites.desert2.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH,
          TERRAIN_SPRITE_HEIGTH * 6 - TERRAIN_SPRITE_HEIGTH * (0.25 * 6),
        );
        terrainSprites.desert3.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 2,
          TERRAIN_SPRITE_HEIGTH * 6 - TERRAIN_SPRITE_HEIGTH * (0.25 * 6),
        );
        terrainSprites.desert4.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 3,
          TERRAIN_SPRITE_HEIGTH * 6 - TERRAIN_SPRITE_HEIGTH * (0.25 * 6),
        );
        terrainSprites.desert5.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 4,
          TERRAIN_SPRITE_HEIGTH * 6 - TERRAIN_SPRITE_HEIGTH * (0.25 * 6),
        );

        // 8th line
        terrainSprites.soil.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 0.5,
          TERRAIN_SPRITE_HEIGTH * 7 - TERRAIN_SPRITE_HEIGTH * (0.25 * 7),
        );
        terrainSprites.soil2.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 1.5,
          TERRAIN_SPRITE_HEIGTH * 7 - TERRAIN_SPRITE_HEIGTH * (0.25 * 7),
        );
        terrainSprites.soil3.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 2.5,
          TERRAIN_SPRITE_HEIGTH * 7 - TERRAIN_SPRITE_HEIGTH * (0.25 * 7),
        );
        terrainSprites.soil4.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 3.5,
          TERRAIN_SPRITE_HEIGTH * 7 - TERRAIN_SPRITE_HEIGTH * (0.25 * 7),
        );
        terrainSprites.soil5.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 4.5,
          TERRAIN_SPRITE_HEIGTH * 7 - TERRAIN_SPRITE_HEIGTH * (0.25 * 7),
        );

        // 8th line
        terrainSprites.wax.draw(
          ctx,
          0,
          TERRAIN_SPRITE_HEIGTH * 8 - TERRAIN_SPRITE_HEIGTH * (0.25 * 8),
        );
        terrainSprites.wax2.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH,
          TERRAIN_SPRITE_HEIGTH * 8 - TERRAIN_SPRITE_HEIGTH * (0.25 * 8),
        );
        terrainSprites.wax3.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 2,
          TERRAIN_SPRITE_HEIGTH * 8 - TERRAIN_SPRITE_HEIGTH * (0.25 * 8),
        );
        terrainSprites.wax4.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 3,
          TERRAIN_SPRITE_HEIGTH * 8 - TERRAIN_SPRITE_HEIGTH * (0.25 * 8),
        );
        terrainSprites.wax5.draw(
          ctx,
          TERRAIN_SPRITE_WIDTH * 4,
          TERRAIN_SPRITE_HEIGTH * 8 - TERRAIN_SPRITE_HEIGTH * (0.25 * 8),
        );
      };

      // TODO IMPROVE - IT LOADS WHEN THE LAST IMAGE IS LOADED (HARDODED RN, -> NOK)
      terrainSprites.wax5.image.onload = testDraw;
    }
  }
}

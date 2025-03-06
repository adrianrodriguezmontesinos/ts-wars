import { TERRAIN_SPRITE_HEIGTH, TERRAIN_SPRITE_WIDTH } from '../commons';
import { map__TerrainRare, Terrain, TerrainType } from '../terrains';
import { buildingSprites, terrainSprites } from './index';

export class GameMap {
  private _hexX: number;
  private _hexY: number;
  private _w: number;
  private _h: number;
  public _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D | null;

  /**
   * Game map
   * @param hexagonsX Number of terrains axis-X
   * @param hexagonsY Number of terrains axis-Y
   */
  constructor(hexagonsX: number = 100, hexagonsY: number = 100) {
    this._hexX = hexagonsX;
    this._hexY = hexagonsY;
    this._w = TERRAIN_SPRITE_WIDTH * hexagonsX;
    this._h = TERRAIN_SPRITE_WIDTH * hexagonsY;

    this._initCanvas();
  }

  /**
   * Init the canvas HTML element and its context, to draw the map on it
   */
  private _initCanvas() {
    this._canvas = document.createElement('canvas');
    this._canvas.id = 'map';
    this._canvas.width = this._w;
    this._canvas.height = this._h;
    document.body.appendChild(this._canvas);
    this._ctx = this._canvas.getContext('2d');
  }

  // FOLLOWING STEPS
  // TODO WE ARE GONNA CHANGE THIS MEHTODS USING THE TERRAIN CLASS
  // TODO SAVE MAPS
  // TODO CURSOR HOVER TERRAINS

  // TODO MIGHT BE PUBLIC IN THE FUTURE
  /**
   * Get an array from the terrain types keys
   */
  private _getTerrainTypes(): TerrainType[] {
    return Object.keys(map__TerrainRare) as TerrainType[];
  }

  /**
   * Get the total rarities (addition of all rarities)
   */
  private _getTotalRarity(terrainTypes: TerrainType[]): number {
    return terrainTypes.reduce((acc, type) => acc + map__TerrainRare[type], 0);
  }

  /**
   * Perform a weighted selection and return a TerrainType
   * Note: this mehtod was made with chatGPT help mine was failing 😪
   * @param terrainTypes TerrainType's Array
   * @param totalRarity Total of rarities (addition of all rarities)
   */
  private _chooseTerrainType(terrainTypes: TerrainType[], totalRarity: number): TerrainType {
    let rnd = Math.floor(Math.random() * totalRarity);
    let chosenType: TerrainType = terrainTypes[0];
    for (const type of terrainTypes) {
      rnd -= map__TerrainRare[type];
      if (rnd < 0) {
        chosenType = type;
        break;
      }
    }
    return chosenType;
  }

  /**
   * Get the canvas coords for a cell at position (i, j)
   */
  private _calculateCoordinates(i: number, j: number): { x: number; y: number } {
    // Offset X (horizontally) at odd rows -> 50%
    const offsetX = j % 2 === 1 ? TERRAIN_SPRITE_WIDTH * 0.5 : 0;
    const x = i * TERRAIN_SPRITE_WIDTH + offsetX;
    // Each row displace 75% vertically
    const y = j * (TERRAIN_SPRITE_HEIGTH * 0.75);
    return { x, y };
  }

  /**
   * Draw the map with terrains of different types using their rarity ratio
   */
  drawMap() {
    const ctx: CanvasRenderingContext2D | null = this._ctx;
    if (!ctx) return;

    const testTerrain = new Terrain('player 1', { x: 0, y: 0 }, TerrainType.GRASS);
    console.log(testTerrain);
    console.log(testTerrain.resources);

    const testDraw3 = () => {
      const terrainTypes = this._getTerrainTypes();
      const totalRarity = this._getTotalRarity(terrainTypes);

      for (let j = 0; j < this._hexY; j++) {
        for (let i = 0; i < this._hexX; i++) {
          // At odd rows the last item will not draw
          if (j % 2 === 1 && i === this._hexX - 1) continue;

          // Pait the chosen terrain type (get from rarity ratios)
          const chosenType = this._chooseTerrainType(terrainTypes, totalRarity);
          const { x, y } = this._calculateCoordinates(i, j);
          terrainSprites[chosenType].draw(ctx, x, y);
        }
      }
    };

    // TODO IMPROVE - IT LOADS WHEN THE LAST IMAGE IS LOADED (HARDODED RN, -> NOK)
    terrainSprites.wax5.image.onload = testDraw3;
  }
}

import { BuildingType } from '../buildings';
import { TERRAIN_SPRITE_HEIGTH, TERRAIN_SPRITE_WIDTH } from '../commons';
import { map__TerrainRare, Terrain, TerrainType } from '../terrains';
import {
  buildingSprites,
  Cell,
  CellOwnerType,
  CellType,
  Coordinates,
  terrainSprites,
} from './index';

export class GameMap {
  private _hexX: number;
  private _hexY: number;
  private _w: number;
  private _h: number;
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D | null;
  private _cells: Cell[][];
  private _players: string[]; // TODO TEMP USE PLAYER CLASS

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
    this._cells = [];
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
  private _calculateCoordinates(i: number, j: number): Coordinates {
    // Offset X (horizontally) at odd rows -> 50%
    const offsetX = j % 2 === 1 ? TERRAIN_SPRITE_WIDTH * 0.5 : 0;
    const x = i * TERRAIN_SPRITE_WIDTH + offsetX;
    // Each row displace 75% vertically
    const y = j * (TERRAIN_SPRITE_HEIGTH * 0.75);
    return { x, y };
  }

  /**
   * Init the subarray at each first row
   * @param i Row index (first - level array)
   */
  private _initSubArray(i: number) {
    if (!this._cells[i]) {
      this._cells[i] = [];
    }
  }

  /**
   * Draw the map with terrains of different types using their rarity ratio
   */
  private async _initTerrains() {
    const terrainTypes = this._getTerrainTypes();
    const totalRarity = this._getTotalRarity(terrainTypes);

    for (let j = 0; j < this._hexY; j++) {
      for (let i = 0; i < this._hexX; i++) {
        // At odd rows the last item will not draw
        if (j % 2 === 1 && i === this._hexX - 1) continue;

        // Init each first row
        this._initSubArray(i);

        // Get the chosen terrain type (usinf rariry ratios) and the coordinates
        const chosenType = this._chooseTerrainType(terrainTypes, totalRarity);
        const coords = this._calculateCoordinates(i, j);

        // Save the terrain cell
        this._cells[i][j] = new Terrain(CellOwnerType.NONE, coords, chosenType);

        // Paint the sprite
        await this.drawCell(chosenType, i, j);
      }
    }
  }

  // TODO TEMP 
  // TODO COMENTAR
  // TODO AQUI SE ASIGNAN LOS CASTILLOS A LOS JUGADORES
  private async _initCastles() {
    if(this._players.length === 2) {
      // Player 1
      await this.drawCell(BuildingType.CASTLE, 1, 1, CellType.BUILDING);

      // Player 2
      // At odd files the margin must be 1 more
      const margin = this._hexY % 2 === 0 ? 2 : 3;
      await this.drawCell(BuildingType.CASTLE, this._hexX - margin, this._hexY - 2, CellType.BUILDING);
    }
  }

  // TODO COMENTAR
  /**
   *
   * @param type
   * @param i
   * @param j
   * @returns
   */
  async drawCell(
    type: BuildingType | TerrainType,
    i: number,
    j: number,
    cellType: CellType = CellType.TERRAIN,
  ): Promise<void> {
    if (!this._ctx) return;
    const coords = this._calculateCoordinates(i, j);
    const sprite = cellType === CellType.BUILDING ? buildingSprites[type] : terrainSprites[type];

    // If the image is already loaded we draw it
    if (sprite.image.complete) {
      sprite.draw(this._ctx, coords.x, coords.y);
    } else {
      // If the image is not loaded we wait till it is
      await new Promise<void>((resolve) => {
        sprite.image.onload = () => {
          sprite.draw(this._ctx, coords.x, coords.y);
          resolve();
        };
      });
    }
  }

  async createMap(players: string[]) {
    this._players = players;
    await this._initTerrains();
    await this._initCastles();
  }

  // this._initCastles(); // TODO
}

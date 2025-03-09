import { Building, buildingSprites, BuildingType } from '../buildings';
import { map__TerrainRare, Terrain, terrainSprites, TerrainType } from './terrains';
import { Cost, TERRAIN_SPRITE_HEIGTH, TERRAIN_SPRITE_WIDTH } from '../commons';
import { Cell, CellType } from './cells';
import { Coordinates } from './coordinates';
import { bookSprites, BookType } from '../items';

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
        this._cells[i][j] = new Terrain(coords, chosenType);

        // Paint the sprite
        await this.drawCell(chosenType, coords);
      }
    }
  }

  // TODO TEMP
  // TODO COMENTAR
  // TODO AQUI SE ASIGNAN LOS CASTILLOS A LOS JUGADORES
  /**
   *
   */
  private async _initCastles() {
    if (this._players.length === 2) {
      // Player 1
      let coords = this._calculateCoordinates(1, 1);
      await this.drawCell(BuildingType.CASTLE, coords, CellType.BUILDING);
      // TODO MD
      let terrain: Terrain = this._cells[1][1] as Terrain;
      const cost = Building.getCost(BuildingType.CASTLE, terrain.terrainType);
      console.log(terrain.terrainType, cost);
      this._cells[1][1] = new Building(
        'Player 1',
        coords,
        BuildingType.CASTLE,
        terrain.terrainType,
      );

      // Player 2
      // At odd files the margin must be 1 more
      const margin = this._hexY % 2 === 0 ? 2 : 3;
      coords = this._calculateCoordinates(this._hexX - margin, this._hexY - 2);
      await this.drawCell(BuildingType.CASTLE, coords, CellType.BUILDING);
      // TODO MD
      terrain = this._cells[this._hexX - margin][this._hexY - 2] as Terrain;
      this._cells[1][1] = new Building(
        'Player 1',
        coords,
        BuildingType.CASTLE,
        terrain.terrainType,
      );
    }
  }

  // TODO MD Y MEJORAR
  /**
   *
   * @returns
   */
  private _addClickListener() {
    if (!this._canvas) return;
    this._canvas.addEventListener('click', (e: MouseEvent) => {
      const rect = this._canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Calculamos índices aproximados basándonos en la misma lógica de _calculateCoordinates
      const cellY = Math.floor(clickY / (TERRAIN_SPRITE_HEIGTH * 0.75));
      const offsetX = cellY % 2 === 1 ? TERRAIN_SPRITE_WIDTH * 0.5 : 0;
      const cellX = Math.floor((clickX - offsetX) / TERRAIN_SPRITE_WIDTH);

      if (this._cells[cellX] && this._cells[cellX][cellY]) {
        const cell = this._cells[cellX][cellY];

        if (cell.cellType === CellType.TERRAIN) {
          const terrainCell = cell as Terrain;
          const name = terrainCell.terrainType.toUpperCase();
          const list = this._getModalResourcesList(terrainCell.resources);

          this._showTerrainModal(name, list);
        } else if (cell.cellType === CellType.BUILDING) {
          const buildingCell = cell as Building;
          const name = buildingCell.buildingType.toUpperCase();

          this._showBuildingModal(name, buildingCell.owner);
        }
      }
    });
  }

  /**
   *
   * @param resources
   * @returns
   */
  private _getModalResourcesList(resources: Cost): HTMLElement {
    const list = document.createElement('ul');
    list.classList.add('modal__list');

    Object.entries(resources).forEach((e: [string, number]) => {
      const li = document.createElement('li');
      li.innerText = `${e[0]}: ${e[1]}`;
      list.appendChild(li);
    });

    return list;
  }

  // TODO METODO GENERICO PARA AÑADOR ESTO
  /**
   *
   * @param message
   * @param list
   */
  private _showTerrainModal(message: string, list: HTMLElement) {
    // Delete the last modal
    document.querySelector('.modal')?.remove();

    // Modal
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Title
    const title = document.createElement('p');
    title.innerText = message;
    title.classList.add('modal__title');
    modal.appendChild(title);

    // List
    modal.appendChild(list);

    // Close btn with its close event
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    modal.appendChild(closeBtn);

    document.body.appendChild(modal);
  }

  // TODO MD Y MEJORAR
  /**
   *
   * @param message
   */
  private _showBuildingModal(message: string, owner: string) {
    // Delete the last modal
    document.querySelector('.modal')?.remove();

    // Modal
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Title
    const title = document.createElement('p');
    title.innerText = message;
    title.classList.add('modal__title');
    modal.appendChild(title);

    // Player
    const player = document.createElement('p');
    player.innerText = owner;
    modal.appendChild(player);

    // Close btn with its close event
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    modal.appendChild(closeBtn);

    document.body.appendChild(modal);
  }

  // TODO ESTO LO VAMOS A QUITAR PORQUE EL ARMOUR SE DIBUJA EN LAS TASKS DE UN BUILDING MODAL
  async testDraw(type: BookType, coords: Coordinates): Promise<void> {
    const sprite = bookSprites[type];
    if (!this._ctx) return;

    if (sprite.image.complete) {
      sprite.draw(this._ctx, coords.x, coords.y);
    } else {
      await new Promise<void>((resolve) => {
        sprite.image.onload = () => {
          // WHY IS IT NEEDED HERE
          if (!this._ctx) return;
          sprite.draw(this._ctx, coords.x, coords.y);
          resolve();
        };
      });
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
    coords: Coordinates,
    cellType: CellType = CellType.TERRAIN,
  ): Promise<void> {
    if (!this._ctx) return;
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

  /**
   *
   * @param players
   */
  async createMap(players: string[]) {
    this._players = players;
    await this._initTerrains();
    await this._initCastles();
    await this.testDraw(BookType.BRONZE_PAPYRUS, { x: 0, y: 0 });
    await this.testDraw(BookType.BRONZE_PERGAMINE, { x: 20, y: 20 });
    await this.testDraw(BookType.BRONZE_MANUSCRIPT, { x: 40, y: 40 });
    await this.testDraw(BookType.BRONZE_TOME, { x: 60, y: 60 });
    await this.testDraw(BookType.BRONZE_SCRIPTURE, { x: 80, y: 80 });
    await this.testDraw(BookType.BRONZE_GRIMOIRE, { x: 100, y: 100 });
    await this.testDraw(BookType.BRONZE_BIBLE, { x: 120, y: 120 });
    await this.testDraw(BookType.BRONZE_CODEX, { x: 140, y: 140 });
    this._addClickListener();
  }
}

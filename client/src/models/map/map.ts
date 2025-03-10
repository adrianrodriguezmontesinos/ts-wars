import { Building, buildingSprites, BuildingType } from '../buildings';
import { Terrain, terrainSprites, TerrainType } from './terrains';
import { Cost, Sprite, TERRAIN_SPRITE_HEIGTH, TERRAIN_SPRITE_WIDTH } from '../commons';
import { Cell, CellType } from './cells';
import { Coordinates } from './coordinates';
import { bookSprites, BookType } from '../items';
import { Player } from '../players';

export class GameMap {
  private _hexX: number;
  private _hexY: number;
  private _w: number;
  private _h: number;
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D | null;
  private _cells: Cell[][];
  private _players: Player[];

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

  //#region INIT

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
    const terrainTypes = Terrain.getTerrainTypes();
    const totalRarity = Terrain.getTotalRarity(terrainTypes);

    for (let j = 0; j < this._hexY; j++) {
      for (let i = 0; i < this._hexX; i++) {
        // At odd rows the last item will not draw
        if (j % 2 === 1 && i === this._hexX - 1) continue;

        // Init each first row
        this._initSubArray(i);

        // Get the chosen terrain type (usinf rariry ratios) and the coordinates
        const chosenType = Terrain.chooseTerrainType(terrainTypes, totalRarity);
        const coords = Terrain.calculateCoordinates(i, j);

        // Save the terrain cell
        this._cells[i][j] = new Terrain(coords, { x: i, y: j }, chosenType);

        // Paint the sprite
        await this.drawCell(chosenType, coords);
      }
    }
  }

  // TODO TEMP MANAGE OF PLAYERS!!!
  /**
   * Init game players and their castles
   */
  private async _initPlayers() {
    // Player 1
    let coords = Terrain.calculateCoordinates(1, 1);
    await this.drawCell(BuildingType.CASTLE, coords, CellType.BUILDING);

    let terrain: Terrain = this._cells[1][1] as Terrain;
    const castle1 = new Building(
      'Player 1',
      coords,
      { x: 1, y: 1 },
      BuildingType.CASTLE,
      terrain.terrainType,
    );
    const player1 = new Player('Player 1', [castle1]);
    this._cells[1][1] = castle1;

    const cost = Building.getCost(BuildingType.HOUSE, TerrainType.GRASS);
    const cost2 = Building.getCost(BuildingType.FARM, TerrainType.GRASS);

    // Player 2
    // At odd files the margin must be 1 more
    const margin = this._hexY % 2 === 0 ? 2 : 3;
    coords = Terrain.calculateCoordinates(this._hexX - margin, this._hexY - 2);
    await this.drawCell(BuildingType.CASTLE, coords, CellType.BUILDING);

    terrain = this._cells[this._hexX - margin][this._hexY - 2] as Terrain;

    const castle2 = new Building(
      'Player 2',
      coords,
      { x: this._hexX - margin, y: this._hexY - 2 },
      BuildingType.CASTLE,
      terrain.terrainType,
    );
    const player2 = new Player('Player 2', [castle2]);
    this._cells[1][1] = castle2;

    this._players = [player1, player2];
  }

  //#endregion INIT

  //#region BUILD

  //#endregion BUILD

  //#region MODALS

  /**
   * Click listener to the terrain cells
   */
  private _addCellClickListener() {
    if (!this._canvas) return;
    this._canvas.addEventListener('click', (e: MouseEvent) => {
      const rect = this._canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Calculate the index of the cells (same logic as _calculateCoordinates)
      const cellY = Math.floor(clickY / (TERRAIN_SPRITE_HEIGTH * 0.75));
      const offsetX = cellY % 2 === 1 ? TERRAIN_SPRITE_WIDTH * 0.5 : 0;
      const cellX = Math.floor((clickX - offsetX) / TERRAIN_SPRITE_WIDTH);

      if (this._cells[cellX] && this._cells[cellX][cellY]) {
        const cell = this._cells[cellX][cellY];

        // Delete the last modal
        document.querySelector('.modal')?.remove();

        if (cell.cellType === CellType.TERRAIN) {
          this._setTerrainModal(cell as Terrain);
        } else if (cell.cellType === CellType.BUILDING) {
          this._setBuildingModal(cell as Building);
        }
      }
    });
  }

  //#region MODALS - TERRAINS

  /**
   * Get an HTML list of the resources
   * @param resources Resources to be displayed at a list
   * @returns
   */
  private _getModalResourcesList(resources: Cost): HTMLElement {
    const list = document.createElement('ul');
    list.classList.add('modal__list');

    // For each resource we create a list item
    Object.entries(resources).forEach((e: [string, number]) => {
      const li = document.createElement('li');
      li.innerText = `${e[0]}: ${e[1]}`;
      list.appendChild(li);
    });

    return list;
  }

  // TODO
  /**
   *
   * @param sprite
   * @param width
   * @param heigth
   * @returns
   */
  private _getItemImageContainer(name: string, sprite: Sprite): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('modal__containerImg');
    container.style.width = `${sprite.w}px`;
    container.style.height = `${sprite.h}px`;

    const img = document.createElement('img');
    img.classList.add('modal__containerImg__img');
    img.setAttribute('src', sprite.image.currentSrc);
    img.setAttribute('alt', name);
    img.style.left = `-${sprite.x}px`;
    img.style.top = `-${sprite.y}px`;

    container.appendChild(img);
    return container;
  }

  // TODO APPEND METHOD REFACTOR AT LOGIC
  // TODO
  /**
   *
   * @param positions
   * @returns
   */
  private _getBuildingCards(positions: Coordinates): HTMLDivElement {
    const grid = document.createElement('div');
    grid.classList.add('modal__grid');

    // All buildings
    const buildings = Building.getBuildingTypes();

    // For each building we create a list item
    Object.entries(buildings).forEach((b: [string, BuildingType]) => {
      const card = document.createElement('div');
      card.classList.add('modal__card');

      // Building name
      const p = document.createElement('p');
      const building = b[1];
      p.innerText = building;
      card.appendChild(p);

      // Building image
      const img = this._getItemImageContainer(building, buildingSprites[building]);
      card.appendChild(img);

      // TODO SEPARAR
      // Build click event
      card.addEventListener('click', () => {
        console.log(positions, );
      });

      // li.innerText = `${e[0]}: ${e[1]}`;
      grid.appendChild(card);
    });

    return grid;
  }

  /**
   * Draw a modal with terrain info
   * @param terrainCell Terrain cell
   */
  private _setTerrainModal(terrainCell: Terrain) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Title
    const title = document.createElement('p');
    title.innerText = terrainCell.terrainType.toUpperCase();
    title.classList.add('modal__title');
    modal.appendChild(title);

    // List
    const list = this._getModalResourcesList(terrainCell.resources);
    modal.appendChild(list);

    // Buildings
    const buildings = this._getBuildingCards(terrainCell.positions);
    modal.appendChild(buildings);

    // Close button with its close event
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    modal.appendChild(closeBtn);

    document.body.appendChild(modal);
  }

  //#endregion MODALS - TERRAINS

  //#region MODALS - BUILDINGS

  /**
   * Get a modal with building info
   * @param buildingCell Building cell
   */
  private _setBuildingModal(buildingCell: Building) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Title
    const title = document.createElement('p');
    title.innerText = `${buildingCell.buildingType.toUpperCase()} - ${buildingCell.owner}`;
    title.classList.add('modal__title');
    modal.appendChild(title);

    // Close btn with its close event
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    modal.appendChild(closeBtn);

    document.body.appendChild(modal);
  }

  //#endregion MODALS - BUILDINGS

  //#endregion MODALS

  //#region DRAW

  // TODO TEST
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

  /**
   * Draw a cell into the canvas
   * @param type Type of building (BuildingType) or terrain (TerrainType)
   * @param coords Coordinates where to draw the cell
   * @param cellType Cell type 'CellType.TERRAIN' or 'CellType.BUILDING'
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

  //#endregion DRAW

  // TODO PLAYERS AS PARAMS
  /**
   * Create and draw the game map
   * @param players
   */
  async createMap() {
    await this._initTerrains();
    await this._initPlayers();
    await this.testDraw(BookType.BRONZE_PAPYRUS, { x: 0, y: 0 }); // TODO TEST
    this._addCellClickListener();
  }
}

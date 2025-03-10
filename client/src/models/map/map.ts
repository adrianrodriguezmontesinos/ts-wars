import { Building, buildingSprites, BuildingType } from '../buildings';
import { Terrain, terrainSprites, TerrainType } from './terrains';
import { Cost, Sprite, SPRITE_16, TERRAIN_SPRITE_HEIGTH, TERRAIN_SPRITE_WIDTH } from '../commons';
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
  private _player: Player;

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
   * Load terrain and building sprites (Promise)
   */
  private async _loadSprites(): Promise<void> {
    const promises: Promise<void>[] = [];

    // Load buildingSprites
    Object.values(buildingSprites).forEach((sprite) => {
      if (!sprite.image.complete) {
        promises.push(
          new Promise<void>((resolve) => {
            sprite.image.onload = () => resolve();
          }),
        );
      }
    });

    // Load terrainSprites
    Object.values(terrainSprites).forEach((sprite) => {
      if (!sprite.image.complete) {
        promises.push(
          new Promise<void>((resolve) => {
            sprite.image.onload = () => resolve();
          }),
        );
      }
    });

    await Promise.all(promises);
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
  private _initTerrains() {
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
        this._drawCell(chosenType, coords);
      }
    }
  }

  // TODO TEMP MANAGE OF PLAYERS!!!
  /**
   * Init game players and their castles
   */
  private _initPlayers() {
    this._player = new Player('Player 1');

    // Player 1
    const pos: Coordinates = {
      x: 1,
      y: 1,
    };
    this._build(this._player.name, BuildingType.CASTLE, pos);
    this._setPlayerModal();

    // Player 2
    // At odd files the margin must be 1 more
    const margin = this._hexY % 2 === 0 ? 2 : 3;
    pos.x = this._hexX - margin;
    pos.y = this._hexY - 2;
    // TODO IT IS HARDCODED BY THE MOMENT
    this._build('Player 2', BuildingType.CASTLE, pos);
  }

  //#endregion INIT

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
        document.querySelector('#modal-cell')?.remove();

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
   * @param terrainType TerrainType
   * @returns
   */
  private _getBuildingCards(positions: Coordinates, terrainType: TerrainType): HTMLDivElement {
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

      // Build click event if we can pay it, if not we set the not allowed class
      if (this._player.canIPay(building, terrainType)) {
        card.addEventListener('click', () => {
          const cost = Building.getCost(building, terrainType);

          // Pay and build
          this._player.payCost(cost);
          this._build(this._player.name, building, positions);
          
          // Update resources event (to player modal) after the payment
          document.dispatchEvent(new CustomEvent('updateResources', { detail: this._player.resources }));
        });
      } else {
        card.classList.add('modal__card--not-allowed');
      }

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
    modal.setAttribute('id', 'modal-cell');

    // Title
    const title = document.createElement('p');
    title.innerText = terrainCell.terrainType.toUpperCase();
    title.classList.add('modal__title');
    modal.appendChild(title);

    // List
    const list = this._getModalResourcesList(terrainCell.resources);
    modal.appendChild(list);

    // Buildings
    const buildings = this._getBuildingCards(terrainCell.positions, terrainCell.terrainType);
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
    modal.setAttribute('id', 'modal-cell');

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

  //#region MODALS - PLAYER

  private _setPlayerModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'modal--player');

    // Title
    const title = document.createElement('p');
    title.innerText = this._player.name;
    title.classList.add('modal__title');
    modal.appendChild(title);

    // List
    const list = this._getModalResourcesList(this._player.resources);
    modal.appendChild(list);

    // Update resources listener
    document.addEventListener('updateResources', (e: Event) => {
      const customEvent = e as CustomEvent;
      const resourceList = modal.querySelector('.modal__list');

      if (resourceList) {
        resourceList.innerHTML = '';

        // Update the list values from the updateResources' event ones
        Object.entries(customEvent.detail).forEach(([key, value]) => {
          const li = document.createElement('li');
          li.innerText = `${key}: ${value}`;
          resourceList.appendChild(li);
        });
      }
    });

    // TODO MINIMIZE BUTTON

    document.body.appendChild(modal);
  }

  //#endregion MODALS - PLAYER

  //#endregion MODALS

  //#region DRAW & BUILD

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

  // TODO
  /**
   *
   * @param owner
   * @param type
   * @param pos
   */
  private _build(owner: string, type: BuildingType, pos: Coordinates) {
    const coords = Terrain.calculateCoordinates(pos.x, pos.y);
    const building = new Building(owner, coords, pos, type);

    this._cells[pos.x][pos.y] = building;
    if (this._player.name === owner) {
      this._player.buildings.push(building);
    }

    this._drawCell(type, coords, CellType.BUILDING);

    // Delete the last modal
    document.querySelector('#modal-cell')?.remove();
  }

  /**
   * Draw a cell into the canvas
   * @param type Type of building (BuildingType) or terrain (TerrainType)
   * @param coords Coordinates where to draw the cell
   * @param cellType Cell type 'CellType.TERRAIN' (default) or 'CellType.BUILDING'
   * @returns
   */
  private _drawCell(
    type: BuildingType | TerrainType,
    coords: Coordinates,
    cellType: CellType = CellType.TERRAIN,
  ) {
    if (!this._ctx) return;

    const sprite = cellType === CellType.BUILDING ? buildingSprites[type] : terrainSprites[type];
    sprite.draw(this._ctx, coords.x, coords.y);
  }

  //#endregion DRAW & BUILD

  // TODO PLAYERS AS PARAMS
  /**
   * Create and draw the game map
   * @param players
   */
  async createMap() {
    await this._loadSprites();
    this._initTerrains();
    this._initPlayers();
    // await this.testDraw(BookType.BRONZE_PAPYRUS, { x: 0, y: 0 }); // TODO TEST
    this._addCellClickListener();
  }
}

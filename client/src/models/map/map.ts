import { Building, buildingSprites, BuildingType, Mine, MineType, mineTypes } from '../buildings';
import {
  Cost,
  SingleSprite,
  Sprite,
  TERRAIN_SPRITE_HEIGTH,
  TERRAIN_SPRITE_WIDTH,
} from '../commons';
import {
  BookType,
  map__ToolCosts,
  Tool,
  toolSprites,
  ToolType,
  Upgrade,
  UpgradeType,
  UpgradeTypeAndList,
} from '../upgrades';
import { Terrain, terrainSprites, TerrainType } from './terrains';
import { Cell, CellType } from './cells';
import { adyacents, Coordinates } from './coordinates';
import { Player } from '../players';
import { AudioManager } from '../../logic';
import { AudioType } from '../audio';

let COUNT_FAST = 5000;
let COUNT_SLOW = 60000;

export class GameMap {
  private _hexX: number;
  private _hexY: number; // numebr of cells (x and y axis)
  private _w: number;
  private _h: number; // with and height
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D | null; // canvas and canvas context
  private _cells: Cell[][]; 
  private _audio: AudioManager;
  private _player: Player; // TODO MULTIPLE PLAYERS

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
    this._audio = AudioManager.getInstance();
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

    let terrain: Terrain = this._cells[pos.x][pos.y] as Terrain;
    this._build(this._player.name, BuildingType.CASTLE, terrain);
    this._setPlayerModal();

    // Player 2
    // At odd files the margin must be 1 more
    const margin = this._hexY % 2 === 0 ? 2 : 3;
    pos.x = this._hexX - margin;
    pos.y = this._hexY - 2;
    terrain = this._cells[pos.x][pos.y] as Terrain;
    // TODO PLAYER 2 IT IS HARDCODED BY THE MOMENT
    this._build('Player 2', BuildingType.CASTLE, terrain);
  }

  //#endregion INIT

  //#region MODALS

  //#region MODALS - COMMON

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

        // Close the last modal
        this._closeCellModal();
        this._playEffect(AudioType.CLICK);

        if (cell.cellType === CellType.TERRAIN) {
          this._setTerrainModal(cell as Terrain, !this._isBuildableCell(cell));
        } else if (cell.cellType === CellType.BUILDING) {
          this._setBuildingModal(cell as Building);
        }
      }
    });
  }

  // TODO
  /**
   *
   * @param name
   * @param sprite
   * @returns
   */
  private _getSpriteImgContainer(name: string, sprite: Sprite | SingleSprite): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('modal__containerImg');
    container.style.width = `${sprite.w}px`;
    container.style.height = `${sprite.h}px`;

    const img = document.createElement('img');
    img.classList.add('modal__containerImg__img');
    img.setAttribute('src', sprite.image.currentSrc);
    img.setAttribute('alt', name);

    if (sprite instanceof Sprite) {
      img.style.left = `-${sprite.x}px`;
      img.style.top = `-${sprite.y}px`;
    }

    container.appendChild(img);
    return container;
  }

  /**
   * Remove the HTML modal div from the HTML document
   */
  private _closeCellModal() {
    document.querySelector('#modal-cell')?.remove();
  }

  //#endregion MODALS - COMMON

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

  // TODO APPEND METHOD REFACTOR AT LOGIC
  // TODO
  /**
   *
   * @param terrain Terrain below construction
   * @param onlyCastle If only castle can be built
   * @returns
   */
  private _getBuildingCards(terrain: Terrain, onlyCastle: boolean): HTMLDivElement {
    const grid = document.createElement('div');
    grid.classList.add('modal__grid');

    // All buildings
    const buildings = onlyCastle ? Building.getCastleTypes() : Building.getBuildingTypes();

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
      const img = this._getSpriteImgContainer(building, buildingSprites[building]);
      card.appendChild(img);

      // Build click event if we can pay it, if not we set the not allowed class
      if (this._player.canIBuild(building, terrain.terrainType)) {
        card.addEventListener('click', () => {
          this._playEffect(AudioType.BUILD);

          const cost = Building.getCost(building, terrain.terrainType);

          // Pay and build
          this._player.payCost(cost);
          this._build(this._player.name, building, terrain);

          // Update resources event (to player modal) after the payment
          document.dispatchEvent(
            new CustomEvent('updateResources', { detail: this._player.resources }),
          );
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
   * @param onlyCastle If only castle can be built
   */
  private _setTerrainModal(terrainCell: Terrain, onlyCastle: boolean) {
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
    const buildings = this._getBuildingCards(terrainCell, onlyCastle);
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

  // TODO
  /**
   *
   * @param buildingType
   * @returns
   */
  private _getUpgradeTypeAndList(buildingType: BuildingType): UpgradeTypeAndList {
    const res: UpgradeTypeAndList = {} as UpgradeTypeAndList;
    if (mineTypes.includes(buildingType)) {
      res.list = Tool.getToolTypes();
      res.type = UpgradeType.TOOL;
    }

    return res;
  }

  // TODO
  /**
   *
   * @param upgradeType
   * @param type
   * @param cost
   * @param sprite
   * @returns
   */
  private _getUpgrade(
    upgradeType: UpgradeType,
    type: ToolType | BookType,
    cost: Cost,
    sprite: Sprite,
  ): Tool {
    if (upgradeType === UpgradeType.TOOL) {
      return new Tool(type as ToolType, cost, sprite);
    } else {
      // TODO USE BOOKS
      return new Tool(type as ToolType, cost, sprite);
    }
  }

  // TODO
  /**
   *
   * @param upgradeType
   * @param type
   * @returns
   */
  private _getUpgradeImagContainer(
    upgradeType: UpgradeType,
    type: ToolType | BookType,
  ): HTMLDivElement {
    let container = document.createElement('div');

    if (upgradeType === UpgradeType.TOOL) {
      container = this._getSpriteImgContainer(type, toolSprites[type]);
    }

    return container;
  }

  // TODO
  /**
   *
   * @param type
   * @returns
   */
  private _getUpgradeCards(building: Building): HTMLDivElement {
    const grid = document.createElement('div');
    grid.classList.add('modal__grid');

    // TODO REFACTOR WE ARE GONNA HAVE NOT JUST TOOL UPGRADES
    // All upgrades
    const upgradeTypesAndList = this._getUpgradeTypeAndList(building.buildingType);
    const upgrades = upgradeTypesAndList.list;

    // For each building we create a list item
    Object.entries(upgrades).forEach((u: [string, BookType | ToolType]) => {
      const card = document.createElement('div');
      card.classList.add('modal__card');

      // Building name
      const p = document.createElement('p');
      const upgradeSubType = u[1];
      p.innerText = upgradeSubType;
      card.appendChild(p);

      // Building image
      const img = this._getUpgradeImagContainer(upgradeTypesAndList.type, upgradeSubType);
      card.appendChild(img);

      const cost = map__ToolCosts[u[1]];
      const hasTool = building.hasTool(upgradeSubType);

      if (hasTool) {
        card.classList.add('modal__card--active');
        // Build click event if we can pay it and its not already been added
      } else if (this._player.canIPay(cost) && !hasTool) {
        card.addEventListener('click', () => {
          // TODO REFACTOR (we are gonna use more different upgrades)
          if (mineTypes.includes(building.buildingType)) {
            const mine = building as Mine;
            const tool = this._getUpgrade(
              UpgradeType.TOOL,
              upgradeSubType,
              cost,
              toolSprites[upgradeSubType],
            );

            if (!hasTool) {
              // Pay and set the upgrade
              this._player.payCost(cost);
              mine.addTool(tool);

              // TODO AUDIO REFACTOR
              this._playEffect(AudioType.UPGRADE);

              // Set the active
              card.classList.add('modal__card--active');

              // Close the modal
              this._closeCellModal();

              // Update resources event (to player modal) after the payment
              document.dispatchEvent(
                new CustomEvent('updateResources', { detail: this._player.resources }),
              );
            }
          }
        });
      } else {
        card.classList.add('modal__card--not-allowed');
      }

      grid.appendChild(card);
    });

    return grid;
  }

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

    // Buildings
    const upgrades = this._getUpgradeCards(buildingCell);
    modal.appendChild(upgrades);

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

  //#region MODALS - BUY

  private _buy() {}

  private _buyItem() {}

  private _buyUpgrade() {}

  //#endregion MODALS - BUY

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

  //#region DRAW & BUILD - CAN BUILD

  /**
   *
   * @param pos
   * @returns
   */
  private _getAdjacetHousesOrCastles(pos: Coordinates, player?: string): Building[] {
    const buildings: Building[] = [];

    for (const [dx, dy] of adyacents) {
      const newX = pos.x + dx;
      const newY = pos.y + dy;

      // Avoid positions out of range
      if (newX < 0 || newX >= this._cells.length || newY < 0 || newY >= this._cells[newX].length) {
        continue;
      }

      const cell = this._cells[newX][newY];

      // Verify if its a castle or house
      if (!Building.isHouseOrCastle(cell)) {
        continue;
      }

      const building = cell as Building;

      // If there's a player param check if its owned by him
      if (player && building.owner !== player) {
        continue;
      }

      buildings.push(building);
    }

    return buildings;
  }

  // TODO VERIFY THEY BELONG TO PLAYER ONE
  /**
   *
   * @param cell
   * @returns
   */
  private _isBuildableCell(cell: Cell): boolean {
    const adjacentsHousesOrCastles = this._getAdjacetHousesOrCastles(
      cell.positions,
      this._player.name,
    );

    return adjacentsHousesOrCastles.length ? true : false;
  }

  //#endregion DRAW & BUILD - CAN BUILD

  //#region DRAW & BUILD - BUILD

  // TODO
  /**
   *
   * @param owner
   * @param coords
   * @param type
   * @param terrain
   * @returns
   */
  private _getBuildind(
    owner: string,
    coords: Coordinates,
    type: BuildingType,
    terrain: Terrain,
  ): Building | Mine {
    if (mineTypes.includes(type)) {
      return new Mine(
        owner,
        coords,
        terrain.positions,
        terrain.resources,
        type as MineType,
      ) as Mine;
    } else {
      return new Building(owner, coords, terrain.positions, type);
    }
  }

  // TODO
  /**
   *
   * @param owner
   * @param type
   * @param terrain
   * @param isMine
   */
  private _build(owner: string, type: BuildingType, terrain: Terrain) {
    const pos: Coordinates = terrain.positions;
    const coords: Coordinates = Terrain.calculateCoordinates(pos.x, pos.y);

    let building = this._getBuildind(owner, coords, type, terrain);

    this._cells[pos.x][pos.y] = building;
    if (this._player.name === owner) {
      this._player.buildings.push(building);
    }

    this._drawCell(type, coords, CellType.BUILDING);

    // Close the last modal
    this._closeCellModal();
  }

  //#endregion DRAW & BUILD - BUILD

  //#region DRAW & BUILD - DRAW

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

  //#endregion DRAW & BUILD - DRAW

  //#endregion DRAW & BUILD

  //#region ADIO

  /**
   * Play an audio effect. Send a custom event to play it
   * @param type Audio type to play
   */
  private _playEffect(type: AudioType) {
    document.dispatchEvent(new CustomEvent('playAudio', { detail: type }));
  }

  //#endregion AUDIO

  //#region MAIN

  // TODO PLAYERS AS PARAMS
  /**
   * Create and draw the game map
   * @param players
   */
  async createMap() {
    await this._loadSprites();
    this._initTerrains();
    this._initPlayers();
    this._addCellClickListener();
  }

  /**
   * Start the game (counters)
   * @param speedMult Speed multiplicator. By default 1 (no multuplier)
   */
  start(speedMult: number = 1) {
    COUNT_FAST /= speedMult;
    COUNT_SLOW /= speedMult;
    this._audio.playdMusic();

    // fast counter (basic resources)
    setInterval(() => {
      this._player.mine();
      document.dispatchEvent(
        new CustomEvent('updateResources', { detail: this._player.resources }),
      );
    }, COUNT_FAST);

    // slow counter (gem resources)
    setInterval(() => {
      this._player.mineGems();
      document.dispatchEvent(
        new CustomEvent('updateResources', { detail: this._player.resources }),
      );
    }, COUNT_SLOW);
  }

  //#endregion MAIN
}

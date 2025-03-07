# BRANCH feat/till-chap10

TODO CORREGIR README

## CHAPTER 8. CREATE AND SAVE MAP

### 8.1 SAVE THE CEILS

1. Let's code a method to draw both type of cells, buildings and terrains at `map.ts`:

```typescript
 drawCell(
    type: BuildingType | TerrainType,
    i: number,
    j: number,
    cellType: CellType = CellType.TERRAIN,
  ) {
    if (!this._ctx) return;
    // Get the coordinates from the x and y indexes
    const coords = this._calculateCoordinates(i, j);

    // Draw a building or a terrain depending on its type
    cellType === CellType.BUILDING
      ? buildingSprites[type].draw(this._ctx, coords.x, coords.y)
      : terrainSprites[type].draw(this._ctx, coords.x, coords.y);
  }
```

2. Now we are going to create a new property at `GameMap` class to save at an bidimensional array all the terrain objects at the map. We'll also create players array (for now just strings, later we will use a class for them):

```typescript
export class GameMap {
  // ...
  private _cells: Cell[][];
  private _players: string[]; // TODO TEMP USE PLAYER CLASS

  constructor(hexagonsX: number = 100, hexagonsY: number = 100) {
    // ...
    this._cells = [];
  }

  // ...
}
```

3. Now we refactor our method to draw the terrain (we used new names an visibilities):

```typescript
  private async _initTerrains() {
    if (!this._ctx) return;

    const firstDrawTerrains = () => {
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
          this.drawCell(chosenType, i, j);
        }
      }
    };

    // TODO IMPROVE - IT LOADS WHEN THE LAST IMAGE IS LOADED (HARDODED RN, -> NOK)
    terrainSprites.wax5.image.onload = firstDrawTerrains;
  }
```

We are using these submethods:

```typescript
private _initSubArray(i: number) {
    if (!this._cells[i]) {
      this._cells[i] = [];
    }
  }
```

```typescript
drawCell(
  type: BuildingType | TerrainType,
  i: number,
  j: number,
  cellType: CellType = CellType.TERRAIN,
) {
if (!this._ctx) return;
// Get the coordinates from the x and y indexes
const coords = this._calculateCoordinates(i, j);

// Draw a building or a terrain depending on its type
cellType === CellType.BUILDING
  ? buildingSprites[type].draw(this._ctx, coords.x, coords.y)
  : terrainSprites[type].draw(this._ctx, coords.x, coords.y);
}
```

> Note that we already eliminate the const ctx to use the property \_ctx so we can have a better approach;

4. now we use a method to create the map:

```typescript
createMap(players: string[]) {
    this._players = players;
    this._initTerrains();
}
```

5. And update the `main.js`:

```typescript
gameMap.createMap(['Player 1', 'Player 2']);
```

6. We can test if the cells are properly saved at the Cell array with a log at the end of `firstDrawTerrains` method:

```ts
const firstDrawTerrains = () => {
  // ...
  console.log(this._cells);
};
```

### 8.2 ASYNC LOGIT AT GAME MAP DRAWING

We can notice that, if we move log to the `createMap` method below the `_initTerrains` like:

```ts
createMap(players: string[]) {
    this._players = players;
    this._initTerrains();
    console.log(this._cells);
}
```

It prints an empty array, this is because, inside `_initTerrains` we have an async call at `firstDrawTerrains` method:

```ts
// this is async because it is waiting until the last sprite image is loaded
terrainSprites.wax5.image.onload = firstDrawTerrains;
```

So the console execute before all the images are loaded. So we need to make use of `promises` (manage asynchronous operations) ,`await` (wait the execution till the promise is resolved, used INSIDE asynchronous functions) and `async` (declare asynchronous functions).

1. Make the `drawCell` method asynchronous

```ts
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
```

2. Use it properly inside `_initTerrains` which also will be async. Note that we are not gonna need the early return for `_ctx` since `drawCell` already manage that so we are not gonna use that code line:

```ts
 private async _initTerrains() {
    const terrainTypes = this._getTerrainTypes();
    const totalRarity = this._getTotalRarity(terrainTypes);

    for (let j = 0; j < this._hexY; j++) {
      for (let i = 0; i < this._hexX; i++) {
        if (j % 2 === 1 && i === this._hexX - 1) continue;

        this._initSubArray(i);

        const chosenType = this._chooseTerrainType(terrainTypes, totalRarity);
        const coords = this._calculateCoordinates(i, j);

        this._cells[i][j] = new Terrain(CellOwnerType.NONE, coords, chosenType);

        // WE WAIT TILL THE DRAW IS SOLVED
        await this.drawCell(chosenType, i, j);
      }
    }
  }
```

3. Now we concet the asyncs to the first function invoked:

```ts
async createMap(players: string[]) {
    this._players = players;
    await this._initTerrains();
    console.log(this._cells);
}
```

and at `main.ts`:

```ts
const gameMap = new GameMap(20, 20);
await gameMap.createMap(['Player 1', 'Player 2']);
```

Now the `console.log(this._cells);` at `createMap` works correctly.

4. Lets init 2 castles (we assume for now we have only 2 players):

```ts
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
```

```ts
async createMap(players: string[]) {
  this._players = players;
  await this._initTerrains();
  await this._initCastles();
}
```

## CHAPTER 9. BULDINGS



```ts

```

TODO MENU INTERFACE

TODO WHEN ITS GROW MAKE A BOOK (SEPARATED MDs) OF IT

```ts

```

## CHAPTER N. SERVER

TODO SERVER DEPENDENCIES

1. install express & cors: `pnpm i express cors`

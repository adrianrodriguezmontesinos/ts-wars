# BRANCH feat/till-chap7

## CHAPTER 5. CREATE A MAP

1. lets refactor our `drawMap()` method of `GameMap` at `models/map/map.ts`:
   insead of

```typescript
drawMap() {
    const ctx: CanvasRenderingContext2D | null = this._ctx;

    if (ctx) {
      // ...
    }
}
```

We'll use a guard clause or an early return (![example at JS](https://dev.to/arikaturika/one-concept-a-day-early-return-pattern-in-javascript-3pol)):

```typescript
drawMap() {
  const ctx: CanvasRenderingContext2D | null = this._ctx;
  if (!ctx) return;

  // ...
}
```

At this scenario we are not reducing the ![cyclomatic complexity](https://dev.to/igneel64/easing-into-cyclomatic-complexity-38b1) of this method (main porpouse of the guard clauses) but the code will be cleaner.

2. We are gonna fill the maps with the hexagonal terrain cells (sprites). In order to do that we are also going to refactor the `GameMap`constructor and add 2 new properties:

```typescript
constructor(hexagonsX: number = 100, hexagonsY: number = 100) {
    this._hexX = hexagonsX;
    this._hexY = hexagonsY;
    this._w = TERRAIN_SPRITE_WIDTH * hexagonsX;
    this._h = TERRAIN_SPRITE_WIDTH * hexagonsY;

    // ...
}
```

3. Let's gonna create a `testDraw2()` arrow function inside `drawMap()` to draw just the first terrain (grass):

```typescript
const testDraw2 = () => {
  for (let i = 0; i < this._hexX; i++) {
    for (let j = 0; j < this._hexY; j++) {
      const x = i * TERRAIN_SPRITE_WIDTH;
      const y = j * TERRAIN_SPRITE_HEIGTH;

      terrainSprites.grass.draw(ctx, x, y);
    }
  }
};

terrainSprites.grass.image.onload = testDraw2;
```

> note: comment or delete `testDraw()` and its call.

It does not work properly but, let's take into account the prev. chapter.

4. As we noted at the prev. chapter we have a sequence at the drawing (see branch till-chapter4):

- at odd rows the terrain cell have an 50% offset at x-axis (horizontally)
- at new rows the terrain cell have an -25% offset at y-axis (vertically), which is the same as, insetad of being `TERRAIN_SPRITE_HEIGT` more vertically they are `TERRAIN_SPRITE_HEIGT * 0.75`.

So now we can change our `testDraw2()` method:

```typescript
const testDraw2 = () => {
  for (let i = 0; i < this._hexX; i++) {
    for (let j = 0; j < this._hexY; j++) {
      // Offset X (displacement) at odd files -> 50%
      const offsetX = j % 2 === 1 ? TERRAIN_SPRITE_WIDTH * 0.5 : 0;

      const x = i * TERRAIN_SPRITE_WIDTH + offsetX;
      // Each row displace 75% vertically
      const y = j * (TERRAIN_SPRITE_HEIGTH * 0.75);

      terrainSprites.grass.draw(ctx, x, y);
    }
  }
};

terrainSprites.grass.image.onload = testDraw2;
```

5. In order to mantain the same aspect and not to draw the las column cell at odd rows (becase of the offset) we are gonna use a continue statement: `if (j % 2 === 1 && i === this._hexX - 1) continue;`

```typescript
const testDraw2 = () => {
  for (let i = 0; i < this._hexX; i++) {
    for (let j = 0; j < this._hexY; j++) {
      // At odd rows the last item will not draw
      if (j % 2 === 1 && i === this._hexX - 1) continue;

      // Offset X (displacement) at odd files - 50%
      const offsetX = j % 2 === 1 ? TERRAIN_SPRITE_WIDTH * 0.5 : 0;

      const x = i * TERRAIN_SPRITE_WIDTH + offsetX;
      // Each row displace 75% vertically
      const y = j * (TERRAIN_SPRITE_HEIGTH * 0.75);

      terrainSprites.grass.draw(ctx, x, y);
    }
  }
};

terrainSprites.grass.image.onload = testDraw2;
```

6. Let's test the result:

```javascript
const gameMap = new GameMap(20, 20);
gameMap.drawMap();
```

We have a map with 20x20 cells all `grass`.

7. Now we have to create the create a terrain type enum `TerrainType` at `models/terrain/terrain.types.ts` and a map for terrain rarity const `map__TerrainRare` at `models/terrain/terrain.maps.ts`. This rarity will be the ratio of appearance.

```typescript
// At terrais.types.ts
export enum TerrainType {
  GRASS = "grass",
  GRASS2 = "grass2",
  // ...
}

// At terrain.maps.ts
export const map__TerrainRare: Record<TerrainType, number> = {
  [TerrainType.GRASS]: 100,
  [TerrainType.GRASS2]: 50,
  // ...
};
```

> We are using a typecript `Record` [See docs](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type). `Record` is a TS generic utility which define an object form with `keys` ad `valus`: `Record<K, V>`. `Keys` and `values` can have the Type you want.

8. Lets use these 2 to set randomly a rarity, so we'll create a new arrow function `testDraw3`:

```typescript
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

// TEMP
terrainSprites.wax5.image.onload = testDraw3;
```

And its corresponding methods: `_getTerrainTypes()`, `_getTotalRarity()`, `_chooseTerrainType()`, `_calculateCoordinates()` in order to maintain clean code using the functional programming paragigm.

9. If the reload the page, each time we'll see a different mao with different tipe of terrains, it works ✅. The next thing we need is to create a menu interface and a storage for the map.

## CHAPTER 6. TERRAIN AND CELL CLASSES

### 6.1 RESOURCES

1. Before we create the menu UI and the storage we are gonna create our terrain object, each terrain will have resources to be mined so we need a resource enum `ResourceType` at `models/resources/recource.types.ts`.

2. And a map for recource conversion (each resource will value x2 than the prev. one). So at `models/resources/recource.maps.ts`:

```typescript
export const map__Resources: Record<ResourceType, number> = {
  [ResourceType.COIL]: 1,
  [ResourceType.BRONZE]: 2,
  // ...
};
```

Again we are using a `Record`.

### 6.2 COSTS AND COORDINATES

1. Creare the coordinates interface at `models/map/coordinates.ts` to set the terrain coordinates at map:

```typescript
export interface Coordinates {
  x: number;
  y: number;
}
```

2. Create a `Cost` type at `models/costs/costs.ts` to set the terrain avaliable resources and the building, soldiers, weapons, ... Costs:

```typescript
export type Cost = Record<ResourceType, number>;
```

### 6.3 TERRAIN CLASS

1. Create a terrain class at `models/terrains/terrain.ts` with its resources, type, sprite and coordinates:

```typescript
export class Terrain {
  type: TerrainType;
  resources: Cost;
  sprite: Sprite;
  coords: Coordinates;

  constructor(
    type: TerrainType,
    resources: Cost,
    sprite: Sprite,
    coords: Coordinates,
  ) {
    this.type = type;
    this.resources = resources;
    this.sprite = sprite;
    this.coords = coords;
  }
}
```

2. Create a method to mine the resources

```typescript
mine(minedResources: Cost): Cost {
  const minedResult: Cost = {} as Cost;

  Object.values(ResourceType).forEach((resourceType) => {
    const available = this.resources[resourceType] || 0;
    const requested = minedResources[resourceType] || 0;
    // Extradted result
    const mined = Math.min(available, requested);
    // Update resource
    this.resources[resourceType] = available - mined;
    minedResult[resourceType] = mined;
  });

  return minedResult;
}
```

Let's explain some code tips we've developed:

- `const minedResult: Cost = {} as Cost;` explanation: we initialite an object from a type as an empty object with `= {} as Cost` to trick the TS compilator. Since in execution time is expected that `minedResult` match all the properties of `Cost` type: `coil, bronze, ...`. ⚠️ Take it easy with this kind of development! We cannot access to a property from an object which is not defined yet! Take this into account!
- We access at a record value by its key like at JS Objects `this.resources[resourceType]`.
- We use the OR logical operator tu return a default value: `this.resources[resourceType] || 0;`

### 6.4 CELL CLASS

1. At this point we have our terrain 🚀. The problem resides at the reusability of our code (buildings will have a part in our development, in the future), so we are gonna create a father class `Cell` for both `Terrain` and `Building` childrens.

2. Before we create a class we are gonna set some things about the cells at `models/map/cell.types.ts`:

```typescript
export enum CellType {
  BUILDING = "building",
  TERRAIN = "terrain",
}

export type CellOwner = string | CellOwnerType.NONE;

export enum CellOwnerType {
  NONE = "none",
}
```

3. Now we are gonna create the father class `Cell` at at `models/map/cells`:

```typescript
export class Cell {
  coords: Coordinates;
  sprite: Sprite;
  cellType: CellType;
  private _owner: CellOwner;

  constructor(
    type: CellType,
    owner: CellOwner,
    coords: Coordinates,
    sprite: Sprite,
  ) {
    this.cellType = type;
    this._owner = owner;
    this.coords = coords;
    this.sprite = sprite;
  }
}
```

4. Create some simple methods which will be usefull in the future:∫

```typescript
setOwner(newOwner: CellOwner) {
  this._owner = newOwner;
}

whoOccupied(): string | null {
  return this._owner !== CellOwnerType.NONE
      ? this._owner
      : null;
}
```

5. Applying inheritance (ones of the OOP main features) we can change the `Terrain` class at `models/terrains/terrain.ts`

```typescript
export class Terrain extends Cell {
  terrainType: TerrainType;
  resources: Cost;

  constructor(
    owner: CellOwner,
    coords: Coordinates,
    sprite: Sprite,
    type: TerrainType,
    resources: Cost,
  ) {
    super(CellType.TERRAIN, owner, coords, sprite);
    this.terrainType = type;
    this.resources = resources;
  }

  // mine method is the same
}
```

## CHAPTER 7. TERRAINS, RESOURCES AND COSTS:

1. We'll need to set the costs and reosurces logic. First the map terrains resources:

| Terrain | Rare | Coil | Bronze | Iron | Gold | Turqoise | Zaphire | Emerald | Rubi | Diamond |
| ------- | ---- | ---- | ------ | ---- | ---- | -------- | ------- | ------- | ---- | ------- |
| grass   | 100  | 1M   | 500k   | 100k | 50k  | 1        | 0       | 0       | 0    | 0       |
| grass2  | 50   | 10M  | 1M     | 500k | 100k | 2        | 0       | 0       | 0    | 0       |
| grass3  | 25   | 50M  | 10M    | 1M   | 500k | 4        | 1       | 0       | 0    | 0       |
| grass4  | 12   | 100M | 100M   | 10M  | 1M   | 8        | 2       | 1       | 0    | 0       |
| grass5  | 6    | 500M | 900M   | 50M  | 10M  | 10       | 3       | 2       | 0    | 0       |
| desert  | 80   | 100k | 50k    | 5M   | 100k | 2        | 20      | 0       | 0    | 0       |
| desert2 | 40   | 100k | 100k   | 50M  | 500k | 4        | 200     | 0       | 0    | 0       |
| desert3 | 20   | 100k | 500k   | 100M | 1M   | 8        | 600     | 1       | 0    | 0       |
| desert4 | 10   | 100k | 1M     | 500M | 10M  | 16       | 2K      | 2       | 1    | 0       |
| desert5 | 5    | 100k | 10M    | 800M | 20M  | 32       | 20k     | 4       | 2    | 0       |
| soil    | 60   | 500k | 1M     | 1M   | 100k | 10       | 30      | 20      | 1    | 0       |
| soil2   | 30   | 5M   | 10M    | 10M  | 500k | 100      | 300     | 200     | 2    | 0       |
| soil3   | 15   | 50M  | 80M    | 50M  | 2M   | 1K       | 900     | 600     | 3    | 0       |
| soil4   | 7    | 300M | 300M   | 500M | 100M | 10k      | 3K      | 2k      | 4    | 0       |
| soil5   | 3    | 900M | 600M   | 800M | 200M | 100k     | 30k     | 20k     | 5    | 1       |
| wax     | 40   | 1k   | 1k     | 1k   | 1k   | 1k       | 100     | 50      | 10   | 1       |
| wax2    | 20   | 8k   | 4k     | 2k   | 2k   | 10k      | 1k      | 10k     | 20   | 2       |
| wax3    | 10   | 32k  | 16k    | 4k   | 3k   | 100k     | 50k     | 20k     | 30   | 4       |
| wax4    | 5    | 256k | 64k    | 8k   | 4k   | 500k     | 100k    | 30k     | 40   | 8       |
| wax5    | 2    | 1M   | 256k   | 16k  | 5k   | 1M       | 500k    | 50k     | 50   | 16      |

2. Secondly the building costs:

| Building    | Coil | Bronze | Iron | Gold | Turqoise | Zaphire | Emerald | Rubi | Diamond |
| ----------- | ---- | ------ | ---- | ---- | -------- | ------- | ------- | ---- | ------- |
| house       | 100  | 0      | 50   | 0    | 0        | 0       | 0       | 0    | 0       |
| house2      | 100k | 0      | 50k  | 0    | 2        | 0       | 0       | 0    | 0       |
| house3      | 1M   | 0      | 500k | 0    | 1k       | 10      | 10      | 0    | 0       |
| farm        | 0    | 100    | 0    | 10   | 0        | 0       | 0       | 0    | 0       |
| farm2       | 0    | 100k   | 0    | 10k  | 0        | 3       | 0       | 0    | 0       |
| farm3       | 0    | 1M     | 0    | 100k | 0        | 3k      | 3       | 0    | 0       |
| mine        | 100  | 50     | 50   | 10   | 0        | 0       | 0       | 0    | 0       |
| mine2       | 500k | 100k   | 50k  | 10k  | 50       | 30      | 10      | 0    | 0       |
| mine3       | 10M  | 5M     | 500k | 100k | 50k      | 30k     | 10k     | 0    | 0       |
| barracks    | 200  | 100    | 80   | 50   | 0        | 0       | 0       | 0    | 0       |
| barracks2   | 200k | 100k   | 100k | 50k  | 80       | 60      | 30      | 1    | 0       |
| barracks3   | 20M  | 10M    | 8M   | 500k | 200      | 60k     | 3k      | 5    | 0       |
| blacksmith  | 1k   | 500    | 200  | 100  | 2        | 0       | 0       | 0    | 0       |
| blacksmith2 | 200k | 100k   | 100k | 50k  | 200      | 80      | 100     | 2    | 0       |
| blacksmith3 | 20M  | 10M    | 8M   | 500k | 200k     | 80k     | 10k     | 8    | 0       |
| church      | 10k  | 2k     | 1k   | 500  | 3        | 1       | 0       | 0    | 0       |
| church2     | 2M   | 200k   | 100k | 500k | 300      | 150     | 100     | 5    | 0       |
| church3     | 40M  | 2M     | 1M   | 1M   | 300k     | 150k    | 20k     | 10   | 0       |
| castle      | 1k   | 1k     | 1k   | 1k   | 1        | 1       | 1       | 1    | 1       |
| castle2     | 1M   | 1M     | 1M   | 1M   | 600      | 400     | 300     | 12   | 4       |
| castle3     | 100M | 100M   | 100M | 50M  | 600k     | 200k    | 30k     | 24   | 8       |

> Note: its numbers might be adjusted in the future for a better experience.

3. We stablish a new multiplicator for the `map__Resources`, x4 so at `models/resources/resources.map` update the values:

```typescript
export const map__Resources: Record<ResourceType, number> = {
  [ResourceType.COIL]: 1,
  [ResourceType.BRONZE]: 4,
  [ResourceType.IRON]: 16,
  [ResourceType.GOLD]: 32,
  [ResourceType.TURQUOISE]: 128,
  [ResourceType.ZAPHIRE]: 512,
  [ResourceType.EMERALD]: 2048,
  [ResourceType.RUBI]: 8192,
  [ResourceType.DIAMOND]: 32768,
};
```

4. Now we are going to map the terrain resources at `models/terrains/terrain.maps.ts` using the table's values:

```typescript
export const map__TerrainResource: Record<TerrainType, Cost> = {
  // Grass
  [TerrainType.GRASS]: {
    [ResourceType.COIL]: 1000000,
    [ResourceType.BRONZE]: 500000,
    [ResourceType.IRON]: 100000,
    [ResourceType.GOLD]: 50000,
    [ResourceType.TURQUOISE]: 1,
    [ResourceType.ZAPHIRE]: 0,
    [ResourceType.EMERALD]: 0,
    [ResourceType.RUBI]: 0,
    [ResourceType.DIAMOND]: 0,
  },
  // ...
```

5. We have to do the same with buildings. In order to do that we have to update the building types at `models/buildings/building.types.ts` to:

```typescript
export enum BuildingType {
  CASTLE = "castle",
  CASTLE2 = "castle2",
  CASTLE3 = "castle3",
  HOUSE = "house",
  HOUSE2 = "house2",
  HOUSE3 = "house3",
  FARM = "farm",
  FARM2 = "farm2",
  FARM3 = "farm3",
  MINE = "mine",
  MINE2 = "mine2",
  MINE3 = "mine3",
  BLACKSMITH = "blacksmith",
  BLACKSMITH2 = "blacksmith2",
  BLACKSMITH3 = "blacksmith3",
  BARRACKS = "barracks",
  BARRACKS2 = "barracks2",
  BARRACKS3 = "barracks3",
  CHURCH = "church",
  CHURCH2 = "church2",
  CHURCH3 = "church3",
}
```

7. Now we can set their costs at `models/costs/building.costs.ts`

```typescript
export const map__BuildingCosts: Record<BuildingType, Cost> = {
  // House
  [BuildingType.HOUSE]: {
    [ResourceType.COIL]: 100,
    [ResourceType.BRONZE]: 0,
    [ResourceType.IRON]: 50,
    [ResourceType.GOLD]: 0,
    [ResourceType.TURQUOISE]: 0,
    [ResourceType.ZAPHIRE]: 0,
    [ResourceType.EMERALD]: 0,
    [ResourceType.RUBI]: 0,
    [ResourceType.DIAMOND]: 0,
  },
  //...
};
```

8. Optionally we can set update `models/map/map.buildings.ts` and `models/map/map.terrains.ts` interface and object to access the properties using `BuildingType` and `ResourceType`. We are gonna delete the interface an use `Record<BuildingType, Sprite` to avoid superflant code (I don't like using `YAGNI` or `KISS` terms but we should maintain a clean clode with not too much interfaces, because the game, at this point, is scalling):

```typescript
// Old
export const buildingSprites: BuildingSprites = {
  house: new Sprite(
    buildingsTile,
    1,
    5,
    TERRAIN_SPRITE_WIDTH,
    TERRAIN_SPRITE_HEIGTH,
  ),
  // ...
};

// Updated
export const buildingSprites: Record<BuildingType, Sprite> = {
  [BuildingType.HOUSE]: new Sprite(
    buildingsTile,
    1,
    5,
    TERRAIN_SPRITE_WIDTH,
    TERRAIN_SPRITE_HEIGTH,
  ),
  // ...
};
```

We have to do the same with `terrainSprites` and `Record<TerrainType, Sprite>` at `models/map/map.terrains.ts`;

9. We are going to change the `Terrain` constructor to set the resources from `map__TerrainResource` and to set the sprite from the `terrainSprites`, both using the `type` as key:

```typescript
constructor(
    owner: CellOwner,
    coords: Coordinates,
    type: TerrainType,
  ) {
    super(CellType.TERRAIN, owner, coords, terrainSprites[type]);
    this.terrainType = type;
    this.resources = map__TerrainResource[type];
  }
```

10. We are randomize a bit this implementation of the resources avaliables at terrains using at +10%/-10% factor. As our first improvement 🚀.

- First we create a random boolean generator simple function at `logic/utils/commons.ts`:

```typescript
export function rndBool(): boolean {
  return Math.random() < 0.5;
}
```

- Secondly we create a function to randomize a `Cost` based on a percent at `logic/resources/conversions.ts`:

```typescript
export function randomizeCost(cost: Cost, percent: number): Cost {
  return Object.fromEntries(
    Object.entries(cost).map(([resource, value]) => {
      // Do not modify zero values
      if (value === 0) return [resource, 0];

      // We increase or decreasse the value
      const factor = rndBool() ? 1 + percent : 1 - percent;

      // Return the adjusted value
      return [resource, Math.ceil(value * factor)];
    }),
  ) as Cost;
}
```

- Finally we use the `randomizeCost()` at our `Terrain` class:

```typescript
constructor(
    owner: CellOwner,
    coords: Coordinates,
    type: TerrainType,
  ) {
    super(CellType.TERRAIN, owner, coords, terrainSprites[type]);
    this.terrainType = type;
    this.resources = randomizeCost(map__TerrainResource[this.terrainType], .1);
  }
```

11. Is time to try our developments, we can do them at `GameMap`:
```typescript
drawMap() {
  const ctx: CanvasRenderingContext2D | null = this._ctx;
  if (!ctx) return;

  const testTerrain = new Terrain('player 1', {x: 0, y: 0}, TerrainType.GRASS);
  console.log(testTerrain);
  console.log(testTerrain.resources);

  // ...
}
```

Everything is OK ✅ we can notice if we reload the page the resources changes, so the randomize is applying properly.

> Note that might be some folders moving from when we had them at previous branch.


# TS WARS

A Client-Server TS and JS real time strategy game.

Languages Used:

- TS
- JS
- SCSS
- HTML

Frameworks:

- NodeJS
- ExpressJS

Other technologies:

- Vite
- Pretttier
- pnpm

IDE:

- VS Code

Author: Adrián Rodríguez

> I am using this readme as my learning notes for this kind of game implementations, This is my fisrt videogame using native TS, so feel free to learn from my experience as I'm doing while I develop this game 😃.

## CHAPTER 1. PREPARATIONS (branch feat/till-chap4)

1. make a dir for the proyect
2. create a node app: `npm init -y`
   > note: nodejs needed: [download node](https://nodejs.org/es)
3. create the main folders' structure and files

```
client
|---index.html
|---main.js
|---public
  |---fonts
  |---buildings
  |---items
  |---soldiers
server
|---app.js
package.json
README.MD
.gitignore
```

4. download building assets from [open game art](https://opengameart.org/)
5. images optimization using [squoosh](https://squoosh.app) just for resizing at 50%.
6. put the optimized images at `client/public/`.
7. download the fonts from [dafont](https://www.dafont.com/es/) or [google fonts](https://search.brave.com/search?q=goggle+fonts&source=desktop)
8. put the font at `client/public/fonts`
   > note: for sprites and fonts take into account the license (I've used only [CC liceenses](https://creativecommons.org/share-your-work/cclicenses/) assets, to be exact public domain or CC0 assets)

## CHAPTER 2. CLIENT

1. install pnpm: `npm i -g pnpm`
2. install vite: `pnpm i vite`
3. add vite simple config `vite.config.ts` at the project root, to run client at port 4200:

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  root: "./client",
  server: {
    port: 4200,
    open: true,
  },
});
```

4. add a message to check the client is running properly:

```javascript
export default defineConfig({
  ...
  plugins: [
    {
      name: "vite-server-start-message",
      configureServer(server) {
        server.httpServer?.on("listening", () => {
          console.log("🚀🚀 [TS WARS] - Client running at http://localhost:4200 🚀🚀");
        });
      },
    },
  ],
});
```

5.  at `package.json` create an script to run the client using vite

```json
"scripts": {
    "serve:client": "vite"
},
```

6. test the client launch at the console: `pnpm run serve:client`, the message set appears, everything's OK for now. ✅

7. at `index.html` we use the VS Code EMMET `html:5` to create a default doc.
8. change the doc name, add a title, and link `main.js` file:

```html
<head>
  ...
  <title>TS WARS</title>
</head>
```

```html
<body>
  <h1>TS WARS</h1>
  <script src="main.js" type="module"></script>
</body>
```

> note that we are gonna use JS modules for our game

9. install sccs: `pnpm i sass`
10. create a file `styles.scss` at the `client/styles` new folder
11. add some basic styles including the font:

```scss
$primary-lighter: #fff2e6;
$primary: #693405;

$white: #fff;
$light: #ddd;

$m-xs: 0.2rem;
$m-s: 0.4rem;
$m-m: 0.8rem;
$m-l: 1.2rem;
$m-xl: 1.6rem;

@font-face {
  font-family: "Berry";
  src: url("/public/fonts/Berry\ Rotunda.ttf");
}

html {
  font-family: "Berry", serif;
  background-color: $primary-lighter;
}

body {
  padding: $m-s;
}

h1 {
  text-align: center;
  margin-top: $m-xl;
  color: $primary;
}
```

12. link the styles at your `main.js` instead at the HTML:

```javascript
import "./styles/styles.scss";
```

> note that when you change something at the files, vite atomatically refresh the changes (there's no need to reload the page)

13. add prettier VS Code extension and configure it as default (for manual formatting while programming)
14. Install prettier `pnpm i prettier`
15. create a prettier config file at the project root:

```javascript
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: "always",

  overrides: [
    {
      files: "*.scss",
      options: {
        parser: "scss",
        singleQuote: false,
      },
    },
    {
      files: "*.html",
      options: {
        parser: "html",
        htmlWhitespaceSensitivity: "ignore",
      },
    },
  ],
};
```

16. create a prettier ignore file `.prettierignore`:

```bash
# Compilation
build/

# Configs
*.config.js
*.config.ts
```

17. add an script to use prettier at `package json`

```json
 "scripts": {
  "serve:client": "vite",
  "format": "prettier --write \"**/*.{ts,html,scss}\""
},
```

> now we can format all the app usin `npm run format`

## CHAPTER 3. MODELS & BARRELS

1. install TS: `pnpm i ts`
2. create the following structure inside `client` folder

```
src
|---logic
  |---attack
  |---recollect
  |---map
  |---utils
|---models
  |---buildings
  |---commons
  |---costs
  |---map
  |---resources
  |---soldiers
  |---terrains
|---state

```

We might need more when the game is scaling, but for now it's OK.

3. create a barrel for each folder, a file called `index.ts` to handdle the folder `.ts` files' exports.

> note: we'll update the barrels when a file has export members, f.e.: `export * from './sprites';` at `client/src/models/commons` and its corresponding upper level: `export * from './commons/index';` at `client/src/models`.

4. for the first push to git we must set up an `.gitignore` file at root:

```
# Build dirs
build/
dist/

# Node modules
node_modules/

# System files
.DS_Store
```

## CHAPTER 4. TILES, SPRITES & MAP

### 4.1 SPITES

1. create `sprites.ts` inside `models/commons`.
2. we are gonna cut the sprites from the tileset so we need to set width and heigth of terrains and buildings which are the same:

```typescript
export const TERRAIN_SPRITE_WIDTH = 61;
export const TERRAIN_SPRITE_HEIGTH = 71;
```

3. we create the class `Sprite` at the same file:

```typescript
export class Sprite {
  private _x: number;
  private _y: number;
  private _w: number;
  private _h: number;
  public image: HTMLImageElement;

  constructor(
    tilesetUrl: string,
    indexX: number,
    indexY: number,
    width: number,
    heigth: number,
  ) {
    this._w = width;
    this._h = heigth;

    // Calc the coordenates at the tileset
    this._x = indexX * width;
    this._y = indexY * heigth;

    this.image = new Image();
    this.image.src = tilesetUrl;
  }
}
```

At the constructor we calc the possition where the sprite is located at the tileset depending on the index and the width and heigth, that only will work with tilesets which contains sprites with same dimensions.

4. we add a method to draw the sprite at a `CanvasRenderingContext2D` using the Canvas `drawImage()` method:

```typescript
draw(ctx: CanvasRenderingContext2D, posX: number, posY: number) {
  ctx.drawImage(
    this.image,
    this._x,
    this._y,
    this._w,
    this._h,
    posX,
    posY,
    this._w,
    this._h,
  );
}
```

### 4.2 MAP

1. create `map.ts`, `map.buildings.ts` and `map.terrains.ts` inside `models/commons` folder

2. we code the interfaces and objects for buildings and terrains at their corresponding files. The objects will contains a field for each type of terrain/buildin.

3. we create the class `GameMap` at `map.ts` file with default dimmensions (100 times the terrain sprites' size):

```typescript
export class GameMap {
  private _w: number;
  private _h: number;
  public _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D | null;

  constructor(
    width: number = TERRAIN_SPRITE_WIDTH * 100,
    heigth: number = TERRAIN_SPRITE_HEIGTH * 100,
  ) {
    this._w = width;
    this._h = heigth;

    this._initCanvas();
  }

  private _initCanvas() {
    this._canvas = document.createElement("canvas");
    this._canvas.id = "map";
    this._canvas.width = this._w;
    this._canvas.height = this._h;
    document.body.appendChild(this._canvas);
    this._ctx = this._canvas.getContext("2d");
  }
}
```

The method `_initCanvas()` will create a canvas and a canvas' context to draw the map on it.

4. Create a method to draw the map with a temp arrow funtion to test all the sprites are correctly painted:

```typescript
drawMap() {
    const ctx: CanvasRenderingContext2D | null = this._ctx;

    if (ctx) {
      const testDraw = () => {
        // 1st line
        buildingSprites.house.draw(ctx, 0, 0);
        buildingSprites.house2.draw(ctx, TERRAIN_SPRITE_WIDTH, 0);
        buildingSprites.house3.draw(ctx, TERRAIN_SPRITE_WIDTH * 2, 0);
        buildingSprites.farm.draw(ctx, TERRAIN_SPRITE_WIDTH * 3, 0);

        // 2nd line
        buildingSprites.farm2.draw(ctx,
          TERRAIN_SPRITE_WIDTH * 0.5,
          TERRAIN_SPRITE_HEIGTH - TERRAIN_SPRITE_HEIGTH * 0.25,
        );
        buildingSprites.farm3.draw(ctx,
          TERRAIN_SPRITE_WIDTH * 1.5,
          TERRAIN_SPRITE_HEIGTH - TERRAIN_SPRITE_HEIGTH * 0.25,
        );
        buildingSprites.castle.draw(ctx,
          TERRAIN_SPRITE_WIDTH * 2.5,
          TERRAIN_SPRITE_HEIGTH - TERRAIN_SPRITE_HEIGTH * 0.25,
        );

        // 3rd line
        buildingSprites.castle2.draw(ctx, 0,
          TERRAIN_SPRITE_HEIGTH * 2 - TERRAIN_SPRITE_HEIGTH * (0.25 * 2),
        );
        buildingSprites.castle3.draw(ctx,
          TERRAIN_SPRITE_WIDTH,
          TERRAIN_SPRITE_HEIGTH * 2 - TERRAIN_SPRITE_HEIGTH * (0.25 * 2),
        );
        buildingSprites.mine.draw(ctx,
          TERRAIN_SPRITE_WIDTH * 2,
          TERRAIN_SPRITE_HEIGTH * 2 - TERRAIN_SPRITE_HEIGTH * (0.25 * 2),
        );
        // ...

        // 4th line
        buildingSprites.mine3.draw(ctx,
          TERRAIN_SPRITE_WIDTH * 0.5,
          TERRAIN_SPRITE_HEIGTH * 3 - TERRAIN_SPRITE_HEIGTH * (0.25 * 3),
        );
        buildingSprites.barracs.draw(ctx,
          TERRAIN_SPRITE_WIDTH * 1.5,
          TERRAIN_SPRITE_HEIGTH * 3 - TERRAIN_SPRITE_HEIGTH * (0.25 * 3),
        );
        buildingSprites.barracs2.draw(ctx,
          TERRAIN_SPRITE_WIDTH * 2.5,
          TERRAIN_SPRITE_HEIGTH * 3 - TERRAIN_SPRITE_HEIGTH * (0.25 * 3),
        );
        // ...

        // ...

      };

      terrainSprites.wax5.image.onload = testDraw;
    }
  }
```

> Note that the sprites are hexagonal so we have had to make a bit more complex way or drawing them. But this test will give us the guidance 💡 to draw automatically our sprites using the correct sequence.

The line `terrainSprites.wax5.image.onload = testDraw;` is needed to start drawing then the last image is loaded, but it's not a good solution, just a temporary one 🥲.

5. To test it at the `main.js`:

```javascript
import { GameMap } from "./src/models/map/map";

const gameMap = new GameMap();
gameMap.drawMap();
```

## CHAPTER 5. CREATE A MAP (feat/till-chap7)

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

We'll use a guard clause or an early return ([example at JS](https://dev.to/arikaturika/one-concept-a-day-early-return-pattern-in-javascript-3pol)):

```typescript
drawMap() {
  const ctx: CanvasRenderingContext2D | null = this._ctx;
  if (!ctx) return;

  // ...
}
```

At this scenario we are not reducing the cyclomatic complexity of this method (main porpouse of the guard clauses) but the code will be cleaner.

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
}
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

## CHAPTER 6. TERRAIN CLASS 

### 6.1 RESOURCES 

1. Before we create the menu UI and the storage we are gonna create our terrain object, each terrain will have resources to be mined so we need a resource enum `ResourceType` at `models/resources/recource.types.ts`.

2. And a map for recource conversion (each resource will value x2 than the prev. one). So at `models/resources/recource.maps.ts`:
```typescript
export const map__Resources: Record<ResourceType, number> = {
  [ResourceType.COIL]: 1,
  [ResourceType.BRONZE]: 2,
  // ...
}
```

Again we are using a `Record`.

### 6.2 TERRAIN CLASS



## CHAPTER 7. MENU INTERFACE

TODO CAMBIADO LO DEL CONST POR NUM HEXAGONS

TODO WHEN ITS GROW MAKE A BOOK (SEPARATED MDs) OF IT



## CHAPTER N. SERVER

TODO SERVER DEPENDENCIES

1. install express & cors: `pnpm i express cors`

## FEATURES INDEX (in order of appearance)

- Pnpm
- Vite
- Prettier
- Custom npm scripts
- JS Modules
- Barrels
- OOP (Object Oriented Programming)
- Canvas and canvas context
- Early return / guard clauses
- Escape from a loop
- Functional programming paradigm
- TS Record
- 
# TS WARS

A Client-Server TS and JS real time strategy game. The porpouse of this development is to learn TS techniques, client-server communication and how to manage a huge proyect without a Framework.

![Status](https://img.shields.io/badge/status-development-yellow) 
![Version](https://img.shields.io/badge/version-0.0.1-blue) 
![Author](https://img.shields.io/badge/author-Adrián_Rodríguez-Montesinos-white) 

## INSTRUCTIONS

1. Install dependencies (using pnpm):

Node required: https://nodejs.org/es

```bash
npm i -g pnpm
pnpm i
```

2. Run the client:

```bash
npm serve:client
```

## TECHNOLOGIES

- Languages: ![TS](https://img.shields.io/badge/TS-blue), ![JS](https://img.shields.io/badge/JS-yellow),
![SCSS](https://img.shields.io/badge/SCSS-purple), ![HTML](https://img.shields.io/badge/HTML-orange)

- Frameworks: ![ExpressJS](https://img.shields.io/badge/ExpressJS-white)

- Other technologies: ![NodeJS](https://img.shields.io/badge/NodeJS-dark_green), ![Vite](https://img.shields.io/badge/Vite-purple), ![Pretttier](https://img.shields.io/badge/Pretttier-blue), ![pnpm](https://img.shields.io/badge/pnpm-orange),  ![Socket.io](https://img.shields.io/badge/socket.io-dark_green)

- IDE: ![VS Code](https://img.shields.io/badge/VS_Code-blue)

## FEATURES & TERMS INDEX (in order of appearance)

- Pnpm
- Vite
- Prettier
- Custom npm scripts
- JS Modules
- Barrels
- TS Enums an Types
- Arrow functions
- OOP (Object Oriented Programming)
- Canvas and canvas context
- Early return / guard clauses
- Cyclomatic complexity
- Escape from a loop (continue/break/return)
- Functional programming paradigm
- TS Record, and access to a propertie
- Initialite an empty object from a type at TS
- JS logical operator OR to return a default value
- JS Arrow functions to manage arrays
- OPP Inheritance
- Bidimensional Arrays
- JS async, await and promises
- (Bug) imports circular dependencies (at barrels)
- DOM access JS
- Static methods JS
- Show an Sprite from a Tileset as an HTML img element (not showing the full image)
- Generate and delete DOM modals dynamically with JS (various nodes)
- SCSS modals positions & z-index (center a modal with transform)
- Event listener insides JS generated buttons
- Regions to mantain clean code structure
- Set elements attribtes and classes by JS
- Resolve various promises at JS
- JS Custom Events to handdle resources update
- TS Polymorphism
- JS continue breaks at flow control if (early breaks)
- Audio Manager implementing the singleton pattern with listeners
- 

## TODOs

v0.0.2
- events types
- events build paycost state management
- refactor map and modals

- show resources at mines
- show prices hover at upgrades
- move map to logic 
- castle upgrades (depending on the castle -> affect at production capacity per min (x1, x2, x3, ...) -> cheaper)
- houses upgrades (depending on the house -> more storage)

- comment things
- bug decimals
----------

v0.0.3
- weapons
- warriors storage at houses and castles
- warriors weapons
- some warriors only can wear some kind of weapons

----------



- use namespaces for a better refactoring
- bug opmize load index.html vite!!
- bug favicon
- show red/blue hexagons depending on player
- multiple player handling

- CASTLE - BOOKS and HOUSE does not have updates
- set resources view when its mine (update mine ones by custom events)
- refactor modals at modal logic
- refactor add html element with name father class and attributes
- comment methods at map and player
- format code

- must only appear the building cards at colider terrains (except castles)
- avaliable terrain draw hexagons color
- our terrain draw hexagons color
- clicked terrain/building draw hexagon color
- modal hover over a building card/item card (on mouse over?)

- improve access to this._player[0] - the main player!!

- Icon and message build at terrainbuilding modals
- cursor hover terrains

- todo en el castillo va a poner los recursos que tiene el jugador
- player logic
- testear paycost logic
- RANDOMIZE COSTS LOGIC !!! DODNE ESTÁ

- build test
- move show modals functions to logic
- tasks logic
- delete test draw cuando ya estén dibujados los tasks

- item.ts
- effects apply effect -> temporal
- modificar books para que queden mejor ???
- Consumables

v0.1.0
- Battle mechanics
- Battle effect

# IMPROVEMENTS 

- Diferent weapons and types with efficient vs others
- Game Play Type: P vs P, P VS IA, P vs P (more than 2p P), Online Worlds
- Diferent Maps with diferent speeds (IA Speed and resources speed)
- Set IA dificulty (speed)

import "./styles/styles.scss";
import { GameMap } from "./src/models/map/map";
import { Player } from "./src/models";

const gameMap = new GameMap(20, 20);
await gameMap.createMap();

// TODO CLEAN GAME TASKS ONE BY ONE (INTI FUNCTIONS ??)


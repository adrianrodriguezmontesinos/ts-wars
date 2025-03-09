import "./styles/styles.scss";
import { GameMap } from "./src/models/map/map";

const gameMap = new GameMap(20, 20);
await gameMap.createMap(['Player 1', 'Player 2']);

// TODO CLEAN GAME TASKS ONE BY ONE (INTI FUNCTIONS ??)


import "./styles/styles.scss";
import { GameMap } from "./src/models/map/map";
import { Player } from "./src/models";

// TODO REFACTOR MENU!!

const menu = document.getElementById('menu');
const playBtn = menu.querySelector('button');

playBtn.addEventListener('click', play)

/**
 * 
 */
async function play() {
    menu.style.display = 'none';
    const gameMap = new GameMap(20, 20);
    await gameMap.createMap();
    gameMap.start(1);
}





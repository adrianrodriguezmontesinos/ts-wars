import {
  AudioType,
  Building,
  buildingSprites,
  BuildingType,
  Player,
  Terrain,
} from '../../../models';
import {
  dispatchBuild,
  dispatchPayCost,
  dispatchPlayEffect,
  dispatchUpdateResources,
} from '../../events';
import { getHTMLElem } from '../../utils';
import { getModalResourcesList, getSpriteImgContainer } from './modals.utils';

/**
 * Draw a modal with terrain info
 * @param terrainCell Terrain cell
 * @param onlyCastle If only castle can be built
 * @param player Game player
 */
export function setTerrainModal(terrainCell: Terrain, onlyCastle: boolean, player: Player) {
  const modal = getHTMLElem('div', ['modal'], undefined, [{ key: 'id', value: 'modal-cell' }]);

  // Title
  const title = document.createElement('p');
  title.innerText = terrainCell.terrainType.toUpperCase();
  title.classList.add('modal__title');
  modal.appendChild(title);

  // List
  const list = getModalResourcesList(terrainCell.resources);
  modal.appendChild(list);

  // Buildings
  const buildings = getBuildingCards(terrainCell, onlyCastle, player);
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

// TODO
/**
 *
 * @param terrain Terrain below construction
 * @param onlyCastle If only castle can be built
 * @param player Game player
 * @returns
 */
export function getBuildingCards(
  terrain: Terrain,
  onlyCastle: boolean,
  player: Player,
): HTMLDivElement {
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
    const img = getSpriteImgContainer(building, buildingSprites[building]);
    card.appendChild(img);

    // Build click event if we can pay it, if not we set the not allowed class
    if (player.canIBuild(building, terrain.terrainType)) {
      card.addEventListener('click', () => {
        dispatchPlayEffect(AudioType.BUILD);

        const cost = Building.getCost(building, terrain.terrainType);

        // Dispatch Pay and build events
        dispatchPayCost(cost);
        dispatchBuild({ playerName: player.name, buildingType: building, terrain });

        // Update resources event (to player modal) after the payment
        dispatchUpdateResources(player.resources);
      });
    } else {
      card.classList.add('modal__card--not-allowed');
    }

    grid.appendChild(card);
  });

  return grid;
}

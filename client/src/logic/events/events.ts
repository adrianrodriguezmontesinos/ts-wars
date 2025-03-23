import { EventType, Cost, AudioType, DataEvent__Build } from '../../models';

/**
 * Send a custom event to play an audio effect
 * @param type Audio type to play
 */
export function dispatchPlayEffect(audioType: AudioType) {
  document.dispatchEvent(
    new CustomEvent(EventType.PLAY_AUDIO, {
      detail: audioType,
    }),
  );
}

/**
 * Send a custom event to update the player resources
 * @param resources Recources' costs
 */
export function dispatchUpdateResources(resources: Cost) {
  document.dispatchEvent(
    new CustomEvent<Cost>(EventType.UPDATE_RESOURCES, {
      detail: resources,
    }),
  );
}

/**
 * Send a custom event to build something
 * @param data { playerName, BuildinType, Terrain }
 */
export function dispatchBuild(data: DataEvent__Build) {
  document.dispatchEvent(
    new CustomEvent<DataEvent__Build>(EventType.BUILD, {
      detail: data,
    }),
  );
}

/**
 * Send a custom event to pay a cost of something by the player
 * @param cost Cost to be paid
 */
export function dispatchPayCost(cost: Cost) {
  document.dispatchEvent(
    new CustomEvent<Cost>(EventType.PAY_COST, {
      detail: cost,
    }),
  );
}

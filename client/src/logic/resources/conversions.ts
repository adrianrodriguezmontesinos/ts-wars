import { Cost } from '../../models';
import { rndBool } from '../utils/utils';

/**
 * Randomize a Cost using a percent
 * @param cost Normal Cost
 * @param percent Percent at [% / 100] units
 * @param onlyInc If the percent only affects as an increment. By default false.
 * @returns Randomized Cost
 */
export function randomizeCost(cost: Cost, percent: number, onlyInc: boolean = false): Cost {
  return Object.fromEntries(
    Object.entries(cost).map(([resource, value]) => {
      // Do not modify zero values
      if (value === 0) return [resource, 0];

      // We increase or decreasse the value
      const factor = onlyInc || rndBool() ? 1 + percent : 1 - percent;

      // Return the adjusted value
      return [resource, Math.ceil(value * factor)];
    }),
  ) as Cost;
}

// TODO DOC ONLY IF WE ARE GONNA USE IT, IF NOT DELETE IT
/**
 *
 * @param value
 * @param from
 * @param to
 * @param conversionMap
 * @returns
 */
export function convert<T extends string>(
  value: number,
  from: T,
  to: T,
  conversionMap: Record<T, number>,
): number {
  // convert to unit base
  const base = value * conversionMap[from];
  // convert unit base to destination unit
  return base / conversionMap[to];
}

// TODO SEE IF IT HAS SENSE AND APPLY ALSO TO BATTLES SOMETHING ALINE
// TODO IF IT HAS NO SENSE DELETE AND ITS BARREL

/**
 * TODO DOC
 * @param value
 * @param from
 * @param to
 * @param conversionMap
 * @returns
 */
export function Convert<T extends string>(
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

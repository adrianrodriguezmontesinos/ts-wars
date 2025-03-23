export interface Coordinates {
  x: number;
  y: number;
}

export const adyacents: number[][] = [
  [-1, 0],  // left
  [1, 0],   // right
  [-1, -1], // down right
  [0, -1], // down left
  [-1, 1], // up right
  [0, 1], // up left
];

import Konva from 'konva';

export type ShelfDimensions = Pick<
  Konva.RectConfig,
  'x' | 'y' | 'height' | 'width'
>;

export const getShelfCoords = (dimensions: ShelfDimensions | null) => {
  if (!dimensions || !dimensions.height || !dimensions.width) {
    return null;
  }

  const { x = 0, y = 0, height, width } = dimensions;
  const shelfCoords: [number, number][] = [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
  ];

  return shelfCoords;
};

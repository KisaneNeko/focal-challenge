import { describe, expect, it } from 'vitest';
import { ShelfDimensions, getShelfCoords } from './shelvesCanvas.utils';

describe('shelvesCanvas.utils', () => {
  it('should return null', () => {
    let result = getShelfCoords(null);

    expect(result).toBe(null);

    result = getShelfCoords({ height: 100, width: 0 });
    expect(result).toBe(null);

    result = getShelfCoords({ height: 0, width: 100 });
    expect(result).toBe(null);
  });

  it('should return four points coordinates', () => {
    const dimensionsMock: ShelfDimensions = {
      x: 10,
      y: 50,
      height: 200,
      width: 300,
    };
    const result = getShelfCoords(dimensionsMock);

    expect(result).toEqual([
      [10, 50],
      [310, 50],
      [310, 250],
      [10, 250],
    ]);
  });
});

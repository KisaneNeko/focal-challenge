import { describe, expect, it } from 'vitest';
import { getShelfColors } from './shelf.utils';

describe('shelf.utils', () => {
  it('should get active shelf colors', () => {
    const result = getShelfColors(true, 'foo');
    expect(result).toEqual({
      fill: '#FFFFFF33',
      stroke: '#FFFFFF',
    });
  });

  it('should get inactive shelf colors', () => {
    const result = getShelfColors(false, '#B2AC88');
    expect(result).toEqual({
      fill: '#B2AC8880',
      stroke: '#B2AC88',
    });
  });
});

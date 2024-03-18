import { describe, expect, it } from 'vitest';
import { getRandomColor } from './utils';

describe('utils', () => {
  it.each(new Array(10).fill(1))(
    'should always generate valid hex color',
    () => {
      const result = getRandomColor();

      expect(result.length).toEqual(7);
      expect(result.startsWith('#')).toBe(true);
    },
  );
});

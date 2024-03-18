import Konva from 'konva';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mapShelvesApiToUI, mapShelvesUIToApi } from './mappers';
import {
  shelvesDefinitionMock,
  shelvesUIModelMock,
} from '../../__tests__/mocks';

vi.mock('lodash/uniqueId', () => {
  return {
    default: vi.fn().mockReturnValue('xyz'),
  };
});

describe('mappers', () => {
  beforeEach(() => {
    vi.spyOn(Konva.Util, 'getRandomColor').mockReturnValue('#FFFFFF');
  });

  it('should Api model to UI', () => {
    expect(mapShelvesApiToUI(shelvesDefinitionMock)).toEqual(
      shelvesUIModelMock,
    );
  });

  it('should map UI model to Api', () => {
    expect(mapShelvesUIToApi(shelvesUIModelMock)).toEqual(
      shelvesDefinitionMock,
    );
  });
});

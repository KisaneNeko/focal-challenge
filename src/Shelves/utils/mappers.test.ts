import { describe, it, expect, vi } from 'vitest';
import { mapShelvesApiToUI, mapShelvesUIToApi } from './mappers';
import {
  shelvesDefinitionMock,
  shelvesUIModelMock,
} from '../../__tests__/mocks';

vi.mock('../../utils/utils', () => {
  return {
    getRandomColor: () => '#FFFFFF',
  };
});

describe('mappers', () => {
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

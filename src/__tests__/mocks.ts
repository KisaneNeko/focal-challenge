import { Coordinates } from '../Shelves/types';

const coordinatesMock: Coordinates[] = [
  [100, 30],
  [300, 30],
  [300, 150],
  [100, 150],
];

export const shelvesDefinitionMock = [coordinatesMock];

export const shelvesUIModelMock = [
  {
    id: 'xyz',
    color: '#FFFFFF',
    coordinates: coordinatesMock,
  },
];

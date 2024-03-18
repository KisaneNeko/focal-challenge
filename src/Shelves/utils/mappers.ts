import Konva from 'konva';
import uniqueId from 'lodash/uniqueId';
import { Shelves, ShelvesDefinition } from '../types';

export const mapShelvesApiToUI = (
  shelvesDefinition: ShelvesDefinition,
): Shelves =>
  shelvesDefinition.map((shelfCoords) => ({
    id: uniqueId(),
    coordinates: shelfCoords,
    color: Konva.Util.getRandomColor(),
  }));

export const mapShelvesUIToApi = (shelves: Shelves): ShelvesDefinition =>
  shelves.map((shelf) => shelf.coordinates);

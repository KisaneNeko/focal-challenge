import Konva from 'konva';

export type KonvaMouseEvent = Konva.KonvaEventObject<MouseEvent>;
export type KonvaTouchEvent = Konva.KonvaEventObject<TouchEvent>;

export type Coordinates = [number, number];
export type ShelvesDefinition = Coordinates[][];

export type Shelf = {
  id: string;
  coordinates: Coordinates[];
  color: string;
};

export type Shelves = Shelf[];

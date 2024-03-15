export type Coordinates = [number, number];
export type ShelvesDefinition = Coordinates[][];

export type Shelf = {
  coordinates: Coordinates[],
  color: string;
};

export type Shelves = Shelf[];

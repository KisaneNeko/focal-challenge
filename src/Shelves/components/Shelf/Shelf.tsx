import { Line } from 'react-konva';
import { Coordinates, Shelf as ShelfType } from '../../types';
import { useState } from 'react';
import { Point } from '../Point';
import { DeleteButton } from '../DeleteButton';
import { useShelf } from './shelf.hooks';

type Props = {
  shelf: ShelfType;
  deleteShelf: (shelf: ShelfType) => void;
};

export const Shelf = ({ shelf, deleteShelf }: Props) => {
  const [activePoint, setActivePoint] = useState<Coordinates | null>(null);

  const {
    colorProps,
    linePoints,
    deleteButtonPosition,
    isActive,
    setActiveShelf,
  } = useShelf(shelf);

  return (
    <>
      <Line
        onClick={() => setActiveShelf(shelf)}
        closed
        points={linePoints}
        dash={[2, 10, 2]}
        strokeWidth={5}
        {...colorProps}
      />
      {isActive ? (
        shelf.coordinates.map((point) => {
          const [pointX, pointY] = point;

          return (
            <Point
              key={`${pointX}_${pointY}`}
              color={shelf.color}
              coordinates={point}
              isActive={activePoint === point}
              onClick={() => setActivePoint(point)}
              onDragStart={() => setActivePoint(point)}
              onDragMove={() => console.log('Im dragging point')}
            />
          );
        })
      ) : (
        <DeleteButton
          x={deleteButtonPosition[0]}
          y={deleteButtonPosition[1]}
          onClick={() => deleteShelf(shelf)}
          color={shelf.color}
        />
      )}
    </>
  );
};

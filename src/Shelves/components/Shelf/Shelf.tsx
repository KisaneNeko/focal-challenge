import { Line } from 'react-konva';
import { Coordinates, Shelf as ShelfType } from '../../types';
import { memo, useState } from 'react';
import { Point } from '../Point';
import { DeleteButton } from '../DeleteButton';
import { useShelf } from './shelf.hooks';
import { useShelvesContext } from '../../Providers/useShelvesContext';

type Props = {
  shelf: ShelfType;
};

const ShelfInner = ({ shelf }: Props) => {
  const [activePoint, setActivePoint] = useState<Coordinates | null>(null);
  const { deleteShelf } = useShelvesContext();

  const {
    colorProps,
    linePoints,
    deleteButtonPosition,
    isActive,
    setActiveShelf,
    updateShelfCoordinates,
    submitShelf,
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

      {!isActive && (
        <DeleteButton
          x={deleteButtonPosition[0]}
          y={deleteButtonPosition[1]}
          onClick={() => deleteShelf(shelf)}
          color={shelf.color}
        />
      )}

      {isActive &&
        shelf.coordinates.map((point, index) => {
          const [pointX, pointY] = point;

          return (
            <Point
              key={`${pointX}_${pointY}`}
              color={shelf.color}
              coordinates={point}
              isActive={activePoint === point}
              onClick={() => setActivePoint(point)}
              onDragStart={() => setActivePoint(point)}
              onDragMove={({ evt }) => {
                updateShelfCoordinates([evt.offsetX, evt.offsetY], index);
              }}
              onDragEnd={submitShelf}
            />
          );
        })}
    </>
  );
};

export const Shelf = memo(ShelfInner);

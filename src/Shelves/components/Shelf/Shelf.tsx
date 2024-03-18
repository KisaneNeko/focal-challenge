import { Line } from 'react-konva';
import { Coordinates, Shelf as ShelfType } from '../../types';
import { memo } from 'react';
import { DeleteButton } from '../DeleteButton';
import { useDraggablePoints, useShelf } from './shelf.hooks';
import { ShelfPoints } from '../ShelfPoints';

export type Props = {
  shelf: ShelfType;
  onPointMove: (coords: Coordinates) => void;
};

const ShelfInner = (props: Props) => {
  const { shelf } = props;
  const {
    colorProps,
    deleteButtonPosition,
    deleteShelf,
    isActive,
    selectShelf,
  } = useShelf(shelf);
  const { linePoints, updateShelfCoordinates, submitShelfChanges } =
    useDraggablePoints(props);

  return (
    <>
      <Line
        onClick={selectShelf}
        onTouchEnd={selectShelf}
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
          onClick={deleteShelf}
          onTouchEnd={deleteShelf}
          color={shelf.color}
        />
      )}

      {isActive && (
        <ShelfPoints
          shelf={shelf}
          onChange={updateShelfCoordinates}
          onSubmit={submitShelfChanges}
        />
      )}
    </>
  );
};

export const Shelf = memo(ShelfInner);

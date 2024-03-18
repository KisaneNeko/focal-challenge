import { Line } from 'react-konva';
import { Shelf as ShelfType } from '../../types';
import { memo } from 'react';
import { DeleteButton } from '../DeleteButton';
import { useDraggablePoints, useShelf } from './shelf.hooks';
import { ShelfPoints } from '../ShelfPoints';

type Props = {
  shelf: ShelfType;
};

const ShelfInner = ({ shelf }: Props) => {
  const {
    colorProps,
    deleteButtonPosition,
    deleteShelf,
    isActive,
    selectShelf,
  } = useShelf(shelf);
  const { linePoints, updateShelfCoordinates, submitShelfChanges } =
    useDraggablePoints(shelf);

  return (
    <>
      <Line
        onClick={selectShelf}
        onTouchEnd={selectShelf}
        closed
        points={linePoints}
        dash={[2, 10, 2]}
        strokeWidth={5}
        name={`${shelf.id}_line`}
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

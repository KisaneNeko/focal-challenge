import { Circle, Group, Line, Text } from 'react-konva';
import { Coordinates, Shelf as ShelfType } from '../../types';
import { useShelvesContext } from '../Providers/useShelvesContext';
import { useRef, useState } from 'react';
import { Point } from '../Point/Point';
import { ACTIVE_COLOR } from '../../constants';

type Props = {
  shelf: ShelfType;
  deleteShelf: (shelf: ShelfType) => void;
};

export const Shelf = ({ shelf, deleteShelf }: Props) => {
  const linePoints = shelf.coordinates.flat();
  const [deleteButtonPosition] = [...shelf.coordinates].sort(
    ([aX, aY], [bX, bY]) => bX - aX || aY - bY,
  );

  const { activeShelf, setActiveShelf } = useShelvesContext();
  const isActive = activeShelf === shelf;
  const colorProps = getShelfColors(isActive, shelf.color);
  const [activePoint, setActivePoint] = useState<Coordinates | null>(null);
  const lineRef = useRef(null);

  return (
    <>
      <Line
        onClick={() => setActiveShelf(shelf)}
        ref={lineRef}
        closed
        points={linePoints}
        dash={[10, 10]}
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
        <Group x={deleteButtonPosition[0]} y={deleteButtonPosition[1]} onClick={() => deleteShelf(shelf)}>
          <Circle
            fill={shelf.color}
            radius={10}
          />
          <Text
            x={-4}
            y={-4}
            fontSize={12}
            text="X"
            stroke='#FFFFFF'
            strokeWidth={3}
          />         
        </Group>
      )}
    </>
  );
};

const getShelfColors = (isActive: boolean, mainColor: string) => {
  const color = isActive ? ACTIVE_COLOR : mainColor;
  const colorOpacity50 = `${color}80`;
  const colorOpacity20 = `${color}33`;

  return {
    fill: isActive ? colorOpacity20 : colorOpacity50,
    stroke: color,
  };
};

import { Circle } from 'react-konva';
import { Coordinates, KonvaMouseEvent, KonvaTouchEvent, Shelf } from '../types';
import { ACTIVE_COLOR } from '../constants';
import { useState } from 'react';

type Props = {
  shelf: Shelf;
  onChange: (event: KonvaMouseEvent | KonvaTouchEvent, index: number) => void;
  onSubmit: () => void;
};

export const ShelfPoints = ({ shelf, onSubmit, onChange }: Props) => {
  const [activePoint, setActivePoint] = useState<Coordinates | null>(null);

  return (
    <>
      {shelf.coordinates.map((point, index) => {
        const [pointX, pointY] = point;
        const onDragMove = (event: KonvaMouseEvent | KonvaTouchEvent) => {
          onChange(event, index);
        };
        const onDragStart = () => setActivePoint(point);
        const isActive = activePoint === point;

        return (
          <Circle
            key={`${pointX}_${pointY}`}
            x={pointX}
            y={pointY}
            stroke={isActive ? ACTIVE_COLOR : undefined}
            strokeWidth={5}
            fill={shelf.color}
            radius={10}
            draggable
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onSubmit}
            onTouchStart={onDragStart}
            onTouchMove={onDragMove}
            onTouchEnd={onSubmit}
          />
        );
      })}
    </>
  );
};

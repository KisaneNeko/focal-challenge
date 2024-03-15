import { Circle } from 'react-konva';
import { Coordinates, KonvaMouseEvent } from '../types';
import { ACTIVE_COLOR } from '../constants';

type Props = {
  color: string;
  coordinates: Coordinates;
  isActive?: boolean;
  onDragMove?: (event: KonvaMouseEvent) => void;
  onDragStart?: (event: KonvaMouseEvent) => void;
  onDragEnd?: (event: KonvaMouseEvent) => void;
};

export const Point = ({
  color,
  coordinates,
  isActive,
  ...restProps
}: Props) => {
  const [pointX, pointY] = coordinates;

  return (
    <Circle
      x={pointX}
      y={pointY}
      stroke={isActive ? ACTIVE_COLOR : undefined}
      strokeWidth={5}
      fill={color}
      radius={10}
      draggable
      {...restProps}
    />
  );
};

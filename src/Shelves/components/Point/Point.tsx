import Konva from 'konva';
import { Circle } from 'react-konva';
import { Coordinates } from '../../types';
import { ACTIVE_COLOR } from '../../constants';

type Props = {
  color: string;
  coordinates: Coordinates;
  isActive?: boolean;
  onClick: () => void;
  onDragMove?: (event: Konva.KonvaEventObject<MouseEvent>) => void;
  onDragStart?: (event: Konva.KonvaEventObject<MouseEvent>) => void;
};

export const Point = ({
  color,
  coordinates,
  isActive,
  onClick,
  onDragMove,
  onDragStart,
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
      onClick={onClick}
      draggable={!!onDragMove}
      onDragMove={onDragMove}
      onDragStart={onDragStart}
    />
  );
};

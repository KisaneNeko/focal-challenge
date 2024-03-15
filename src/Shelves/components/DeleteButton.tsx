import { Circle, Group, Text } from 'react-konva';

type Props = {
  x: number;
  y: number;
  onClick: () => void;
  color: string;
};
export const DeleteButton = ({ x, y, onClick, color }: Props) => (
  <Group x={x} y={y} onClick={onClick}>
    <Circle fill={color} radius={10} />
    <Text
      x={-4}
      y={-4}
      fontSize={12}
      text="X"
      stroke="#FFFFFF"
      strokeWidth={3}
    />
  </Group>
);

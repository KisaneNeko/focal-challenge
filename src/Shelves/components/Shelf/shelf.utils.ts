import { ACTIVE_COLOR } from "../../constants";

export const getShelfColors = (isActive: boolean, mainColor: string) => {
  const color = isActive ? ACTIVE_COLOR : mainColor;
  const colorOpacity50 = `${color}80`;
  const colorOpacity20 = `${color}33`;

  return {
    fill: isActive ? colorOpacity20 : colorOpacity50,
    stroke: color,
  };
};
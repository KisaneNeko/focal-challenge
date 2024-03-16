import { useState } from 'react';
import Konva from 'konva';
import { getRandomColor } from '../../../utils/utils';
import { getShelfCoords } from './shelvesCanvas.utils';
import {
  Coordinates,
  KonvaMouseEvent,
  KonvaTouchEvent,
  Shelf,
} from '../../types';
import { useShelvesContext } from '../../Providers/useShelvesContext';
import { getCursorPosition } from '../../utils/utils';

export const useShelvesCanvas = () => {
  const { addShelf, setActiveShelf, stageRef } = useShelvesContext();
  const [initialPointPosition, setInitialPointPosition] = useState<
    [number, number] | null
  >(null);
  const [color, setColor] = useState(getRandomColor());
  const [shelfDraftProps, setShelfDraftProps] =
    useState<Konva.RectConfig | null>(null);
  const colorOpacity40 = `${color}40`;

  const drawShelfDraft = (
    [initX, initY]: Coordinates,
    [endX, endY]: Coordinates,
  ) => {
    setShelfDraftProps({
      x: initX,
      y: initY,
      width: endX - initX,
      height: endY - initY,
      stroke: color,
      fill: colorOpacity40,
      strokeWidth: 5,
      dash: [10, 10],
    });
  };

  const startDrawingShelf = (event: KonvaMouseEvent | KonvaTouchEvent) => {
    if (event.target === stageRef.current) {
      setInitialPointPosition(getCursorPosition(event, stageRef.current));
      setActiveShelf(null);
    }
  };

  const submitShelfDraft = () => {
    if (initialPointPosition) {
      const coordinates = getShelfCoords(shelfDraftProps);
      if (coordinates) {
        const newShelf: Shelf = {
          coordinates,
          color,
        };
        addShelf(newShelf);
        setColor(getRandomColor());
      }

      setInitialPointPosition(null);
      setShelfDraftProps(null);
    }
  };

  const redrawShelfDraft = (event: KonvaMouseEvent | KonvaTouchEvent) => {
    if (initialPointPosition && stageRef.current) {
      drawShelfDraft(
        initialPointPosition,
        getCursorPosition(event, stageRef.current),
      );
    }
  };

  return {
    stageRef,
    startDrawingShelf,
    submitShelfDraft,
    redrawShelfDraft,
    shelfDraftProps,
  };
};

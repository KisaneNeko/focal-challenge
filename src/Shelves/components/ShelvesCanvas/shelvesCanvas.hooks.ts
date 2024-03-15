import { useRef, useState } from 'react';
import Konva from 'konva';
import { getRandomColor } from '../../../utils/utils';
import { getShelfCoords } from './shelvesCanvas.utils';
import { Coordinates, KonvaMouseEvent, Shelf } from '../../types';
import { useShelvesContext } from '../../Providers/useShelvesContext';

export const useShelvesCanvas = () => {
  const { addShelf } = useShelvesContext();
  const [initialPointPosition, setInitialPointPosition] = useState<
    [number, number] | null
  >(null);
  const [color, setColor] = useState(getRandomColor());
  const [shelfDraftProps, setShelfDraftProps] =
    useState<Konva.RectConfig | null>(null);
  const colorOpacity40 = `${color}40`;
  const canvasRef = useRef(null);

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

  const onMouseDown = (event: KonvaMouseEvent) => {
    if (event.target === canvasRef.current) {
      setInitialPointPosition([event.evt.offsetX, event.evt.offsetY]);
    }
  };

  const onMouseUp = () => {
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

  const onMouseMove = (event: KonvaMouseEvent) => {
    if (initialPointPosition) {
      drawShelfDraft(initialPointPosition, [
        event.evt.offsetX,
        event.evt.offsetY,
      ]);
    }
  };

  return {
    canvasRef,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    shelfDraftProps,
  };
};

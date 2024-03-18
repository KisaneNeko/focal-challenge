import Konva from 'konva';
import { isTouchEvent } from '../guards';
import { Coordinates, KonvaMouseEvent, KonvaTouchEvent } from '../types';

export const getCursorPosition = (
  event: KonvaMouseEvent | KonvaTouchEvent,
  containerRef: Konva.Stage,
): Coordinates => {
  if (isTouchEvent(event)) {
    const containerPosition = containerRef.content.getClientRects();
    const [touch] = event.evt.touches;
    const offsetX = touch.clientX - containerPosition[0].left;
    const offsetY = touch.clientY - containerPosition[0].top;

    return [offsetX, offsetY];
  }

  return [event.evt.offsetX, event.evt.offsetY];
};

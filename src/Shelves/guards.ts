import { KonvaMouseEvent, KonvaTouchEvent } from './types';

export function isTouchEvent(
  event: KonvaMouseEvent | KonvaTouchEvent,
): event is KonvaTouchEvent {
  return event.evt.type.includes('touch');
}

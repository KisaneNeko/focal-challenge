import Konva from 'konva';
import { describe, expect, it, vi } from 'vitest';
import { getCursorPosition } from './utils';
import { KonvaMouseEvent, KonvaTouchEvent } from '../types';

describe('shelves utils', () => {
  it('should get cursor position from mouse events', () => {
    const eventMock = {
      evt: {
        type: 'mousemove',
        offsetX: 100,
        offsetY: 150,
      },
    } as unknown as KonvaMouseEvent;
    const containerMock = {} as Konva.Stage;

    const result = getCursorPosition(eventMock, containerMock);
    expect(result).toEqual([100, 150]);
  });

  it('should get cursor position from touch event', () => {
    const eventMock = {
      evt: {
        type: 'touchmove',
        touches: [
          {
            clientX: 200,
            clientY: 300,
          },
        ],
      },
    } as unknown as KonvaTouchEvent;

    const containerPositionMock = [{ left: 30, top: 40 }];
    const containerMock = {
      content: {
        getClientRects: vi.fn().mockReturnValue(containerPositionMock),
      },
    } as unknown as Konva.Stage;

    const result = getCursorPosition(eventMock, containerMock);
    expect(result).toEqual([170, 260]);
  });
});

import { describe, it, expect, vi, afterAll, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useShelvesCanvas } from './shelvesCanvas.hooks';
import { KonvaMouseEvent } from '../../types';
import { act } from 'react-dom/test-utils';

const addShelfMock = vi.fn();
const setActiveShelfMock = vi.fn();
const stageRefMock = {
  current: document.createElement('div'),
};

let counter = 0;
vi.mock('../../utils/utils', () => {
  return {
    getCursorPosition: vi.fn().mockImplementation(() => {
      counter++;
      return [counter * 50, counter * 50];
    }),
  };
});

vi.mock('../../Providers/useShelvesContext', () => {
  return {
    useShelvesContext: () => ({
      addShelf: addShelfMock,
      setActiveShelf: setActiveShelfMock,
      stageRef: stageRefMock,
    }),
  };
});

describe('ShelvesCanvas hooks', () => {
  beforeEach(() => {
    counter = 0;
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should initiate state', () => {
    const { result } = renderHook(() => useShelvesCanvas());
    const { stageRef, shelfDraftProps } = result.current;

    expect(stageRef).toBe(stageRefMock);
    expect(shelfDraftProps).toBe(null);
  });

  it('should drop shelf focus when clicking on the Stage element', () => {
    const { result } = renderHook(() => useShelvesCanvas());
    const { startDrawingShelf } = result.current;
    let eventMock = {
      target: null,
    } as unknown as KonvaMouseEvent;

    startDrawingShelf(eventMock);
    expect(setActiveShelfMock).not.toBeCalled();

    eventMock = {
      target: stageRefMock.current,
    } as unknown as KonvaMouseEvent;
    startDrawingShelf(eventMock);
    expect(setActiveShelfMock).toBeCalled();
  });

  it('should draw a shelf draft', async () => {
    const { result } = renderHook(() => useShelvesCanvas());
    const eventMock = {
      target: stageRefMock.current,
    } as unknown as KonvaMouseEvent;

    act(() => result.current.startDrawingShelf(eventMock));
    act(() => result.current.redrawShelfDraft(eventMock));

    const draftProps = result.current.shelfDraftProps;
    const color = draftProps?.stroke;
    if (typeof color === 'string') {
      expect(color.startsWith('#')).toBe(true);
      // random color consists of # and 6 digits
      expect(color.length).toBe(7);
    } else {
      throw 'Color type is incorrect';
    }

    expect(draftProps).toEqual({
      x: 50,
      y: 50,
      width: 50,
      height: 50,
      stroke: color,
      fill: `${color}40`,
      strokeWidth: 5,
      dash: [10, 10],
    });
  });
});

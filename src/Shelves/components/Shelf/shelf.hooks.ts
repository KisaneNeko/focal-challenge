import { useEffect, useState } from 'react';
import { useShelvesContext } from '../../Providers/useShelvesContext';
import {
  Coordinates,
  KonvaMouseEvent,
  KonvaTouchEvent,
  Shelf,
} from '../../types';
import { getShelfColors } from './shelf.utils';
import { getCursorPosition } from '../../utils/utils';
import { Props } from './Shelf';
import Konva from 'konva';

const DELETE_TRIGGERS = ['Delete', 'Backspace'];

export const useShelf = (shelf: Shelf) => {
  const { activeShelf, setActiveShelf, deleteShelf } = useShelvesContext();
  useShelfEvents(shelf);

  const [deleteButtonPosition] = [...shelf.coordinates].sort(
    ([aX, aY], [bX, bY]) => aY - bY || bX - aX,
  );
  const isActive = activeShelf === shelf;
  const colorProps = getShelfColors(isActive, shelf.color);

  const selectShelf = () => {
    setActiveShelf(shelf);
  };

  return {
    colorProps,
    deleteButtonPosition,
    isActive,
    selectShelf,
    deleteShelf: () => deleteShelf(shelf),
  };
};

const useShelfEvents = (shelf: Shelf) => {
  const { activeShelf, deleteShelf, setActiveShelf } = useShelvesContext();
  const isActive = activeShelf === shelf;

  useEffect(() => {
    const onKeyPress = (event: globalThis.KeyboardEvent) => {
      if (!isActive) return;

      if (DELETE_TRIGGERS.includes(event.code)) {
        deleteShelf(shelf);
      }

      if (event.code === 'Escape') {
        setActiveShelf(null);
      }
    };

    document.addEventListener('keydown', onKeyPress);

    return () => document.removeEventListener('keydown', onKeyPress);
  }, [deleteShelf, isActive, setActiveShelf, shelf]);
};

export const useDraggablePoints = ({
  shelf,
  onPointMove,
  containerRef,
}: Props) => {
  const { stageRef } = useShelvesContext();
  const { updateShelf } = useShelvesContext();
  const [coordinates, setCoordinates] = useState<Coordinates[]>(
    shelf.coordinates,
  );

  const updateShelfCoordinates = (
    event: KonvaMouseEvent | KonvaTouchEvent,
    index: number,
  ) => {
    if (!stageRef.current) {
      return;
    }

    const coords = getCursorPosition(event, stageRef.current);
    setCoordinates((prevState) => {
      const updatedCoordinates = [...prevState];

      const borderSafeCoords = getPointCoordinates(
        containerRef.current,
        stageRef.current,
        coords,
        event as KonvaMouseEvent,
      );
      updatedCoordinates[index] = borderSafeCoords;
      onPointMove(borderSafeCoords);

      return updatedCoordinates;
    });
  };

  const linePoints = coordinates.flat();

  return {
    linePoints,
    updateShelfCoordinates,
    submitShelfChanges: () => updateShelf(shelf, { coordinates }),
  };
};

const getPointCoordinates = (
  containerRef: HTMLDivElement | null,
  stageRef: Konva.Stage | null,
  [targetX, targetY]: Coordinates,
  event: KonvaMouseEvent,
): Coordinates => {
  if (!containerRef || !stageRef) {
    return [targetX, targetY];
  }

  const containerRect = containerRef.getBoundingClientRect();

  const minX = containerRect.x;
  const maxX = containerRect.x + containerRect.width;
  const minY = containerRect.y;
  const maxY = containerRect.y + containerRect.height;

  let x = targetX;
  let y = targetY;
  if (event.evt.x < minX) {
    x = 0;
  }

  if (event.evt.x > maxX) {
    x = containerRect.width;
  }

  if (event.evt.y < minY) {
    y = 0;
  }

  if (event.evt.y > maxY) {
    y = containerRect.height;
  }

  return [x, y];
};

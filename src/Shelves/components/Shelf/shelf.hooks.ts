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

export const useDraggablePoints = ({ shelf, onPointMove }: Props) => {
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
      updatedCoordinates[index] = coords;
      onPointMove(coords);

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

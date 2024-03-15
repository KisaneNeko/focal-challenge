import { useEffect, useState } from 'react';
import { useShelvesContext } from '../../Providers/useShelvesContext';
import { Coordinates, Shelf } from '../../types';
import { getShelfColors } from './shelf.utils';

const DELETE_TRIGGERS = ['Delete', 'Backspace'];

export const useShelf = (shelf: Shelf) => {
  const { activeShelf, setActiveShelf, updateShelf, deleteShelf } =
    useShelvesContext();
  const [coordinates, setCoordinates] = useState<Coordinates[]>(
    shelf.coordinates,
  );
  const linePoints = coordinates.flat();
  const [deleteButtonPosition] = [...shelf.coordinates].sort(
    ([aX, aY], [bX, bY]) => aY - bY || bX - aX,
  );
  const isActive = activeShelf === shelf;
  const colorProps = getShelfColors(isActive, shelf.color);

  useEffect(() => {
    const onKeyPress = (event: globalThis.KeyboardEvent) => {
      if (isActive && DELETE_TRIGGERS.includes(event.code)) {
        deleteShelf(shelf);
      }
    };

    document.addEventListener('keydown', onKeyPress);

    return () => document.removeEventListener('keydown', onKeyPress);
  }, [deleteShelf, isActive, shelf]);

  const updateShelfCoordinates = (updatedPoint: Coordinates, index: number) => {
    setCoordinates((prevState) => {
      const updatedCoordinates = [...prevState];
      updatedCoordinates[index] = updatedPoint;

      return updatedCoordinates;
    });
  };

  const submitShelf = () => {
    updateShelf(shelf, { coordinates });
  };

  return {
    colorProps,
    linePoints,
    deleteButtonPosition,
    isActive,
    setActiveShelf,
    updateShelfCoordinates,
    submitShelf,
  };
};

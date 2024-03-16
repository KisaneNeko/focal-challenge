import { useEffect, useState } from 'react';
import { useShelvesContext } from '../../Providers/useShelvesContext';
import { Coordinates, Shelf } from '../../types';
import { getShelfColors } from './shelf.utils';

const DELETE_TRIGGERS = ['Delete', 'Backspace'];

export const useShelf = (shelf: Shelf) => {
  const { activeShelf, setActiveShelf, updateShelf } = useShelvesContext();
  useShelfEvents(shelf);

  const [coordinates, setCoordinates] = useState<Coordinates[]>(
    shelf.coordinates,
  );
  const linePoints = coordinates.flat();
  const [deleteButtonPosition] = [...shelf.coordinates].sort(
    ([aX, aY], [bX, bY]) => aY - bY || bX - aX,
  );
  const isActive = activeShelf === shelf;
  const colorProps = getShelfColors(isActive, shelf.color);

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

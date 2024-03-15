import { useShelvesContext } from '../../Providers/useShelvesContext';
import { Shelf } from '../../types';
import { getShelfColors } from './shelf.utils';

export const useShelf = (shelf: Shelf) => {
  const { activeShelf, setActiveShelf } = useShelvesContext();

  const linePoints = shelf.coordinates.flat();
  const [deleteButtonPosition] = [...shelf.coordinates].sort(
    ([aX, aY], [bX, bY]) => bX - aX || aY - bY,
  );
  const isActive = activeShelf === shelf;
  const colorProps = getShelfColors(isActive, shelf.color);

  return {
    colorProps,
    linePoints,
    deleteButtonPosition,
    isActive,
    setActiveShelf,
  };
};

import { createContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { Shelf, Shelves, ShelvesDefinition } from '../types';
import { mapShelvesApiToUI, mapShelvesUIToApi } from '../utils/mappers';

interface ShelvesContextType {
  activeShelf: Shelf | null;
  setActiveShelf: (shelf: Shelf) => void;
  shelves: Shelves;
  addShelf: (shelf: Shelf) => void;
  deleteShelf: (shelf: Shelf) => void;
  updateShelf: (shelf: Shelf, updatedProps: Partial<Shelf>) => void;
}

export const ShelvesContext = createContext<ShelvesContextType>(
  {} as ShelvesContextType,
);

type Props = {
  shelvesDefinition: ShelvesDefinition;
  children: ReactNode;
  onChange: (shelvesDefinition: ShelvesDefinition) => void;
};

const ShelvesProvider = ({ children, shelvesDefinition, onChange }: Props) => {
  const [activeShelf, setActiveShelf] = useState<Shelf | null>(null);
  const [shelves, setShelves] = useState<Shelves>(
    mapShelvesApiToUI(shelvesDefinition),
  );

  useEffect(() => {
    onChange(mapShelvesUIToApi(shelves));
  }, [onChange, shelves]);

  const actions = useMemo(() => {
    const addShelf = (shelf: Shelf) => {
      setShelves((prevState) => [...prevState, shelf]);
    };

    const deleteShelf = (shelf: Shelf) => {
      setShelves((prevState) => prevState.filter((s) => s !== shelf));
    };

    const updateShelf = (shelf: Shelf, updatedProps: Partial<Shelf>) => {
      setShelves((prevState) => {
        const index = prevState.findIndex((s) => s === shelf);
        const wasActive = activeShelf === shelf;

        const updatedShelf = {
          ...shelf,
          ...updatedProps,
        };

        const updatedState = [...prevState];
        updatedState[index] = updatedShelf;

        if (wasActive) {
          setActiveShelf(updatedShelf);
        }

        return updatedState;
      });
    };

    return { addShelf, deleteShelf, updateShelf };
  }, [activeShelf]);

  const contextValue: ShelvesContextType = {
    activeShelf,
    setActiveShelf,
    shelves,
    ...actions,
  };

  return (
    <ShelvesContext.Provider value={contextValue}>
      {children}
    </ShelvesContext.Provider>
  );
};

export default ShelvesProvider;

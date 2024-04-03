import Konva from 'konva';
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  RefObject,
  useCallback,
} from 'react';
import { Shelf, Shelves, ShelvesDefinition } from '../types';
import { mapShelvesApiToUI, mapShelvesUIToApi } from '../utils/mappers';

interface ShelvesContextType {
  activeShelf: Shelf | null;
  setActiveShelf: (shelf: Shelf | null) => void;
  shelves: Shelves;
  addShelf: (shelf: Shelf) => void;
  stageRef: RefObject<Konva.Stage>;
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
  const stageRef = useRef<Konva.Stage>(null);
  const [activeShelf, setActiveShelf] = useState<Shelf | null>(null);
  const [shelves, setShelves] = useState<Shelves>(
    mapShelvesApiToUI(shelvesDefinition),
  );

  useEffect(() => {
    setShelves(mapShelvesApiToUI(shelvesDefinition));
  }, [shelvesDefinition]);

  const onShelvesChange = useCallback(
    (state: Shelves) => {
      onChange(mapShelvesUIToApi(state));
    },
    [onChange],
  );

  const actions = useMemo(() => {
    const addShelf = (shelf: Shelf) => {
      setShelves((prevState) => {
        const updatedState = [...prevState, shelf];
        onShelvesChange(updatedState);
        return updatedState;
      });
    };

    const deleteShelf = (shelf: Shelf) => {
      setShelves((prevState) => {
        const updatedState = prevState.filter((s) => s !== shelf);
        onShelvesChange(updatedState);
        return updatedState;
      });
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

        onShelvesChange(updatedState);
        return updatedState;
      });
    };

    return { addShelf, deleteShelf, updateShelf };
  }, [activeShelf, onShelvesChange]);

  const contextValue: ShelvesContextType = {
    activeShelf,
    setActiveShelf,
    shelves,
    stageRef,
    ...actions,
  };

  return (
    <ShelvesContext.Provider value={contextValue}>
      {children}
    </ShelvesContext.Provider>
  );
};

export default ShelvesProvider;

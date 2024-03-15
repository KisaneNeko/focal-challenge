import { createContext, useState, ReactNode } from 'react';
import { Shelf } from '../../types';

interface ShelvesContextType {
  activeShelf: Shelf | null;
  setActiveShelf: (shelf: Shelf) => void;
}

export const ShelvesContext = createContext<ShelvesContextType>(
  {} as ShelvesContextType,
);

type Props = {
  children: ReactNode;
};

const ShelvesProvider = ({ children }: Props) => {
  const [activeShelf, setActiveShelf] = useState<Shelf | null>(null);

  const contextValue: ShelvesContextType = {
    activeShelf,
    setActiveShelf,
  };

  return (
    <ShelvesContext.Provider value={contextValue}>
      {children}
    </ShelvesContext.Provider>
  );
};

export default ShelvesProvider;

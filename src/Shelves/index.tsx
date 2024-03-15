import './shelves.css';
import { ShelvesCanvas } from './components/ShelvesCanvas/ShelvesCanvas';
import { useState } from 'react';
import { Shelf, ShelvesDefinition, Shelves as ShelvesType } from './types';
import { mapShelvesApiToUI } from './utils/mappers';
import ShelvesProvider from './Providers/ShelvesContextProvider';

type Props = {
  shelvesDefinition: ShelvesDefinition;
  imgUrl: string;
  onChange: (shelvesDefinition: ShelvesDefinition) => void;
};

export const Shelves = ({ shelvesDefinition, imgUrl }: Props) => {
  const [shelves, setShelves] = useState<ShelvesType>(
    mapShelvesApiToUI(shelvesDefinition),
  );

  const addShelf = (shelf: Shelf) => {
    setShelves((prevState) => [...prevState, shelf]);
  };

  const deleteShelf = (shelf: Shelf) => {
    setShelves((prevState) => prevState.filter(s => s !== shelf))
  }

  return (
    <ShelvesProvider>
      <div className="shelves-container">
        <img src={imgUrl} alt="shelf image" />
        <ShelvesCanvas shelves={shelves} addShelf={addShelf} deleteShelf={deleteShelf} />
      </div>
    </ShelvesProvider>
  );
};

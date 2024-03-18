import './shelves.css';
import { ShelvesCanvas } from './components/ShelvesCanvas/ShelvesCanvas';
import { ShelvesDefinition } from './types';
import ShelvesProvider from './Providers/ShelvesContextProvider';

type Props = {
  shelvesDefinition: ShelvesDefinition;
  imgUrl: string;
  onChange: (shelvesDefinition: ShelvesDefinition) => void;
};

export const Shelves = ({ shelvesDefinition, imgUrl, onChange }: Props) => (
  <ShelvesProvider shelvesDefinition={shelvesDefinition} onChange={onChange}>
    <div className="shelves-container">
      {/* <img src={imgUrl} alt="shelf image" /> */}
      <ShelvesCanvas />
    </div>
  </ShelvesProvider>
);

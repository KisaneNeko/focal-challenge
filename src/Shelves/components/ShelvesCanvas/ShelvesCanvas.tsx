import { Layer, Rect, Stage } from 'react-konva';
import './shelvesCanvas.css';
import { useShelvesCanvas } from './shelvesCanvas.hooks';
import { Shelves, Shelf as ShelfType } from '../../types';
import { Shelf } from '../Shelf/Shelf';

type Props = {
  shelves: Shelves;
  addShelf: (shelf: ShelfType) => void;
  deleteShelf: (shelf: ShelfType) => void;
};

export const ShelvesCanvas = ({ shelves, addShelf, deleteShelf }: Props) => {
  const { onMouseDown, onMouseUp, onMouseMove, shelfDraftProps } =
    useShelvesCanvas(addShelf);

  return (
    <div className="shelves-canvas-container">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <Layer>
          <>
            {shelfDraftProps && <Rect {...shelfDraftProps} />}
            {shelves.map((shelf) => (
              <Shelf
                shelf={shelf}
                key={shelf.color}
                deleteShelf={deleteShelf}
              />
            ))}
          </>
        </Layer>
      </Stage>
    </div>
  );
};

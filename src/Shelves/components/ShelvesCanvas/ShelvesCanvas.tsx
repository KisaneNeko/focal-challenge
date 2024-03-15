import { Layer, Rect, Stage } from 'react-konva';
import './shelvesCanvas.css';
import { useShelvesCanvas } from './shelvesCanvas.hooks';
import { Shelf } from '../Shelf/Shelf';
import { useShelvesContext } from '../../Providers/useShelvesContext';

export const ShelvesCanvas = () => {
  const { shelves } = useShelvesContext();
  const { canvasRef, onMouseDown, onMouseUp, onMouseMove, shelfDraftProps } =
    useShelvesCanvas();

  return (
    <div className="shelves-canvas-container">
      <Stage
        ref={canvasRef}
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
              <Shelf shelf={shelf} key={shelf.color} />
            ))}
          </>
        </Layer>
      </Stage>
    </div>
  );
};

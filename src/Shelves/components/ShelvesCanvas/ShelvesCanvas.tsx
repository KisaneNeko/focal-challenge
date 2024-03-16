import { Layer, Rect, Stage } from 'react-konva';
import './shelvesCanvas.css';
import { useShelvesCanvas } from './shelvesCanvas.hooks';
import { Shelf } from '../Shelf/Shelf';
import { useShelvesContext } from '../../Providers/useShelvesContext';

export const ShelvesCanvas = () => {
  const { shelves } = useShelvesContext();
  const {
    stageRef,
    startDrawingShelf,
    submitShelfDraft,
    redrawShelfDraft,
    shelfDraftProps,
  } = useShelvesCanvas();

  return (
    <div className="shelves-canvas-container">
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawingShelf}
        onTouchStart={startDrawingShelf}
        onMouseUp={submitShelfDraft}
        onTouchEnd={submitShelfDraft}
        onMouseMove={redrawShelfDraft}
        onTouchMove={redrawShelfDraft}
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

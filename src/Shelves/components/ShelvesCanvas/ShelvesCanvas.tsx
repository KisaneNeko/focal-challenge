import { Layer, Rect, Stage } from 'react-konva';
import './shelvesCanvas.css';
import {
  useBackgroundImage,
  useShelvesCanvas,
  useShelvesZoom,
} from './shelvesCanvas.hooks';
import { Shelf } from '../Shelf/Shelf';
import { useShelvesContext } from '../../Providers/useShelvesContext';
import { Dimensions } from '../../types';
import { useEffect } from 'react';

type Props = {
  imageUrl: string;
  dimensions: Dimensions;
  zoomFactor?: number;
};

export const ShelvesCanvas = ({ imageUrl, dimensions, zoomFactor }: Props) => {
  const { shelves } = useShelvesContext();

  const {
    stageRef,
    startDrawingShelf,
    submitShelfDraft,
    redrawShelfDraft,
    shelfDraftProps,
  } = useShelvesCanvas();

  const { isZoomBoxVisible, onPointMove, zoomBoxRef, zoomPosition } =
    useShelvesZoom(zoomFactor);
  const { layerRef, isBackgroundInitialized } = useBackgroundImage(
    stageRef,
    imageUrl,
    dimensions,
  );
  // resize canvas when dimensions change (i.e. new imageUrl changes)
  useEffect(() => {
    if (dimensions && stageRef.current) {
      stageRef.current.width(dimensions.width);
      stageRef.current.height(dimensions.height);
    }
  }, [dimensions, stageRef]);

  return (
    <div className="shelves-canvas-container">
      <Stage
        ref={stageRef}
        onMouseDown={startDrawingShelf}
        onTouchStart={startDrawingShelf}
        onMouseUp={submitShelfDraft}
        onTouchEnd={submitShelfDraft}
        onMouseMove={redrawShelfDraft}
        onTouchMove={redrawShelfDraft}
        {...dimensions}
      >
        <Layer ref={layerRef}>
          {/* canvas doesn't support z-index, so we need to make sure shelves are rendered after background */}
          {isBackgroundInitialized && (
            <>
              {shelfDraftProps && <Rect {...shelfDraftProps} />}
              {shelves.map((shelf) => (
                <Shelf
                  shelf={shelf}
                  key={shelf.color}
                  onPointMove={onPointMove}
                />
              ))}
            </>
          )}
        </Layer>
      </Stage>

      {isZoomBoxVisible && (
        <div
          className="zoom-box"
          ref={zoomBoxRef}
          style={{ ...zoomPosition }}
        />
      )}
    </div>
  );
};

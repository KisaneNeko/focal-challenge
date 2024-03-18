import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { getShelfCoords } from './shelvesCanvas.utils';
import {
  Coordinates,
  Dimensions,
  KonvaMouseEvent,
  KonvaTouchEvent,
  Shelf,
} from '../../types';
import { useShelvesContext } from '../../Providers/useShelvesContext';
import { getCursorPosition } from '../../utils/utils';
import { useCanvasZoom } from '../../hooks/useCanvasZoom';

const BACKGROUND_IMAGE_SHAPE_NAME = 'background-image';

export const useShelvesCanvas = () => {
  const { addShelf, setActiveShelf, stageRef } = useShelvesContext();
  const [initialPointPosition, setInitialPointPosition] =
    useState<Coordinates | null>(null);
  const [color, setColor] = useState(() => Konva.Util.getRandomColor());
  const [shelfDraftProps, setShelfDraftProps] =
    useState<Konva.RectConfig | null>(null);
  const colorOpacity40 = `${color}40`;

  const drawShelfDraft = (
    [initX, initY]: Coordinates,
    [endX, endY]: Coordinates,
  ) => {
    setShelfDraftProps({
      x: initX,
      y: initY,
      width: endX - initX,
      height: endY - initY,
      stroke: color,
      fill: colorOpacity40,
      strokeWidth: 5,
      dash: [10, 10],
    });
  };

  const startDrawingShelf = (event: KonvaMouseEvent | KonvaTouchEvent) => {
    if (
      stageRef.current &&
      event.target.attrs.name === BACKGROUND_IMAGE_SHAPE_NAME
    ) {
      setInitialPointPosition(getCursorPosition(event, stageRef.current));
      setActiveShelf(null);
    }
  };

  const submitShelfDraft = () => {
    if (initialPointPosition) {
      const coordinates = getShelfCoords(shelfDraftProps);
      if (coordinates) {
        const newShelf: Shelf = {
          coordinates,
          color,
        };
        addShelf(newShelf);
        setColor(Konva.Util.getRandomColor());
      }

      setInitialPointPosition(null);
      setShelfDraftProps(null);
    }
  };

  const redrawShelfDraft = (event: KonvaMouseEvent | KonvaTouchEvent) => {
    if (initialPointPosition && stageRef.current) {
      drawShelfDraft(
        initialPointPosition,
        getCursorPosition(event, stageRef.current),
      );
    }
  };

  return {
    stageRef,
    initialPointPosition,
    startDrawingShelf,
    submitShelfDraft,
    redrawShelfDraft,
    shelfDraftProps,
  };
};

export const useShelvesZoom = (zoomFactor?: number) => {
  const { shelves, stageRef } = useShelvesContext();
  const [isZoomBoxVisible, setIsZoomBoxVisible] = useState(false);
  const { updateZoomLayer, zoomBoxRef, zoomPosition } = useCanvasZoom(
    stageRef,
    zoomFactor,
  );

  // shelves definition are updated upon point drop
  // I'm using this to reset zoom visibility
  useEffect(() => {
    setIsZoomBoxVisible(false);
  }, [shelves]);

  // I'm usually following the rule of not optimizing preemptively
  // but in this case I want to make sure list items (Shelf components)
  // are not re-rendered when not necessary
  const onPointMove = useCallback(
    (coords: Coordinates) => {
      updateZoomLayer(coords);
      setIsZoomBoxVisible(true);
    },
    [updateZoomLayer],
  );

  return {
    isZoomBoxVisible,
    onPointMove,
    zoomBoxRef,
    zoomPosition,
  };
};

/**
 * This hook is used to set canvas background image
 * which makes sure the image is cloned when creating zoom box.
 *
 * @param containerRef
 * @param imageUrl
 * @returns
 */
export const useBackgroundImage = (
  containerRef: RefObject<Konva.Stage>,
  imageUrl: string,
  dimensions: Dimensions,
) => {
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const layerRef = useRef<Konva.Layer | null>(null);
  const [isBackgroundInitialized, setIsBackgroundInitialized] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const backgroundImage = new Image();
    backgroundImage.src = imageUrl;
    backgroundImage.crossOrigin = 'Anonymous';
    backgroundImage.onload = () => {
      setImageEl(backgroundImage);
    };
  }, [containerRef, imageUrl]);

  useEffect(() => {
    if (!imageEl || !dimensions || !layerRef.current) return;
    const { width, height } = dimensions;

    const scaleX = width / imageEl.width;
    const scaleY = height / imageEl.height;
    const scale = Math.max(scaleX, scaleY);

    const backgroundRect = new Konva.Rect({
      x: 0,
      y: 0,
      width,
      height,
      fillPatternImage: imageEl,
      fillPatternScaleX: scale,
      fillPatternScaleY: scale,
      name: BACKGROUND_IMAGE_SHAPE_NAME,
    });

    layerRef.current.add(backgroundRect);
    setIsBackgroundInitialized(true);
  }, [dimensions, imageEl]);

  return { layerRef, isBackgroundInitialized };
};

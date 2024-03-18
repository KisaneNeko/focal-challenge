import Konva from 'konva';
import { RefObject, useCallback, useRef, useState } from 'react';
import { Coordinates } from '../types';

const ZOOM_RADIUS = 100;
const POSITION_LEFT = { top: 0, left: 0 };
const POSITION_RIGHT = { top: 0, right: 0 };

type PositionStyle = {
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
};

export const useCanvasZoom = (
  sourceRef: RefObject<Konva.Stage>,
  zoomFactor = 1,
) => {
  const zoomBoxRef = useRef<HTMLDivElement>(null);
  const [zoomPosition, setZoomPosition] =
    useState<PositionStyle>(POSITION_LEFT);

  const updateZoomLayer = useCallback(
    async ([x, y]: Coordinates) => {
      if (!sourceRef.current || !zoomBoxRef.current) return;

      if (x > window.innerWidth / 2) {
        setZoomPosition(POSITION_LEFT);
      } else {
        setZoomPosition(POSITION_RIGHT);
      }

      // NOTE: This is quite an expensive action
      // it's possible to add `quality` prop to improve performance for the cost of image quality
      // or explore options like debounce with minimal delay
      const image = (await sourceRef.current.toImage({
        x: x - ZOOM_RADIUS,
        y: y - ZOOM_RADIUS,
        width: ZOOM_RADIUS * 2,
        height: ZOOM_RADIUS * 2,
        pixelRatio: zoomFactor,
      })) as Node;

      zoomBoxRef.current.replaceChildren(image);
    },
    [sourceRef, zoomFactor],
  );

  return {
    updateZoomLayer,
    zoomBoxRef,
    zoomPosition,
  };
};

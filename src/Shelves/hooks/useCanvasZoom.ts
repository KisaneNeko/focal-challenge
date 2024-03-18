import Konva from 'konva';
import { RefObject, useCallback, useRef } from 'react';
import { Coordinates } from '../types';

const ZOOM_RADIUS = 100;

export const useCanvasZoom = (
  sourceRef: RefObject<Konva.Stage>,
  zoomFactor = 1,
) => {
  const zoomBoxRef = useRef<HTMLDivElement>(null);

  const updateZoomLayer = useCallback(
    async ([x, y]: Coordinates) => {
      if (!sourceRef.current || !zoomBoxRef.current) return;

      // NOTE: This is quite an expensive action
      // it's possible to add `quality` prop to improve performance for cost of image quality
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
  };
};

import { useRef, useState } from 'react';
import Konva from 'konva';
import { getShelfCoords } from './shelvesCanvas.utils';
import {
  Coordinates,
  KonvaMouseEvent,
  KonvaTouchEvent,
  Shelf,
} from '../../types';
import { useShelvesContext } from '../../Providers/useShelvesContext';
import { getCursorPosition } from '../../utils/utils';
import uniqueId from 'lodash/uniqueId';

export const useShelvesCanvas = () => {
  const { addShelf, setActiveShelf, stageRef } = useShelvesContext();
  const [initialPointPosition, setInitialPointPosition] =
    useState<Coordinates | null>(null);
  const [color, setColor] = useState(() => Konva.Util.getRandomColor());
  const [shelfDraftProps, setShelfDraftProps] =
    useState<Konva.RectConfig | null>(null);
  const colorOpacity40 = `${color}40`;
  const [previewImage, setPreviewImage] = useState<unknown | null>(null);

  // zoom
  const layerRef = useRef<Konva.Layer>(null);
  const previewLayer = useRef<Konva.Layer | null>(null);
  const zoomBoxRef = useRef<HTMLDivElement>(null);

  // w/ copy items
  // const updateZoomLayer = () => {
  //   if (!zoomBoxRef.current || !layerRef.current) return;

  //   const layer = layerRef.current;
  //   if (previewLayer.current) {
  //     previewLayer.current.destroy();
  //   }
  //   previewLayer.current = layerRef.current.clone({ listening: false });
  //   zoomBoxRef.current.add(previewLayer.current);

  //   layer.children.forEach((shape) => {
  //     if (!previewLayer.current) return;

  //     const clone = previewLayer.current.findOne('.' + shape.name());

  //     if (clone) {
  //       console.log('clone', clone);
  //       clone.position(shape.position());
  //     }
  //   });
  // };
  // zoom end

  // with creating image and copying that
  const updateZoomLayer = async ([x, y]: Coordinates) => {
    if (!layerRef.current || !zoomBoxRef.current) return;

    try {
      const image = await layerRef.current.toImage({
        x: x - 50,
        y: y - 50,
        width: 100,
        height: 100,
        pixelRatio: 2,
      });

      console.log({ image });
      setPreviewImage(image);
      zoomBoxRef.current.appendChild(image as Node);
    } catch (e) {
      console.error('failed genrating image', e);
    }
  };
  // zoom end

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
    if (event.target === stageRef.current) {
      setInitialPointPosition(getCursorPosition(event, stageRef.current));
      setActiveShelf(null);
    }
  };

  const submitShelfDraft = () => {
    if (initialPointPosition) {
      const coordinates = getShelfCoords(shelfDraftProps);
      if (coordinates) {
        const newShelf: Shelf = {
          id: uniqueId(),
          coordinates,
          color,
        };
        addShelf(newShelf);
        setColor(Konva.Util.getRandomColor());

        updateZoomLayer(coordinates[0]);
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
    layerRef,
    zoomBoxRef,
    previewImage,
  };
};

import './shelves.css';
import { ShelvesCanvas } from './components/ShelvesCanvas/ShelvesCanvas';
import { Dimensions, ShelvesDefinition } from './types';
import ShelvesProvider from './Providers/ShelvesContextProvider';
import { useEffect, useRef, useState } from 'react';

type Props = {
  shelvesDefinition: ShelvesDefinition;
  imgUrl: string;
  onChange: (shelvesDefinition: ShelvesDefinition) => void;
  zoomFactor?: number;
};

export const Shelves = ({
  shelvesDefinition,
  imgUrl,
  onChange,
  zoomFactor,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  // To allow various sizes of images to be used, we're setting
  // dimensions based on image size and max-height / max-width
  // this image is hidden by the CSS, and we set canvas background to enable zoom feature
  useEffect(() => {
    if (imgUrl && isImageLoaded && containerRef.current) {
      const [containerPosition] = containerRef.current.getClientRects() || [];

      setDimensions({
        height: containerPosition.height,
        width: containerPosition.width,
      });
    }
  }, [isImageLoaded, imgUrl, loadedCount]);

  return (
    <ShelvesProvider shelvesDefinition={shelvesDefinition} onChange={onChange}>
      <div className="shelves-container" ref={containerRef}>
        <img
          src={imgUrl}
          alt="shelf image"
          onLoad={() => {
            setIsImageLoaded(true);
            setLoadedCount((previousState) => previousState + 1);
          }}
        />
        {!!dimensions && (
          <ShelvesCanvas
            imageUrl={imgUrl}
            dimensions={dimensions}
            zoomFactor={zoomFactor}
          />
        )}
      </div>
    </ShelvesProvider>
  );
};

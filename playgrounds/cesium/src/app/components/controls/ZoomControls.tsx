/* eslint-disable jsx-a11y/anchor-is-valid */
import { ReactNode } from 'react';
import { useCesium } from 'resium';

type ZoomControlsProps = {
  children?: ReactNode;
  role?: string;
  ariaLabel?: string;
  viewer?: any;
};

const MOVERATE_FACTOR = 0.1;

const ZoomControls = (props: ZoomControlsProps) => {
  const { viewer } = useCesium();

  const handleZoomIn = (event: Event) => {
    event.preventDefault();
    console.log('handleZoomIn', viewer);
    if (!viewer) return;
    const scene = viewer.scene;
    const camera = viewer.camera;
    const ellipsoid = scene.globe.ellipsoid;

    const cameraHeight = ellipsoid.cartesianToCartographic(
      camera.position
    ).height;
    const moveRate = cameraHeight * MOVERATE_FACTOR;
    camera.moveForward(moveRate);
  };

  const handleZoomOut = (event: Event) => {
    event.preventDefault();
    if (!viewer) return;
    const scene = viewer.scene;
    const camera = viewer.camera;
    const ellipsoid = scene.globe.ellipsoid;

    const cameraHeight = ellipsoid.cartesianToCartographic(
      camera.position
    ).height;
    const moveRate = cameraHeight * MOVERATE_FACTOR;
    camera.moveBackward(moveRate);
  };

  return (
    <div className="leaflet-control-zoom leaflet-bar leaflet-control">
      <a
        className="leaflet-control-zoom-in"
        href="#"
        title="Vergrößern"
        aria-label="Vergrößern"
        onClick={handleZoomIn}
      >
        +
      </a>
      <a
        className="leaflet-control-zoom-out"
        href="#"
        title="Verkleinern"
        aria-label="Verkleinern"
        onClick={handleZoomOut}
      >
        −
      </a>
    </div>
  );
};

export default ZoomControls;

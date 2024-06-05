import { MouseEvent, ReactNode } from 'react';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCesium } from 'resium';
import OnMapButton from './OnMapButton';
import { Cartesian3, Cartographic, Math, defined, Cartesian2 } from 'cesium';

type CompassProps = {
  children?: ReactNode;
};

export const Compass = (props: CompassProps) => {
  const { viewer } = useCesium();

  const handleFlyToCenter = (e: MouseEvent) => {
    e.preventDefault();
    if (viewer) {
      const center = viewer.camera.pickEllipsoid(
        new Cartesian2(
          viewer.canvas.clientWidth / 2,
          viewer.canvas.clientHeight / 2
        )
      );
      if (defined(center)) {
        const cartographic = Cartographic.fromCartesian(center);
        const longitude = Math.toDegrees(cartographic.longitude);
        const latitude = Math.toDegrees(cartographic.latitude);
        viewer.camera.flyTo({
          destination: Cartesian3.fromDegrees(longitude, latitude, 1000), // 1000 is the height above the ground
          orientation: {
            heading: Math.toRadians(0), // facing north
            pitch: Math.toRadians(-90), // looking straight down
            roll: 0.0,
          },
        });
      }
    }
  };

  return (
    <OnMapButton title="Einnorden" onClick={handleFlyToCenter}>
      <FontAwesomeIcon icon={faCompass}></FontAwesomeIcon>
    </OnMapButton>
  );
};

export default Compass;

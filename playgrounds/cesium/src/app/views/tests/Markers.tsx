import { useCesium } from 'resium';
import MarkerContainer, {
  ASSETS,
} from '../../components/CesiumMarkerContainer';
import { Viewer } from 'cesium';
import { useEffect } from 'react';

function View() {
  const { viewer } = useCesium();
  // start animating scene by starting clock

  useEffect(() => {
    if (viewer) {
      viewer.clock.startTime = viewer.clock.currentTime;
      viewer.clock.shouldAnimate = true;
    }
  }, [viewer]);

  return (
    <MarkerContainer
      markerData={[
        { position: [7.2, 51.274, 200] },
        { position: [7.2, 51.273, 200] },
        { position: [7.2, 51.272, 200] },

        { position: [7.201, 51.274, 200], model: ASSETS.Marker },
        { position: [7.201, 51.273, 200], model: ASSETS.Marker },
        { position: [7.201, 51.272, 200], model: ASSETS.Marker },

        // { position: [7.202, 51.268, 200], model: ASSETS.MarkerRotatingFixed },
        { position: [7.202, 51.270, 250], model: ASSETS.MarkerFacingFixed },

        { position: [7.202, 51.274, 200], model: ASSETS.MarkerRotating },
        { position: [7.202, 51.273, 200], model: ASSETS.MarkerRotatingFast },
        { position: [7.202, 51.272, 200], model: ASSETS.MarkerRotatingSlow },
        { position: [7.202, 51.271, 200], model: ASSETS.MarkerRotatingCounter },

        { position: [7.203, 51.274, 200], model: ASSETS.MarkerFacing },
        { position: [7.203, 51.273, 200], model: ASSETS.MarkerFacing },
        { position: [7.203, 51.272, 200], model: ASSETS.MarkerFacing },

        { position: [7.137755, 51.223535, 270], model: ASSETS.Wind },
        { position: [7.20028, 51.27174, 155], model: ASSETS.Wind },
      ]}
    />
  );
}

export default View;

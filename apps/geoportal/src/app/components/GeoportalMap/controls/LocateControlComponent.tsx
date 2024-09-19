import { useEffect, useContext, useState } from "react";
import type LocateControl from "leaflet.locatecontrol";
import { TopicMapContext } from "react-cismap/contexts/TopicMapContextProvider";
import L from "leaflet";

const LocateControlComponent = ({ startLocate = 0 }) => {
  const { routedMapRef } = useContext<typeof TopicMapContext>(
    TopicMapContext,
  ) as any;
  const [locationInstance, setLocationInstance] =
    useState<LocateControl | null>(null);

  useEffect(() => {
    if (!locationInstance && routedMapRef) {
      const mapExample = routedMapRef.leafletMap.leafletElement;
      const lc = (L.control as LocateControl)
        .locate({
          position: "topright",
          locateOptions: {
            enableHighAccuracy: true,
          },
          showCompass: true,
          setView: "untilPan",
          keepCurrentZoomLevel: "true",
          flyTo: false,
          drawCircle: true,
        })
        .addTo(mapExample);
      setLocationInstance(lc);
    }

    // return () => {
    //   lc.remove();
    // };
  }, [routedMapRef]);

  useEffect(() => {
    if (startLocate && locationInstance) {
      locationInstance.start();
    }
  }, [startLocate]);

  return null;
};

export default LocateControlComponent;

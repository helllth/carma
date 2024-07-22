import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
import 'leaflet/dist/leaflet.css';
import CismapLayer from 'react-cismap/CismapLayer';

const Map = ({ layer }) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setHeight(wrapperRef.current.clientHeight);
        setWidth(wrapperRef.current.clientWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-full w-full" ref={wrapperRef}>
      <TopicMapComponent
        hamburgerMenu={false}
        locatorControl={false}
        fullScreenControl={false}
        mapStyle={{ width, height }}
        leafletMapProps={{ editable: true }}
        minZoom={5}
        gazetteerSearchControl={false}
      >
        {layer && (
          <CismapLayer
            key={layer.name}
            url={layer.url}
            maxZoom={26}
            layers={layer.name}
            format="image/png"
            tiled={true}
            transparent="true"
            pane="additionalLayers1"
            opacity={0.7}
            type={'wmts'}
          />
        )}
      </TopicMapComponent>
    </div>
  );
};

export default Map;

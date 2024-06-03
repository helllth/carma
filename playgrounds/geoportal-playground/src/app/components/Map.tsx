import { useEffect, useRef, useState, useContext } from 'react';
// @ts-ignore
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
// @ts-ignore
import { getGazData } from '../helper/helper';
import { useSelector } from 'react-redux';
// @ts-ignore
import { getMode } from './../store/slices/ui';
import InfoBoxMeasurement from './map-measure/InfoBoxMeasurement';
import { getLayers } from '../store/slices/mapping';
import LayerWrapper from './layers/LayerWrapper';

const Map = () => {
  const [gazData, setGazData] = useState([]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mode = useSelector(getMode);
  const layers = useSelector(getLayers);

  useEffect(() => {
    getGazData(setGazData);
  }, []);

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
  }, [mode]);

  return (
    <div className="h-full w-full" ref={wrapperRef}>
      <TopicMapComponent
        gazData={gazData}
        hamburgerMenu={false}
        locatorControl={true}
        mapStyle={{ width, height }}
        leafletMapProps={{ editable: true }}
        mappingBoundsChanged={(boundingbox) => {
          // console.log('xxx bbox', createWMSBbox(boundingbox));
        }}
        gazetteerSearchPlaceholder="Stadtteil | Adresse | POI"
        infoBox={<InfoBoxMeasurement />}
      >
        <LayerWrapper />
        {layers.map((layer) => layer.layer)}
      </TopicMapComponent>
    </div>
  );
};

export default Map;

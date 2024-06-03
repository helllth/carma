import { useEffect, useRef, useState, useContext } from 'react';
// @ts-ignore
import StyledWMSTileLayer from 'react-cismap/StyledWMSTileLayer';
// @ts-ignore
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
// @ts-ignore
// @ts-ignore
import FeatureCollection from 'react-cismap/FeatureCollection';
// @ts-ignore
import { getGazData } from '../helper/helper';
import { useSelector } from 'react-redux';
// @ts-ignore
import { getMode } from './../store/slices/ui';
import InfoBoxMeasurement from './map-measure/InfoBoxMeasurement';
import { getLayers } from '../store/slices/mapping';
import LayerButton from './layers/LayerButton';

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
        <div className="absolute left-20 top-2.5 z-[999] flex gap-2">
          {layers.map((layer) => (
            <LayerButton title={layer.title} id={layer.id} />
          ))}
        </div>
        {layers.map((layer) => layer.layer)}
      </TopicMapComponent>
    </div>
  );
};

export default Map;

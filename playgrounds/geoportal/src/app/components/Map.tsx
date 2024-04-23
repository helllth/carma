import { useContext, useEffect, useRef, useState } from 'react';
// @ts-ignore
import StyledWMSTileLayer from 'react-cismap/StyledWMSTileLayer';
// @ts-ignore
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
// @ts-ignore
import { FeatureCollectionDispatchContext } from 'react-cismap/contexts/FeatureCollectionContextProvider';
// @ts-ignore
import FeatureCollection from 'react-cismap/FeatureCollection';
// @ts-ignore
import { getGazData } from '../helper/helper';
import { useSelector } from 'react-redux';
// @ts-ignore
import { getMode } from './../store/slices/ui';

const Map = () => {
  const [gazData, setGazData] = useState([]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mode = useSelector(getMode);

  // @ts-ignore
  const { setSelectedFeatureByPredicate } = useContext(
    FeatureCollectionDispatchContext
  );

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
        gazetteerSearchPlaceholder="Stadtteil | Adresse | POI"
        gazetteerHitTrigger={(hits: any) => {
          if (
            (Array.isArray(hits) && hits[0]?.more?.pid) ||
            hits[0]?.more?.kid
          ) {
            const gazId = hits[0]?.more?.pid || hits[0]?.more?.kid;
            setSelectedFeatureByPredicate(
              (feature: any) => feature.properties.id === gazId
            );
          }
        }}
      >
        <StyledWMSTileLayer
          {...{
            type: 'wmts',
            url: 'https://geodaten.metropoleruhr.de/spw2/service',
            layers: 'spw2_light_grundriss',
            version: '1.3.0',
            tileSize: 512,
            transparent: true,
            opacity: 0.3,
          }}
        ></StyledWMSTileLayer>
        <FeatureCollection></FeatureCollection>
      </TopicMapComponent>
    </div>
  );
};

export default Map;

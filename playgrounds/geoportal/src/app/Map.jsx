import StyledWMSTileLayer from 'react-cismap/StyledWMSTileLayer';
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
import { getGazData } from './helper/helper';
import { FeatureCollectionDispatchContext } from 'react-cismap/contexts/FeatureCollectionContextProvider';
import { useContext, useEffect, useState } from 'react';
import FeatureCollection from 'react-cismap/FeatureCollection';

const Map = () => {
  const [gazData, setGazData] = useState([]);

  const { setSelectedFeatureByPredicate } = useContext(
    FeatureCollectionDispatchContext
  );

  useEffect(() => {
    getGazData(setGazData);
  }, []);

  return (
    <TopicMapComponent
      gazData={gazData}
      locatorControl={true}
      gazetteerSearchPlaceholder="Stadtteil | Adresse | POI"
      gazetteerHitTrigger={(hits) => {
        if ((Array.isArray(hits) && hits[0]?.more?.pid) || hits[0]?.more?.kid) {
          const gazId = hits[0]?.more?.pid || hits[0]?.more?.kid;
          console.log(gazId);
          setSelectedFeatureByPredicate(
            (feature) => feature.properties.id === gazId
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
  );
};

export default Map;

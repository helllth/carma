import { useEffect, useRef, useState } from 'react';

import ProjSingleGeoJson from 'react-cismap/ProjSingleGeoJson';
import { getGazDataForTopicIds } from 'react-cismap/tools/gazetteerHelper';
import SearchComponent from './components/SearchComponent.jsx';
import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';

import GazetteerHitDisplay from 'react-cismap/GazetteerHitDisplay';
import GazetteerSearchComponent from 'react-cismap/GazetteerSearchComponent';
import GenericInfoBoxFromFeature from 'react-cismap/topicmaps/GenericInfoBoxFromFeature';
import FeatureCollection from 'react-cismap/FeatureCollection';
import { MappingConstants, RoutedMap } from 'react-cismap';
import { md5FetchText, fetchJSON } from 'react-cismap/tools/fetching';

const host = 'https://wupp-topicmaps-data.cismet.de';

export const getGazData = async (
  setGazData,
  topics = [
    'bpklimastandorte',
    'pois',
    'kitas',
    'bezirke',
    'quartiere',
    'adressen',
  ]
) => {
  const prefix = 'GazDataForStories';
  const sources: any = {};

  sources.adressen = await md5FetchText(
    prefix,
    host + '/data/3857/adressen.json'
  );
  sources.bezirke = await md5FetchText(
    prefix,
    host + '/data/3857/bezirke.json'
  );
  sources.quartiere = await md5FetchText(
    prefix,
    host + '/data/3857/quartiere.json'
  );
  sources.pois = await md5FetchText(prefix, host + '/data/3857/pois.json');
  sources.kitas = await md5FetchText(prefix, host + '/data/3857/kitas.json');
  sources.bpklimastandorte = await md5FetchText(
    prefix,
    host + '/data/3857/bpklimastandorte.json'
  );
  // sources.no2 = await md5FetchText(prefix, host + "/data/3857/no2.json");

  const gazData = getGazDataForTopicIds(sources, topics);

  setGazData(gazData);
};

export function App() {
  const mapStyle = {
    height: 600,
    cursor: 'pointer',
  };
  let urlSearchParams = new URLSearchParams(window.location.href);
  const mapRef = useRef(null);
  const [gazetteerHit, setGazetteerHit] = useState(null);
  const [overlayFeature, setOverlayFeature] = useState(null);
  const [gazData, setGazData] = useState([]);
  useEffect(() => {
    const res = getGazData(setGazData);
  }, []);

  useEffect(() => {
    console.log('hit', gazetteerHit);
  }, [gazetteerHit]);
  useEffect(() => {
    console.log('hit oveyrlay', overlayFeature);
  }, [overlayFeature]);

  return (
    <TopicMapContextProvider featureItemsURL="/data/parkscheinautomatenfeatures.json">
      <TopicMapComponent
        gazData={gazData}
        infoBox={
          <GenericInfoBoxFromFeature
            config={{
              city: 'Wuppertal',
              header: 'Parkscheinautomat',
              navigator: {
                noun: {
                  singular: 'Parkscheinautomat',
                  plural: 'Parkscheinautomaten',
                },
              },
              noCurrentFeatureTitle: 'Keine Parkscheinautomaten gefunden',
              noCurrentFeatureContent: '',
            }}
          />
        }
        gazetteerSearchComponent={SearchComponent}
        _gazetteerSearchComponent={GazetteerSearchComponent}
        // _gazetteerSearchComponent={({ pixelwidth }) => {
        //   return (
        //     <div style={{ width: pixelwidth }}>
        //       <input style={{ width: pixelwidth }}></input>
        //     </div>
        //   );
        // }}
      >
        <FeatureCollection />
      </TopicMapComponent>
    </TopicMapContextProvider>
  );
}

export default App;

import { useEffect } from 'react';

import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-cismap/topicMaps.css';
import { md5FetchText, fetchJSON } from 'react-cismap/tools/fetching';
import { getGazDataForTopicIds } from 'react-cismap/tools/gazetteerHelper';

import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';
import { getClusterIconCreatorFunction } from 'react-cismap/tools/uiHelper';
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
import FeatureCollection from 'react-cismap/FeatureCollection';
import GenericInfoBoxFromFeature from 'react-cismap/topicmaps/GenericInfoBoxFromFeature';
import getGTMFeatureStyler from 'react-cismap/topicmaps/generic/GTMStyler';
import { MappingConstants } from 'react-cismap';
import queryString from 'query-string';
import CrossTabCommunicationContextProvider from 'react-cismap/contexts/CrossTabCommunicationContextProvider';
import CismapLayer from 'react-cismap/CismapLayer';
import InfoBox from 'react-cismap/topicmaps/InfoBox';
import { getActionLinksForFeature } from 'react-cismap/tools/uiHelper';
const host = 'https://wupp-topicmaps-data.cismet.de';

const getGazData = async (setGazData) => {
  const prefix = 'GazDataForStories';
  const sources = {};

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

  const gazData = getGazDataForTopicIds(sources, [
    'pois',
    'kitas',
    'bezirke',
    'quartiere',
    'adressen',
  ]);

  setGazData(gazData);
};

function App({ vectorStyles = [] }) {
  const [syncToken, setSyncToken] = useState(null);
  const [layers, setLayers] = useState('');
  useEffect(() => {
    const params = queryString.parse(window.location.hash);

    if (params.sync) {
      setSyncToken(params.sync);
    }
    if (params.layers) {
      setLayers(params.layers);
    }
  }, []);

  const backgroundConfigurations = {
    stadtplan: {
      layerkey: 'wupp-plan-live',
      src: '/images/rain-hazard-map-bg/citymap.png',
      title: 'Stadtplan',
    },
    lbk: {
      layerkey: 'trueOrtho2020@75|OMT_Klokantech_basic@50',
      src: '/images/rain-hazard-map-bg/ortho.png',
      title: 'Luftbildkarte',
    },
    basemap: {
      layerkey: 'basemap_relief@10',
      src: '/images/rain-hazard-map-bg/citymap.png',
      title: 'basemap',
    },

    vector1: {
      layerkey: 'OMT_Klokantech_basic@100',
      src: '/images/rain-hazard-map-bg/citymap.png',
      title: 'Stadtplan',
    },
    vector2: {
      layerkey: 'OMT_OSM_bright@100',
      src: '/images/rain-hazard-map-bg/citymap.png',
      title: 'Stadtplan',
    },
  };
  const backgroundModes = [
    {
      title: 'Vektorbasierter Layer (Basemap.de)',
      mode: 'default',
      layerKey: 'basemap',
    },
    {
      title: 'Vektorbasierter Layer (OSM bright)',
      mode: 'default',
      layerKey: 'vector2',
    },
    {
      title: 'Stadtplan (RVR, zum Vergleich)',
      mode: 'default',
      layerKey: 'stadtplan',
    },
    { title: 'Luftbildkarte', mode: 'default', layerKey: 'lbk' },
  ];

  const content = (
    <TopicMapContextProvider
      appKey="VectorPlaygroundWuppertal.TopicMap"
      backgroundConfigurations={backgroundConfigurations}
      backgroundModes={backgroundModes}
      referenceSystem={MappingConstants.crs3857}
      referenceSystemDefinition={MappingConstants.proj4crs3857def}
    >
      <Map layers={layers} vectorStyles={vectorStyles} />
    </TopicMapContextProvider>
  );
  console.log('xxx sycn', syncToken);

  return syncToken ? (
    <CrossTabCommunicationContextProvider role="sync" token={syncToken}>
      {content}
    </CrossTabCommunicationContextProvider>
  ) : (
    content
  );
}

export default App;

const Map = ({ layers, vectorStyles }) => {
  const [gazData, setGazData] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(undefined);
  let links = [];
  if (selectedFeature) {
    links = getActionLinksForFeature(selectedFeature, {});
  }
  useEffect(() => {
    getGazData(setGazData);
  }, []);
  return (
    <TopicMapComponent
      maxZoom={22}
      gazData={gazData}
      locatorControl={true}
      infoBox={
        selectedFeature && (
          <InfoBox
            currentFeature={selectedFeature}
            hideNavigator={true}
            header="kjshd"
            pixelwidth={300}
            headerColor="#ff0000"
            {...selectedFeature?.properties?.info}
            noCurrentFeatureTitle="nix da"
            noCurrentFeatureContent="nix da"
            links={links}
          />
        )
      }
    >
      {vectorStyles.map((style, index) => {
        return (
          <CismapLayer
            {...{
              type: 'vector',
              style: style,
              pane: 'additionalLayers' + index,
              opacity: 1,
              maxSelectionCount: 1,
              onSelectionChanged: (e) => {
                console.log('xxx selectionChanged', e);
                const selectedFeature = e.hits[0];
                const p = selectedFeature.properties;
                console.log('xxx p', p);

                const identifications = JSON.parse(p.identifications);
                const mainlocationtype = identifications[0].identification;
                const info = {
                  title: p.geographicidentifier,
                  // additionalInfo: "bbb",
                  subtitle: p.strasse,
                  headerColor: p.schrift,
                  header: mainlocationtype,
                };
                selectedFeature.properties.info = info;
                selectedFeature.properties.url = p.url;
                selectedFeature.properties.email = '';
                selectedFeature.properties.tel = p.telefon;

                setSelectedFeature(selectedFeature);
              },
            }}
          />
        );
      })}
    </TopicMapComponent>
  );
};

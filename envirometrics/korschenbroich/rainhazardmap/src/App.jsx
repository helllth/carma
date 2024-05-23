import React, { useEffect, useState } from 'react';
import { MappingConstants } from 'react-cismap';
import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';
import { md5FetchText } from 'react-cismap/tools/fetching';
import HeavyRainHazardMap from '@cismet-dev/react-cismap-envirometrics-maps/HeavyRainHazardMap';
import GenericModalApplicationMenu from 'react-cismap/topicmaps/menu/ModalApplicationMenu';
import { getGazDataForTopicIds } from 'react-cismap/tools/gazetteerHelper';
import { md5FetchJSON } from 'react-cismap/tools/fetching';
import CrossTabCommunicationControl from 'react-cismap/CrossTabCommunicationControl';
import CrossTabCommunicationContextProvider from 'react-cismap/contexts/CrossTabCommunicationContextProvider';
import config from './config';
import { getApplicationVersion } from './version';
import NotesDisplay from './NotesDisplay';
import { getCollabedHelpComponentConfig } from './collab-texts';

function App() {
  const email = 'starkregen@stadt.korschenbroich.de';
  const [gazData, setGazData] = useState([]);
  const [hinweisData, setHinweisData] = useState([]);
  const version = getApplicationVersion();

  const getHinweisData = async (setHinweisData, url) => {
    const prefix = 'HinweisDataForStarkregengefahrenkarteByCismet';
    const data = await md5FetchJSON(prefix, url);

    const features = [];
    let id = 1;
    for (const d of data) {
      features.push({
        type: 'Feature',
        id: id++,
        properties: d,
        geometry: d.geojson,
        crs: {
          type: 'name',
          properties: {
            name: 'urn:ogc:def:crs:EPSG::25832',
          },
        },
      });
    }
    console.log('yy hinweisData', features);

    setHinweisData(features || []);
  };

  useEffect(() => {
    // getGazData(setGazData);
    // getHinweisData(setHinweisData, config.config.hinweisDataUrl);
  }, []);

  return (
    <TopicMapContextProvider
      appKey={'cismetRainhazardMap.Korschenbroich'}
      referenceSystem={MappingConstants.crs3857}
      referenceSystemDefinition={MappingConstants.proj4crs3857def}
      infoBoxPixelWidth={370}
      baseLayerConf={config.overridingBaseLayerConf}
    >
      <HeavyRainHazardMap
        applicationMenuTooltipString="Anleitung | Hintergrund"
        appMenu={
          <GenericModalApplicationMenu
            {...getCollabedHelpComponentConfig({
              versionString: '#' + version,
              reactCismapRHMVersion: '_',

              email,
            })}
          />
        }
        gazetteerSearchPlaceholder="Stadtteil | Adresse | POI | GEP"
        emailaddress={email}
        initialState={config.initialState}
        config={config.config}
        homeZoom={17}
        homeCenter={[51.159716445861676, 6.578933000564575]}
        modeSwitcherTitle="Starkregengefahrenkarte"
        documentTitle="AIS Korschenbroich"
        gazData={gazData}
      >
        <NotesDisplay hinweisData={hinweisData} />
      </HeavyRainHazardMap>
    </TopicMapContextProvider>
  );
}

export default App;

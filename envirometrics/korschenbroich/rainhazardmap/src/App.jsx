import React, { useEffect, useState } from 'react';
import { MappingConstants } from 'react-cismap';
import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';
import HeavyRainHazardMap from '@cismet-dev/react-cismap-envirometrics-maps/HeavyRainHazardMap';
import GenericModalApplicationMenu from 'react-cismap/topicmaps/menu/ModalApplicationMenu';
import { md5FetchJSON } from 'react-cismap/tools/fetching';
import config from './config';
import { getApplicationVersion } from './version';
// import NotesDisplay from './NotesDisplay';
import { getCollabedHelpComponentConfig } from './collab-texts';

function App() {
  const email = 'yvonne.tuerks@korschenbroich.de';
  const [gazData, setGazData] = useState([]);
  const version = getApplicationVersion();
  const getGazData = async (setGazData, url) => {
    const prefix = 'GazDataForStarkregengefahrenkarteByCismet';
    const data = await md5FetchJSON(prefix, url);
    setGazData(data || []);
  };

  useEffect(() => {
    getGazData(setGazData, '/data/adressen_korschenbroich.json');
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
        emailaddress={email}
        initialState={config.initialState}
        config={config.config}
        homeZoom={17}
        homeCenter={[51.159716445861676, 6.578933000564575]}
        modeSwitcherTitle="AIS Starkregenvorsorge Korschenbroich"
        documentTitle="AIS Korschenbroich"
        gazData={gazData}
      >
        {/* <NotesDisplay hinweisData={hinweisData} /> */}
      </HeavyRainHazardMap>
    </TopicMapContextProvider>
  );
}

export default App;

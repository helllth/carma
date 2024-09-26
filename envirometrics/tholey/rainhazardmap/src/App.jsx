import HeavyRainHazardMap from "@cismet-dev/react-cismap-rainhazardmaps/HeavyRainHazardMap";

import React, { useEffect, useState } from "react";
import { MappingConstants } from "react-cismap";
import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import { md5FetchJSON } from "react-cismap/tools/fetching";

import GenericModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";

import { version as cismapRHMVersion } from "@cismet-dev/react-cismap-rainhazardmaps/meta";

import config from "./config";
import { getApplicationVersion } from "./version";
import { getCollabedHelpComponentConfig } from "@cismet-collab/rhm-tholey-texts";

function App() {
  const reactCismapRHMVersion = cismapRHMVersion;

  const email = "bauamt@tholey.de";
  const [gazData, setGazData] = useState([]);

  const getGazData = async (setGazData, url) => {
    const prefix = "GazDataForStarkregengefahrenkarteByCismet";
    const data = await md5FetchJSON(prefix, url);
    setGazData(data);
  };
  useEffect(() => {
    getGazData(setGazData, "data/adressen_tholey.json");
  }, []);
  const version = getApplicationVersion();

  return (
    <TopicMapContextProvider
      appKey={"cismetRainhazardMap.Tholey"}
      referenceSystem={MappingConstants.crs3857}
      referenceSystemDefinition={MappingConstants.proj4crs3857def}
      baseLayerConf={config.overridingBaseLayerConf}
      infoBoxPixelWidth={370}
      uiContextEnabled={true}
    >
      <HeavyRainHazardMap
        appMenu={
          <GenericModalApplicationMenu
            {...getCollabedHelpComponentConfig({
              version,
              reactCismapRHMVersion,
              email,
            })}
          />
        }
        emailaddress={email}
        applicationMenuTooltipString="Anleitung | Hintergrund"
        initialState={config.initialState}
        config={config.config}
        homeZoom={15}
        homeCenter={[49.483, 7.033]}
        modeSwitcherTitle="Starkregengefahrenkarte Tholey"
        documentTitle="Starkregengefahrenkarte Tholey"
        gazetteerSearchPlaceholder="Adresssuche"
        gazData={gazData}
      ></HeavyRainHazardMap>
    </TopicMapContextProvider>
  );
}

export default App;

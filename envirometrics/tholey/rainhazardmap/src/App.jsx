import React, { useEffect, useState } from "react";
import HeavyRainHazardMap from "@cismet-dev/react-cismap-envirometrics-maps/HeavyRainHazardMap";
import { MappingConstants } from "react-cismap";
import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import { md5FetchJSON } from "react-cismap/tools/fetching";
import GenericModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";
import config from "./config";
import versionData from "./version.json";
import { getApplicationVersion } from "@carma-commons/utils";
import { getCollabedHelpComponentConfig } from "./getCollabedHelpComponentConfig";

function App() {
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
  const version = getApplicationVersion(versionData);

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
              reactCismapRHMVersion: "_",
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

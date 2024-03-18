import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { MappingConstants } from 'react-cismap';
import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';

import convertItemToFeature, {
  getConvertItemToFeatureWithPOIColors,
} from './helper/convertItemToFeature';
import createItemsDictionary from './helper/createItemsDistionary';
import itemFilterFunction from './helper/filter';
import { getPOIColors } from './helper/helper';
import { ehrenAmtClusterIconCreator, getFeatureStyler } from './helper/styler';
import titleFactory from './helper/titleFactory';
import Ehrenamtkarte from './Ehrenamtkarte';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-cismap/topicMaps.css';
if (typeof global === 'undefined') {
  window.global = window;
}

function App() {
  const [poiColors, setPoiColors] = useState();

  useEffect(() => {
    getPOIColors(setPoiColors);
    document.title = 'Ehrenamtskarte Wuppertal';
  }, []);
  if (poiColors) {
    return (
      <TopicMapContextProvider
        appKey="OnlineEhrenamtskarteWuppertal2022"
        featureItemsURL={
          'https://wupp-topicmaps-data.cismet.de/ehrenamt/data.json'
        }
        referenceSystemDefinition={MappingConstants.proj4crs25832def}
        mapEPSGCode="25832"
        referenceSystem={MappingConstants.crs25832}
        getFeatureStyler={getFeatureStyler}
        featureTooltipFunction={(feature) => feature?.text}
        convertItemToFeature={convertItemToFeature}
        clusteringOptions={{
          iconCreateFunction: ehrenAmtClusterIconCreator,
        }}
        titleFactory={titleFactory}
        itemFilterFunction={itemFilterFunction}
        additionalStylingInfo={{ poiColors }}
      >
        <Ehrenamtkarte poiColors={poiColors} />
      </TopicMapContextProvider>
    );
  } else {
    return <div>loading</div>;
  }
}

export default App;

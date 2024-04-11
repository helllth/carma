import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';

import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-cismap/topicMaps.css';
import { MappingConstants } from 'react-cismap';
import Map from './Map';
import { useState } from 'react';
import { getConvertItemToFeatureWithPOIColors } from './helper/convertItemToFeature';
if (typeof global === 'undefined') {
  window.global = window;
}

function App() {
  const [poiColors, setPoiColors] = useState();

  return (
    <TopicMapContextProvider
      mapEPSGCode="25832"
      referenceSystem={MappingConstants.crs25832}
      referenceSystemDefinition={MappingConstants.proj4crs25832def}
      convertItemToFeature={getConvertItemToFeatureWithPOIColors(poiColors)}
    >
      <Map />
    </TopicMapContextProvider>
  );
}

export default App;

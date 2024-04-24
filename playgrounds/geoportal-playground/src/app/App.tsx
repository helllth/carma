import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-cismap/topicMaps.css';
import './App.css';
import './index.css';
// @ts-ignore
import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';
// @ts-ignore
import { useState } from 'react';
// @ts-ignore
import { MappingConstants } from 'react-cismap';
// @ts-ignore
import Map from './components/Map';
// @ts-ignore
import { getConvertItemToFeatureWithPOIColors } from './helper/convertItemToFeature';
import TopNavbar from './components/TopNavbar';
if (typeof global === 'undefined') {
  window.global = window;
}

function App() {
  const [poiColors, setPoiColors] = useState();

  return (
    <TopicMapContextProvider
      convertItemToFeature={getConvertItemToFeatureWithPOIColors(poiColors)}
    >
      <div className="flex flex-col h-screen w-full">
        <TopNavbar />

        <Map />
      </div>
    </TopicMapContextProvider>
  );
}

export default App;

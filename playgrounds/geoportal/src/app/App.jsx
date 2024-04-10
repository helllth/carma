import React from 'react';
import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';

import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-cismap/topicMaps.css';
import StyledWMSTileLayer from 'react-cismap/StyledWMSTileLayer';
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
if (typeof global === 'undefined') {
  window.global = window;
}

function App() {
  return (
    <TopicMapContextProvider>
      <TopicMapComponent gazData={[]}>
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
      </TopicMapComponent>
    </TopicMapContextProvider>
  );
}

export default App;

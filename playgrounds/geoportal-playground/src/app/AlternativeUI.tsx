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
import Map from './components/Map';
// @ts-ignore
import StyledWMSTileLayer from 'react-cismap/StyledWMSTileLayer';
import AlternativeTopNavbar from './components/AlternativeTopNavbar';
import BottomNavbar from './components/BottomNavbar';
if (typeof global === 'undefined') {
  window.global = window;
}

const AlternativeUI = () => {
  const [poiColors, setPoiColors] = useState();

  return (
    <TopicMapContextProvider>
      <div className="flex flex-col h-screen w-full">
        <AlternativeTopNavbar />

        <Map />

        <BottomNavbar />
      </div>
    </TopicMapContextProvider>
  );
};

export default AlternativeUI;

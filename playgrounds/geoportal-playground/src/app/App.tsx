import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-cismap/topicMaps.css';
import './App.css';
import './index.css';
// @ts-ignore
import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';
// @ts-ignore
import Map from './components/Map';
import TopNavbar from './components/TopNavbar';
import MapMeasurement from './components/map-measure/MapMeasurement';
import { defaultLayerConf } from 'react-cismap/tools/layerFactory';
if (typeof global === 'undefined') {
  window.global = window;
}

function App() {
  const baseLayerConf = { ...defaultLayerConf };
  const backgroundConfigurations = {
    amtlich: {
      layerkey: 'wupp-plan-live@90',
      src: '/images/rain-hazard-map-bg/citymap.png',
      title: 'Amtlich',
    },
    topographisch: {
      layerkey: 'basemap_relief@40',
      src: '/images/rain-hazard-map-bg/citymap.png',
      title: 'Basemap.de (Relief)',
    },
    luftbild: {
      layerkey: 'rvrGrundriss@100|trueOrtho2022@75|rvrSchriftNT@100',
      src: '/images/rain-hazard-map-bg/citymap.png',
      title: 'Luftbild',
    },
  };

  return (
    <TopicMapContextProvider
      baseLayerConf={baseLayerConf}
      backgroundConfigurations={backgroundConfigurations}
    >
      <div className="flex flex-col h-screen w-full">
        <TopNavbar />
        <MapMeasurement />
        <Map />
      </div>
    </TopicMapContextProvider>
  );
}

export default App;

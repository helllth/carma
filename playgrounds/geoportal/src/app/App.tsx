import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-cismap/topicMaps.css';
// @ts-ignore
import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';
// @ts-ignore
import { MappingConstants } from 'react-cismap';
import { useState } from 'react';
// @ts-ignore
import { getConvertItemToFeatureWithPOIColors } from './helper/convertItemToFeature';
import Map from './components/Map';
// @ts-ignore
import StyledWMSTileLayer from 'react-cismap/StyledWMSTileLayer';
import TopNavbar from './components/TopNavbar';
import BottomNavbar from './components/BottomNavbar';
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
      additionalLayerConfiguration={{
        abt9: {
          title: <span>Abteilung 9</span>,
          initialActive: false,
          layer: (
            <StyledWMSTileLayer
              key={'abt9'}
              type="wmts"
              url="http://s10221.wuppertal-intra.de:8099/abt9_flst/services"
              layers="abt9"
              format="image/png"
              tiled="true"
              version="1.3.0"
              tileSize={256}
              transparent={true}
              opacity={0.3}
              pane="additionalLayers1"
            />
          ),
        },
        baul: {
          title: <span>Baulastnachweis</span>,
          initialActive: false,
          layer: (
            <StyledWMSTileLayer
              key={'baul'}
              type="wmts"
              url="http://s10221.wuppertal-intra.de:8056/baulasten/services"
              layers="baul"
              format="image/png"
              tiled="true"
              version="1.1.1"
              tileSize={256}
              transparent={true}
              opacity={0.3}
              pane="additionalLayers1"
            />
          ),
        },
        stadt_flurst: {
          title: <span>Städt. Flurstücke</span>,
          initialActive: false,
          layer: (
            <StyledWMSTileLayer
              key={'stadt_flurst'}
              type="wmts"
              url="http://s10221.wuppertal-intra.de:7098/stadt-flurstuecke/services"
              layers="stadt_flurst"
              format="image/png"
              tiled="true"
              version="1.1.1"
              tileSize={256}
              transparent={true}
              opacity={0.3}
              pane="additionalLayers1"
            />
          ),
        },
      }}
    >
      <div className="flex flex-col h-screen w-full">
        <TopNavbar />

        <Map />

        <BottomNavbar />
      </div>
    </TopicMapContextProvider>
  );
}

export default App;

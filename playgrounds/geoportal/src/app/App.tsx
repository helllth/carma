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
// @ts-ignore
import StyledWMSTileLayer from 'react-cismap/StyledWMSTileLayer';
import TopNavbar from './components/TopNavbar';
if (typeof global === 'undefined') {
  window.global = window;
}

function App() {
  const [poiColors, setPoiColors] = useState();
  const [additionalLayers, setAdditionalLayers] = useState<any>();

  const updateLayers = (layer: any) => {
    const url = layer.getMapUrl.substring(0, layer.getMapUrl.length - 1);
    const testLayer = {
      title: layer.title,
      layer: (
        <StyledWMSTileLayer
          key="test"
          type="wms"
          url={url}
          layers={layer.name}
        />
      ),
    };
    setAdditionalLayers({
      testLayer: {
        ...testLayer,
      },
    });
  };

  return (
    <TopicMapContextProvider
      mapEPSGCode="25832"
      referenceSystem={MappingConstants.crs25832}
      referenceSystemDefinition={MappingConstants.proj4crs25832def}
      convertItemToFeature={getConvertItemToFeatureWithPOIColors(poiColors)}
      additionalLayerConfiguration={additionalLayers}
    >
      <div className="flex flex-col h-screen w-full">
        <TopNavbar setAdditionalLayers={updateLayers} />

        <Map key={JSON.stringify(additionalLayers)} />
      </div>
    </TopicMapContextProvider>
  );
}

export default App;

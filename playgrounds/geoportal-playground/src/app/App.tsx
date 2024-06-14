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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LZString from 'lz-string';
import { useDispatch } from 'react-redux';
import { setBackgroundLayer, setLayers } from './store/slices/mapping';
import { setShowLayerHideButtons } from './store/slices/ui';
if (typeof global === 'undefined') {
  window.global = window;
}

function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [allowUiChanges, setAllowUiChanges] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get('data')) {
      const data = searchParams.get('data');
      const newConfig = JSON.parse(
        LZString.decompressFromEncodedURIComponent(data)
      );
      dispatch(setLayers(newConfig.layers));
      dispatch(setBackgroundLayer(newConfig.backgroundLayer));
      searchParams.delete('data');
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey) {
        dispatch(setShowLayerHideButtons(true));
      }
    };

    const onKeyUp = () => {
      if (allowUiChanges) {
        dispatch(setShowLayerHideButtons(false));
      }
    };

    document.addEventListener('keydown', onKeyDown);

    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);

      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <TopicMapContextProvider>
      <div className="flex flex-col h-screen w-full">
        <TopNavbar />
        <MapMeasurement />
        <Map />
      </div>
    </TopicMapContextProvider>
  );
}

export default App;

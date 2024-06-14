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
import { useDispatch, useSelector } from 'react-redux';
import {
  BackgroundLayer,
  getShowMeasurementButton,
  setBackgroundLayer,
  setLayers,
  setShowFullscreenButton,
  setShowHamburgerMenu,
  setShowLocatorButton,
  setShowMeasurementButton,
} from './store/slices/mapping';
import {
  setShowLayerButtons,
  setShowLayerHideButtons,
} from './store/slices/ui';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';
import { Settings } from './components/Share';
if (typeof global === 'undefined') {
  window.global = window;
}

type Config = {
  layers: Layer[];
  backgroundLayer: BackgroundLayer;
  settings?: Settings;
};

function App({ published }: { published?: boolean }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [allowUiChanges, setAllowUiChanges] = useState(true);
  const showMeasurementButton = useSelector(getShowMeasurementButton);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get('data')) {
      const data = searchParams.get('data');
      const newConfig: Config = JSON.parse(
        LZString.decompressFromEncodedURIComponent(data)
      );
      dispatch(setLayers(newConfig.layers));
      dispatch(setBackgroundLayer(newConfig.backgroundLayer));
      if (newConfig.settings) {
        dispatch(setShowLayerButtons(newConfig.settings.showLayerButtons));
        dispatch(setShowFullscreenButton(newConfig.settings.showFullscreen));
        dispatch(setShowLocatorButton(newConfig.settings.showLocator));
        dispatch(setShowMeasurementButton(newConfig.settings.showMeasurement));
        dispatch(setShowHamburgerMenu(newConfig.settings.showHamburgerMenu));

        if (newConfig.settings.showLayerHideButtons || published) {
          setAllowUiChanges(false);
          dispatch(setShowLayerHideButtons(true));
        }
      }
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
  }, [allowUiChanges]);

  return (
    <TopicMapContextProvider>
      <div className="flex flex-col h-screen w-full">
        {!published && <TopNavbar />}
        {showMeasurementButton && <MapMeasurement />}
        <Map />
      </div>
    </TopicMapContextProvider>
  );
}

export default App;

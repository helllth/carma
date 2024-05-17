import { createContext, useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import ViewGeoJson from './views/Geojson';
import ViewTestGeoJson from './views/TestGeojson';
import TestGeojsonWithCityGML from './views/TestGeojsonWithCityGML';

import ViewTestResium from './views/TestResium';
import ViewTestViewer from './views/TestCustomViewer';
import ViewTestTileset from './views/TestTileset';
import ViewFull from './views/Full';
import ViewMesh from './views/WithMesh';

// Cesium Styles
import 'cesium/Build/Cesium/Widgets/widgets.css';

export const SimpleAppState = createContext({
  isAnimating: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsAnimating: (value: boolean) => {},
});

const router = createHashRouter([
  { path: '/', element: <ViewGeoJson /> },
  { path: '/geojson', element: <ViewGeoJson /> },
  { path: '/full', element: <ViewFull /> },
  { path: '/mesh', element: <ViewMesh /> },

  { path: '/test/', element: <ViewTestViewer /> },
  { path: '/test/geojson', element: <ViewTestGeoJson /> },
  { path: '/test/geojsonWithCityGML', element: <TestGeojsonWithCityGML /> },
  { path: '/test/resium', element: <ViewTestResium /> },
  { path: '/test/viewer', element: <ViewTestViewer /> },
  { path: '/test/tileset', element: <ViewTestTileset /> },
]);

export function App() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <SimpleAppState.Provider value={{ isAnimating, setIsAnimating }}>
      <RouterProvider router={router} />
    </SimpleAppState.Provider>
  );
}
export default App;

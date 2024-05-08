import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  RouterProvider,
  createHashRouter,
} from 'react-router-dom';

import App from './app/App';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store from './store';
import { persistStore } from 'redux-persist';
import Map from './app/components/Map';
import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';
import convertItemToFeature from './utils/convertItemToFeature';
import { bplanFeatureStyler } from './utils/styler';

const persistor = persistStore(store);

const router = createHashRouter(
  [
    {
      path: '/docs/:docPackageId?/:file?/:page?',
      element: <App />,
    },
    {
      path: '/',
      element: <Map />,
    },
  ],
  {}
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <TopicMapContextProvider
          featureItemsURL={
            'https://wunda-geoportal.cismet.de/data/bplaene.data.json'
          }
          convertItemToFeature={convertItemToFeature}
          getFeatureStyler={bplanFeatureStyler}
        >
          <RouterProvider router={router} />
        </TopicMapContextProvider>
      </Provider>
    </PersistGate>
  </StrictMode>
);

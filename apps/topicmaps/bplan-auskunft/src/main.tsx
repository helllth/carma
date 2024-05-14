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

const originalWarn = console.warn.bind(console);
const originalError = console.error.bind(console);
console.warn = (message, ...args) => {
  if (
    !message.includes('ReactDOM.render is no longer supported in React 18') &&
    !message.includes('Legacy context API has been detected')
  ) {
    originalWarn(message, ...args);
  }
};
console.error = (message, ...args) => {
  if (
    !message.includes('ReactDOM.render is no longer supported in React 18') &&
    !message.includes('Legacy context API has been detected')
  ) {
    originalError(message, ...args);
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <TopicMapContextProvider
          // featureItemsURL={
          //   'https://wunda-geoportal.cismet.de/data/bplaene.data.json'
          // }
          convertItemToFeature={convertItemToFeature}
          // getFeatureStyler={bplanFeatureStyler}
        >
          <RouterProvider router={router} />
        </TopicMapContextProvider>
      </Provider>
    </PersistGate>
  </StrictMode>
);

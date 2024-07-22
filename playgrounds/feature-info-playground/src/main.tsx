import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
// @ts-ignore
import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';

import App from './app/App';
import store from './app/store';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <TopicMapContextProvider>
          <App />
        </TopicMapContextProvider>
      </Provider>
    </PersistGate>
  </StrictMode>
);

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import { persistStore } from 'redux-persist';
import store from './store';
import { PersistGate } from 'redux-persist/integration/react';
import KassenzeichenViewer from './app/components/KassenzeichenViewer';
import VerdisOnlineLanding from './app/components/VerdisOnlineLanding';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const persistor = persistStore(store);

const router = createHashRouter(
  [
    {
      path: '/',
      element: <VerdisOnlineLanding />,
    },
    {
      path: '/meinkassenzeichen/:layers?',
      element: <KassenzeichenViewer />,
    },
  ],
  {}
);

root.render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  </StrictMode>
);

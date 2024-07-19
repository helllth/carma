import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
// @ts-ignore
import TopicMapContextProvider from 'react-cismap/contexts/TopicMapContextProvider';

import App from './app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <TopicMapContextProvider>
      <App />
    </TopicMapContextProvider>
  </StrictMode>
);

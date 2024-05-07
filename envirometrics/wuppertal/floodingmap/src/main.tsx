import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

// enforce a build +

import App from './App.jsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

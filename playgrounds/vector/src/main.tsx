import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from 'react-router-dom';

import App from './app/App';
import LibreMap from './app/LibreMap';

const originalWarn = console.warn.bind(console);
const originalError = console.error.bind(console);
console.warn = (message, ...args) => {
  if (
    message?.includes &&
    !message.includes('ReactDOM.render is no longer supported in React 18')
  ) {
    originalWarn(message, ...args);
  }
};
console.error = (message, ...args) => {
  if (
    message?.includes &&
    !message.includes('ReactDOM.render is no longer supported in React 18')
  ) {
    originalError(message, ...args);
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const RootComponent = () => {
  const [searchParams] = useSearchParams();
  const vectorStyles = searchParams.get('vectorStyles');

  //check if vectorStyles has more than one url (comma separated).
  //put them in an array and pass it to the App component
  let vectorStylesArray: string[] = [];
  if (vectorStyles) {
    vectorStylesArray = vectorStyles.split(',');
  }
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<App vectorStyles={vectorStylesArray} />}
        ></Route>
        <Route
          path="/leaflet"
          element={<App vectorStyles={vectorStylesArray} />}
        ></Route>
        <Route
          path="/maplibre"
          element={<LibreMap vectorStyles={vectorStylesArray} />}
        ></Route>
      </Routes>
    </div>
  );
};

root.render(
  <StrictMode>
    <Router>
      <RootComponent />
    </Router>
  </StrictMode>
);

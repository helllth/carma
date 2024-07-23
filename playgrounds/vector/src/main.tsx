import { StrictMode, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';

import LeafletMap from './app/LeafletMap';
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
  document.getElementById('root') as HTMLElement,
);

const RootComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const vectorStyles = searchParams.get('vectorStyles');

  //check if vectorStyles has more than one url (comma separated).
  //put them in an array and pass it to the App component
  let initialVectorStylesArray: string[] = [];
  if (vectorStyles) {
    initialVectorStylesArray = vectorStyles.split(',');
  }
  const [vectorStylesArray, setVectorStylesArray] = useState<string[]>(
    initialVectorStylesArray,
  );

  useEffect(() => {
    const vectorStyles = searchParams.get('vectorStyles');
    if (vectorStyles) {
      setVectorStylesArray(vectorStyles.split(','));
    } else {
      setVectorStylesArray([]);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const url = event.dataTransfer?.getData('URL');
      if (url) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('vectorStyles', url);
        setSearchParams(newParams);
        navigate({
          search: newParams.toString(),
        });
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    window.addEventListener('drop', handleDrop);
    window.addEventListener('dragover', handleDragOver);

    return () => {
      window.removeEventListener('drop', handleDrop);
      window.removeEventListener('dragover', handleDragOver);
    };
  }, [searchParams, setSearchParams, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<LeafletMap vectorStyles={vectorStylesArray} />}
        ></Route>
        <Route
          path="/leaflet"
          element={<LeafletMap vectorStyles={vectorStylesArray} />}
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
  </StrictMode>,
);

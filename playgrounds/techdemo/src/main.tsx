import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import App from './app/App';
import Landing from './app/Landing';
import LibreMap from './app/LibreMap';
import SensorMap from './app/SensorMap';
import Klima from './app/klima/App';

// import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing></Landing>}></Route>

          {/* <Route path="/turnableTopicMap" element={<LibreMap />}></Route> */}

          <Route path="/topicmapWithNewLocator" element={<App />}></Route>

          <Route path="/sensorDemo" element={<SensorMap />}></Route>
          <Route path="/qrklima" element={<Klima />}></Route>
        </Routes>
      </div>
    </Router>
  </StrictMode>
);

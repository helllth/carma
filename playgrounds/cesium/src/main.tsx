import { createRoot } from 'react-dom/client';
import App from './app/App';
import { CESIUM_BASE_URL } from './app/config/app.config';
declare global {
  interface Window {
    CESIUM_BASE_URL: string;
  }
}

window.CESIUM_BASE_URL = CESIUM_BASE_URL;
const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);

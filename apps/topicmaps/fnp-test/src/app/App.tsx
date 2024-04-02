import { DocumentViewer } from '@cismet/document-viewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-cismap/topicMaps.css';
import { loadAEVs } from '../store/slices/aenderungsverfahren';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAEVs());
  }, []);

  return <DocumentViewer />;
}

export default App;

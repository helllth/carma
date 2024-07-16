import React from 'react';
import { useViewerDataSources } from '../store/slices/viewer';
import { ByGeojsonClassifier } from '../components/ByGeojsonClassifier';

function View() {
  const { footprintGeoJson } = useViewerDataSources();

  return <ByGeojsonClassifier geojson={footprintGeoJson} />;
}

export default View;

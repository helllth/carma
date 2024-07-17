import { ByGeojsonClassifier } from '@carma-mapping/cesium-engine';
import { useViewerDataSources } from '@carma-mapping/cesium-engine';
import React from 'react';

function View() {
  const { footprintGeoJson } = useViewerDataSources();

  return (
    footprintGeoJson && <ByGeojsonClassifier geojson={footprintGeoJson} debug />
  );
}

export default View;

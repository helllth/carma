import React from 'react';
import { useViewerDataSources } from '../../../../../libraries/mapping/engines/cesium/src/lib/CustomViewerContextProvider/slices/viewer';
import { ByGeojsonClassifier } from '../../../../../libraries/mapping/engines/cesium/src/lib/components/ByGeojsonClassifier';

function View() {
  const { footprintGeoJson } = useViewerDataSources();

  return footprintGeoJson && <ByGeojsonClassifier geojson={footprintGeoJson} />;
}

export default View;

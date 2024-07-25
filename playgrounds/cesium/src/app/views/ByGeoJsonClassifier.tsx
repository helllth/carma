import React from "react";
import { useViewerDataSources } from "@carma-mapping/cesium-engine";
import { ByGeojsonClassifier } from "@carma-mapping/cesium-engine";

function View() {
  const { footprintGeoJson } = useViewerDataSources();

  return footprintGeoJson && <ByGeojsonClassifier geojson={footprintGeoJson} />;
}

export default View;

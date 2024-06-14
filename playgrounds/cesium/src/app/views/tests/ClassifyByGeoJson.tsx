import React from 'react';
import { useViewerDataSources } from '../../store/slices/viewer';

import ByGeojsonClassifier from '../../components/ByGeojsonClassifier';
import { GeoJsonDataSource as ResiumGeoJsonDataSource} from 'resium';
import { Color, ConstantProperty, GeoJsonDataSource } from 'cesium';


const handleOnLoad = (
  dataSource: GeoJsonDataSource
) => {
  // slection volumes should not be visible unless for debugging
  dataSource.entities.values.forEach((entity) => {
    if (entity.polygon !== undefined) {
      entity.polygon.extrudedHeight = new ConstantProperty(205);
      entity.polygon.height = new ConstantProperty(155);
      // dont render edges
      entity.polygon.outline = new ConstantProperty(false);
      // should be visible only for debugging
    }
  });
};

function View() {
  const { footprintGeoJson } = useViewerDataSources();

  return (
    <>
      <ByGeojsonClassifier geojson={footprintGeoJson} debug />
      <ResiumGeoJsonDataSource
        data="https://wupp-3d-data.cismet.de/nutzung/brachflaechen4326.p6.json"
        fill={Color.RED.withAlpha(0.8)}
        onLoad={handleOnLoad}
      />
    </>
  );
}

export default View;

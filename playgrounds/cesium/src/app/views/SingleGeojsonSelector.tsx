import React from 'react';
import GeoJsonSelector from '../components/GeoJsonSelector';
import { useViewerDataSources } from '../store/slices/viewer';

function View() {
  const { footprintGeoJson } = useViewerDataSources();
  return (
    footprintGeoJson && (
      <GeoJsonSelector srcExtruded={footprintGeoJson.url} single={true} />
    )
  );
}

export default View;

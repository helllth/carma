import React from 'react';
import GeoJsonSelector from '../components/GeoJsonSelector';
import { useViewerDataSources } from '../store/slices/viewer';
import {
  usePropertySelectionControl,
  useSelectionTransparencyControl,
} from '../utils/controls';

function View() {
  const { footprintGeoJson, tileset } = useViewerDataSources();
  //useSelectionTransparencyControl();

  useSelectionTransparencyControl();
  usePropertySelectionControl();

  return (
    footprintGeoJson &&
    tileset && <GeoJsonSelector srcExtruded={footprintGeoJson.url} />
  );
}

export default View;

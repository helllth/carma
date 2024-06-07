import React from 'react';
import GeoJsonSelector from '../../components/obsolete/GeoJsonSelector';
import { useViewerDataSources } from '../../store/slices/viewer';
import {
  usePropertySelectionControl,
  useSelectionTransparencyControl,
} from '../../utils/controls';

function View() {
  const { footprintGeoJson, tilesets } = useViewerDataSources();
  //useSelectionTransparencyControl();

  useSelectionTransparencyControl();
  usePropertySelectionControl();

  return (
    footprintGeoJson &&
    tilesets.primary && <GeoJsonSelector srcExtruded={footprintGeoJson.url} />
  );
}

export default View;

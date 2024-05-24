import React from 'react';
import TilesetSelector from '../components/TilesetSelectorWithSyncedGeoJson';
import {
  useSelectionTransparencyControl,
  useTilesetControl,
} from '../utils/controls';
import { CITYGML_TEST_TILESET } from '../config';
import { useViewerDataSources } from '../store/slices/viewer';

function View() {
  useSelectionTransparencyControl();
  const footprints = useViewerDataSources().footprintGeoJson;
  useTilesetControl();
  return (
    <TilesetSelector
      tileset={CITYGML_TEST_TILESET}
      clampByGeoJson={footprints}
    />
  );
}

export default View;

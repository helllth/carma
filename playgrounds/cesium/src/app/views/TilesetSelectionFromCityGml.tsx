import React from 'react';
import TilesetSelector from '../components/TilesetSelector';
import { useViewerDataSources } from '../store/slices/viewer';
import {
  useSelectionTransparencyControl,
  useTilesetControl,
} from '../utils/controls';
import { CITYGML_TEST_TILESET } from '../config';

function View() {
  const { tileset } = useViewerDataSources();

  useSelectionTransparencyControl();
  useTilesetControl();
  // usePropertySelectionControl();

  return tileset && <TilesetSelector uri={CITYGML_TEST_TILESET.url} />;
}

export default View;

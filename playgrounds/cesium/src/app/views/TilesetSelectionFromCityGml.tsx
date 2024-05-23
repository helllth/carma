import React from 'react';
import TilesetSelector from '../components/TilesetSelector';
import { useViewerDataSources } from '../store/slices/viewer';
import {
  usePropertySelectionControl,
  useSelectionTransparencyControl,
} from '../utils/controls';

function View() {
  const { tileset } = useViewerDataSources();
  //useSelectionTransparencyControl();

  useSelectionTransparencyControl();
  usePropertySelectionControl();

  return tileset && <TilesetSelector src={"abc"} />;
}

export default View;

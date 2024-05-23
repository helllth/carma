import React from 'react';
import TilesetSelector from '../components/TilesetSelector';
import {
  useSelectionTransparencyControl,
  useTilesetControl,
} from '../utils/controls';
import { TILESET_BASEMAP_DE } from '../config';

function View() {
  useSelectionTransparencyControl();
  useTilesetControl();

  return <TilesetSelector uri={TILESET_BASEMAP_DE.url} />;
}

export default View;

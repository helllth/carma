import React from 'react';
import TilesetSelector from '../components/TilesetSelectorWithSyncedGeoJson';
import {
  useSelectionTransparencyControl,
  useTilesetControl,
} from '../utils/controls';
import { TILESET_BASEMAP_DE } from '../config/dataSources.config';

function View() {
  useSelectionTransparencyControl();
  useTilesetControl();

  return <TilesetSelector tileset={TILESET_BASEMAP_DE} />;
}

export default View;

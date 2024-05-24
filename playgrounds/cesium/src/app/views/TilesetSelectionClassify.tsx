import React from 'react';
import TilesetSelector from '../components/TilesetSelector';
import {
  useSelectionTransparencyControl,
  useTilesetControl,
} from '../utils/controls';
import { CITYGML_TEST_TILESET } from '../config';
import { create3DTileStyle } from '../lib/cesiumHelpers';

function View() {
  useSelectionTransparencyControl();
  useTilesetControl();
  return <TilesetSelector url={CITYGML_TEST_TILESET.url} isClassification style={create3DTileStyle({
    color: `vec4(1.0, 0.0, 0.0, 0.25)`,
    show: true,
  })} />;
}

export default View;

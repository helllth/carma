import React from 'react';
import {
  useSelectionTransparencyControl,
  useTilesetControl,
} from '../utils/controls';
import { CITYGML_TEST_TILESET } from '../config';
import { create3DTileStyle } from '../utils/cesiumHelpers';
import TilesetClassifier from '../components/TilesetClassifier';

function View() {
  useSelectionTransparencyControl();
  useTilesetControl();
  return (
    <TilesetClassifier
      debug={true}
      tileset={CITYGML_TEST_TILESET}
      style={create3DTileStyle({
        color: `vec4(1.0, 0.0, 0.0, 0.25)`,
        show: true,
      })}
    />
  );
}

export default View;

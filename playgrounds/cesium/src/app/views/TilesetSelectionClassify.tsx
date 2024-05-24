import React from 'react';
import TilesetSelector from '../components/TilesetSelector';
import {
  useSelectionTransparencyControl,
  useTilesetControl,
} from '../utils/controls';
import { CITYGML_TEST_TILESET } from '../config';
import { create3DTileStyle } from '../utils/cesiumHelpers';

function View() {
  useSelectionTransparencyControl();
  useTilesetControl();
  return (
    <TilesetSelector
      debug={true}
      tileset={CITYGML_TEST_TILESET}
      isClassification
      style={create3DTileStyle({
        color: `vec4(1.0, 0.0, 0.0, 0.25)`,
        show: true,
      })}
    />
  );
}

export default View;

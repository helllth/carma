import React from 'react';
import { useViewerDataSources, useViewerHome } from '../../store';
import { Color } from 'cesium';
import { Entity } from 'resium';
import { useTilesetControl } from '../../utils/controls';

function TestTileset() {
  const { footprintGeoJson, tileset } = useViewerDataSources();
  const home = useViewerHome();

  useTilesetControl();

  return (
    footprintGeoJson &&
    tileset &&
    home && (
      <Entity position={home} point={{ pixelSize: 15, color: Color.YELLOW }} />
    )
  );
}

export default TestTileset;

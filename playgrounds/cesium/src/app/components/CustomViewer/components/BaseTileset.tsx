import React from 'react';
import { Cesium3DTileset } from 'resium';
import {
  useTilesetOpacity,
  useViewerDataSources,
} from '../../../store/slices/viewer';
import { create3DTileStyle } from '../../../lib/cesiumHelpers';

export const BaseTileset = () => {
  const tileset = useViewerDataSources().tileset;

  const tilesetOpacity = useTilesetOpacity();

  const style = create3DTileStyle({
    color: `vec4(1.0, 1.0, 1.0, ${tilesetOpacity.toFixed(2)})`,
    show: true,
  });

  return (
    tileset && (
      <Cesium3DTileset
        url={tileset.url}
        style={style}
        onInitialTilesLoad={() =>
          console.log('CustomViewer: Base Tileset Ready')
        }
      />
    )
  );
};

import React from 'react';
import { Cesium3DTileset } from 'resium';
import {
  useTilesetOpacity,
  useViewerDataSources,
} from '../../../store/slices/viewer';
import { create3DTileStyle } from '../../../utils/cesiumHelpers';

export const BaseTileset = ({ show }: { show: boolean }) => {
  const tileset = useViewerDataSources().tileset;

  const tilesetOpacity = useTilesetOpacity();

  const style = create3DTileStyle({
    color: `vec4(1.0, 1.0, 1.0, ${tilesetOpacity.toFixed(2)})`,
    show: true,
  });

  return (
    tileset && (
      <Cesium3DTileset
        show={show}
        url={tileset.url}
        style={style}
        enableCollision={true}
        preloadWhenHidden={true}
        onInitialTilesLoad={() =>
          console.log('CustomViewer: Base Tileset Ready')
        }
      />
    )
  );
};

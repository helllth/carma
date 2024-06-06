import React, { useEffect } from 'react';
import { Cesium3DTileset as Resium3DTileset } from 'resium';
import {
  useShowTileset,
  useTilesetOpacity,
  useViewerDataSources,
} from '../../../store/slices/viewer';
import { create3DTileStyle } from '../../../utils/cesiumHelpers';
import { Cesium3DTileset } from 'cesium';

export const BaseTileset = () => {
  const tileset = useViewerDataSources().tileset;
  const showTileset = useShowTileset();
  const [ts, setTs] = React.useState<Cesium3DTileset | null>(null);

  const tilesetOpacity = useTilesetOpacity();

  const style = create3DTileStyle({
    color: `vec4(1.0, 1.0, 1.0, ${tilesetOpacity.toFixed(2)})`,
    show: true,
  });

  useEffect(() => {
    if (ts) {
      // workaround to toggle tileset visibility,
      // resium does not seem to forward the show prop after first initialization
      ts.show = showTileset;
    }
  }, [showTileset, ts]);

  // TODO add the alternative planning style tileset here too for instant switching after first load

  return (
    tileset && (
      <Resium3DTileset
        show={showTileset}
        url={tileset.url}
        style={style}
        enableCollision={true}
        preloadWhenHidden={true}
        onReady={(tileset) => setTs(tileset)}
      />
    )
  );
};

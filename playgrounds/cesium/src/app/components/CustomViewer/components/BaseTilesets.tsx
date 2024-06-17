import React, { useEffect } from 'react';
import { Cesium3DTileset as Resium3DTileset } from 'resium';
import {
  useShowPrimaryTileset,
  useShowSecondaryTileset,
  useTilesetOpacity,
  useViewerDataSources,
} from '../../../store/slices/viewer';
import { create3DTileStyle } from '../../../utils/cesiumHelpers';
import { Cesium3DTileset } from 'cesium';
import { useSecondaryStyleTilesetClickHandler } from '../../../hooks';

export const BaseTilesets = () => {
  const tilesets = useViewerDataSources().tilesets;
  const showPrimary = useShowPrimaryTileset();
  const showSecondary = useShowSecondaryTileset();
  const [tsA, setTsA] = React.useState<Cesium3DTileset | null>(null);
  const [tsB, setTsB] = React.useState<Cesium3DTileset | null>(null);

  const tilesetOpacity = useTilesetOpacity();

  const style = create3DTileStyle({
    color: `vec4(1.0, 1.0, 1.0, ${tilesetOpacity.toFixed(2)})`,
    show: true,
  });

  useEffect(() => {
    console.log('HOOK BaseTilesets: showPrimary', showPrimary);
    if (tsA) {
      // workaround to toggle tileset visibility,
      // resium does not seem to forward the show prop after first initialization
      tsA.show = showPrimary;
    }
    if (tsB) {
      // workaround to toggle tileset visibility,
      // resium does not seem to forward the show prop after first initialization
      tsB.show = showSecondary;
    }
  }, [showPrimary, tsA, showSecondary, tsB]);

  useSecondaryStyleTilesetClickHandler();

  // TODO add the alternative planning style tileset here too for instant switching after first load

  return (
    <>
      <Resium3DTileset
        show={showPrimary}
        url={tilesets.primary.url}
        style={style}
        enableCollision={false}
        preloadWhenHidden={true}
        onReady={(tileset) => setTsA(tileset)}
      />
      <Resium3DTileset
        show={showSecondary}
        url={tilesets.secondary.url}
        style={style}
        enableCollision={false}
        preloadWhenHidden={true}
        onReady={(tileset) => setTsB(tileset)}
      />
    </>
  );
};

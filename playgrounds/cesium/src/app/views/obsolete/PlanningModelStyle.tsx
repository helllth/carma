import React from 'react';

import { useGLTFTilesetClickHandler } from '../../hooks';
import { useSceneStyleToggle } from '../../components/CustomViewer/components/baseTileset.hook';

function View() {
  useSceneStyleToggle();
  useGLTFTilesetClickHandler();
  //return <Resium3DTileset url={WUPP_BAUMKATASTER_TILESET.url} />;
  return null;
}

export default View;

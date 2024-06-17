import React from 'react';

import { useSecondaryStyleTilesetClickHandler } from '../../hooks';
import { useSceneStyleToggle } from '../../components/CustomViewer/components/baseTileset.hook';

function View() {
  useSceneStyleToggle();
  useSecondaryStyleTilesetClickHandler();
  //return <Resium3DTileset url={WUPP_BAUMKATASTER_TILESET.url} />;
  return null;
}

export default View;

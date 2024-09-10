// TODO CONSOLIDATE_CESIUM 

import { Cartesian3, Color } from 'cesium';
import { CesiumState } from '@carma-mapping/cesium-engine';

import {
  BASEMAP_METROPOLRUHR_WMS_GRAUBLAU,
  FOOTPRINT_GEOJSON_SOURCES,
  WUPP3D,
  WUPP_LOD2_TILESET,
  WUPP_TERRAIN_PROVIDER,
} from './dataSources.config';
import { WUPPERTAL } from './locations.config';
import { colorToArray } from '@carma-mapping/cesium-engine/utils';
import { MODEL_ASSETS } from './assets.config';

// SETUP Store State

const { x, y, z } = Cartesian3.fromDegrees(
  WUPPERTAL.position.lon,
  WUPPERTAL.position.lat,
  WUPPERTAL.ground
);

// position relative to the home position
const homeOffset = {
  x: 0,
  y: -50000, // southwards
  z: 45000, // elevation
};

export const defaultCesiumState: CesiumState = {
  isAnimating: false,
  isMode2d: true,
  homeOffset: homeOffset,
  homePosition: { x, y, z },
  showPrimaryTileset: false,
  showSecondaryTileset: true,
  styling: {
    tileset: {
      opacity: 1.0,
    },
  },
  sceneStyles: {
    default: {
      globe: {
        baseColor: colorToArray(Color.TEAL),
      },
    },
  },
  dataSources: {
    footprintGeoJson: FOOTPRINT_GEOJSON_SOURCES.VORONOI,
    tilesets: {
      primary: WUPP3D,
      secondary: WUPP_LOD2_TILESET,
    },
  },
  terrainProvider: WUPP_TERRAIN_PROVIDER,
  imageryProvider: BASEMAP_METROPOLRUHR_WMS_GRAUBLAU,
  models: MODEL_ASSETS,
};

export default defaultCesiumState;
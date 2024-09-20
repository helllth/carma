import { Cartesian3, Color } from "cesium";
import { CesiumState } from "@carma-mapping/cesium-engine";
import { colorToArray } from "@carma-mapping/cesium-engine/utils";

import {
  BASEMAP_METROPOLRUHR_WMS_GRAUBLAU,
  FOOTPRINT_GEOJSON_SOURCES,
  WUPP_MESH_2024,
  WUPP_LOD2_TILESET,
  WUPP_TERRAIN_PROVIDER,
} from "./dataSources.config";
import { WUPPERTAL } from "./locations.config";

// SETUP Store State

const { x, y, z } = Cartesian3.fromDegrees(
  WUPPERTAL.position.lon,
  WUPPERTAL.position.lat,
  WUPPERTAL.ground,
);

// position relative to the home position
const homeOffset = {
  x: 0,
  y: -50000, // southwards
  z: 45000, // elevation
};

export const defaultViewerState: CesiumState = {
  isMode2d: false,
  homeOffset: homeOffset,
  homePosition: { x, y, z },
  showPrimaryTileset: true,
  showSecondaryTileset: false,
  sceneSpaceCameraController: {
    enableCollisionDetection: true,
    maximumZoomDistance: 50000,
    minimumZoomDistance: 100
  },
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
      primary: WUPP_MESH_2024,
      secondary: WUPP_LOD2_TILESET,
    },
  },
  terrainProvider: WUPP_TERRAIN_PROVIDER,
  imageryProvider: BASEMAP_METROPOLRUHR_WMS_GRAUBLAU,
};

export default defaultViewerState;

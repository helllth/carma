import { Cartesian3, Color } from 'cesium';
import { RootState } from './store';
import { colorToArray } from './lib/cesiumHelpers';

const APP_BASE_PATH = import.meta.env.BASE_URL;
export const CESIUM_PATHNAME = '__cesium__';
export const CESIUM_BASE_URL = `${APP_BASE_PATH}${CESIUM_PATHNAME}`;
export const WUPP3D = {
  url: 'https://wupp-3d-data.cismet.de/mesh/tileset.json',
  translation: {
    x: 7.20009,
    y: 51.272034,
    z: 0,
  },
};

const GEOJSON_BASE_PATH = `${APP_BASE_PATH}data/geojson/`;
const TILESET_BASE_PATH = `${APP_BASE_PATH}data/tiles/`;

export const CITYGML_TEST_TILESET = {
  url: `${TILESET_BASE_PATH}tileset.json`,
};

export const FOOTPRINT_GEOJSON_SOURCES = {
  VORONOI: {
    url: `${GEOJSON_BASE_PATH}buildings_voronoi_buffered_2m.json`,
    name: 'Voronoi 2m',
  },
  BUILDINGS: {
    url: `${GEOJSON_BASE_PATH}buildings.json`,
    name: 'Buildings',
  },
  BUFFERED: {
    url: `${GEOJSON_BASE_PATH}buildings_buffered_1m.json`,
    name: 'Buffered 1m',
  },
};

export const WUPPERTAL = {
  name: 'Wuppertal',
  position: {
    lat: 51.27174,
    lon: 7.20028,
  },
  ground: 155, // Willy Brandt Platz as Reference
};

const fullRotationDuration = 60; // seconds
export const DEFAULT_ROTATION_SPEED =
  (2 * Math.PI) / (fullRotationDuration * 1000); // rad per millisecond

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

export const APP_DEFAULT_TITLE = '3D Viewer Prototype';
export const APP_DEFAULT_SHORT_TITLE = '3DView';

export const defaultState: RootState = {
  buildings: {
    key: null,
    keys: [],
    selection: null,
    selectionKey: 'UUID',
    defaultKey: 'GEB_FKT',
    ignoredKeys: [],
  },
  location: {
    hash: null,
  },
  selectionTransparency: 0.5,
  viewer: {
    isAnimating: false,
    homeOffset: homeOffset,
    homePosition: { x, y, z },
    showTileset: true,
    styling: {
      tileset: {
        opacity: 1.0,
      },
    },
    scene: {
      globe: {
        baseColor: colorToArray(Color.TEAL),
      },
    },
    dataSources: {
      footprintGeoJson: FOOTPRINT_GEOJSON_SOURCES.VORONOI,
      tileset: WUPP3D,
    },
  },
};

export default defaultState;

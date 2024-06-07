import { APP_BASE_PATH } from './app.config';
const GEOJSON_BASE_PATH = `${APP_BASE_PATH}data/geojson/`;
const TILESET_BASE_PATH = `${APP_BASE_PATH}data/tiles/`;

// DATA SOURCES

// TILESETS

export const WUPP3D = {
  url: 'https://wupp-3d-data.cismet.de/mesh/tileset.json',
  translation: {
    x: 7.20009,
    y: 51.272034,
    z: 0,
  },
};

export const WUPP_LOD2_TILESET = {
  url: 'https://wupp-3d-data.cismet.de/lod2/tileset.json',
};

export const WUPP_BAUMKATASTER_TILESET = {
  url: 'https://wupp-3d-data.cismet.de/trees/tileset.json',
};

// EXTERNAL TILESETS

export const CITYGML_TEST_TILESET = {
  url: `${TILESET_BASE_PATH}tileset.json`,
  idProperty:
    'http://repository.gdi-de.org/schemas/adv/citygml/fdv/art.htm#_9100',
};

export const TILESET_BASEMAP_DE = {
  url: 'https://web3d.basemap.de/cesium/buildings-fly/root.json',
};

export const DEFAULT_ID_PROPERTY = 'UUID';

// GEOSJSON SOURCES

export const FOOTPRINT_GEOJSON_SOURCES = {
  VORONOI: {
    url: `${GEOJSON_BASE_PATH}buildings_voronoi_buffered_2m.json`,
    name: 'Voronoi 2m',
    idProperty: 'UUID',
  },
  BUILDINGS: {
    url: `${GEOJSON_BASE_PATH}buildings.json`,
    name: 'Buildings',
    idProperty: 'UUID',
  },
  BUFFERED: {
    url: `${GEOJSON_BASE_PATH}buildings_buffered_1m.json`,
    name: 'Buffered 1m',
    idProperty: 'UUID',
  },
};

// TERRAIN

export const WUPP_TERRAIN_PROVIDER = {
  url: 'https://cesium-wupp-terrain.cismet.de/terrain2020',
};

// IMAGERY WMS

export const DEFAULT_WMS_IMAGE_PROVIDER_PARAMETERS = {
  transparent: true,
  format: 'image/png',
};

export const BASEMAP_BASEMAPDE_WMS_GRAU = {
  url: 'https://sgx.geodatenzentrum.de/wms_basemapde?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities',
  layers: 'de_basemapde_web_raster_grau',
  parameters: DEFAULT_WMS_IMAGE_PROVIDER_PARAMETERS,
};

export const BASEMAP_BASEMAPDE_WMS_FARBE = {
  url: 'https://sgx.geodatenzentrum.de/wms_basemapde?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities',
  layers: 'de_basemapde_web_raster_farbe',
  parameters: DEFAULT_WMS_IMAGE_PROVIDER_PARAMETERS,
};

export const BASEMAP_METROPOLRUHR_WMS_GRUNDRISS = {
  url: 'https://geodaten.metropoleruhr.de/spw2/service',
  layers: 'spw2_light_grundriss',
  parameters: DEFAULT_WMS_IMAGE_PROVIDER_PARAMETERS,
};

export const BASEMAP_METROPOLRUHR_WMS_GRAUBLAU = {
  url: 'https://geodaten.metropoleruhr.de/spw2/service',
  layers: 'spw2_graublau',
  parameters: DEFAULT_WMS_IMAGE_PROVIDER_PARAMETERS,
};

export const BASEMAP_METROPOLRUHR_WMS_EXTRALIGHT = {
  url: 'https://geodaten.metropoleruhr.de/spw2/service',
  layers: 'spw2_extralight',
  parameters: DEFAULT_WMS_IMAGE_PROVIDER_PARAMETERS,
};

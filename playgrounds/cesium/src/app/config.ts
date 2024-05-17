export const WUPP3D = {
  url: 'https://wupp-3d-data.cismet.de/mesh/tileset.json',
  translation: {
    x: 7.20009,
    y: 51.272034,
    z: 0,
  },
};

export const FOOTPRINT_GEOJSON_SOURCES = {
  VORONOI: {
    url: 'data/buildings_voronoi_buffered_2m.json',
    name: 'Voronoi 2m',
  },
  BUILDINGS: {
    url: 'data/buildings.json',
    name: 'Buildings',
  },
  BUFFERED: {
    url: 'data/buildings_buffered_1m.json',
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

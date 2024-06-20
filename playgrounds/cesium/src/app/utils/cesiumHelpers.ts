import {
  Camera,
  Cartesian2,
  Cartesian3,
  Cartographic,
  Cesium3DTileset,
  Cesium3DTileStyle,
  Color,
  ColorMaterialProperty,
  defined,
  Entity,
  GroundPrimitive,
  Matrix4,
  Primitive,
  sampleTerrainMostDetailed,
  Scene,
  Viewer,
  Math as CeMath,
  PerspectiveFrustum,
} from 'cesium';
import { ColorRgbaArray, TilesetConfig } from '../..';

// Math

export const SELECTABLE_TRANSPARENT_3DTILESTYLE = create3DTileStyle({
  color: `vec4(1.0, 0.0, 0.0, 0.01)`,
  show: true,
});
export const SELECTABLE_TRANSPARENT_MATERIAL = new ColorMaterialProperty(
  Color.BLACK.withAlpha(1 / 255)
);

export function getModelMatrix(config: TilesetConfig, heightOffset = 0) {
  const { x, y, z } = config.translation;
  const surface = Cartesian3.fromRadians(x, y, z);
  const offset = Cartesian3.fromRadians(x, y, z + heightOffset);
  const translation = Cartesian3.subtract(offset, surface, new Cartesian3());
  const modelMatrix = Matrix4.fromTranslation(translation);
  return modelMatrix;
}

export function getCanvasCenter(viewer: Viewer) {
  const windowPosition = new Cartesian2(
    viewer.canvas.clientWidth / 2,
    viewer.canvas.clientHeight / 2
  );
  viewer.scene.pickTranslucentDepth = true;
  const depthTestPrev = viewer.scene.globe.depthTestAgainstTerrain;
  viewer.scene.globe.depthTestAgainstTerrain = true;

  const pos = viewer.scene.pickPosition(windowPosition);
  viewer.scene.globe.depthTestAgainstTerrain = depthTestPrev;
  return pos;
}

// use with onReady event of Cesium3DTileset
export const logTileSetInfoOnReady = (tileset: Cesium3DTileset) => {
  const { center } = tileset.root.boundingSphere;
  const cartographic = Cartographic.fromCartesian(center);
  const longitude = CeMath.toDegrees(cartographic.longitude);
  const latitude = CeMath.toDegrees(cartographic.latitude);
  const height = cartographic.height;

  console.log(
    `Longitude: ${longitude}, Latitude: ${latitude}, Height: ${height}, center: ${center}, ${tileset.basePath}}`
  );
};

export const colorToArray = (color: Color): ColorRgbaArray => {
  const { red, green, blue, alpha } = color;
  return [red, green, blue, alpha];
};

export const getTileSetInfo = (tileset: Cesium3DTileset) => {
  const { center } = tileset.root.boundingSphere;
  const cartographic = Cartographic.fromCartesian(center);
  const longitude = CeMath.toDegrees(cartographic.longitude);
  const latitude = CeMath.toDegrees(cartographic.latitude);
  const height = cartographic.height;
  console.log(
    `Longitude: ${longitude}, Latitude: ${latitude}, Height: ${height}, center: ${center}, ${tileset.basePath}}`
  );
};

export function create3DTileStyle(
  styleDescription: Record<string, unknown | string>
): Cesium3DTileStyle | undefined {
  try {
    return new Cesium3DTileStyle(styleDescription);
  } catch (error) {
    console.warn(
      'Error in Tileset Style Creation from: ',
      styleDescription,
      error
    );

    return undefined;
  }
}

// CAMERA

const TOP_DOWN_DIRECTION = new Cartesian3(0, 0, -1);

export const getTopDownCameraDeviationAngle = (viewer: Viewer) => {
  const currentDirection = viewer.camera.direction;

  const internalAngle = Cartesian3.angleBetween(
    currentDirection,
    TOP_DOWN_DIRECTION
  );
  return Math.abs(internalAngle);
};

// SCENE

const GEOJSON_DRILL_LIMIT = 10;

// get last ground primitive from picked objects
// needed since default picker fails with ground primitives created from GeoJson
function getLastGroundPrimitive(
  pickedObjects: { primitive: unknown; id?: unknown }[]
): Entity | null {
  let lastGroundPrimitive: Entity | null = null;

  pickedObjects.reverse().some((pickedObject) => {
    if (defined(pickedObject)) {
      if (pickedObject.primitive instanceof GroundPrimitive) {
        lastGroundPrimitive = pickedObject.id as Entity;
        return true;
      }
    }
    return false;
  });

  return lastGroundPrimitive;
}

export function pickFromClampedGeojson(
  viewer: Viewer,
  position: Cartesian2,
  limit: number = GEOJSON_DRILL_LIMIT
): Entity | null {
  const pickedObjects = viewer.scene.drillPick(position, limit);
  return getLastGroundPrimitive(pickedObjects);
}

export const getElevationAtPosition = async (
  scene: Scene,
  camera: Camera,
  fallBackHeightOffset
) => {
  const [sample] = await scene.sampleHeightMostDetailed([
    camera.positionCartographic,
  ]);
  return sample.height !== undefined ? sample.height : fallBackHeightOffset;
};

export function getPrimitiveById(viewer: Viewer, id: string) {
  const primitives = viewer.scene.primitives;
  const length = primitives.length;

  for (let i = 0; i < length; ++i) {
    const p = primitives.get(i);
    if (p.id === id) {
      return p;
    }
  }

  return null;
}

export function getAllPrimitives(viewer: Viewer) {
  const primitives = viewer.scene.primitives;
  const length = primitives.length;

  const primitiveArray: Primitive[] = [];
  for (let i = 0; i < length; ++i) {
    const p = primitives.get(i);
    primitiveArray.push(p);
  }
  return primitiveArray;
}

// GEO

export const EARTH_CIRCUMFERENCE = 40075016.686;

const WEB_MERCATOR_MAX_LATITUDE = 85.051129;
export const WEB_MERCATOR_MAX_LATITUDE_RAD = CeMath.toRadians(
  WEB_MERCATOR_MAX_LATITUDE
);

export const getMercatorScaleFactorAtLatitude = (latitude: number): number => {
  if (latitude > WEB_MERCATOR_MAX_LATITUDE_RAD) {
    console.warn(
      'latitude is greater than max web mercator latitude, clamping applied'
    );
    latitude = WEB_MERCATOR_MAX_LATITUDE_RAD;
  } else if (latitude < -WEB_MERCATOR_MAX_LATITUDE_RAD) {
    console.warn(
      'latitude is smaller than min web mercator latitude, clamping applied'
    );
    latitude = -WEB_MERCATOR_MAX_LATITUDE_RAD;
  }
  return 1 / Math.cos(latitude);
};

export const getZoomFromElevation = (elevation: number, latitude: number) => {
  const scale = getMercatorScaleFactorAtLatitude(latitude);
  return Math.log2(EARTH_CIRCUMFERENCE / (elevation * scale));
};

export const getElevationFromZoom = (zoom: number, latitude: number) => {
  const scale = getMercatorScaleFactorAtLatitude(latitude);
  return EARTH_CIRCUMFERENCE / (Math.pow(2, zoom) * scale);
};

// CESIUM TO WEB MAPS

const getFieldOfViewZoomOffset = (
  camera: Camera,
  CONSTANT_SCALE_FACTOR = 8.42 // Empirically determined for best visual results

  // for not tan compensation at larger fov
  // const scale = 1 / fov;
  // 7.65 for fov 1.04
  // 8.4 for fov 0.05
) => {
  if (camera.frustum instanceof PerspectiveFrustum) {
    const fov = camera.frustum.fov;
    //console.log('fov', fov);
    const scaleTan = 1 / (Math.tan(fov / 2) * 2); // overall view scale
    const scaleCenter = 1 / fov; // scale at center

    // average between center and tangent scale for better visual appearance for larger fov
    // for small fov the difference is negligible
    const centerWeight = 0.25;
    const scale = scaleCenter * centerWeight + scaleTan * (1 - centerWeight);

    //const scale = 1 / fov;
    return Math.log2(scale * CONSTANT_SCALE_FACTOR);
  }
  console.warn('camera frustum is not a PerspectiveFrustum');
  return null;
};

export const getCameraHeightAboveTerrain = async (
  viewer: Viewer
): Promise<number> => {
  const LOCAL_FALLBACK_HEIGHT = 150;
  const cameraPosition = viewer.camera.positionCartographic;
  const cameraHeight = cameraPosition.height;
  const terrainProvider = viewer.terrainProvider;

  const [sample] = await sampleTerrainMostDetailed(
    terrainProvider,
    [cameraPosition],
    true
  );
  if (sample) {
    const relativeHeight = cameraHeight - sample.height;
    // console.log('zoom sampled', cameraHeight, sample.height, relativeHeight);
    return relativeHeight;
  } else {
    console.warn('zoom fallback height');
    return cameraPosition.height - LOCAL_FALLBACK_HEIGHT;
  }
};

export const cesiumCameraElevationToLeafletZoom = async (viewer: Viewer) => {
  const cameraHeightAboveTerrain = await getCameraHeightAboveTerrain(viewer);
  console.log('zoom camera height above Terrain', cameraHeightAboveTerrain);
  const zoomEquivalent = getZoomFromElevation(
    cameraHeightAboveTerrain,
    viewer.camera.positionCartographic.latitude
  );

  // adjust zoom based on device pixel ratio
  const dpr = window.devicePixelRatio;
  const dprZOffset = Math.log2(dpr);
  const fovOffset = getFieldOfViewZoomOffset(viewer.camera);
  if (fovOffset === null) {
    console.warn('fov offset is null');
    return null;
  }
  const zCompensated = zoomEquivalent - dprZOffset + fovOffset;
  // console.log('leaflet zoom ', zoom, dpr, dprZOffset, zCompensated);

  return zCompensated;
};

// WEB MAPS TO CESIUM

export const leafletToCesiumElevation = (
  viewer: Viewer,
  zoom: number,
  latDeg = 0,
  dpr = window.devicePixelRatio
) => {
  // adjust zoom based on device pixel ratio and fixed offset
  const dprZOffset = Math.log2(dpr);
  const fovOffset = getFieldOfViewZoomOffset(viewer.camera);
  if (fovOffset === null) {
    console.warn('fov offset is null');
    return null;
  }
  const zCompensated = zoom + dprZOffset - fovOffset;

  const latRad = CeMath.toRadians(latDeg);
  const elevation = getElevationFromZoom(zCompensated, latRad);
  // console.log('leaf2elev zoom', dprZOffset, zoom, elevation, latDeg, latRad);
  return elevation;
};

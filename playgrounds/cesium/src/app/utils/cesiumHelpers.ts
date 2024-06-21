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
  Scene,
  Viewer,
  Math as CeMath,
  BoundingSphere,
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

// PICKERS HELPERS

const getWindowPositions = (viewer: Viewer, [x, y] = [0.5, 0.5]) => {
  return new Cartesian2(
    viewer.canvas.clientWidth * x,
    viewer.canvas.clientHeight * y
  );
};

const CENTER_POSITION: [number, number] = [0.5, 0.5];

/* Helper function to pick positions on the viewer canvas in unit coordinates*/

export const pickViewerCanvasPositions = (
  viewer: Viewer,
  positions: [number, number][] = [CENTER_POSITION],
  {
    depthTestAgainstTerrain = true,
    pickTranslucentDepth = true,
  }: {
    depthTestAgainstTerrain?: boolean;
    pickTranslucentDepth?: boolean;
  } = {}
) => {
  // store previous settings
  const prev = {
    depthTestAgainstTerrain: viewer.scene.globe.depthTestAgainstTerrain,
    pickTranslucentDepth: viewer.scene.pickTranslucentDepth,
  };
  // apply overrides
  viewer.scene.pickTranslucentDepth = pickTranslucentDepth;
  viewer.scene.globe.depthTestAgainstTerrain = depthTestAgainstTerrain;
  const pickedPositions = positions.map((position) =>
    viewer.scene.pickPosition(getWindowPositions(viewer, position))
  );

  // restore previous settings
  Object.assign(viewer.scene.globe, prev);

  return pickedPositions;
};

// helper shorthand
export const pickViewerCanvasCenter = (viewer: Viewer) =>
  pickViewerCanvasPositions(viewer, [CENTER_POSITION])[0];

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

export const getHeightAtPosition = async (
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
export const DEFAULT_LEAFLET_TILESIZE = 256;

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

export const getZoomFromPixelResolutionAtLatitude = (
  meterResolution: number,
  latitude: number = 0,
  { tileSize = DEFAULT_LEAFLET_TILESIZE }: { tileSize?: number } = {}
) => {
  const scaleFactor = getMercatorScaleFactorAtLatitude(latitude);
  const zoom = Math.log2(
    EARTH_CIRCUMFERENCE / (scaleFactor * meterResolution * tileSize)
  );
  console.log('zoom', zoom, scaleFactor, meterResolution, latitude);
  return zoom;
};

export const getPixelResolutionFromZoomAtLatitude = (
  zoom: number,
  latitude: number = 0,
  { tileSize = DEFAULT_LEAFLET_TILESIZE }: { tileSize?: number } = {}
) => {
  const scale = getMercatorScaleFactorAtLatitude(latitude);
  return EARTH_CIRCUMFERENCE / (scale * Math.pow(2, zoom) * tileSize);
};

// CESIUM TO WEB MAPS

const getScenePixelSize = (viewer: Viewer, centerWeight = 0.5) => {
  const { camera, canvas, scene } = viewer;

  // sample two position to get better approximation for full view extent

  const [groundCenter, topLeft] = pickViewerCanvasPositions(viewer, [
    CENTER_POSITION,
    [0.05, 0.05],
  ]);

  const pixelSizeCenter = camera.getPixelSize(
    new BoundingSphere(groundCenter, 1),
    scene.drawingBufferWidth,
    scene.drawingBufferHeight
  );

  const pixelSizeCorner = camera.getPixelSize(
    new BoundingSphere(topLeft, 1),
    scene.drawingBufferWidth,
    scene.drawingBufferHeight
  );

  const pixelSize = pixelSizeCorner
    ? pixelSizeCenter * centerWeight + pixelSizeCorner * (1 - centerWeight)
    : pixelSizeCenter;

  /*
  console.log('zoom cesium dpr', viewer.resolutionScale);
  console.log('zoom dpr', window.devicePixelRatio);
  console.log('zoom px total', pixelSize);
  console.log('zoom px centr', pixelSizeCenter);
  console.log('zoom px tpLft', pixelSizeCorner);
  console.log('zoom px ratio', pixelSizeCenter / pixelSizeCorner);
  console.log('zoom camera position', camera.positionCartographic.height);
  console.log(
    'zoom ground position',
    Cartographic.fromCartesian(groundCenterPickPos).height
  );
  */

  return pixelSize;
};

export const cesiumTopDownCameraToLeafletZoom = (
  viewer: Viewer,
  { centerWeight = 0.5 }: { centerWeight?: number } = {}
) => {
  const pixelSize = getScenePixelSize(viewer, centerWeight);
  const zoom = getZoomFromPixelResolutionAtLatitude(
    pixelSize,
    viewer.camera.positionCartographic.latitude
  );
  return zoom;
};

// WEB MAPS TO CESIUM

export const leafletToCesiumCamera = (
  viewer: Viewer,
  { lat, lng, zoom }: { lat: number; lng: number; zoom: number },
  { epsilon = 0.02, limit = 5 }: { epsilon?: number; limit?: number } = {}
) => {
  const lngRad = CeMath.toRadians(lng);
  const latRad = CeMath.toRadians(lat);

  const targetPixelResolution = getPixelResolutionFromZoomAtLatitude(
    zoom,
    latRad
  );

  let currentPixelResolution = getScenePixelSize(viewer);
  const { camera, scene } = viewer;

  // move to new position
  camera.setView({
    destination: Cartesian3.fromRadians(
      lngRad,
      latRad,
      camera.positionCartographic.height
    ),
  });

  console.log('leafletToCesium', currentPixelResolution, targetPixelResolution);
  // Get the ground position directly under the camera
  const groundCenterPickPos = pickViewerCanvasCenter(viewer);

  if (!groundCenterPickPos) {
    console.warn('No ground position found under the camera.');
    return camera.positionCartographic.height; // Return current height if ground position not found
  }
  const cameraPositionAtStart = camera.position.clone();
  // Calculate the ground height at the camera's position
  const groundPositionCartographic =
    Cartographic.fromCartesian(groundCenterPickPos);
  const groundHeight = groundPositionCartographic.height;

  // Calculate initial camera height above the ground
  let cameraHeightAboveGround =
    camera.positionCartographic.height - groundHeight;

  const maxIterations = limit;
  let iterations = 0;

  // Iterative adjustment to match the target resolution
  while (Math.abs(currentPixelResolution - targetPixelResolution) > epsilon) {
    if (iterations >= maxIterations) {
      console.warn(
        'Maximum height finding iterations reached with no result, restoring last Cesium camera position.'
      );
      camera.setView({
        destination: cameraPositionAtStart,
      });
      return false;
    }
    const adjustmentFactor = targetPixelResolution / currentPixelResolution;
    cameraHeightAboveGround *= adjustmentFactor;
    camera.setView({
      destination: Cartesian3.fromRadians(
        lngRad,
        latRad,
        cameraHeightAboveGround + groundHeight
      ),
    });
    currentPixelResolution = getScenePixelSize(viewer);
    iterations++;
  }
  //console.log('zoom iterations', iterations);
  return true; // Return true if camera position found within max iterations
};

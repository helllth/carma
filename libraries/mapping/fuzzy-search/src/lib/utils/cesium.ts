import {
  HeadingPitchRange,
  Math as CMath,
  Scene,
  Cartographic,
  Cartesian3,
  GroundPrimitive,
  PolygonHierarchy,
  Viewer,
  Model,
  sampleTerrainMostDetailed,
  Cesium3DTileset,
} from "cesium";

export const distanceFromZoomLevel = (zoom: number) => {
  return 40000000 / Math.pow(2, zoom);
};

export const getHeadingPitchRangeFromZoom = (
  zoom: number,
  {
    heading = 0,
    pitch = Math.PI / 2,
  }: { heading?: number; pitch?: number } = {}, // prior
) => {
  const range = distanceFromZoomLevel(zoom);
  return new HeadingPitchRange(heading, pitch, range);
};

export const getPositionWithHeightAsync = async (
  scene: Scene,
  position: Cartographic,
  tileset?: Cesium3DTileset,
) => {
  // Convert the Cartographic position to Cartesian3 coordinates
  const cartesianPosition = Cartographic.toCartesian(position);

  let updatedPosition: Cartographic | null = null;

  if (tileset) {
    // Attempt to clamp the position to the tileset's height
    try {
      const clampedPositions = await scene.clampToHeightMostDetailed(
        [cartesianPosition],
        [tileset],
      );

      if (
        clampedPositions &&
        clampedPositions.length > 0 &&
        clampedPositions[0]
      ) {
        const clampedCartesian = clampedPositions[0];
        const clampedCartographic =
          Cartographic.fromCartesian(clampedCartesian);

        updatedPosition = new Cartographic(
          position.longitude,
          position.latitude,
          clampedCartographic.height,
        );

        console.info(
          "[CESIUM|TILESET] Clamped position found for position",
          position,
          updatedPosition,
        );
      } else {
        console.warn(
          "[CESIUM|TILESET] No clamped position found for position",
          position,
        );
      }
    } catch (error) {
      console.error(
        "[CESIUM|TILESET] Error clamping to tileset height:",
        error,
      );
    }
  }

  if (updatedPosition) {
    // Elevation obtained from the tileset
    return updatedPosition;
  } else {
    // Fall back to using terrain data
    const terrainProvider = scene.globe.terrainProvider;
    console.log(
      "[CESIUM|TERRAIN] Using terrain provider",
      terrainProvider,
      "for position",
      position,
    );

    try {
      const updatedPositions = await sampleTerrainMostDetailed(
        terrainProvider,
        [position],
      );
      const cartoPos = updatedPositions[0];

      if (cartoPos instanceof Cartographic) {
        console.info(
          "[CESIUM|TERRAIN] Sampled terrain for position",
          position,
          cartoPos,
        );
        return cartoPos;
      } else {
        console.warn(
          "[CESIUM|TERRAIN] Could not get elevation for position",
          position,
          cartoPos,
        );
        return position;
      }
    } catch (error) {
      console.error("[CESIUM|TERRAIN] Error sampling terrain:", error);
      return position;
    }
  }
};

export const polygonHierarchyFromPolygonCoords = (
  polygonCoords: number[][][],
) => {
  // [positions, hole1, hole2, ...]
  const [positions, ...holes] = polygonCoords;

  const hierarchy = new PolygonHierarchy(
    Cartesian3.fromDegreesArray(positions.flat()),
    holes.map(
      (hole: number[][]) =>
        new PolygonHierarchy(Cartesian3.fromDegreesArray(hole.flat())),
    ),
  );
  return hierarchy;
};

// WUPPERTAL EXTENT PLUS SOME PADDING
const LAT_PADDING = 8;
const LON_PADDING = 5;
const LAT_MIN = 51.16 - LAT_PADDING;
const LAT_MAX = 51.33 + LAT_PADDING;
const LON_MIN = 7.0 - LON_PADDING;
const LON_MAX = 7.32 + LON_PADDING;

export const invertedPolygonHierarchy = (
  [polygon]: number[][][],
  outerPolygon = [
    [LON_MIN, LAT_MIN],
    [LON_MIN, LAT_MAX],
    [LON_MAX, LAT_MAX],
    [LON_MAX, LAT_MIN],
    [LON_MIN, LAT_MIN],
  ],
) => polygonHierarchyFromPolygonCoords([outerPolygon, polygon]);

export const removeCesiumMarker = (
  viewer: Viewer,
  markerModel?: Model | null,
) => {
  if (markerModel) {
    viewer.scene.primitives.remove(markerModel);
    markerModel = null;
  } else {
    console.info("no Marker found to remove");
  }

  //removePreRenderListener(viewer);
};

export function getGroundPrimitiveById(
  viewer: Viewer,
  id: string,
): GroundPrimitive | null {
  const groundPrimitives = viewer.scene.groundPrimitives;

  for (let i = 0; i < groundPrimitives.length; ++i) {
    const primitive = groundPrimitives.get(i);
    if (primitive instanceof GroundPrimitive) {
      // Check if the primitive's geometryInstances has the matching id
      // needs that
      // releaseGeometryInstances: false
      // on the primitive constructor, not other obvious way to get the id of it otherwise.
      if (Array.isArray(primitive.geometryInstances)) {
        for (const instance of primitive.geometryInstances) {
          if (instance.id === id) {
            return primitive;
          }
        }
      } else if (primitive.geometryInstances?.id === id) {
        return primitive;
      }
    }
  }
  return null;
}

export function removeGroundPrimitiveById(viewer: Viewer, id: string): boolean {
  const primitive = getGroundPrimitiveById(viewer, id);
  primitive && viewer.scene.groundPrimitives.remove(primitive);
  return false;
}

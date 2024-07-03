import {
  HeadingPitchRange,
  Math as CMath,
  Scene,
  Cartographic,
  Cartesian3,
  PolygonHierarchy,
} from 'cesium';

export const distanceFromZoomLevel = (zoom: number) => {
  return 40000000 / Math.pow(2, zoom);
};

export const getHeadingPitchRangeFromZoom = (
  zoom: number,
  headingDeg = 0,
  pitchDeg = 60
) => {
  const range = distanceFromZoomLevel(zoom);
  const heading = CMath.toRadians(headingDeg);
  const pitch = CMath.toRadians(pitchDeg);
  return new HeadingPitchRange(heading, pitch, range);
};

export const getPositionWithHeightAsync = async (
  scene: Scene,
  position: Cartographic
) => {
  /*
  const terrainProvider = scene.globe.terrainProvider;
  console.log('terrainProvider', terrainProvider);
  return sampleTerrainMostDetailed(terrainProvider, [position]).then(
    (updatedPositions) => {
      return updatedPositions[0];
    }
  );
*/
  const cartesianPosition = Cartographic.toCartesian(position);
  const clampedPosition = scene.clampToHeight(cartesianPosition);
  return Cartographic.fromCartesian(clampedPosition);
};

export const polygonHierarchyFromPolygonCoords = (
  polygonCoords: number[][][]
) => {
  // [positions, hole1, hole2, ...]
  const [positions, ...holes] = polygonCoords;

  const hierarchy = new PolygonHierarchy(
    Cartesian3.fromDegreesArray(positions.flat()),
    holes.map(
      (hole: number[][]) =>
        new PolygonHierarchy(Cartesian3.fromDegreesArray(hole.flat()))
    )
  );
  return hierarchy;
};

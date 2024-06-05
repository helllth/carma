import { Camera, Cartesian3, Cartographic, Scene, Viewer } from 'cesium';
import { toDegFactor } from '../../utils/cesiumHelpers';

// 5 DEGREES OF FREEDOM CAMERA encoding/decoding
// lon, lat, height, heading, pitch
// does not always map to a point on the ground so there is no way to encode only the position on the ground at center
// to allow for syncing with leaflet with a non-orthographic projection we need to also encode the zoom level as a separate parameter
// zoom is determined as a vertical distance from the terrain or tileset in meters
// the camera height is the ellipsoidal height of the camera position, so it works well even if the terrain is not loaded
// the zoom level is only written out for out-linking with leaflet, it is not used for cesium directly

// TODO implement zoom level to camera height conversion with terrain height for reverse use case.

const DEGREE_DIGITS = 7;
const CAMERA_DEGREE_DIGITS = 2;
const FRACTIONAL_ZOOM_DIGITS = 3;
const MINZOOM = 6;
const MAXZOOM = 20;

const hashcodecs = {
  // parsefloat removes trailing zeros for shorter urls
  longitude: {
    key: 'lng',
    decode: (value: string) => Number(value) / toDegFactor,
    encode: (value: number) =>
      parseFloat((value * toDegFactor).toFixed(DEGREE_DIGITS)),
  },
  latitude: {
    key: 'lat',
    decode: (value: string) => Number(value) / toDegFactor,
    encode: (value: number) =>
      parseFloat((value * toDegFactor).toFixed(DEGREE_DIGITS)),
  },
  height: {
    key: 'h',
    decode: (value: string) => Number(value),
    encode: (value: number) => parseFloat(value.toFixed(2)),
  },
  heading: {
    key: 'heading',
    decode: (value: string) => Number(value) / toDegFactor,
    encode: (value: number) =>
      parseFloat((value * toDegFactor).toFixed(CAMERA_DEGREE_DIGITS)) % 360,
  },
  pitch: {
    key: 'pitch',
    decode: (value: string) => Number(value) / toDegFactor,
    encode: (value: number) =>
      parseFloat(((value * toDegFactor) % 360).toFixed(CAMERA_DEGREE_DIGITS)),
  },
  webMercatorZoomEquivalent: {
    key: 'zoom',
    decode: (value: string) => undefined,
    encode: (value: number) =>
      parseFloat(
        Math.min(Math.max(MINZOOM, value), MAXZOOM).toFixed(
          FRACTIONAL_ZOOM_DIGITS
        )
      ),
  },
  isAnimationg: {
    key: 'anim',
    decode: (value: string) => value === 'true' || value === '1',
    encode: (value: boolean) => (value ? '1' : null),
  },
};

export function encodeScene(
  camera: Camera,
  webMercatorZoomEquivalent?: number,
  isAnimating?: boolean
): string {
  const { x, y, z } = camera.position;
  const { longitude, latitude, height } = Cartographic.fromCartesian(
    new Cartesian3(x, y, z)
  );

  const heading = camera.heading;
  const pitch = camera.pitch;

  // set param order here
  const hashparams = [
    longitude,
    latitude,
    height,
    heading,
    pitch,
    webMercatorZoomEquivalent,
    isAnimating,
  ].reduce((acc, value, index) => {
    const codec = hashcodecs[Object.keys(hashcodecs)[index]];
    if (value !== undefined && value !== null) {
      const encoded = codec.encode(value);
      if (encoded !== null) {
        acc[codec.key] = encoded;
      }
    }
    return acc;
  }, {});
  //console.log('hashparams', hashparams);
  const urlStr = new URLSearchParams(hashparams).toString();
  return urlStr;
}

export function decodeSceneFromLocation(location: string) {
  const params = new URLSearchParams(location);
  const decoded = Object.keys(hashcodecs).reduce((acc, key) => {
    const codec = hashcodecs[key];
    const value = params.get(codec.key);
    acc[key] =
      value !== null && value !== undefined ? codec.decode(value) : null;
    return acc;
  }, {});
  //console.log('decoded', decoded);
  return { ...decoded };
}

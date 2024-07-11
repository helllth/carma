type Translation = {
  x: number;
  y: number;
  z: number;
};

export type LatLngRecord = {
  latitude: number;
  longitude: number;
};

export type LatLngDegrees = {
  latRad: number;
  lngRad: number;
};

export type LatLngRadians = {
  latRad: number;
  lngRad: number;
};

export type TilesetConfig = {
  url: string;
  translation: Translation;
};

export type ColorRgbaArray = [number, number, number, number];

export type CameraPositionAndOrientation = {
  position: Cartesian3;
  up: Cartesian3;
  direction: Cartesian3;
};

export interface NumericResult {
  value: number | null;
  error?: string;
}

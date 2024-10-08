export type CesiumConfig = {
  transitions: {
    mapMode: {
      duration: number;
    };
  };
  camera: {
    minPitch: number;
    minPitchRange: number;
  };
  markerKey?: string;
  baseUrl: string;
  pathName: string;
};

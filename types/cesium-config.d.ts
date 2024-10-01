export type CesiumConfig = {
  transitions: {
    mapMode: {
      duration: number;
    };
  };
  camera: {
    minPitch: number;
  };
  baseUrl: string;
  pathName: string;
};

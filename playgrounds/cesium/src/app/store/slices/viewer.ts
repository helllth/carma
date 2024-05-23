import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultState from '../../config';
import { Cartesian3, Color } from 'cesium';
import { ColorRgbaArray } from '../../..';
import { colorToArray } from '../../lib/cesiumHelpers';

type PlainCartesian3 = {
  x: number;
  y: number;
  z: number;
};

export interface ViewerState {
  isAnimating: boolean;
  homePosition?: PlainCartesian3;
  homeOffset?: PlainCartesian3;
  showTileset: boolean; // tileset is the base 3D model equivalent to a basemap
  /*
  quality: {
    msaaSamples: number;
    useBrowserRecommendedResolution: boolean;

  }
  */
  styling: {
    tileset: {
      opacity: number;
    };
  };
  scene: {
    globe: {
      baseColor: ColorRgbaArray;
    };
  };
  dataSources?: {
    footprintGeoJson?: {
      url: string;
      name: string;
    };
    tileset?: {
      url: string;
      translation: PlainCartesian3;
    };
  };
}

export default createSlice({
  name: 'viewer',
  initialState: defaultState.viewer,
  reducers: {
    setIsAnimating: (state: ViewerState, action: PayloadAction<boolean>) => {
      state.isAnimating = action.payload;
    },
    toggleIsAnimating: (state: ViewerState) => {
      state.isAnimating = !state.isAnimating;
    },
    setShowTileset: (state: ViewerState, action: PayloadAction<boolean>) => {
      state.showTileset = action.payload;
    },
    setTilesetOpacity: (state: ViewerState, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.styling.tileset.opacity = action.payload;
    },
    setGlobeBaseColor: (
      state: ViewerState,
      action: PayloadAction<ColorRgbaArray | Color>
    ) => {
      state.scene.globe.baseColor = Array.isArray(action.payload)
        ? action.payload
        : colorToArray(action.payload);
    },
    setHomePosition: (
      state: ViewerState,
      action: PayloadAction<Cartesian3>
    ) => {
      const { x, y, z } = action.payload;
      state.homePosition = { x, y, z };
    },
  },
});

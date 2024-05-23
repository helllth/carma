import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultState from '../../config';
import { Cartesian3, Color } from 'cesium';
import { ColorRgbaArray } from '../../..';
import { colorToArray } from '../../lib/cesiumHelpers';
import { useSelector } from 'react-redux';
import { RootState } from '..';

type PlainCartesian3 = {
  x: number;
  y: number;
  z: number;
};

export interface ViewerState {
  isAnimating: boolean;
  homePosition: PlainCartesian3;
  homeOffset: PlainCartesian3;
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
  dataSources: {
    footprintGeoJson: {
      url: string;
      name: string;
    };
    tileset: {
      url: string;
      translation: PlainCartesian3;
    };
  };
}

const slice = createSlice({
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

export const {
  setIsAnimating,
  toggleIsAnimating,
  setShowTileset,
  setTilesetOpacity,
} = slice.actions;

// selectors

const selectViewerIsAnimating = createSelector(
  (state: RootState) => state.viewer.isAnimating,
  (isAnimating) => isAnimating
);

const selectViewerDataSources = createSelector(
  (state: RootState) => state.viewer.dataSources,
  (dataSources) => dataSources
);

const selectViewerHome = createSelector(
  (state: RootState) => state.viewer.homePosition,
  ({ x, y, z }) => new Cartesian3(x, y, z)
);

const selectViewerHomeOffset = createSelector(
  (state: RootState) => state.viewer.homeOffset,
  ({ x, y, z }) => new Cartesian3(x, y, z)
);

const selectViewerSceneGlobalBaseColor = createSelector(
  (state: RootState) => state.viewer.scene.globe.baseColor,
  (baseColor) => new Color(...baseColor)
);

export const useViewerIsAnimating = () => useSelector(selectViewerIsAnimating);
export const useViewerDataSources = () => useSelector(selectViewerDataSources);
export const useViewerHome = () => useSelector(selectViewerHome);
export const useViewerHomeOffset = () => useSelector(selectViewerHomeOffset);
export const useGlobeBaseColor = () =>
  useSelector(selectViewerSceneGlobalBaseColor);

export const useShowTileset = () =>
  useSelector(({ viewer }: RootState) => viewer.showTileset);
export const useTilesetOpacity = () =>
  useSelector(({ viewer }: RootState) => viewer.styling.tileset.opacity);

export default slice;

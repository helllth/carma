import { configureStore } from '@reduxjs/toolkit';
import { ViewerState } from '../..';
import viewerSlice from './slices/viewer';

export const setupStore = (preloadViewerState: ViewerState) => {
  const store = configureStore({
    reducer: {
      viewer: viewerSlice.reducer,
    },
    preloadedState: {
      viewer: preloadViewerState,
    },
  });

  return store;
};

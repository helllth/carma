import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultState from '../config';
import { useSelector } from 'react-redux';
import { LocationState } from './slices/location';

import locationSlice from './slices/location';
import viewerSlice, { ViewerState } from './slices/viewer';
import buildingsSlice, { BuildingsState } from './slices/buildings';

export type RootState = {
  buildings: BuildingsState;
  location: LocationState;
  viewer: ViewerState;
  selectionTransparency: number;
};

// Transparency Slice

export const selectionTransparencySlice = createSlice({
  name: 'selectionTransparency',
  initialState: defaultState.selectionTransparency,
  reducers: {
    setSelectionTransparency: (_, action: PayloadAction<number>) =>
      action.payload,
  },
});

export const useSelectionTransparency = () =>
  useSelector((state: RootState) => state.selectionTransparency);

export const { setSelectionTransparency } = selectionTransparencySlice.actions;

// EXPORTS

const store = configureStore({
  reducer: {
    buildings: buildingsSlice.reducer,
    location: locationSlice.reducer,
    viewer: viewerSlice.reducer,
    selectionTransparency: selectionTransparencySlice.reducer,
  },
});

export default store;

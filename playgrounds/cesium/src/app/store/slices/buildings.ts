// Footprint

import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultState from '../../config';
import exp from 'constants';
import { RootState } from '..';
import { useSelector } from 'react-redux';

export interface BuildingsState {
  key: string | null; // key for coloring
  keys: string[] | null; // keys for coloring
  selection: string | null; // selected uniq id
  selectionKey: string | null; // key for uniq id
  defaultKey: string;
  ignoredKeys: string[] | null;
}

export const buildingsSlice = createSlice({
  name: 'buildings',
  initialState: defaultState.buildings,
  reducers: {
    setKey: (state: BuildingsState, action: PayloadAction<string>) => {
      console.log('setKey in State', action.payload);
      state.key = action.payload;
    },
    setKeys: (state: BuildingsState, action: PayloadAction<string[]>) => {
      //console.log('setKeys in State', action.payload);
      state.keys = action.payload;
    },
    setSelection: (state: BuildingsState, action: PayloadAction<string>) => {
      state.selection = action.payload;
    },
    setSelectionKey: (state: BuildingsState, action: PayloadAction<string>) => {
        //console.log('REDUX reducer buildings selectionKey');
        //console.log('REDUX selectionKey', action.payload);
      state.selectionKey = action.payload;
    },
    setDefaultKey: (state: BuildingsState, action: PayloadAction<string>) => {
      state.defaultKey = action.payload;
    },
    setIgnoredKeys: (
      state: BuildingsState,
      action: PayloadAction<string[]>
    ) => {
      state.ignoredKeys = action.payload;
    },
  },
});

export const selectKey = createSelector(
  (state: RootState) => state.buildings.key,
  (key) => key
);
export const selectKeys = createSelector(
  (state: RootState) => state.buildings.keys,
  (keys) => keys
);
export const selectSelection = createSelector(
  (state: RootState) => state.buildings.selection,
  (selection) => selection
);
export const selectSelectionKey = createSelector(
  (state: RootState) => state.buildings.selectionKey,
  (selectionKey) => selectionKey
);
export const selectDefaultKey = createSelector(
  (state: RootState) => state.buildings.defaultKey,
  (defaultKey) => defaultKey
);
export const selectIgnoredKeys = createSelector(
  (state: RootState) => state.buildings.ignoredKeys,
  (ignoredKeys) => ignoredKeys
);

export const useSelectKey = () => useSelector(selectKey);
export const useSelectKeys = () => useSelector(selectKeys);
export const useSelectSelection = () => useSelector(selectSelection);
export const useSelectSelectionKey = () => useSelector(selectSelectionKey);
export const useSelectDefaultKey = () => useSelector(selectDefaultKey);
export const useSelectIgnoredKeys = () => useSelector(selectIgnoredKeys);

export const {
  setKey,
  setKeys,
  setSelection,
  setSelectionKey,
  setDefaultKey,
  setIgnoredKeys,
} = buildingsSlice.actions;

export default buildingsSlice;

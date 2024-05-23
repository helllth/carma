// Footprint

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultState from '../../config';
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

export const selectKey = (state: RootState) => state.buildings.key;
export const selectKeys = (state: RootState) => state.buildings.keys;
export const selectSelection = (state: RootState) => state.buildings.selection;
export const selectSelectionKey = (state: RootState) =>
  state.buildings.selectionKey;
export const selectDefaultKey = (state: RootState) =>
  state.buildings.defaultKey;
export const selectIgnoredKeys = (state: RootState) =>
  state.buildings.ignoredKeys;

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

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface MappingState {
  layers: any[];
  gmlOutput: string | null;
  jsonOutput: any;
  oldVariant: string | null;
}

const initialState: MappingState = {
  layers: [],
  gmlOutput: null,
  jsonOutput: null,
  oldVariant: null,
};

const slice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    setLayers(state, action) {
      state.layers = action.payload;
    },
    setGMLOutput(state, action) {
      state.gmlOutput = action.payload;
    },
    setJSONOutput(state, action) {
      state.jsonOutput = action.payload;
    },
    setOldVariant(state, action) {
      state.oldVariant = action.payload;
    },
  },
});

export default slice;

export const { setLayers, setGMLOutput, setJSONOutput, setOldVariant } =
  slice.actions;

export const getLayers = (state: RootState) => {
  return state.mapping.layers;
};

export const getGMLOutput = (state: RootState) => {
  return state.mapping.gmlOutput;
};

export const getJSONOutput = (state: RootState) => {
  return state.mapping.jsonOutput;
};

export const getOldVariant = (state: RootState) => {
  return state.mapping.oldVariant;
};

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface MappingState {
  layers: any[];
  gmlOutput: string | null;
  jsonOutput: any;
}

const initialState: MappingState = {
  layers: [],
  gmlOutput: null,
  jsonOutput: null,
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
  },
});

export default slice;

export const { setLayers, setGMLOutput, setJSONOutput } = slice.actions;

export const getLayers = (state: RootState) => {
  return state.mapping.layers;
};

export const getGMLOutput = (state: RootState) => {
  return state.mapping.gmlOutput;
};

export const getJSONOutput = (state: RootState) => {
  return state.mapping.jsonOutput;
};

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface MappingState {
  layers: any[];
  gmlOutput: string | null;
}

const initialState: MappingState = {
  layers: [],
  gmlOutput: null,
};

const slice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    setLayers(state, action) {
      state.layers = action.payload;
      return state;
    },
    setGMLOutput(state, action) {
      state.gmlOutput = action.payload;
      return state;
    },
  },
});

export default slice;

export const { setLayers, setGMLOutput } = slice.actions;

export const getLayers = (state: RootState) => {
  return state.mapping.layers;
};

export const getGMLOutput = (state: RootState) => {
  return state.mapping.gmlOutput;
};

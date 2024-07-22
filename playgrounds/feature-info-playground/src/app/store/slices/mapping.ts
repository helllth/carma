import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface MappingState {
  layers: any[];
}

const initialState: MappingState = {
  layers: [],
};

const slice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    setLayers(state, action) {
      state.layers = action.payload;
    },
  },
});

export default slice;

export const { setLayers } = slice.actions;

export const getLayers = (state: RootState) => {
  return state.mapping.layers;
};

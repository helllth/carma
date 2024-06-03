import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

type Layer = {
  title: string;
  initialActive: boolean;
  url: string;
  id: string;
  layer: any;
};

interface MappingState {
  layers: Layer[];
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
    appendLayer(state, action: PayloadAction<Layer>) {
      let currentLayers = state.layers;
      currentLayers.push(action.payload);
      state.layers = currentLayers;
    },
    removeLayer(state, action) {},
  },
});

export default slice;

export const { setLayers, appendLayer, removeLayer } = slice.actions;

export const getLayers = (state: RootState) => {
  return state.mapping.layers;
};

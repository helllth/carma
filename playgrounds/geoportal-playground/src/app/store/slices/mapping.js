import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  layers: [],
};

const slice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    setLayers(state, action) {
      state.layers = action.payload;
    },
    appendLayer(state, action) {
      let currentLayers = state.layers;
      currentLayers.push(action.payload);
      state.layers = currentLayers;
    },
    removeLayer(state, action) {},
  },
});

export default slice;

export const { setLayers, appendLayer, removeLayer } = slice.actions;

export const getLayers = (state) => {
  return state.mapping.layers;
};

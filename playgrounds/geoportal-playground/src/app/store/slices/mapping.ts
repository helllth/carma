import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';

interface MappingState {
  layers: Layer[];
  selectedLayerIndex: number;
}

const initialState: MappingState = {
  layers: [],
  selectedLayerIndex: -1,
};

const slice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    setLayers(state, action) {
      state.layers = action.payload;
    },
    appendLayer(state, action: PayloadAction<Layer>) {
      let newLayers = state.layers;
      newLayers.push(action.payload);
      state.layers = newLayers;
    },
    removeLayer(state, action: PayloadAction<string>) {
      const newLayers = state.layers.filter((obj) => obj.id !== action.payload);
      state.layers = newLayers;
    },
    changeOpacity(state, action) {
      const newLayers = state.layers.map((obj) => {
        if (obj.id === action.payload.id) {
          return {
            ...obj,
            opacity: action.payload.opacity,
          };
        } else {
          return obj;
        }
      });
      state.layers = newLayers;
    },
    setSelectedLayerIndex(state, action) {
      state.selectedLayerIndex = action.payload;
    },
  },
});

export default slice;

export const {
  setLayers,
  appendLayer,
  removeLayer,
  changeOpacity,
  setSelectedLayerIndex,
} = slice.actions;

export const getLayers = (state: RootState) => {
  return state.mapping.layers;
};

export const getSelectedLayerIndex = (state: RootState) => {
  return state.mapping.selectedLayerIndex;
};

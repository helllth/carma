import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';
import exp from 'constants';

interface MappingState {
  layers: Layer[];
  selectedLayerIndex: number;
  showInfo: boolean;
  showInfoText: boolean;
}

const initialState: MappingState = {
  layers: [],
  selectedLayerIndex: -1,
  showInfo: false,
  showInfoText: false,
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
    setNextSelectedLayerIndex(state) {
      const newIndex = state.selectedLayerIndex + 1;
      if (newIndex >= state.layers.length) {
        state.selectedLayerIndex = 0;
      } else {
        state.selectedLayerIndex = newIndex;
      }
    },
    setPreviousSelectedLayerIndex(state) {
      const newIndex = state.selectedLayerIndex - 1;
      if (newIndex < 0) {
        state.selectedLayerIndex = state.layers.length - 1;
      } else {
        state.selectedLayerIndex = newIndex;
      }
    },
    setShowInfo(state, action) {
      state.showInfo = action.payload;
    },
    setShowInfoText(state, action) {
      state.showInfoText = action.payload;
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
  setNextSelectedLayerIndex,
  setPreviousSelectedLayerIndex,
  setShowInfo,
  setShowInfoText,
} = slice.actions;

export const getLayers = (state: RootState) => {
  return state.mapping.layers;
};

export const getSelectedLayerIndex = (state: RootState) => {
  return state.mapping.selectedLayerIndex;
};

export const getShowInfo = (state: RootState) => {
  return state.mapping.showInfo;
};

export const getShowInfoText = (state: RootState) => {
  return state.mapping.showInfoText;
};

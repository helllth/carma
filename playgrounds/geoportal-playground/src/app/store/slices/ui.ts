import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface UIState {
  showInfo: boolean;
  showInfoText: boolean;
  activeTabKey: string;
  mode: string;
  showLayerButtons: boolean;
}

const initialState: UIState = {
  showInfo: false,
  showInfoText: false,
  activeTabKey: '1',
  mode: 'default',
  showLayerButtons: true,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowInfo(state, action) {
      state.showInfo = action.payload;
    },
    setShowInfoText(state, action) {
      state.showInfoText = action.payload;
    },
    setActiveTabKey(state, action) {
      state.activeTabKey = action.payload;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
    setShowLayerButtons(state, action: PayloadAction<boolean>) {
      state.showLayerButtons = action.payload;
    },
  },
});

export default slice;

export const {
  setShowInfo,
  setShowInfoText,
  setActiveTabKey,
  setMode,
  setShowLayerButtons,
} = slice.actions;

export const getShowInfo = (state: RootState) => {
  return state.ui.showInfo;
};

export const getShowInfoText = (state: RootState) => {
  return state.ui.showInfoText;
};

export const getActiveTabKey = (state: RootState) => {
  return state.ui.activeTabKey;
};

export const getMode = (state: RootState) => {
  return state.ui.mode;
};

export const getShowLayerButtons = (state: RootState) => {
  return state.ui.showLayerButtons;
};

export const toggletModeMeasuremen = () => {
  return function (dispatch, getState) {
    const state = getState();
    const mode = state.ui.mode;
    if (mode === 'default') {
      dispatch(setMode('measurement'));
    } else {
      dispatch(setMode('default'));
    }
  };
};

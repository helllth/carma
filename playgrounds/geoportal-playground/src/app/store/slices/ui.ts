import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface UIState {
  showInfo: boolean;
  showInfoText: boolean;
  activeTabKey: string;
}

const initialState: UIState = {
  showInfo: false,
  showInfoText: false,
  activeTabKey: '1',
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
  },
});

export default slice;

export const { setShowInfo, setShowInfoText, setActiveTabKey } = slice.actions;

export const getShowInfo = (state: RootState) => {
  return state.ui.showInfo;
};

export const getShowInfoText = (state: RootState) => {
  return state.ui.showInfoText;
};

export const getActiveTabKey = (state: RootState) => {
  return state.ui.activeTabKey;
};

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'normal',
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
      return state;
    },
  },
});

export default slice;

export const { setMode } = slice.actions;

export const getMode = (state) => {
  return state.ui.mode;
};

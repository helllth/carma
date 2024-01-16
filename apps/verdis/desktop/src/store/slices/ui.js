import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  overviewFeatureTypes: ["flaeche", "front"],
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOverviewFeatureTypes(state, action) {
      state.overviewFeatureTypes = action.payload;
      return state;
    },
  },
});

export default slice;

export const { setOverviewFeatureTypes } = slice.actions;

export const getOverviewFeatureTypes = (state) => {
  return state.ui.overviewFeatureTypes;
};

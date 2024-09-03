import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

import type { FeatureInfoState } from "@carma-apps/portals";
import { isEqual } from "lodash";

const initialState: FeatureInfoState = {
  features: [],
  selectedFeature: null,
  secondaryInfoBoxElements: [],
};

const slice = createSlice({
  name: "features",
  initialState,
  reducers: {
    setFeatures(state, action) {
      state.features = action.payload;
    },
    addFeature(state, action) {
      state.features.push(action.payload);
    },
    setSelectedFeature(state, action) {
      state.selectedFeature = action.payload;
    },
    setSecondaryInfoBoxElements(state, action) {
      state.secondaryInfoBoxElements = action.payload;
    },
    updateSecondaryInfoBoxElements(state, action) {
      const feature = action.payload;
      const tmp = state.features.map((f) => {
        if (isEqual(f, feature)) {
          return null;
        } else {
          return f;
        }
      });
      state.secondaryInfoBoxElements = tmp.filter((f) => f !== null);
    },
  },
});

export default slice;

export const {
  setFeatures,
  addFeature,
  setSelectedFeature,
  setSecondaryInfoBoxElements,
  updateSecondaryInfoBoxElements,
} = slice.actions;

export const getFeatures = (state: RootState) => {
  return state.features.features;
};
export const getSelectedFeature = (state: RootState) => {
  return state.features.selectedFeature;
};
export const getSecondaryInfoBoxElements = (state: RootState) => {
  return state.features.secondaryInfoBoxElements;
};

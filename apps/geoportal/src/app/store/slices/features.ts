import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

import type { FeatureInfoState } from "@carma-apps/portals";
import { isEqual } from "lodash";

const initialState: FeatureInfoState = {
  features: [],
  selectedFeature: null,
  secondaryInfoBoxElements: [],
  infoText: "",
  preferredLayerId: "",
  vectorInfo: undefined,
  nothingFoundIDs: [],
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
    setInfoText(state, action) {
      state.infoText = action.payload;
    },
    setPreferredLayerId(state, action) {
      state.preferredLayerId = action.payload;
    },
    setVectorInfo(state, action) {
      state.vectorInfo = action.payload;
    },
    addNothingFoundID(state, action) {
      state.nothingFoundIDs.push(action.payload);
    },
    clearNothingFoundIDs(state) {
      state.nothingFoundIDs = [];
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
  setInfoText,
  setPreferredLayerId,
  setVectorInfo,
  addNothingFoundID,
  clearNothingFoundIDs,
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

export const getInfoText = (state: RootState) => {
  return state.features.infoText;
};

export const getPreferredLayerId = (state: RootState) => {
  return state.features.preferredLayerId;
};

export const getVectorInfo = (state: RootState) => {
  return state.features.vectorInfo;
};

export const getNothingFoundIDs = (state: RootState) => {
  return state.features.nothingFoundIDs;
};

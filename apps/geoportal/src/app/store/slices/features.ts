import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

import type { FeatureInfo, FeatureInfoState } from "@carma-apps/portals";
import { isEqual } from "lodash";

const initialState: FeatureInfoState = {
  features: [],
  selectedFeature: null,
  secondaryInfoBoxElements: [],
  infoText: "",
  preferredLayerId: "",
  vectorInfo: undefined,
  nothingFoundIDs: [],
  vectorInfos: [],
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
    updateInfoElementsAfterRemovingFeature(
      state,
      action: PayloadAction<string>,
    ) {
      const id = action.payload;
      if (state.selectedFeature?.id === id) {
        state.selectedFeature = null;

        if (state.secondaryInfoBoxElements.length > 0) {
          const selectedFeature = state.secondaryInfoBoxElements[0];
          state.selectedFeature = selectedFeature;
          state.secondaryInfoBoxElements =
            state.secondaryInfoBoxElements.filter(
              (f) => f.id !== selectedFeature.id,
            );
        }
      } else {
        state.secondaryInfoBoxElements = state.secondaryInfoBoxElements.filter(
          (f) => f.id !== id,
        );
      }
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
    removeNothingFoundID(state, action) {
      state.nothingFoundIDs = state.nothingFoundIDs.filter(
        (id) => id !== action.payload,
      );
    },
    clearNothingFoundIDs(state) {
      state.nothingFoundIDs = [];
    },
    addVectorInfo(state, action: PayloadAction<FeatureInfo>) {
      state.vectorInfos.push(action.payload);
    },
    removeVectorInfo(state, action) {
      state.vectorInfos = state.vectorInfos.filter(
        (id) => id !== action.payload,
      );
    },
    clearVectorInfos(state) {
      state.vectorInfos = [];
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
  updateInfoElementsAfterRemovingFeature,
  setInfoText,
  setPreferredLayerId,
  setVectorInfo,
  addNothingFoundID,
  removeNothingFoundID,
  clearNothingFoundIDs,
  addVectorInfo,
  removeVectorInfo,
  clearVectorInfos,
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

export const getVectorInfos = (state: RootState) => {
  return state.features.vectorInfos;
};

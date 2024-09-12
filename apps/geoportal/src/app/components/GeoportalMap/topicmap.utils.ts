import type { Dispatch, Store } from "@reduxjs/toolkit";
import type { LatLng, Point } from "leaflet";
import { proj4crs25832def } from "react-cismap/constants/gis";
import proj4 from "proj4";

import {
  clearNothingFoundIDs,
  getNothingFoundIDs,
  getPreferredLayerId,
  getVectorInfo,
  setFeatures,
  setInfoText,
  setSecondaryInfoBoxElements,
  setSelectedFeature,
  setVectorInfo,
} from "../../store/slices/features";
import { getLayers } from "../../store/slices/mapping";

import { getFeatureForLayer } from "../feature-info/featureInfoHelper";
import { getAtLeastOneLayerIsQueryable, getQueryableLayers } from "./utils";

type Options = {
  dispatch: Dispatch;
  mode: string;
  setPos: (pos: [number, number] | null) => void;
  store: Store;
};

export const onClickTopicMap = async (
  e: {
    containerPoint: Point;
    latlng: LatLng;
    layerPoint: Point;
    originalEvent: PointerEvent;
    sourceTarget: HTMLElement;
    target: HTMLElement;
    type: string;
  },
  { dispatch, mode, setPos, store }: Options,
) => {
  const layers = getLayers(store.getState());
  const queryableLayers = getQueryableLayers(layers);
  if (mode === "featureInfo" && getAtLeastOneLayerIsQueryable(layers)) {
    if (queryableLayers.find((layer) => layer.layerType === "vector")) {
      setTimeout(() => {}, 100);
    }

    const vectorInfo = getVectorInfo(store.getState());
    const nothingFoundIDs = getNothingFoundIDs(store.getState());
    const preferredLayerId = getPreferredLayerId(store.getState());
    dispatch(setSecondaryInfoBoxElements([]));
    dispatch(setFeatures([]));
    const pos = proj4(
      proj4.defs("EPSG:4326") as unknown as string,
      proj4crs25832def,
      [e.latlng.lng, e.latlng.lat],
    );

    const vectorLayers = queryableLayers.filter(
      (layer) => layer.layerType === "vector",
    );

    if (vectorLayers.length === nothingFoundIDs.length) {
      dispatch(setVectorInfo(undefined));
    }

    if (
      queryableLayers[queryableLayers.length - 1].layerType !== "vector" ||
      !vectorInfo ||
      vectorLayers.length === nothingFoundIDs.length
    ) {
      setPos([e.latlng.lat, e.latlng.lng]);
    } else {
      setPos(null);
    }

    if (queryableLayers && pos[0] && pos[1]) {
      const result = await Promise.all(
        queryableLayers.map(async (testLayer) => {
          if (
            testLayer.layerType === "vector" &&
            (testLayer.id !== vectorInfo?.id ||
              nothingFoundIDs.includes(testLayer.id))
          ) {
            return undefined;
          } else if (
            testLayer.layerType === "vector" &&
            testLayer.id === vectorInfo.id
          ) {
            return vectorInfo;
          }

          const feature = await getFeatureForLayer(testLayer, pos);

          if (feature) {
            return feature;
          }
        }),
      );

      const filteredResult = result
        .filter((feature) => feature !== undefined)
        .reverse();

      dispatch(clearNothingFoundIDs());

      if (filteredResult.length === 0) {
        dispatch(setSelectedFeature(null));
        dispatch(setSecondaryInfoBoxElements([]));
        dispatch(setFeatures([]));
        dispatch(setInfoText("Keine Informationen an dieser Stelle gefunden."));
      } else {
        if (preferredLayerId) {
          const preferredLayerIndex = filteredResult.findIndex(
            (feature) => feature.id === preferredLayerId,
          );

          if (preferredLayerIndex !== -1) {
            filteredResult.splice(
              0,
              0,
              ...filteredResult.splice(preferredLayerIndex, 1),
            );
          }
        }
        dispatch(setSelectedFeature(filteredResult[0]));
        dispatch(
          setSecondaryInfoBoxElements(
            filteredResult.slice(1, filteredResult.length),
          ),
        );
        dispatch(setFeatures(filteredResult));
      }
    }
  }
};

//export const APP_BASE_PATH = process.env.BASE_URL || "/";

import { LeafletConfig } from "types/leaflet-config";

// TODO CONSOLIDATE_CESIUM with base config only imported from cesium playground
export const APP_BASE_PATH = import.meta.env.BASE_URL; // TODO USE Bunder with es2022 agian later

const CESIUM_PATHNAME = "__cesium__";
export const CESIUM_BASE_URL = `${APP_BASE_PATH}${CESIUM_PATHNAME}`;

export const CESIUM_MAPMODE_TRANSITION_DURATION = 1000;

export const LEAFLET_CONFIG: LeafletConfig = {
  zoomSnap: 0.5,
  zoomDelta: 0.5,
};

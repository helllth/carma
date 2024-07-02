import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';

export type BackgroundLayer = Layer & {
  layers: string;
};

interface MappingState {
  layers: Layer[];
  savedLayerConfigs: {
    name: string;
    description: string;
    thumbnail?: string;
    layers: Layer[];
  }[];
  selectedLayerIndex: number;
  backgroundLayer: BackgroundLayer;
  showLeftScrollButton: boolean;
  showRightScrollButton: boolean;
  showFullscreenButton: boolean;
  showLocatorButton: boolean;
  showMeasurementButton: boolean;
  showHamburgerMenu: boolean;
  focusMode: boolean;
}

const initialState: MappingState = {
  layers: [],
  savedLayerConfigs: [],
  selectedLayerIndex: -2,
  backgroundLayer: {
    title: 'Stadtplan',
    id: 'stadtplan',
    opacity: 1.0,
    description: `Kartendienst (WMS) des Regionalverbandes Ruhr (RVR). Datengrundlage:
            <strong>Stadtkarte 2.0</strong>. Wöchentlich in einem automatischen Prozess
            aktualisierte Zusammenführung des Straßennetzes der OpenStreetMap
            mit Amtlichen Geobasisdaten des Landes NRW aus den Fachverfahren
            ALKIS (Gebäude, Flächennutzungen) und ATKIS (Gewässer). © RVR und
            Kooperationspartner (
            <a href="https://www.govdata.de/dl-de/by-2-0">
              Datenlizenz Deutschland - Namensnennung - Version 2.0
            </a>
            ). Lizenzen der Ausgangsprodukte:
            <a href="https://www.govdata.de/dl-de/zero-2-0">
              Datenlizenz Deutschland - Zero - Version 2.0
            </a>
            (Amtliche Geobasisdaten) und
            <a href="https://opendatacommons.org/licenses/odbl/1-0/">ODbL</a>
            (OpenStreetMap contributors).`,
    visible: true,
    layerType: 'wmts',
    props: {
      name: '',
      url: 'https://geodaten.metropoleruhr.de/spw2?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=spw2_light&STYLE=default&FORMAT=image/png&TILEMATRIXSET=webmercator_hq&TILEMATRIX=%7Bz%7D&TILEROW=%7By%7D&TILECOL=%7Bx%7D',
    },
    layers: 'amtlich@100',
  },
  showLeftScrollButton: false,
  showRightScrollButton: false,
  showFullscreenButton: true,
  showLocatorButton: true,
  showMeasurementButton: true,
  showHamburgerMenu: false,
  focusMode: false,
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
    changeVisibility(
      state,
      action: PayloadAction<{ id: string; visible: boolean }>
    ) {
      const newLayers = state.layers.map((obj) => {
        if (obj.id === action.payload.id) {
          return {
            ...obj,
            visible: action.payload.visible,
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
        state.selectedLayerIndex = -1;
      } else {
        state.selectedLayerIndex = newIndex;
      }
    },
    setPreviousSelectedLayerIndex(state) {
      const newIndex = state.selectedLayerIndex - 1;
      if (newIndex < -1) {
        state.selectedLayerIndex = state.layers.length - 1;
      } else {
        state.selectedLayerIndex = newIndex;
      }
    },
    setBackgroundLayer(state, action: PayloadAction<BackgroundLayer>) {
      state.backgroundLayer = action.payload;
    },
    setShowLeftScrollButton(state, action) {
      state.showLeftScrollButton = action.payload;
    },
    setShowRightScrollButton(state, action) {
      state.showRightScrollButton = action.payload;
    },
    setShowFullscreenButton(state, action: PayloadAction<boolean>) {
      state.showFullscreenButton = action.payload;
    },
    setShowLocatorButton(state, action: PayloadAction<boolean>) {
      state.showLocatorButton = action.payload;
    },
    setShowMeasurementButton(state, action: PayloadAction<boolean>) {
      state.showMeasurementButton = action.payload;
    },
    setShowHamburgerMenu(state, action: PayloadAction<boolean>) {
      state.showHamburgerMenu = action.payload;
    },
    setFocusMode(state, action: PayloadAction<boolean>) {
      state.focusMode = action.payload;
    },
  },
});

export default slice;

export const {
  setLayers,
  appendLayer,
  removeLayer,
  changeOpacity,
  changeVisibility,
  setSelectedLayerIndex,
  setNextSelectedLayerIndex,
  setPreviousSelectedLayerIndex,
  setBackgroundLayer,
  setShowLeftScrollButton,
  setShowRightScrollButton,
  setShowFullscreenButton,
  setShowLocatorButton,
  setShowMeasurementButton,
  setShowHamburgerMenu,
  setFocusMode,
} = slice.actions;

export const getLayers = (state: RootState) => {
  return state.mapping.layers;
};

export const getSavedLayerConfigs = (state: RootState) => {
  return state.mapping.savedLayerConfigs;
};

export const getSelectedLayerIndex = (state: RootState) => {
  return state.mapping.selectedLayerIndex;
};

export const getBackgroundLayer = (state: RootState) => {
  return state.mapping.backgroundLayer;
};

export const getShowLeftScrollButton = (state: RootState) => {
  return state.mapping.showLeftScrollButton;
};

export const getShowRightScrollButton = (state: RootState) => {
  return state.mapping.showRightScrollButton;
};

export const getShowFullscreenButton = (state: RootState) => {
  return state.mapping.showFullscreenButton;
};

export const getShowLocatorButton = (state: RootState) => {
  return state.mapping.showLocatorButton;
};

export const getShowMeasurementButton = (state: RootState) => {
  return state.mapping.showMeasurementButton;
};

export const getShowHamburgerMenu = (state: RootState) => {
  return state.mapping.showHamburgerMenu;
};

export const getFocusMode = (state: RootState) => {
  return state.mapping.focusMode;
};

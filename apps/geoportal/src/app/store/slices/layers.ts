import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { Layer } from "@carma-mapping/layers";

export type LayersState = {
  thumbnails: any[];
  favorites: { id: string }[];
};

const initialState: LayersState = {
  thumbnails: [],
  favorites: [],
};

const slice = createSlice({
  name: "layers",
  initialState,
  reducers: {
    setThumbnail(state, action) {
      let alreadyExists = state.thumbnails.some(
        (thumbnail) => thumbnail.name === action.payload.name,
      );
      if (!alreadyExists) {
        state.thumbnails = [...state.thumbnails, action.payload];
      }
      return state;
    },
    addFavorite(state, action) {
      const alreadyExists = state.favorites.some(
        (favorite) => favorite.id === action.payload.id,
      );
      if (!alreadyExists) {
        state.favorites = [...state.favorites, action.payload];
      }
      return state;
    },
    removeFavorite(state, action) {
      const newFavorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload.id,
      );
      state.favorites = newFavorites;
      return state;
    },
  },
});

export default slice;

export const { setThumbnail, addFavorite, removeFavorite } = slice.actions;

export const getThumbnails = (state: RootState) => {
  return state.layers.thumbnails;
};

export const getFavorites = (state: RootState) => {
  return state.layers.favorites;
};

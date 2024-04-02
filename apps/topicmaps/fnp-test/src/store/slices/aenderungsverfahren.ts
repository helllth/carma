import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: undefined,
};

const slice = createSlice({
  name: 'aev',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      return state;
    },
  },
});

export default slice;

export const loadAEVs = () => {
  return async (dispatch, getState) => {
    fetch('https://wunda-geoportal.cismet.de/data/aenderungsv.data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        dispatch(setData(result));
        console.log(result);
      })
      .catch((error) => {
        console.error(
          'There was a problem with the fetch operation:',
          error.message
        );
      });
  };
};

export const { setData } = slice.actions;

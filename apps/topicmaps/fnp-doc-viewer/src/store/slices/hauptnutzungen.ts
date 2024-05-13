import { createSlice } from '@reduxjs/toolkit';
import bboxPolygon from '@turf/bbox-polygon';
import booleanDisjoint from '@turf/boolean-disjoint';

const initialState = {
  data: undefined,
};

const slice = createSlice({
  name: 'hauptnutzungen',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      return state;
    },
  },
});

export const loadHauptnutzungen = () => {
  return async (dispatch: any) => {
    fetch('https://wunda-geoportal.cismet.de/data/hauptnutzungen.data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        dispatch(setData(result));
        console.log('xxx', result);
      })
      .catch((error) => {
        console.error(
          'There was a problem with the fetch operation:',
          error.message
        );
      });
  };
};

export default slice;

export const { setData } = slice.actions;

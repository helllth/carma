import { createSlice } from '@reduxjs/toolkit';
import bboxPolygon from '@turf/bbox-polygon';
import booleanDisjoint from '@turf/boolean-disjoint';

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
  return async (dispatch: any) => {
    fetch('https://wunda-geoportal.cismet.de/data/aenderungsv.data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        dispatch(setData(result));
      })
      .catch((error) => {
        console.error(
          'There was a problem with the fetch operation:',
          error.message
        );
      });
  };
};

export function searchForAEVs({
  gazObject,
  boundingBox,
  point,
  done = (result: any) => {
    console.log(result);
  },
}: {
  gazObject: any;
  boundingBox: any;
  point: any;
  done: (result: any) => void;
}) {
  return function (dispatch: any, getState: any) {
    const state = getState();
    let finalResults = [];

    if (
      gazObject === undefined &&
      (boundingBox !== undefined || point !== undefined)
    ) {
      let bboxPoly;
      if (boundingBox !== undefined) {
        bboxPoly = bboxPolygon([
          boundingBox.left,
          boundingBox.top,
          boundingBox.right,
          boundingBox.bottom,
        ]);
      } else if (point !== undefined) {
        bboxPoly = bboxPolygon([
          point.x - 0.05,
          point.y - 0.05,
          point.x + 0.05,
          point.y + 0.05,
        ]);
      }

      for (let feature of state.fnpAenderungsverfahren.dataState.features) {
        // console.log('feature', feature);
        if (!booleanDisjoint(bboxPoly as any, feature)) {
          finalResults.push(feature);
        }
      }
    } else if (
      gazObject !== undefined &&
      gazObject[0] !== undefined &&
      gazObject[0].type === 'aenderungsv'
    ) {
      if (state.aev.data.length === 0) {
        loadAEVs();
      }

      let hit = state.aev.data.find((elem: any) => {
        return elem.name === gazObject[0].more.v;
      });
      if (hit) {
        finalResults.push(hit);
      }
    }

    done(finalResults);
  };
}

export const { setData } = slice.actions;

import { createSlice } from '@reduxjs/toolkit';
import {
  INFO_DOC_DATEINAMEN_NAME,
  INFO_DOC_DATEINAMEN_URL,
} from '../../constants/bplaene';

const initialState = {
  data: undefined,
};

const slice = createSlice({
  name: 'bplaene',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      return state;
    },
  },
});

export default slice;

export const loadBPlaene = (finishedHandler = () => {}) => {
  return async (dispatch: any) => {
    fetch('https://wunda-geoportal.cismet.de/data/bplaene.data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        finishedHandler();
        let features: any = [];
        let counter = 0;
        for (let item of result) {
          let itemFeature = convertBPlanToFeature(item, counter);
          features.push(itemFeature);
          counter++;
        }
        dispatch(setData(features));
      })
      .catch((error) => {
        console.error(
          'There was a problem with the fetch operation:',
          error.message
        );
      });
  };
};

function convertBPlanToFeature(bplan, index) {
  if (bplan === undefined) {
    return undefined;
  }
  const id = index;
  const type = 'Feature';
  const featuretype = 'B-Plan';

  const selected = false;
  const geometry = bplan.geojson;

  const text = bplan.nummer;

  if (bplan.docs.length > 0) {
    bplan.docs = [
      {
        file: INFO_DOC_DATEINAMEN_NAME,
        url: INFO_DOC_DATEINAMEN_URL,
      },
    ].concat(bplan.docs);
  }

  return {
    id,
    index,
    text,
    type,
    featuretype,
    selected,
    geometry,
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:EPSG::25832',
      },
    },
    properties: bplan,
  };
}

export function getPlanFeatureByGazObject(
  gazObjects,
  done = (result) => {
    console.log(result);
  }
) {
  return function (dispatch, getState) {
    const state = getState();
    let finalResults: any = [];

    let hit = state.bplaene.data.find((elem: any) => {
      return elem.text === gazObjects[0].more.v;
    });

    if (hit) {
      finalResults.push(hit);
    }

    done(finalResults);
  };
}

export const { setData } = slice.actions;

import { createSlice } from '@reduxjs/toolkit';
import { DOMAIN, SERVICE, STAC_SERVICE } from '../../constants/cids';
import { logout, setLoginInProgress, setStac } from './auth';

const initialState = {
  id: -1,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setKassenzeichen(state, action) {
      let test = action.payload.kassenzeichenObject;
      if (test) {
        state = test;
      }
      return state;
    },
  },
});

export default slice;

export const { setKassenzeichen } = slice.actions;

export const searchByKassenzeichenId = (kassenzeichenId, fitBounds) => {
  return function (dispatch, getState) {
    // dispatch(d3AvailabilityCheck());
    // dispatch(UiStateActions.setKassenzeichenSearchInProgress(true));
    // dispatch(UiStateActions.showWaiting(true, "Kassenzeichen laden ..."));
    const state = getState();
    let username = state.auth.user;
    let pass = state.auth.password;
    fetch(
      SERVICE +
        '/' +
        DOMAIN +
        '.KASSENZEICHEN/' +
        kassenzeichenId +
        '?role=all&omitNullValues=true&deduplicate=false',
      {
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + btoa(username + '@' + DOMAIN + ':' + pass),
          'Content-Type': 'application/json',
        },
      }
    )
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          response.json().then(function (kassenzeichenData) {
            // dispatch(UiStateActions.showWaiting(false));
            dispatch(
              setKassenzeichen({ kassenzeichenObject: kassenzeichenData })
            );
            // dispatch(
            //     RoutingActions.push(
            //         changeKassenzeichenInLocation(
            //             state.routing.location,
            //             kassenzeichenData.kassenzeichennummer8
            //         )
            //     )
            // );
            // switch (state.uiState.mode) {
            //     case APP_MODES.VERSIEGELTE_FLAECHEN: {
            //         createFeatureCollectionForFlaechen({
            //             dispatch,
            //             kassenzeichenData,
            //             changeRequestsEditMode: state.uiState.changeRequestsEditMode
            //         });
            //         break;
            //     }
            //     case APP_MODES.ESW:
            //         dispatch(
            //             MappingActions.setFeatureCollection(
            //                 getFrontenFeatureCollection(kassenzeichenData)
            //             )
            //         );
            //         break;
            //     case APP_MODES.INFO:
            //         dispatch(
            //             MappingActions.setFeatureCollection(
            //                 getKassenzeichenInfoFeatureCollection(kassenzeichenData)
            //             )
            //         );
            //         dispatch(MappingActions.setSelectedFeatureIndex(null));

            //         break;
            //     case APP_MODES.VERSICKERUNG:
            //         dispatch(
            //             MappingActions.setFeatureCollection(
            //                 getFlaechenFeatureCollection(kassenzeichenData)
            //             )
            //         );
            //         dispatch(MappingActions.setSelectedFeatureIndex(null));

            //         break;
            //     default:
            // }

            // dispatch(UiStateActions.setKassenzeichenSearchInProgress(false));
            // if (fitBounds) {
            //     dispatch(MappingActions.fitAll());
            // }
          });
        } else if (response.status === 401) {
          // dispatch(UiStateActions.showWaiting(false));
          // dispatch(AuthActions.invalidateLogin(username, pass, false));
          // dispatch(UiStateActions.setKassenzeichenSearchInProgress(false));
        }
      })
      .catch(function (err) {
        dispatch();
        // UiStateActions.showError(
        //     "Bem Öffnen des Kassenzeichens mit der Id " +
        //         kassenzeichenId +
        //         " ist ein Fehler aufgetreten. (" +
        //         err +
        //         ")"
        // )
        // dispatch(UiStateActions.setKassenzeichenSearchInProgress(false));
      });
  };
};

export const getKassenzeichenbySTAC = (stac, callback) => {
  return function (dispatch, getState) {
    let taskParameters = {
      parameters: {
        STAC: stac,
      },
    };
    let fd = new FormData();
    fd.append(
      'taskparams',
      new Blob([JSON.stringify(taskParameters)], {
        type: 'application/json',
      })
    );
    dispatch(logout());
    dispatch(setLoginInProgress({ loginInProgressTextInfo: 'Anmelden ...' }));
    const url =
      STAC_SERVICE +
      '/actions/' +
      DOMAIN +
      '.getMyKassenzeichen/tasks?role=all&resultingInstanceType=result';
    fetch(url, {
      method: 'post',
      body: fd,
    })
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          response.json().then(function (actionResult) {
            const kassenzeichenData = JSON.parse(actionResult.res);

            if (kassenzeichenData.nothing) {
              dispatch(logout());
              if (typeof callback === 'function') {
                callback(false);
              }
            } else {
              dispatch(
                setKassenzeichen({ kassenzeichenObject: kassenzeichenData })
              );
              // const flaechenFC = getFlaechenFeatureCollection(kassenzeichenData);
              // const annoFC = getAnnotationFeatureCollection(
              //     kassenzeichenData.aenderungsanfrage
              // );

              // dispatch(
              //     MappingActions.setFeatureCollection([...flaechenFC, ...annoFC])
              // );

              // dispatch(
              // 	MappingActions.setFeatureCollection(
              // 		getFlaechenFeatureCollection(kassenzeichenData)
              // 	)
              // );
              // dispatch(MappingActions.setSelectedFeatureIndex(null));
              // dispatch(MappingActions.fitAll());
              dispatch(setStac(stac));
              // dispatch(
              //     getFEBByStac(
              //         stac,
              //         blob => {
              //             dispatch(UiStateActions.setFebBlob(blob));
              //         },
              //         true
              //     )
              // );

              if (typeof callback === 'function') {
                callback(true);
              }
            }
          });
        } else {
          //Errorhandling
          dispatch(logout());
          if (typeof callback === 'function') {
            callback(false);
          }
          // dispatch(UiStateActions.showError("Bei der Suche nach dem Kassenzeichen " + kassenzeichen + " ist ein Fehler aufgetreten. ( ErrorCode: " + response.status + ")"));
          // dispatch(UiStateActions.setKassenzeichenSearchInProgress(false));
        }
      })
      .catch(function (err) {
        // dispatch(UiStateActions.showError("Bei der Suche nach dem Kassenzeichen " + kassenzeichen + " ist ein Fehler aufgetreten. (" + err + ")"));
        // dispatch(UiStateActions.setKassenzeichenSearchInProgress(false));
        console.log('Error in action' + err);
        dispatch(logout());
        if (typeof callback === 'function') {
          callback(false);
        }
      });
  };
};

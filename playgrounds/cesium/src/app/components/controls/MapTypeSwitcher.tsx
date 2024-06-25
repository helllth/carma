import { MouseEvent, ReactNode, useContext, useState } from 'react';
import { useCesium } from 'resium';
import OnMapButton from './OnMapButton';
import {
  Cartesian3,
  Cartographic,
  Math as CeMath,
  defined,
  HeadingPitchRange,
  Viewer,
} from 'cesium';
import {
  cesiumCenterPixelSizeToLeafletZoom,
  getCameraHeightAboveGround,
  getTopDownCameraDeviationAngle,
  pickViewerCanvasCenter,
} from '../../utils/cesiumHelpers';
import { useDispatch } from 'react-redux';
import { useViewerIsMode2d, setIsMode2d } from '../../store/slices/viewer';
import { setLeafletView } from '../CustomViewer/utils';

import { TopicMapContext } from 'react-cismap/contexts/TopicMapContextProvider';
import { CameraPositionAndOrientation } from '../../..';
import { animateInterpolateHeadingPitchRange } from '../../utils/cesiumAnimations';
import { DEFAULT_MODE_2D_3D_CHANGE_FADE_DURATION } from '../../config';

type Props = {
  zoomSnap?: 0 | 1 | 0.5 | 0.25 | 0.125 | 0.0625 | 0.03125 | 0.015625;
  children?: ReactNode;
};

export const MapTypeSwitcher = ({ zoomSnap = 1 }: Props = {}) => {
  const { viewer } = useCesium();
  const dispatch = useDispatch();
  const isMode2d = useViewerIsMode2d();

  const [prevCamera3d, setPrevCamera3d] =
    useState<CameraPositionAndOrientation | null>(null);
  const [prevCamera2dPosition, setPrevCamera2dPosition] =
    useState<Cartesian3 | null>(null);
  const [prevHPR, setPrevHPR] = useState<HeadingPitchRange | null>(null);
  const [prevDuration, setPrevDuration] = useState<number>(0);
  // TODO provide mapFramework context via props for UI?
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topicMapContext: any = useContext(TopicMapContext);
  const leaflet = topicMapContext?.routedMapRef?.leafletMap?.leafletElement;

  const transitionToMode2d = (viewer: Viewer) => {
    // TODO consolidate this logic into a shared helper function
    const groundPos = pickViewerCanvasCenter(viewer);
    let latitude: number, longitude: number;
    let height = viewer.camera.positionCartographic.height;
    let distance = height;
    const hasGroundPos = defined(groundPos);
    if (hasGroundPos) {
      /*
           viewer.entities.removeById('groundPoint');
           viewer.entities.add({
             id: 'groundPoint',
             position: groundPos,
             point: {
               pixelSize: 40,
               color: Color.RED,
             },
           });
           */
      const pos = pickViewerCanvasCenter(viewer);
      const cartographic = Cartographic.fromCartesian(pos);
      longitude = CeMath.toDegrees(cartographic.longitude);
      latitude = CeMath.toDegrees(cartographic.latitude);
      distance = Cartesian3.distance(pos, viewer.camera.position);
      height = cartographic.height + distance;
    } else {
      console.info('scene above horizon, using camera position as reference');
      // use camera position if horizon is not visible
      const cartographic = Cartographic.fromCartesian(viewer.camera.position);
      longitude = CeMath.toDegrees(cartographic.longitude);
      latitude = CeMath.toDegrees(cartographic.latitude);
    }

    // evaluate angles for animation duration

    // don't store camera position if pitch is near nadir
    if (Math.abs(viewer.camera.pitch + Math.PI / 2) > 0.05) {
      console.log(
        'last camera pitch',
        viewer.camera.pitch,
        viewer.camera.pitch + Math.PI / 2
      );
      setPrevCamera3d({
        position: viewer.camera.position.clone(),
        direction: viewer.camera.direction.clone(),
        up: viewer.camera.up.clone(),
      });
    } else {
      setPrevCamera3d(null);
    }

    // move the leaflet view to start position of animation to already allow fetching tiles if close
    //setLeafletView(viewer, leaflet);

    let zoomDiff = 0;

    if (zoomSnap) {
      // Move the cesium camera to the next integer zoom level of leaflet before transitioning
      const currentZoom = cesiumCenterPixelSizeToLeafletZoom(viewer).value;

      if (currentZoom === null) {
        console.error('could not determine current zoom level');
      } else {
        // go to the next integer zoom level
        // smaller values is further away
        const targetZoom =
          currentZoom % 1 < 0.75 // prefer zooming out
            ? Math.floor(currentZoom)
            : Math.ceil(currentZoom);
        zoomDiff = currentZoom - targetZoom;
        const heightFactor = Math.pow(2, zoomDiff);
        //const { groundHeight } = getCameraHeightAboveGround(viewer);

        distance = distance * heightFactor;
        //height = groundHeight + distance;
      }
    }

    const duration = getTopDownCameraDeviationAngle(viewer) * 2 + zoomDiff * 1;
    setPrevDuration(duration);

    const onComplete = () => {
      setLeafletView(viewer, leaflet, { animate: false, zoomSnap });
      setPrevCamera2dPosition(viewer.camera.position.clone());
      // trigger the visual transition
      dispatch(setIsMode2d(true));
    };

    console.log('duration', distance);

    if (hasGroundPos) {
      // rotate around the groundpositiob at center
      setPrevHPR(
        animateInterpolateHeadingPitchRange(
          viewer,
          groundPos,
          new HeadingPitchRange(0, -Math.PI / 2, distance),
          {
            duration: duration * 1000,
            onComplete,
          }
        )
      );
    } else {
      console.info('rotate around camera position not implemented yet');
      /*
           // TODO implement this
           // rotate around the camera position
           animateInterpolateHeadingPitchRange(
             viewer,
             viewer.camera.position,
             new HeadingPitchRange(
               0,
               -Math.PI / 2,
               height - viewer.camera.positionCartographic.height
             ),
             {
               duration: duration * 1000,
               onComplete,
             }
           );
           */
    }
  };

  const handleSwitchMapMode = async (e: MouseEvent) => {
    e.preventDefault();

    if (viewer) {
      if (isMode2d) {
        dispatch(setIsMode2d(false));

        if (
          prevCamera2dPosition &&
          Cartesian3.equals(viewer.camera.position, prevCamera2dPosition) !==
            true
        ) {
          console.log(
            'camera position changed, skipping 2d to 3d transition animation'
          );
          return;
        }

        //console.log('restore 3d camera position');
        prevHPR &&
          animateInterpolateHeadingPitchRange(
            viewer,
            pickViewerCanvasCenter(viewer),
            prevHPR,
            {
              delay: DEFAULT_MODE_2D_3D_CHANGE_FADE_DURATION, // allow the css transition to finish
              duration: prevDuration * 1000,
            }
          );
      } else {
        transitionToMode2d(viewer);
      }
    }
  };

  return (
    <OnMapButton
      title={isMode2d ? 'zur 3D Ansicht wechseln' : 'zur 2D Ansicht wechseln'}
      onClick={handleSwitchMapMode}
    >
      {isMode2d ? '3D' : '2D'}
    </OnMapButton>
  );
};

export default MapTypeSwitcher;

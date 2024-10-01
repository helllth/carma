import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BoundingSphere, Cartesian3, Math as CeMath } from "cesium";

import {
  setIsAnimating,
  useCesiumCustomViewer,
  useScreenSpaceCameraControllerEnableCollisionDetection,
  useViewerIsMode2d,
} from "../../CustomViewerContextProvider";
import { pickViewerCanvasCenter } from "../../utils/cesiumHelpers";

const CESIUM_CAMERA_MIN_PITCH = CeMath.toRadians(-20);
const CESIUM_CAMERA_MIN_PITCH_RESET_TO = CeMath.toRadians(-30);

const useCameraLimiter = () => {
  const { viewer } = useCesiumCustomViewer();
  const dispatch = useDispatch();
  const isMode2d = useViewerIsMode2d();
  const collisions = useScreenSpaceCameraControllerEnableCollisionDetection();
  useEffect(() => {
    if (viewer) {
      console.log(
        "HOOK [2D3D|CESIUM] viewer changed add new Cesium MoveEnd Listener to reset rolled camera",
      );
      const moveEndListener = async () => {
        console.log("HOOK [2D3D|CESIUM] xxx", viewer.camera.pitch, isMode2d);
        if (viewer.camera.position && !isMode2d) {
          console.log("HOOK [2D3D|CESIUM] xxx", viewer.camera.pitch);
          const rollDeviation =
            Math.abs(CeMath.TWO_PI - viewer.camera.roll) % CeMath.TWO_PI;

          if (rollDeviation > 0.02) {
            console.log(
              "LISTENER HOOK [2D3D|CESIUM|CAMERA]: flyTo reset roll 2D3D",
              rollDeviation,
            );
            const duration = Math.min(rollDeviation, 1);
            dispatch(setIsAnimating(true));
            viewer.camera.flyTo({
              destination: viewer.camera.position,
              orientation: {
                heading: viewer.camera.heading,
                pitch: viewer.camera.pitch,
                roll: 0,
              },
              duration,
              complete: () => dispatch(setIsAnimating(false)),
            });
          }
          const preventLookingUp =
            collisions && viewer.camera.pitch > CESIUM_CAMERA_MIN_PITCH;
          if (preventLookingUp && collisions) {
            console.log(
              "LISTENER HOOK [2D3D|CESIUM|CAMERA]: reset pitch",
              viewer.camera.pitch,
            );
            const centerPos = pickViewerCanvasCenter(viewer).scenePosition;
            if (centerPos) {
              dispatch(setIsAnimating(true));
              const distance = Cartesian3.distance(
                centerPos,
                viewer.camera.position,
              );
              viewer.camera.flyToBoundingSphere(
                new BoundingSphere(centerPos, distance),
                {
                  offset: {
                    heading: viewer.camera.heading,
                    pitch: CESIUM_CAMERA_MIN_PITCH_RESET_TO,
                    range: distance,
                  },
                  duration: 1.5,
                  complete: () => dispatch(setIsAnimating(false)),
                },
              );
            }
          }
        }
      };
      viewer.camera.moveEnd.addEventListener(moveEndListener);
      return () => {
        viewer.camera.moveEnd.removeEventListener(moveEndListener);
      };
    }
  }, [viewer, collisions, isMode2d, dispatch]);
};

export default useCameraLimiter;

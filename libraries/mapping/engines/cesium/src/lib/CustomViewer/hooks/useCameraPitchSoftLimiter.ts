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

const useCameraPitchSoftLimiter = (
  minPitchDeg = 20,
  resetPitchOffsetDeg = 5,
) => {
  const { viewer } = useCesiumCustomViewer();
  const dispatch = useDispatch();
  const isMode2d = useViewerIsMode2d();
  const collisions = useScreenSpaceCameraControllerEnableCollisionDetection();
  const resetPitchRad = CeMath.toRadians(-(minPitchDeg + resetPitchOffsetDeg));
  const minPitchRad = CeMath.toRadians(-minPitchDeg);

  useEffect(() => {
    if (viewer && !isMode2d && collisions) {
      console.log(
        "HOOK [2D3D|CESIUM] viewer changed add new Cesium MoveEnd Listener to correct camera pitch",
      );
      const moveEndListener = async () => {
        console.log(
          "HOOK [2D3D|CESIUM] Soft Pitch Limiter",
          viewer.camera.pitch,
          minPitchRad,
          resetPitchRad,
        );
        const isPitchTooLow = collisions && viewer.camera.pitch > minPitchRad;
        if (isPitchTooLow) {
          console.log(
            "LISTENER HOOK [2D3D|CESIUM|CAMERA]: reset pitch soft",
            viewer.camera.pitch, resetPitchRad
          );
          // TODO Get CenterPos Lower from screen if distance is muliple of elevation. prevent pitch around distant point on horizon
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
                  pitch: resetPitchRad,
                  range: distance,
                },
                duration: 1.5,
                complete: () => dispatch(setIsAnimating(false)),
              },
            );
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

export default useCameraPitchSoftLimiter;
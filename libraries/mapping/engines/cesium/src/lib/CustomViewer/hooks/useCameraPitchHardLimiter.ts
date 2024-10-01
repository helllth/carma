import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Math as CeMath, Cartographic } from "cesium";

import {
  useCesiumCustomViewer,
  useScreenSpaceCameraControllerEnableCollisionDetection,
  useViewerIsMode2d,
} from "../../CustomViewerContextProvider";

const useCameraPitchHardLimiter = (minPitch = CeMath.toRadians(-(30))) => {
  const { viewer } = useCesiumCustomViewer();
  const dispatch = useDispatch();
  const isMode2d = useViewerIsMode2d();
  const collisions = useScreenSpaceCameraControllerEnableCollisionDetection();
  const lastPitch = useRef<number | null>(null);
  const lastPosition = useRef<Cartographic | null>(null);
  const clearLast = () => {
    lastPitch.current = null;
    lastPosition.current = null;
  };
  useEffect(() => {
    if (viewer && collisions && !isMode2d) {
      const { camera, scene } = viewer;
      console.log(
        "HOOK [2D3D|CESIUM] viewer changed add new Cesium MoveEnd Listener to limit camera pitch",
      );
      clearLast();
      const onUpdate = async () => {
        const isPitchTooLow = camera.pitch > minPitch;
        if (isPitchTooLow) {
          console.log(
            "LISTENER HOOK [2D3D|CESIUM|CAMERA]: reset pitch",
            camera.pitch,
            minPitch,
          );
          if (lastPitch.current !== null && lastPosition.current !== null) {
            const { latitude, longitude } = camera.positionCartographic;
            const lastHeight = lastPosition.current.height;
            camera.setView({
              destination: Cartographic.toCartesian(
                new Cartographic(longitude, latitude, lastHeight),
              ),
              orientation: {
                heading: camera.heading,
                pitch: minPitch,
                roll: camera.roll,
              },
            });
          }
        }
        lastPitch.current = viewer.camera.pitch;
        lastPosition.current = viewer.camera.positionCartographic.clone();
      };
      scene.preUpdate.addEventListener(onUpdate);
      return () => {
        scene.preUpdate.removeEventListener(onUpdate);
      };
    }
  }, [viewer, minPitch, collisions, isMode2d, dispatch]);
};

export default useCameraPitchHardLimiter;

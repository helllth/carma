import { useEffect } from "react";
import {
  useCesiumContext,
  useViewerIsAnimating,
  useViewerIsTransitioning,
} from "../../CesiumContextProvider";

const useDisableSSCC = () => {
  const { viewer } = useCesiumContext();
  const isAnimating = useViewerIsAnimating();
  const isTransitioning = useViewerIsTransitioning();
  useEffect(() => {
    if (!viewer) return;
    const isEnabled = !isAnimating && !isTransitioning;
    if (!isEnabled) {
      console.info(
        "HOOK [CESIUM|SCENE|SSCC] map interaction disabled during animations and transitions",
        isEnabled,
      );
    }
    viewer.scene.screenSpaceCameraController.enableRotate = isEnabled;
    viewer.scene.screenSpaceCameraController.enableZoom = isEnabled;
    viewer.scene.screenSpaceCameraController.enableTilt = isEnabled;
  }, [viewer, isAnimating, isTransitioning]);
};

export default useDisableSSCC;

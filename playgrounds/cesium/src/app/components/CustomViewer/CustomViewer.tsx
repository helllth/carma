import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import {
  Color,
  HeadingPitchRange,
  Viewer,
  BoundingSphere,
  Cartesian3,
  Math as CeMath,
} from 'cesium';
import { Viewer as ResiumViewer } from 'resium';
import Crosshair from '../UI/Crosshair';
import SearchWrapper from './components/SearchWrapper';

import {
  setShowPrimaryTileset,
  setShowSecondaryTileset,
  useGlobeBaseColor,
  useShowSecondaryTileset,
  useViewerHome,
  useViewerHomeOffset,
} from '../../store/slices/viewer';
import { BaseTilesets } from './components/BaseTilesets';
import ControlsUI from './components/ControlsUI';
import { decodeSceneFromLocation, encodeScene } from './utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCesiumViewerZoomLevel } from '../../utils/cesiumHelpers';
import ResizableIframe from './components/ResizeIframe';
import { setupSecondaryStyle } from './components/baseTileset.hook';
import { useDispatch } from 'react-redux';

type CustomViewerProps = {
  children?: ReactNode;
  className?: string;
  postInit?: () => void;

  // Init
  homeOrientation?: HeadingPitchRange;
  // UI
  showControls?: boolean;
  showDebug?: boolean;
  showHome?: boolean;
  showLockCenter?: boolean;
  showOrbit?: boolean;
  showCrosshair?: boolean;

  // override resium UI defaults
  infoBox?: boolean;
  selectionIndicator?: boolean;

  //disableZoomRestrictions?: boolean; // todo
  //minZoom?: number; // todo

  globeColor?: Color;
};

function CustomViewer(props: CustomViewerProps) {
  const home = useViewerHome();
  const homeOffset = useViewerHomeOffset();
  const globeBaseColor = useGlobeBaseColor();
  const isSecondaryStyle = useShowSecondaryTileset();
  const [showLeaflet, setShowLeaflet] = useState(false);
  //const isAnimating = useViewerIsAnimating();

  const {
    children,
    className,
    showCrosshair = true,
    showControls = true,
    showHome = true,
    showOrbit = true,
    showDebug = true,

    infoBox = false,
    selectionIndicator = false,

    globeColor = globeBaseColor,
  } = props;

  const [viewer, setViewer] = useState<Viewer | null>(null);

  const viewerRef = useCallback((node) => {
    if (node !== null) {
      setViewer(node.cesiumElement);
    }
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const [initialHash, setInitialHash] = useState<string | null>(null);
  const [sceneHash, setSceneHash] = useState<string | null>(null);
  const dispatch = useDispatch();

  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    if (viewer && initialHash === null) {
      let sceneFromHashParams;
      setInitialHash(window.location.hash ?? '');
      if (window.location.hash) {
        sceneFromHashParams = decodeSceneFromLocation(
          window.location.hash.split('?')[1]
        );
      }
      const { longitude, latitude, height, heading, pitch, isSecondaryStyle } =
        sceneFromHashParams;

      if (isSecondaryStyle) {
        if (isSecondaryStyle) {
          setupSecondaryStyle(viewer);
          dispatch(setShowPrimaryTileset(false));
          dispatch(setShowSecondaryTileset(true));
        }
      }

      //console.log('sceneCamera', sceneCamera);
      if (sceneFromHashParams && longitude && latitude) {
        viewer.camera.setView({
          destination: Cartesian3.fromRadians(
            longitude,
            latitude,
            height ?? 1000 // restore height if missing
          ),
          orientation: {
            heading: heading ?? 0,
            pitch: pitch ?? -Math.PI / 2,
          },
        });
        //sceneCamera.isAnimating && dispatch(toggleIsAnimating());
      } else {
        viewer.camera.lookAt(home, homeOffset);
        viewer.camera.flyToBoundingSphere(new BoundingSphere(home, 500), {
          duration: 2,
        });
      }
    }
  }, [viewer]);

  useEffect(() => {
    console.log('HOOK: hashlocation or path changed');
    if (sceneHash) {
      const currentHash = location.pathname;
      const hashRouterPart = currentHash.split('?')[0];
      navigate(`${hashRouterPart}?${sceneHash}`, { replace: true });
    }
  }, [location.pathname, sceneHash]);

  useEffect(() => {
    if (!viewer) return;
    // set the globe color
    console.log('HOOK: init or globeColor changed');
    const { scene } = viewer;
    scene.globe.baseColor = globeColor;
    viewer.imageryLayers.removeAll();
    scene.screenSpaceCameraController.enableCollisionDetection = true;
  }, [viewer, globeColor]);

  useEffect(() => {
    if (!viewer) return;
    // remove default imagery
    const { camera } = viewer;

    const moveEndListener = async () => {
      if (camera.position) {
        const zoom = await getCesiumViewerZoomLevel(viewer);
        const newSceneHash = encodeScene({
          camera,
          webMercatorZoomEquivalent: zoom,
          isSecondaryStyle,
        });
        setSceneHash(newSceneHash);
        const headingInDegrees = CeMath.toDegrees(camera.heading);
        const pitchInDegrees = CeMath.toDegrees(camera.pitch);
        const tolerance = 5;
        if (
          (headingInDegrees % 360 >= 360 - tolerance ||
            headingInDegrees % 360 <= tolerance) &&
          pitchInDegrees <= tolerance - 90
        ) {
          setShowLeaflet(true);
          //console.log('scene', scene);
          if (zoom !== Infinity) {
            const leafletUrl = `https://carma-dev-deployments.github.io/topicmaps-kulturstadtplan/#/?${newSceneHash}`;
            //console.info('view in leaflet:', `https://carma-dev-deployments.github.io/topicmaps-kulturstadtplan/#/?${scene}`);
            setIframeSrc(leafletUrl);
          }
        } else {
          setShowLeaflet(false);
        }
      }
    };

    viewer.camera.moveEnd.addEventListener(moveEndListener);
    return () => {
      viewer.camera.moveEnd.removeEventListener(moveEndListener);
    };
  }, [viewer, isSecondaryStyle]);

  return (
    <ResiumViewer
      ref={viewerRef}
      className={className}
      // Resium ViewerOtherProps
      full // equals style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}`
      // Cesium Props
      // see https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions for defaults

      // quality and performance
      msaaSamples={2}
      useBrowserRecommendedResolution={false} // crisper image, does not ignore devicepixel ratio
      // resolutionScale={window.devicePixelRatio} // would override dpr
      scene3DOnly={true} // No 2D map resources loaded
      // sceneMode={SceneMode.SCENE3D} // Default but explicit

      // hide UI
      animation={false}
      baseLayerPicker={false}
      fullscreenButton={false}
      geocoder={false}
      homeButton={false}
      infoBox={false}
      sceneModePicker={false}
      selectionIndicator={selectionIndicator}
      timeline={false}
      navigationHelpButton={false}
      navigationInstructionsInitiallyVisible={false}
    >
      <BaseTilesets />
      {children}
      {showControls && (
        <ControlsUI
          showDebug={showDebug}
          showHome={showHome}
          showOrbit={showOrbit}
          searchComponent={<SearchWrapper />}
        />
      )}
      {showCrosshair && <Crosshair lineColor="white" />}
      {showLeaflet && iframeSrc && <ResizableIframe iframeSrc={iframeSrc} />}
    </ResiumViewer>
  );
}

export default CustomViewer;

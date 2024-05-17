import React, { useCallback, useEffect, useState } from 'react';
import {
  BoundingSphere,
  Cartesian3,
  Color,
  HeadingPitchRange,
  Viewer,
} from 'cesium';
import { CameraFlyToBoundingSphere, Viewer as ResiumViewer } from 'resium';
import Crosshair from './Crosshair';
import OrbitControl from './controls/OrbitControl';
import ControlContainer from './controls/ControlContainer';
import HomeControl from './controls/HomeControl';
import ZoomControls from './controls/ZoomControls';
import LockCenterControl from './controls/LockCenterControl';
import ControlGroup from './controls/ControlGroup';
import DebugInfo from './controls/DebugInfo';

type CustomViewerProps = {
  children?: React.ReactNode;
  className?: string;
  postInit?: () => void;

  // Init
  initialPos?: Cartesian3;
  homePos?: Cartesian3;
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

  // slots
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  bottomRight?: React.ReactNode;

  //disableZoomRestrictions?: boolean; // todo
  //minZoom?: number; // todo

  globeColor?: Color;
};

function CustomViewer(props: CustomViewerProps) {
  const {
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    children,
    className,
    showCrosshair = true,
    initialPos,
    homePos,
    //homeOrientation = new HeadingPitchRange(0, CMath.toRadians(-45), 500),
    showControls = true,
    showHome = true,
    //showLockCenter = true,
    showOrbit = true,
    showDebug = true,

    infoBox = false,
    selectionIndicator = false,
    globeColor = Color.TEAL,
  } = props;

  const [viewer, setViewer] = useState<Viewer | null>(null);

  const viewerRef = useCallback((node) => {
    if (node !== null) {
      setViewer(node.cesiumElement);
    }
  }, []);

  useEffect(() => {
    if (!viewer) return;

    // remove default imagery
    viewer.imageryLayers.removeAll();
    // set the globe color
    viewer.scene.globe.baseColor = globeColor;

    viewer.scene.screenSpaceCameraController.enableCollisionDetection = true;

    const moveEndListener = () => {
      console.log('moveEndListener');
      if (viewer) {
        /*
        const position = getCanvasCenter(viewer);
        const cartographicPosition = Cartographic.fromCartesian(position);
        const height = cartographicPosition.height;
        console.log(
          'Height at screen center:',
          height,
          position,
          cartographicPosition
        );
        */
      }
    };

    viewer.camera.moveEnd.addEventListener(moveEndListener);

    return () => {
      viewer.camera.moveEnd.removeEventListener(moveEndListener);
    };
  }, [viewer]);

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
      infoBox={infoBox}
      sceneModePicker={false}
      selectionIndicator={selectionIndicator}
      timeline={false}
      navigationHelpButton={false}
      navigationInstructionsInitiallyVisible={false}
    >
      {initialPos && viewer && (
        <CameraFlyToBoundingSphere
          boundingSphere={new BoundingSphere(initialPos, 150)}
          duration={0}
        />
      )}
      {children}
      {showControls && (
        <div className={'leaflet-control-container'}>
          <ControlContainer position="topleft">
            <ZoomControls />
            {
              //showHome && <button onClick={handleHomeClick}>Home</button>
              showHome && homePos && (
                <ControlGroup>
                  <HomeControl home={homePos} />
                </ControlGroup>
              )
            }
            {showOrbit && (
              <ControlGroup>
                <OrbitControl />
              </ControlGroup>
            )}
            <ControlGroup>
              <LockCenterControl />
            </ControlGroup>
            {topLeft}
          </ControlContainer>

          {(topRight || showDebug) && (
            <ControlContainer position="topright">
              <ControlGroup
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <DebugInfo />
              </ControlGroup>

              {topRight}
            </ControlContainer>
          )}
          {bottomLeft && (
            <ControlContainer position="bottomleft">
              {bottomLeft}
            </ControlContainer>
          )}
          {bottomRight && (
            <ControlContainer position="bottomright">
              {bottomRight}
            </ControlContainer>
          )}
        </div>
      )}
      {showCrosshair && <Crosshair lineColor="white" />}
    </ResiumViewer>
  );
}

export default CustomViewer;

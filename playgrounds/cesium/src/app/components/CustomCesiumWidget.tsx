import React, { useEffect, useRef } from 'react';
import {
  CesiumWidget,
  Cesium3DTileset,
  Cartesian3,
  BoundingSphere,
  Color,
  PointPrimitiveCollection,
  DebugModelMatrixPrimitive,
  Transforms,
  ClippingPolygon,
  ClippingPolygonCollection,
  CustomShader,
} from 'cesium';
import { WUPP3D } from '../config/dataSources.config';
import { generateRingFromDegrees } from '../utils/cesiumHelpers';
import { LatLngRadians, LatLngRecord } from '../..';
import { CUSTOM_SHADERS_DEFINITIONS } from '../utils/cesiumShaders';

const unlit = new CustomShader(CUSTOM_SHADERS_DEFINITIONS.UNLIT);

const addDebugPrimitives = (widget: CesiumWidget, cartesian: Cartesian3) => {
  const pointCollection = new PointPrimitiveCollection();

  pointCollection.add({
    position: cartesian,
    color: Color.YELLOW,
    pixelSize: 20,
  });

  widget.scene.primitives.add(pointCollection);

  widget.scene.primitives.add(
    new DebugModelMatrixPrimitive({
      modelMatrix: Transforms.eastNorthUpToFixedFrame(cartesian),
      length: 100.0,
      show: true,
      width: 10.0,
    })
  );
};

const addTilesetAsync = (
  widget: CesiumWidget,
  tilesetUrl: string,
  { clippingPolygon }: { clippingPolygon?: ClippingPolygon } = {}
) => {
  let tileset: Cesium3DTileset | undefined;

  (async () => {
    console.log('Loading tileset:', tilesetUrl);
    tileset = await Cesium3DTileset.fromUrl(tilesetUrl, {
      maximumScreenSpaceError: 8,
      baseScreenSpaceError: 64,
      //foveatedScreenSpaceError: false,
      //dynamicScreenSpaceError: false,
      //skipLevels: 2,
      //preferLeaves: true,
      //preloadWhenHidden: false,
      clippingPolygons: clippingPolygon
        ? new ClippingPolygonCollection({
            polygons: [clippingPolygon],
            inverse: true,
          })
        : undefined,
    });

    tileset.customShader = unlit;
    //tileset.style = style;
    widget.scene.primitives.add(tileset);
  })();

  return tileset;
};

const CustomCesiumWidget: React.FC<{
  pixelSize?: { width: number; height: number };
  position?: { longitude: number; latitude: number; height?: number };
  range?: number;
  clip?: boolean | LatLngRecord[];
  tilesetUrl?: string;
  debug?: boolean;
  orthographic?: boolean;
}> = ({
  clip = false,
  orthographic = false,
  pixelSize = { width: 1024, height: 1024 },
  range = 30,
  tilesetUrl = WUPP3D.url,
  position = { longitude: 7.201578, latitude: 51.256565, height: 335 },
  debug = true,
} = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<CesiumWidget | null>(null);

  useEffect(() => {
    if (containerRef.current && !widgetRef.current) {
      const widget = new CesiumWidget(containerRef.current, {
        scene3DOnly: true,
        baseLayer: false,
        skyBox: false,
        skyAtmosphere: false,
        globe: false,
        msaaSamples: 4,
        //useDefaultRenderLoop: true,
      });

      widgetRef.current = widget;

      widget.scene.backgroundColor = Color.TRANSPARENT;
      //widget.scene.globe.show = false;
      //widget.scene.skyBox.show = false;

      //const gl = widget.canvas.getContext('webgl');
      //gl && gl.clearColor(0.0, 0.0, 0.0, 0.0);

      const { longitude, latitude, height } = position;
      const cartesian = Cartesian3.fromDegrees(longitude, latitude, height);

      if (debug) {
        addDebugPrimitives(widget, cartesian);
      }

      widget.camera.viewBoundingSphere(
        new BoundingSphere(cartesian, range ?? 50)
      );

      //change after setting view
      orthographic && widget.camera.switchToOrthographicFrustum();

      const ringCoords = generateRingFromDegrees({ longitude, latitude }, range * 0.7);

      const ring = clip
        ? new ClippingPolygon({
            positions: ringCoords.map((coord: LatLngRadians) =>
              Cartesian3.fromRadians(coord.lngRad, coord.latRad)
            ),
          })
        : undefined;

      const tileset = addTilesetAsync(widget, tilesetUrl, {
        clippingPolygon: ring,
      });

      return () => {
        if (widgetRef.current) {
          widgetRef.current.scene.primitives.destroy();
          tileset && tileset.destroy();
          widgetRef.current.destroy();
        }
      };
    }
  }, [tilesetUrl, position, debug, range, orthographic]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${pixelSize.width}px`,
        height: `${pixelSize.height}px`,
        backgroundColor: 'transparent',
      }}
    />
  );
};

export default CustomCesiumWidget;

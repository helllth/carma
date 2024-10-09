import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CesiumTerrainProvider, ClassificationType, Color } from "cesium";
import {
  setShowPrimaryTileset,
  setShowSecondaryTileset,
} from "../../CesiumContextProvider/slices/cesium";
import { SceneStyles } from "../../..";
import { getGroundPrimitiveById } from "../../utils/cesiumGroundPrimitives";
import {
  CesiumContextType,
  useCesiumContext,
} from "../../CesiumContextProvider/CesiumContextProvider";

// TODO move combined common setup out of here

// TODO MOVE THE ID into viewer config/state
const INVERTED_SELECTED_POLYGON_ID = "searchgaz-inverted-polygon";

const setupPrimaryStyle = ({
  viewer,
  terrainProvider,
  surfaceProvider,
  imageryLayer,
}: CesiumContextType) => {
  (async () => {
    if (!viewer) return;
    viewer.scene.globe.baseColor = Color.DARKGRAY;

    if (viewer.scene.terrainProvider instanceof CesiumTerrainProvider) {
      //viewer.scene.terrainProvider = ellipsoidTerrainProvider;
    } else {
      if (surfaceProvider) {
        viewer.scene.terrainProvider = surfaceProvider;
      }
    }
    // viewer.scene.globe.depthTestAgainstTerrain = false;

    if (imageryLayer) {
      imageryLayer.show = false;
    }

    const invertedSelection = getGroundPrimitiveById(
      viewer,
      INVERTED_SELECTED_POLYGON_ID,
    );
    if (invertedSelection) {
      invertedSelection.classificationType = ClassificationType.CESIUM_3D_TILE;
    }

    viewer.scene.requestRender();
  })();
};

export const setupSecondaryStyle = ({
  viewer,
  terrainProvider,
  imageryLayer,
}) => {
  if (!viewer) return;
  (async () => {
    viewer.scene.globe.baseColor = Color.WHITE;

    // console.log('setupSecondaryStyle', viewer.scene.terrainProvider);
    if (
      !(viewer.scene.terrainProvider instanceof CesiumTerrainProvider) &&
      terrainProvider
    ) {
      viewer.scene.terrainProvider = terrainProvider;
    }
    // DEPTH TEST is quite slow, only use if really necessary
    // viewer.scene.globe.depthTestAgainstTerrain = true;
    // viewer.scene.globe.show = false;

    if (imageryLayer.ready) {
      imageryLayer.show = true;
      // console.log('Secondary Style Setup: add imagery layer');
      if (viewer.imageryLayers.length === 0) {
        console.log("Secondary Style Setup: add imagery layer");
        viewer.imageryLayers.add(imageryLayer);
      }
    }

    const invertedSelection = getGroundPrimitiveById(
      viewer,
      INVERTED_SELECTED_POLYGON_ID,
    );
    if (invertedSelection) {
      invertedSelection.classificationType = ClassificationType.BOTH;
    }

    viewer.scene.requestRender();
    // viewer.scene.globe.show = true;
  })();
};

export const useSceneStyleToggle = (
  initialStyle: keyof SceneStyles = "secondary",
) => {
  const dispatch = useDispatch();
  const [currentStyle, setCurrentStyle] =
    useState<keyof SceneStyles>(initialStyle);
  const context = useCesiumContext();
  const { viewer } = context;

  useEffect(() => {
    if (!viewer) return;

    if (currentStyle === "primary") {
      setupPrimaryStyle(context);
      dispatch(setShowPrimaryTileset(true));
      dispatch(setShowSecondaryTileset(false));
    } else {
      setupSecondaryStyle(context);
      dispatch(setShowPrimaryTileset(false));
      dispatch(setShowSecondaryTileset(true));
    }
  }, [dispatch, viewer, currentStyle, context]);

  const toggleSceneStyle = (style?: "primary" | "secondary") => {
    if (style) {
      setCurrentStyle(style);
    } else {
      setCurrentStyle((prev) => (prev === "primary" ? "secondary" : "primary"));
    }
  };

  return toggleSceneStyle;
};

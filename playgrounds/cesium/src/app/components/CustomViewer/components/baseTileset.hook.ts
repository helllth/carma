import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCesium } from 'resium';
import {
  CesiumTerrainProvider,
  EllipsoidTerrainProvider,
  ImageryLayer,
  Viewer,
  WebMapServiceImageryProvider,
} from 'cesium';
import {
  SceneStyles,
  setShowPrimaryTileset,
  setShowSecondaryTileset,
} from '../../../store/slices/viewer';
import {
  BASEMAP_METROPOLRUHR_WMS_GRAUBLAU,
  WUPP_TERRAIN_PROVIDER,
} from '../../../config/dataSources.config';

const ellipsoidTerrainProvider = new EllipsoidTerrainProvider({});
const wuppTerrainProvider = CesiumTerrainProvider.fromUrl(
  WUPP_TERRAIN_PROVIDER.url
);
const provider = new WebMapServiceImageryProvider(
  BASEMAP_METROPOLRUHR_WMS_GRAUBLAU
);
const imageryLayer = new ImageryLayer(provider);

// TODO move combined common setup out of here

const setupPrimaryStyle = (viewer: Viewer) => {
  (async () => {
    if (viewer.scene.terrainProvider instanceof CesiumTerrainProvider) {
      //viewer.scene.terrainProvider = ellipsoidTerrainProvider;
    } else {
      viewer.scene.terrainProvider = await wuppTerrainProvider;
    }
    //viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.scene.globe.show = false;

    if (imageryLayer) {
      if (!viewer.imageryLayers.contains(imageryLayer)) {
        viewer.imageryLayers.add(imageryLayer);
      }
    }
  })();
};

export const setupSecondaryStyle = (viewer: Viewer) => {
  if (!viewer) return;
  (async () => {
    // console.log('setupSecondaryStyle', viewer.scene.terrainProvider);
    if (!(viewer.scene.terrainProvider instanceof CesiumTerrainProvider)) {
      viewer.scene.terrainProvider = await wuppTerrainProvider;
    }
    //viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.scene.globe.show = false;

    if (imageryLayer.ready) {
      // console.log('Secondary Style Setup: add imagery layer');
      if (!viewer.imageryLayers.contains(imageryLayer)) {
        // console.log('Secondary Style Setup: add imagery layer');
        viewer.imageryLayers.add(imageryLayer);
      }
    }
    viewer.scene.globe.show = true;
  })();
  //viewer.scene.globe.depthTestAgainstTerrain = false;
};

export const useSceneStyleToggle = (style?: keyof SceneStyles) => {
  const dispatch = useDispatch();
  const { viewer } = useCesium();

  // TODO initial style set by parameter
  const [isPrimaryStyle, setIsPrimaryStyle] = useState(true);

  useEffect(() => {
    if (!viewer) return;

    if (isPrimaryStyle) {
      setupPrimaryStyle(viewer);
      dispatch(setShowPrimaryTileset(true));
      dispatch(setShowSecondaryTileset(false));
    } else {
      setupSecondaryStyle(viewer);
      dispatch(setShowPrimaryTileset(false));
      dispatch(setShowSecondaryTileset(true));
    }

    return () => {
      if (isPrimaryStyle) {
        setupSecondaryStyle(viewer);
        dispatch(setShowSecondaryTileset(true));
        dispatch(setShowPrimaryTileset(false));
      } else {
        setupPrimaryStyle(viewer);
        dispatch(setShowPrimaryTileset(true));
        dispatch(setShowSecondaryTileset(false));
      }
    };
  }, [dispatch, viewer, isPrimaryStyle]);

  const toggleSceneTyle = () => {
    setIsPrimaryStyle(!isPrimaryStyle);
  };

  return toggleSceneTyle;
};

import React, { useEffect } from 'react';
import TilesetSelector from '../components/TilesetSelectorWithSyncedGeoJson';
import {
  useSelectionTransparencyControl,
  useTilesetControl,
} from '../utils/controls';
import {
  CITYGML_TEST_TILESET,
  DEFAULT_SELECTION_HIGHLIGHT_MATERIAL,
} from '../config';
import {
  setShowTileset,
  useShowTileset,
  useViewerDataSources,
} from '../store/slices/viewer';
import { useDispatch, useStore } from 'react-redux';
import {
  Cesium3DTileset,
  CesiumTerrainProvider,
  Color,
  ColorBlendMode,
  EllipsoidTerrainProvider,
  Model,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  WebMapServiceImageryProvider,
} from 'cesium';
import {
  Cesium3DTileset as Resium3DTileset,
  ImageryLayer,
  useCesium,
  pick,
} from 'resium';
import { getAllPrimitives, getPrimitiveById } from '../utils/cesiumHelpers';

const CityGMLTileset = {
  url: 'https://wupp-3d-data.cismet.de/lod2/tileset.json',
};

const BaumkatasterTileset = {
  url: 'https://wupp-3d-data.cismet.de/trees/tileset.json',
};

function View() {
  //useSelectionTransparencyControl();
  const footprints = useViewerDataSources().footprintGeoJson;
  const showTileset = useShowTileset();
  const dispatch = useDispatch();
  const { viewer } = useCesium();

  const provider = new WebMapServiceImageryProvider({
    //url: 'https://sgx.geodatenzentrum.de/wms_basemapde?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities',
    // layers: 'de_basemapde_web_raster_grau',
    //layers: 'de_basemapde_web_raster_farbe',

    url: 'https://geodaten.metropoleruhr.de/spw2/service',
    layers: 'spw2_light_grundriss',
    // layers: 'spw2_graublau',
    //layers: 'spw2_extralight',

    parameters: {
      transparent: true,
      format: 'image/png',
    },
  });

  useEffect(() => {
    dispatch(setShowTileset(false));
    return () => {
      dispatch(setShowTileset(true));
    };
  }, [dispatch]);

  useEffect(() => {
    if (!viewer) return;

    (async () => {
      const terrainProvider = await CesiumTerrainProvider.fromUrl(
        'https://cesium-wupp-terrain.cismet.de/terrain2020'
      );
      console.log('adding terrainProvider for PlanningModelStyle.');
      viewer.scene.terrainProvider = terrainProvider;
      viewer.scene.globe.depthTestAgainstTerrain = true;
    })();
    return () => {
      console.info(
        'Removing terrain provider, only used for PlanningModelStyle.'
      );
      viewer.scene.terrainProvider = new EllipsoidTerrainProvider({});
    };
  }, [viewer]);

  //const [lastMaterial, setLastMaterial] = React.useState(null);

  useEffect(() => {
    if (!viewer) return;


    let selectedObject; // Store the currently selected feature
    let lastColor

    const handler = new ScreenSpaceEventHandler(viewer.canvas);

    handler.setInputAction((movement) => {
      // If a feature was previously selected, revert its color
      if (selectedObject) {
        selectedObject.color = lastColor;
        selectedObject.colorBlendMode = ColorBlendMode.HIGHLIGHT;
        selectedObject.colorBlendAmount = 0.0;
      }

      const pickedObject = viewer.scene.pick(movement.position);
      console.log('pickedFeature', pickedObject);
      if (!pickedObject) return;

      if (pickedObject.primitive instanceof Cesium3DTileset) {
        console.log(
          'pickedFeature is Model',
          pickedObject.detail,
          pickedObject.content,
          pickedObject.primitive,
          Object.keys(pickedObject)
        );

        const model = pickedObject.detail.model as Model;
        console.log('pickedFeature', model);

      
        model.colorBlendMode =
          ColorBlendMode.REPLACE; // HIGHLIGHT, MIX, REPLACE
        model.colorBlendAmount = 1.0;
        lastColor = model.color;
        model.color = Color.YELLOW;

        selectedObject = model;
      }
    }, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
    };
  }, [viewer]);

  //useTilesetControl();
  return (
    <>
      {
        //<TilesetSelector tileset={CityGMLTileset} clampByGeoJson={footprints} />
      }
      <ImageryLayer imageryProvider={provider} />
      {<Resium3DTileset url={CityGMLTileset.url} />}
      {
        //<Cesium3DTileset url={BaumkatasterTileset.url} />
      }
    </>
  );
}

export default View;

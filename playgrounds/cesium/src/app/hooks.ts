import { useEffect, useState } from 'react';

import {
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  defined,
  GeoJsonDataSource,
  Cartesian2,
  Cartesian3,
  Viewer,
  Cesium3DTileFeature,
} from 'cesium';
import { useSelectKeys } from './store/slices/buildings';
import { setKeys } from './store/slices/buildings';
import { useDispatch } from 'react-redux';
import { useViewerDataSources } from './store/slices/viewer';

export type ClickData = {
  id: string | null;
  entityId: string | null;
  screenPos: Cartesian2 | null;
  pickPos: Cartesian3 | null;
};

export type ClickTilesetData = {
  feature: Cesium3DTileFeature | null;
  properties: Record<string, unknown> | null;
  screenPos: Cartesian2 | null;
  pickPos: Cartesian3 | null;
};

export const useClickActionFootprints = (
  viewer: Viewer | undefined,
  idProperty: string,
  setSelectedEntity: (id: string | null) => void
) => {
  const [clickData, setClickData] = useState<ClickData | null>(null);

  useEffect(() => {
    if (!viewer?.scene || !viewer?.canvas) return;
    const { canvas, scene } = viewer;

    const handler = new ScreenSpaceEventHandler(canvas);

    const clickAction = ({
      position,
    }: ScreenSpaceEventHandler.PositionedEvent) => {
      if (!position) return;
      const pickedFeature = position && scene.pick(position);
      const pickedPosition = position && scene.pickPosition(position);

      if (defined(pickedFeature) && pickedFeature.id?.properties) {
        const selectedFeatureId =
          pickedFeature.id.properties[idProperty].getValue();
        setSelectedEntity(selectedFeatureId);
        // console.log('clickAction', selectedFeatureId);
        setClickData({
          id: selectedFeatureId,
          entityId: pickedFeature.id.id,
          screenPos: position,
          pickPos: pickedPosition,
        });
      } else {
        setSelectedEntity(null);
        setClickData(null);
      }
    };
    handler.setInputAction(clickAction, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
      handler.destroy();
    };
  }, [viewer, idProperty, setSelectedEntity]);

  return clickData;
};

export const useClickActionTileset = (
  viewer: Viewer | undefined,
  url: string,
  setSelectedFeature: (feature: Cesium3DTileFeature | null) => void,
  drillPickLimit = 5
) => {
  const [clickData, setClickData] = useState<ClickTilesetData | null>(null);
  //const url = useViewerDataSources().tileset.url;

  useEffect(() => {
    console.log('HOOK: useClickActionTileset');
    if (!viewer?.scene || !viewer?.canvas) return;
    const { canvas, scene } = viewer;

    const handler = new ScreenSpaceEventHandler(canvas);

    const clickAction = ({
      position,
    }: ScreenSpaceEventHandler.PositionedEvent) => {
      if (!position) return;

      const pickedObjects = scene.drillPick(position, drillPickLimit);
      let feature;

      for (let i = 0; i < pickedObjects.length; i++) {
        if (
          pickedObjects[i] instanceof Cesium3DTileFeature &&
          pickedObjects[i].tileset._url === url
        ) {
          // console.log('url', pickedObjects[i].tileset._url);
          feature = pickedObjects[i];
          break;
        }
      }

      const pickedPosition = position && scene.pickPosition(position);

      if (defined(feature)) {
        //console.log('pickedFeature', feature);
        if (feature instanceof Cesium3DTileFeature) {
          const propertyIds = feature.getPropertyIds();
          const properties = propertyIds.reduce((acc, propertyId) => {
            return {
              ...acc,
              [propertyId]: feature.getProperty(propertyId),
            };
          }, {});

          setSelectedFeature(feature);
          // console.log('clickAction', feature, properties);

          setClickData({
            feature,
            properties,
            screenPos: position,
            pickPos: pickedPosition,
          });
        }
      } else {
        setSelectedFeature(null);
        setClickData(null);
      }
    };
    handler.setInputAction(clickAction, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
      handler.destroy();
    };
  }, [viewer, url, drillPickLimit, setSelectedFeature]);

  return clickData;
};

export const usePropertyKeysFromGeoJsonDataSource = (
  dataSource: GeoJsonDataSource | undefined | null
) => {
  const propertyKeys = useSelectKeys();
  const dispatch = useDispatch();
  console.log('hook usePropertyKeysFromGeoJsonDataSource');

  useEffect(() => {
    if (dataSource?.entities) {
      const keys = new Set() as Set<string>;
      dataSource.entities.values.forEach((entity) => {
        entity.properties &&
          entity.properties.propertyNames.forEach((key: string) =>
            keys.add(key)
          );
      });
      //console.log('setKeys', Array.from(keys));
      dispatch(setKeys(Array.from(keys)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);
  return propertyKeys;
};

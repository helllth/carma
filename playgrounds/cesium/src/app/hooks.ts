import { useEffect, useState } from 'react';

import {
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  defined,
  GeoJsonDataSource,
  Cartesian2,
  Cartesian3,
  Viewer,
} from 'cesium';

export type ClickData = {
  id: string | null;
  entityId: string | null;
  screenPos: Cartesian2 | null;
  pickPos: Cartesian3 | null;
};

export const useClickAction = (
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
        console.log('clickAction', selectedFeatureId);
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

export const usePropertyKeysFromGeoJsonDataSource = (
  dataSource: GeoJsonDataSource | undefined | null
) => {
  const [propertyKeys, setPropertyKeys] = useState(new Set());

  useEffect(() => {
    if (dataSource?.entities) {
      const keys = new Set();
      dataSource.entities.values.forEach((entity) => {
        entity.properties &&
          entity.properties.propertyNames.forEach((key) => keys.add(key));
      });
      setPropertyKeys(keys);
    }
  }, [dataSource]);
  return propertyKeys;
};

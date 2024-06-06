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
  Cesium3DTileset,
  Model,
  ColorBlendMode,
  Color,
} from 'cesium';
import { useSelectKeys } from './store/slices/buildings';
import { setKeys } from './store/slices/buildings';
import { useDispatch } from 'react-redux';
import { useCesium } from 'resium';

export type ClickData = {
  id: string | null;
  entityId: string | null;
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

export const useGLTFTilesetClickHandler = () => {
  const { viewer } = useCesium();

  useEffect(() => {
    if (!viewer) return;

    let selectedObject; // Store the currently selected feature
    let lastColor;

    const handler = new ScreenSpaceEventHandler(viewer.canvas);

    handler.setInputAction((movement) => {
      // If a feature was previously selected, revert its color
      if (selectedObject) {
        selectedObject.color = lastColor;
        selectedObject.colorBlendMode = ColorBlendMode.HIGHLIGHT;
        selectedObject.colorBlendAmount = 0.0;
      }

      const pickedObject = viewer.scene.pick(movement.position);
      if (!pickedObject) return;

      if (pickedObject.primitive instanceof Cesium3DTileset) {
        // console.log('Cesium3DTileset', pickedObject);
        const { _batchId, _content } = pickedObject;
        // console.log('Cesium3DTileFeature', _batchId);
        const feature = _content.getFeature(_batchId);
        if (feature instanceof Cesium3DTileFeature) {
          lastColor = feature.color;
          feature.color = Color.YELLOW;
          selectedObject = feature;
        }
      }
    }, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
    };
  }, [viewer]);
};

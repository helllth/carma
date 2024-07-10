import React, { useEffect, useRef, useState } from 'react';
import { Entity as ResiumEntity, useCesium, CesiumComponentRef } from 'resium';
import {
  Cartesian3,
  Color,
  ConstantPositionProperty,
  defined,
  Entity,
  HeightReference,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
} from 'cesium';

// TODO
// should be interaction widget with ground point and elevated point and axis locking for moving
// optional labeling in coordinates

export const DraggablePoint = ({
  position,
  color = Color.RED,
}: {
  position: { latitude: number; longitude: number; height?: number };
  color?: Color;
}) => {
  const { viewer } = useCesium();
  const entityRef = useRef<CesiumComponentRef<Entity> | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (viewer && entityRef.current) {
      const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

      handler.setInputAction((event) => {
        const pickedObject = viewer.scene.pick(event.position);
        if (
          defined(pickedObject) &&
          pickedObject.id === entityRef.current?.cesiumElement
        ) {
          setIsDragging(true);
        }
      }, ScreenSpaceEventType.LEFT_DOWN);

      handler.setInputAction((event) => {
        if (isDragging) {
          const cartesian = viewer.scene.pickPosition(event.endPosition);
          if (defined(cartesian) && entityRef.current?.cesiumElement) {
            entityRef.current.cesiumElement.position =
              new ConstantPositionProperty(cartesian);
          }
        }
      }, ScreenSpaceEventType.MOUSE_MOVE);

      handler.setInputAction(() => {
        setIsDragging(false);
      }, ScreenSpaceEventType.LEFT_UP);

      return () => {
        handler.destroy();
      };
    }
  }, [viewer, isDragging]);

  const initialPosition =
    position.height !== undefined
      ? Cartesian3.fromDegrees(
          position.longitude,
          position.latitude,
          position.height
        )
      : Cartesian3.fromDegrees(position.longitude, position.latitude);

  return (
    <ResiumEntity
      ref={entityRef}
      position={initialPosition}
      point={{
        pixelSize: 50,
        color,
        heightReference: HeightReference.RELATIVE_TO_GROUND,
      }}
    />
  );
};

export default DraggablePoint;

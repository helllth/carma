import {
  Cartesian3,
  Matrix4,
  Transforms,
  Quaternion,
  Viewer,
  Model,
  Cartographic,
  Math as CeMath,
  Material,
  Color,
  PolylineCollection,
} from "cesium";

import type { EntityData, ModelAsset, PolylineConfig } from "../..";

const defaultOptions = {
  id: "selected3dmarker",
};

const createOrUpdateStemline = (
  viewer: Viewer,
  entityData: EntityData,
  pos: Cartographic,
  options: Partial<PolylineConfig> & { stemLength?: number } = {},
) => {
  const topHeight = pos.height - (options.gap ?? 0);
  const baseHeight = topHeight - (options.stemLength ?? 30);

  const posTop = Cartographic.clone(
    Object.assign({}, pos, { height: topHeight }),
  );
  const posBase = Cartographic.clone(
    Object.assign({}, pos, { height: baseHeight }),
  );

  const baseColor =
    options.color?.length === 4 ? new Color(...options.color) : Color.WHITE;

  const colorMaterial = Material.fromType("Color", { color: baseColor });

  const material = options.glow
    ? Material.fromType("PolylineGlow", {
        color: baseColor,
        glowPower: 0.1,
        taperPower: 0.9,
      })
    : colorMaterial;

  const positions = viewer.scene.ellipsoid.cartographicArrayToCartesianArray([
    posTop,
    posBase,
  ]);
  const width = options.width ?? 4;

  if (entityData.stemline) {
    entityData.stemline.positions = positions;
    entityData.stemline.width = width;
    entityData.stemline.material = material;
  } else {
    const polyline = {
      positions,
      width,
      material,
    };
    console.info(
      "[CESIUM|SCENE|POLYLINE] adding Stemline",
      polyline,
      posTop.height,
      posBase.height,
    );
    const stemlineCollection = new PolylineCollection();
    stemlineCollection.add(polyline);
    viewer.scene.primitives.add(stemlineCollection);
    entityData.stemline = stemlineCollection;
  }
};

export const addCesiumMarker = async (
  viewer: Viewer,
  pos: Cartographic,
  modelConfig: ModelAsset, // TODO integrate modelconfig to options
  options: {
    model?: Model;
    id?: string;
    stemline?: PolylineConfig; // override the modelConfig stemline
  } = {},
) => {
  console.info("[CESIUM|SCENE] addMarker", pos, modelConfig);

  const { id, model } = Object.assign({ ...defaultOptions, ...options });

  const entityData: EntityData = {
    id,
    modelMatrix: null,
    animatedModelMatrix: null,
    modelConfig: null,
    model: null,
  };

  const posCartesian = Cartesian3.fromRadians(
    pos.longitude,
    pos.latitude,
    pos.height,
  );
  const scale = modelConfig?.scale || 1;
  const offset = modelConfig?.anchorOffset || { x: 0, y: 0, z: 0 };
  const offsetZ = offset.z || 0;
  const modelMatrix = Transforms.eastNorthUpToFixedFrame(posCartesian);
  const translation = Matrix4.fromTranslation(
    new Cartesian3(0, 0, offsetZ * scale),
  );
  Matrix4.multiply(modelMatrix, translation, modelMatrix);

  entityData.modelConfig = modelConfig;
  entityData.modelMatrix = modelMatrix.clone();
  entityData.animatedModelMatrix = modelMatrix.clone();

  let markerModel: Model;

  if (model) {
    console.info("[CESIUM|MARKER|MODEL] Reusing existing marker Model");
    // reuuse existing model;
    markerModel = model;
    model.modelMatrix = modelMatrix;
    model.scale = modelConfig.scale ?? 1;
  } else {
    console.info(
      "[CESIUM|MARKER|MODEL] creating marker model from file",
      modelConfig.uri,
    );
    markerModel = await Model.fromGltfAsync({
      id,
      url: modelConfig.uri,
      modelMatrix: modelMatrix,
      scale: modelConfig.scale,
    });
  }

  // Add the stemline if configured
  if (options.stemline || modelConfig.stemline) {
    createOrUpdateStemline(viewer, entityData, pos, {
      ...modelConfig.stemline,
      ...options.stemline,
    });
  }

  entityData.model = markerModel;

  viewer.scene.primitives.add(markerModel);

  const onPreUpdate = () => updateMarker(viewer, entityData);
  viewer.scene.preUpdate.addEventListener(onPreUpdate);
  viewer.scene.requestRender();

  entityData.onPreUpdate = onPreUpdate;
  entityData.cleanup = () => {
    console.info(
      "[CESIUM|SCENE|MARKER|LISTENER] cleaning up preUpdate Listener for",
      entityData.id,
    );
    viewer.scene.preUpdate.removeEventListener(onPreUpdate);
  };

  return entityData;
};

const updateMarker = (viewer: Viewer, entityData: EntityData) => {
  const {
    modelMatrix,
    animatedModelMatrix,
    animationSpeed,
    model,
    modelConfig,
  } = entityData;

  if (modelConfig !== null) {
    const { isCameraFacing, rotation, fixedScale } = modelConfig;
    const currentTime = new Date().getTime();
    if (entityData.lastRenderTime === undefined) {
      entityData.lastRenderTime = currentTime;
    }
    const deltaTime = currentTime - entityData.lastRenderTime;
    entityData.lastRenderTime = currentTime;

    if (model && modelMatrix && animatedModelMatrix) {
      let scale;
      let translation = new Cartesian3(0, 0, 0);
      if (fixedScale) {
        const dist = Cartesian3.distance(
          viewer.camera.position,
          new Cartesian3(modelMatrix[12], modelMatrix[13], modelMatrix[14]),
        );
        if (dist) {
          scale = new Cartesian3(dist / 1000, dist / 1000, dist / 1000);
          translation = new Cartesian3(
            0,
            0,
            ((modelConfig.scale ?? 1) * dist) / (1000 * 0.5),
          ); // offset to scale from bottom
        }
      } else {
        scale = new Cartesian3(1, 1, 1);
      }

      if (rotation && animationSpeed) {
        const RotationQuaternion = Quaternion.fromAxisAngle(
          Cartesian3.UNIT_Z,
          (rotation === true ? 1 : rotation) * animationSpeed * deltaTime,
        );

        const rotationMatrix = Matrix4.fromTranslationQuaternionRotationScale(
          translation,
          RotationQuaternion,
          scale,
        );
        const updatedModelMatrix = Matrix4.clone(animatedModelMatrix);
        Matrix4.multiply(
          updatedModelMatrix,
          rotationMatrix,
          updatedModelMatrix,
        );
        entityData.animatedModelMatrix = updatedModelMatrix;
        entityData.model.modelMatrix = updatedModelMatrix;
      } else if (isCameraFacing) {
        const cameraHeading = viewer.camera.heading;
        const rotationQuaternion = Quaternion.fromAxisAngle(
          Cartesian3.UNIT_Z,
          -cameraHeading - CeMath.PI_OVER_TWO,
        );
        const rotationMatrix = Matrix4.fromTranslationQuaternionRotationScale(
          translation,
          rotationQuaternion,
          scale,
        );
        const updatedModelMatrix = Matrix4.clone(modelMatrix);
        Matrix4.multiply(
          updatedModelMatrix,
          rotationMatrix,
          updatedModelMatrix,
        );
        entityData.animatedModelMatrix = updatedModelMatrix;
        if (entityData.model) {
          entityData.model.modelMatrix = updatedModelMatrix;
        }
      }
    }
  }

  if (entityData.stemline) {
    const modelPosition = new Cartesian3(
      entityData.animatedModelMatrix[12],
      entityData.animatedModelMatrix[13],
      entityData.animatedModelMatrix[14],
    );
    createOrUpdateStemline(
      viewer,
      entityData,
      Cartographic.fromCartesian(modelPosition),
      {
        color: entityData.modelConfig?.stemline?.color,
        width: entityData.modelConfig?.stemline?.width,
        gap: entityData.modelConfig?.stemline?.gap,
      },
    );
  }

  return entityData;
};

export const removeCesiumMarker = (
  viewer: Viewer,
  data: EntityData | null | undefined,
) => {
  console.info(
    "[CESIUM|MARKER] removing marker primitive from scene",
    data?.model,
    data,
  );
  if (data) {
    data.stemline && viewer.scene.primitives.remove(data.stemline);
    data.model && viewer.scene.primitives.remove(data.model);
    data.cleanup && data.cleanup();
  }
};

import {
  Cesium3DTileset as Resium3dTileset,
  GeoJsonDataSource as ResiumGeoJsonDataSource,
  useCesium,
} from 'resium';
import { useState, useEffect } from 'react';
import {
  Cesium3DTileFeature,
  Cesium3DTileStyle,
  ClassificationType,
  Color,
  ColorMaterialProperty,
  Entity,
  GeoJsonDataSource,
  MaterialProperty,
} from 'cesium';
import { useClickActionTileset } from './ByTilesetClassifier/hooks';
import { useSelectionTransparency } from '../store';
import ColorHash from 'color-hash';
import { getColorMaterialProperty } from '../utils/selections';
import { GeoJsonConfig, TilesetConfig } from '../store/slices/viewer';
import { DEFAULT_SELECTION_HIGHLIGHT_MATERIAL } from '../config';
import { SELECTABLE_TRANSPARENT_3DTILESTYLE } from '../utils/cesiumHelpers';
import { DEFAULT_ID_PROPERTY } from '../config/dataSources.config';

interface TilesetSelectorProps {
  debug?: boolean;
  isClassification?: boolean;
  single?: boolean;
  style?: Cesium3DTileStyle;
  clampByGeoJson?: GeoJsonConfig;
  tileset: TilesetConfig;
}

// GEOSJOM CLAMPED FOOTPRINTS

const colorHash = new ColorHash({
  saturation: [0.8],
  lightness: [0.25, 0.75],
});
const colorLookup: Record<string, Color> = {};

// GENERAL

const HIGHLIGHT_COLOR = Color.YELLOW;
const TilesetSelector: React.FC<TilesetSelectorProps> = ({
  tileset,
  debug = false,
  clampByGeoJson,
  single = false,
  style,
  isClassification = false,
}) => {
  const { viewer } = useCesium();
  const tilesetIdProperty = tileset.idProperty ?? DEFAULT_ID_PROPERTY;
  const geojsonIdProperty = clampByGeoJson?.idProperty ?? DEFAULT_ID_PROPERTY;

  const selectionTransparency = useSelectionTransparency();
  // const selectionRef = useRef<SelectionRef | null>(null);
  const [selectedFeature, setSelectedFeature] =
    useState<Cesium3DTileFeature | null>(null);
  const [previousEntityId, setPreviousEntityId] = useState<string | null>(null);
  const [originalMaterial, setOriginalMaterial] =
    useState<MaterialProperty | null>(null);
  const [showSelectionTileset, setShowSelectionTileset] = useState(true);
  const [selectionTilesetReady, setSelectionTilesetReady] = useState(false);

  // GEOJSON
  const clampedFootprintAlpha = useSelectionTransparency();
  const [footprintMap, setFootprintMap] = useState<Map<string, Entity> | null>(
    null
  );
  // ----------------

  const clickData = useClickActionTileset(
    viewer,
    tileset.url,
    setSelectedFeature
  );

  const handleOnLoadClampedFootprints = (dataSource: GeoJsonDataSource) => {
    console.log('handleOnLoadClampedFootprints', dataSource);
    const entityMap = new Map<string, Entity>();
    dataSource &&
      dataSource.entities.values.forEach((entity) => {
        if (entity.polygon !== undefined) {
          entity.show = false;
          entity.polygon.material = getColorMaterialProperty(
            entity,
            clampedFootprintAlpha,
            'GEB_FKT',
            colorLookup,
            colorHash
          );
          if (entity.properties) {
            const id = entity.properties[geojsonIdProperty].getValue();
            entityMap.set(id, entity);
          }
        }
      });
    setFootprintMap(entityMap);
  };

  useEffect(() => {
    console.log('HOOK: selectedFeature');
    if (selectedFeature === null) {
      console.log('selectedFeature is null');
    } else {
      if (clampByGeoJson) {
        const id = selectedFeature.getProperty(tilesetIdProperty);
        console.log('clampByGeoJson', id, selectedFeature, tilesetIdProperty);

        const entity = footprintMap?.get(id);
        //setShowSelectionTileset(false);
        //setSelectionTilesetReady(false);
        if (entity && entity.polygon) {
          if (previousEntityId && originalMaterial) {
            const previousEntity = footprintMap?.get(previousEntityId);
            previousEntity!.show = false;
            previousEntity!.polygon!.material = originalMaterial;
          }
          entity.show = true;
          setOriginalMaterial(
            new ColorMaterialProperty(entity.polygon.material)
          );
          entity.polygon.material = DEFAULT_SELECTION_HIGHLIGHT_MATERIAL;
          setPreviousEntityId(id);
        } else {
          console.info('Entity not found', id, entity, footprintMap);
        }
      } else {
        selectedFeature.color = HIGHLIGHT_COLOR.withAlpha(
          selectionTransparency
        );
      }
      // console.log('selectedFeature', clickData?.properties, selectedFeature);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFeature, clickData]);

  if (isClassification && clampByGeoJson) {
    console.info(
      'Classification and clamping by Geojson both set, remove clampByGeoJson to enable classifcation.'
    );
  }
  return (
    <>
      <Resium3dTileset
        url={tileset.url}
        show={showSelectionTileset}
        debugShowBoundingVolume={debug || clampByGeoJson !== undefined}
        classificationType={
          isClassification && !clampByGeoJson
            ? ClassificationType.CESIUM_3D_TILE
            : undefined
        }
        preloadWhenHidden={true}
        style={clampByGeoJson ? SELECTABLE_TRANSPARENT_3DTILESTYLE : style}
        onReady={() => setSelectionTilesetReady(true)}
      />
      {clampByGeoJson && (
        <ResiumGeoJsonDataSource
          name="footprint_clamped"
          data={clampByGeoJson.url}
          clampToGround={true}
          onLoad={handleOnLoadClampedFootprints}
        />
      )}
    </>
  );
};

export default TilesetSelector;

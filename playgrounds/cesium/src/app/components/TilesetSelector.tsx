import { Cesium3DTileset, useCesium } from 'resium';
import { useState, useEffect } from 'react';
import { Cesium3DTileFeature, Color, ColorMaterialProperty } from 'cesium';
import { useClickActionTileset } from '../hooks';
import { useSelectionTransparency } from '../store';
import { useSelectKey } from '../store/slices/buildings';

interface TilesetSelectorProps {
  uri: string;
  debug?: boolean;
  idProperty?: string;
  single?: boolean;
}

//const DEFAULT_TILESET_ALPHA = 0.7;
const HIGHLIGHT_COLOR = Color.YELLOW;

const DEFAULT_EXTRUDED_MATERIAL = new ColorMaterialProperty(
  Color.WHITE.withAlpha(1 / 256) // needs to result in non-zero texture value to be available for selection!
);

const TilesetSelector: React.FC<TilesetSelectorProps> = ({
  uri,
  debug = false,
  idProperty = 'UUID',
  single = false,
}) => {
  const { viewer } = useCesium();
  const selectionTransparency = useSelectionTransparency();
  // const selectionRef = useRef<SelectionRef | null>(null);
  const [selectedFeature, setSelectedFeature] =
    useState<Cesium3DTileFeature | null>(null);
  const selectKey = useSelectKey();
  const clickData = useClickActionTileset(
    viewer,
    uri,
    idProperty,
    setSelectedFeature
  );

  useEffect(() => {
    if (selectedFeature === null) {
      console.log('selectedFeature is null');
    } else {
      selectedFeature.color = HIGHLIGHT_COLOR.withAlpha(selectionTransparency);
      console.log('selectedFeature', clickData?.properties);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFeature, clickData]);

  return <Cesium3DTileset url={uri} />;
};

export default TilesetSelector;

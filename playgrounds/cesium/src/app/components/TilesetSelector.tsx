import { Cesium3DTileset, useCesium } from 'resium';
import { useState, useEffect } from 'react';
import {
  Cesium3DTileFeature,
  Cesium3DTileStyle,
  ClassificationType,
  Color,
} from 'cesium';
import { useClickActionTileset } from '../hooks';
import { useSelectionTransparency } from '../store';

interface TilesetSelectorProps {
  debug?: boolean;
  idProperty?: string;
  isClassification?: boolean;
  single?: boolean;
  style?: Cesium3DTileStyle;
  url: string;
}

const HIGHLIGHT_COLOR = Color.YELLOW;
const TilesetSelector: React.FC<TilesetSelectorProps> = ({
  url,
  debug = false,
  idProperty = 'UUID',
  single = false,
  style,
  isClassification = false,
}) => {
  const { viewer } = useCesium();

  const selectionTransparency = useSelectionTransparency();
  // const selectionRef = useRef<SelectionRef | null>(null);
  const [selectedFeature, setSelectedFeature] =
    useState<Cesium3DTileFeature | null>(null);

  const clickData = useClickActionTileset(
    viewer,
    url,
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

  return (
    <Cesium3DTileset
      url={url}
      classificationType={
        isClassification ? ClassificationType.CESIUM_3D_TILE : undefined
      }
      preloadWhenHidden={true}
      style={style}
    />
  );
};

export default TilesetSelector;

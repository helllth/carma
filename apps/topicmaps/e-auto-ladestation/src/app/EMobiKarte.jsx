import React from 'react';
import { useContext, useEffect, useState } from 'react';
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from 'react-cismap/contexts/FeatureCollectionContextProvider';
import { LightBoxContext } from 'react-cismap/contexts/LightBoxContextProvider';
import { TopicMapStylingContext } from 'react-cismap/contexts/TopicMapStylingContextProvider';
import FeatureCollection from 'react-cismap/FeatureCollection';
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
import {
  fotoKraemerCaptionFactory,
  fotoKraemerUrlManipulation,
  getGazData,
  getPOIColors,
} from './helper/helper';
import Menu from './Menu';
import { getPoiClusterIconCreatorFunction } from './helper/styler';
import GenericInfoBoxFromFeature from 'react-cismap/topicmaps/GenericInfoBoxFromFeature';

const EMobiKarte = () => {
  const [gazData, setGazData] = useState([]);
  const { setSelectedFeatureByPredicate, setClusteringOptions } = useContext(
    FeatureCollectionDispatchContext
  );
  const { markerSymbolSize } = useContext(TopicMapStylingContext);
  const { clusteringOptions, selectedFeature, filteredItems, shownFeatures } =
    useContext(FeatureCollectionContext);
  useEffect(() => {
    getGazData(setGazData);
  }, []);

  useEffect(() => {
    if (markerSymbolSize) {
      setClusteringOptions({
        ...clusteringOptions,
        iconCreateFunction: getPoiClusterIconCreatorFunction,
      });
    }
  }, [markerSymbolSize]);

  const selectedId = selectedFeature?.properties?.id;

  return (
    <TopicMapComponent
      gazData={gazData}
      modalMenu={<Menu />}
      locatorControl={true}
      gazetteerSearchPlaceholder="Ladestation | Stadtteil | Adresse | POI"
      gazetteerHitTrigger={(hits) => {
        if ((Array.isArray(hits) && hits[0]?.more?.pid) || hits[0]?.more?.kid) {
          const gazId = hits[0]?.more?.pid || hits[0]?.more?.kid;
          setSelectedFeatureByPredicate(
            (feature) => feature.properties.id === gazId
          );
        }
      }}
      applicationMenuTooltipString="Filter | Einstellungen | Kompaktanleitung"
      infoBox={
        <GenericInfoBoxFromFeature
          pixelwidth={350}
          config={{
            displaySecondaryInfoAction: false,
            city: 'Wuppertal',
            navigator: {
              noun: {
                singular: 'Ladestation',
                plural: 'Ladestationen',
              },
            },
            noCurrentFeatureTitle: 'Keine Ladestationen gefunden',
            noCurrentFeatureContent: (
              <span>
                Für mehr Ladestationen Ansicht mit verkleinern oder mit dem
                untenstehenden Link auf das komplette Stadtgebiet zoomen.
              </span>
            ),
          }}
          photoUrlManipulation={fotoKraemerUrlManipulation}
          captionFactory={fotoKraemerCaptionFactory}
        />
      }
    >
      <FeatureCollection></FeatureCollection>
    </TopicMapComponent>
  );
};

export default EMobiKarte;

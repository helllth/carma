import { useContext, useEffect, useState } from 'react';
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from 'react-cismap/contexts/FeatureCollectionContextProvider';
import { TopicMapStylingContext } from 'react-cismap/contexts/TopicMapStylingContextProvider';
import FeatureCollection from 'react-cismap/FeatureCollection';
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
import GenericInfoBoxFromFeature from 'react-cismap/topicmaps/GenericInfoBoxFromFeature';
import { getGazData } from '../../helper/gazData';
import { getPoiClusterIconCreatorFunction } from '../../helper/styler';

const Map = () => {
  const [gazData, setGazData] = useState([]);
  const {
    // @ts-ignore
    setSelectedFeatureByPredicate,
    // @ts-ignore
    setClusteringOptions,
    // @ts-ignore
    setFilterState,
  } = useContext(FeatureCollectionDispatchContext);
  // @ts-ignore
  const { markerSymbolSize } = useContext(TopicMapStylingContext);
  // @ts-ignore
  const { clusteringOptions } = useContext(FeatureCollectionContext);
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

  useEffect(() => {
    setFilterState({
      nur_online: false,
      oeffnungszeiten: '*',
      stecker: undefined,
      nur_gruener_strom: false,
      nur_schnelllader: false,
    });
  }, []);

  return (
    <TopicMapComponent
      gazData={gazData}
      //   modalMenu={<Menu />}
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
            displaySecondaryInfoAction: true,
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
          //   photoUrlManipulation={fotoKraemerUrlManipulation}
          //   captionFactory={fotoKraemerCaptionFactory}
        />
      }
    >
      <FeatureCollection></FeatureCollection>
    </TopicMapComponent>
  );
};

export default Map;

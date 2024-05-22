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
import {
  getAllEinrichtungen,
  getPoiClusterIconCreatorFunction,
} from '../../helper/styler';
import Menu from './Menu';

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
  const { clusteringOptions, itemsDictionary } = useContext(
    FeatureCollectionContext
  );
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
    const einrichtungen = getAllEinrichtungen().map(
      (einrichtung) => einrichtung
    );
    const veranstaltungen = itemsDictionary?.veranstaltungsarten?.map(
      (veranstaltung) => veranstaltung
    );
    setFilterState({
      einrichtung: einrichtungen,
      veranstaltung: veranstaltungen,
      mode: 'einrichtungen',
    });
  }, []);

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
            city: 'Wuppertal',
            navigator: {
              noun: {
                singular: 'POI',
                plural: 'POI',
              },
            },
            noCurrentFeatureTitle: 'Keine POIs gefunden',
            noCurrentFeatureContent: (
              <span>
                Für mehr POIs Ansicht mit verkleinern oder mit dem
                untenstehenden Link auf das komplette Stadtgebiet zoomen.
              </span>
            ),
          }}
        />
      }
    >
      <FeatureCollection></FeatureCollection>
    </TopicMapComponent>
  );
};

export default Map;

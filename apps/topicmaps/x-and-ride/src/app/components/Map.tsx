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
import Icon from 'react-cismap/commons/Icon';
import { UIDispatchContext } from 'react-cismap/contexts/UIContextProvider';

const Map = () => {
  const [gazData, setGazData] = useState([]);
  // @ts-ignore
  const { setClusteringOptions, setFilterState } = useContext(
    FeatureCollectionDispatchContext
  );
  // @ts-ignore
  const { markerSymbolSize } = useContext(TopicMapStylingContext);
  // @ts-ignore
  const { clusteringOptions, itemsDictionary } = useContext(
    FeatureCollectionContext
  );
  // @ts-ignore
  const { setAppMenuActiveMenuSection, setAppMenuVisible } =
    useContext(UIDispatchContext);

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

  return (
    <TopicMapComponent
      gazData={gazData}
      modalMenu={<></>}
      locatorControl={true}
      photoLightBox
      gazetteerSearchPlaceholder="P+R | B+R | Stadtteil | Adresse | POI"
      applicationMenuTooltipString="Filter | Einstellungen | Kompaktanleitung"
      infoBox={
        <GenericInfoBoxFromFeature
          pixelwidth={350}
          config={{
            city: 'Wuppertal',
            navigator: {
              noun: {
                singular: 'Anlage',
                plural: 'Anlagen',
              },
            },
            noFeatureTitle: 'Keine Anlagen gefunden!',
            noCurrentFeatureContent: (
              <p>
                Für mehr Anlagen Ansicht mit <Icon name="minus-square" />{' '}
                verkleinern oder mit untenstehendem Link alle Treffer der
                aktuellen Filterung anzeigen. Ggf. Filtereinstellungen im
                <a
                  onClick={() => {
                    setAppMenuVisible(true);
                    setAppMenuActiveMenuSection('filter');
                  }}
                  className="renderAsLink"
                >
                  {' '}
                  Anwendungsmenü
                  <Icon
                    name="bars"
                    style={{
                      color: 'black',
                    }}
                  />{' '}
                </a>
                zurücksetzen
              </p>
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

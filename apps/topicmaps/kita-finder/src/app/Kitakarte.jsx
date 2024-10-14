import { useContext, useEffect, useState } from "react";
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from "react-cismap/contexts/FeatureCollectionContextProvider";
import { TopicMapStylingContext } from "react-cismap/contexts/TopicMapStylingContextProvider";
import FeatureCollection from "react-cismap/FeatureCollection";
import GenericInfoBoxFromFeature from "react-cismap/topicmaps/GenericInfoBoxFromFeature";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent";
import { getGazData } from "./helper/helper";
import Menu from "./Menu";
import {
  searchTextPlaceholder,
  MenuTooltip,
  InfoBoxTextContent,
  InfoBoxTextTitle,
} from "@carma-collab/wuppertal/kita-finder";
import { getClusterIconCreatorFunction } from "./helper/styler";

const KitaKarte = () => {
  const [gazData, setGazData] = useState([]);
  const { setSelectedFeatureByPredicate, setClusteringOptions } = useContext(
    FeatureCollectionDispatchContext,
  );
  const { clusteringOptions } = useContext(FeatureCollectionContext);

  const { additionalStylingInfo } = useContext(TopicMapStylingContext);

  useEffect(() => {
    getGazData(setGazData);
  }, []);

  useEffect(() => {
    if (additionalStylingInfo) {
      setClusteringOptions({
        ...clusteringOptions,
        iconCreateFunction: getClusterIconCreatorFunction({
          featureRenderingOption: additionalStylingInfo.featureRenderingOption,
        }),
      });
    }
  }, [additionalStylingInfo]);

  return (
    <TopicMapComponent
      gazData={gazData}
      modalMenu={<Menu />}
      locatorControl={true}
      gazetteerSearchPlaceholder={searchTextPlaceholder}
      gazetteerHitTrigger={(hits) => {
        if ((Array.isArray(hits) && hits[0]?.more?.pid) || hits[0]?.more?.kid) {
          const gazId = hits[0]?.more?.pid || hits[0]?.more?.kid;
          setSelectedFeatureByPredicate(
            (feature) => feature.properties.id === gazId,
          );
        }
      }}
      applicationMenuTooltipString={<MenuTooltip />}
      infoBox={
        <GenericInfoBoxFromFeature
          pixelwidth={350}
          config={{
            displaySecondaryInfoAction: false,
            city: "Wuppertal",
            navigator: {
              noun: {
                singular: "Kita",
                plural: "Kitas",
              },
            },
            noFeatureTitle: <InfoBoxTextTitle />,
            noCurrentFeatureContent: <InfoBoxTextContent />,
          }}
        />
      }
    >
      <FeatureCollection
        key={`feature_${additionalStylingInfo.featureRenderingOption}`}
      ></FeatureCollection>
    </TopicMapComponent>
  );
};

export default KitaKarte;

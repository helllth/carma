import InfoBox from "react-cismap/topicmaps/InfoBox";
import InfoBoxHeader from "react-cismap/topicmaps/InfoBoxHeader";
import {
  getInfoText,
  getSecondaryInfoBoxElements,
  getSelectedFeature,
  setPreferredLayerId,
  setSelectedFeature,
  updateSecondaryInfoBoxElements,
} from "../../store/slices/features";
import { useDispatch, useSelector } from "react-redux";
import { getLayers } from "../../store/slices/mapping";
import { getActionLinksForFeature } from "react-cismap/tools/uiHelper";
import { useContext } from "react";
import { TopicMapDispatchContext } from "react-cismap/contexts/TopicMapContextProvider";

const FeatureInfoBox = () => {
  const dispatch = useDispatch();
  const selectedFeature = useSelector(getSelectedFeature);
  const secondaryInfoBoxElements = useSelector(getSecondaryInfoBoxElements);
  const numOfLayers = useSelector(getLayers).length;
  const infoText = useSelector(getInfoText);
  const { zoomToFeature } = useContext<typeof TopicMapDispatchContext>(
    TopicMapDispatchContext,
  );

  let links = [];
  if (selectedFeature) {
    links = getActionLinksForFeature(selectedFeature, {
      // displayZoomToFeature: true,
      // zoomToFeature: () => {
      //   if (selectedFeature) {
      //     const f = JSON.stringify(selectedFeature, null, 2);
      //     const pf = JSON.parse(f);
      //     pf.crs = {
      //       type: "name",
      //       properties: {
      //         name: "urn:ogc:def:crs:EPSG::4326",
      //       },
      //     };
      //     zoomToFeature(pf);
      //   }
      // },
    });
  }

  const featureHeaders = secondaryInfoBoxElements.map((feature) => {
    return (
      <div
        style={{
          width: "340px",
          paddingBottom: 3,
          paddingLeft: 10,
          cursor: "pointer",
        }}
        key={"overlapping."}
        onClick={() => {
          dispatch(setSelectedFeature(feature));
          dispatch(updateSecondaryInfoBoxElements(feature));
          dispatch(setPreferredLayerId(feature.id));
        }}
      >
        <InfoBoxHeader
          content={feature.properties.header}
          headerColor={"grey"}
        ></InfoBoxHeader>
      </div>
    );
  });
  return (
    <InfoBox
      pixelwidth={350}
      currentFeature={selectedFeature}
      hideNavigator={true}
      header="Informationen"
      headerColor="#0078a8"
      {...selectedFeature?.properties}
      title={
        selectedFeature?.properties?.title.includes("undefined")
          ? undefined
          : selectedFeature?.properties?.title
      }
      noCurrentFeatureTitle={
        infoText
          ? infoText
          : numOfLayers > 0
          ? "Auf die Karte klicken um Informationen abzurufen"
          : "Layer hinzufügen um Informationen abrufen zu können"
      }
      noCurrentFeatureContent=""
      secondaryInfoBoxElements={featureHeaders}
      links={links}
    />
  );
};

export default FeatureInfoBox;

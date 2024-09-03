import InfoBox from "react-cismap/topicmaps/InfoBox";
import InfoBoxHeader from "react-cismap/topicmaps/InfoBoxHeader";
import {
  getSecondaryInfoBoxElements,
  getSelectedFeature,
  setSelectedFeature,
  updateSecondaryInfoBoxElements,
} from "../../store/slices/features";
import { useDispatch, useSelector } from "react-redux";

const FeatureInfoBox = () => {
  const dispatch = useDispatch();
  const selectedFeature = useSelector(getSelectedFeature);
  const secondaryInfoBoxElements = useSelector(getSecondaryInfoBoxElements);

  const featureHeaders = secondaryInfoBoxElements.map((feature) => {
    return (
      <div
        style={{
          width: "340px",
          paddingBottom: 3,
          paddingLeft: 10,
          cursor: "pointer",
        }}
        key={"overlapping." + feature.id}
        onClick={() => {
          dispatch(setSelectedFeature(feature));
          dispatch(updateSecondaryInfoBoxElements(feature));
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
      noCurrentFeatureTitle="Auf die Karte klicken um Informationen abzurufen"
      noCurrentFeatureContent=""
      secondaryInfoBoxElements={featureHeaders}
      //   links={links}
    />
  );
};

export default FeatureInfoBox;

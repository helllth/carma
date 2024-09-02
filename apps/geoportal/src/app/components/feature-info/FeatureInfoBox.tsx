import InfoBox from "react-cismap/topicmaps/InfoBox";

const FeatureInfoBox = ({ selectedFeature, secondaryInfoBoxElements }) => {
  return (
    <InfoBox
      pixelwidth={350}
      currentFeature={selectedFeature}
      hideNavigator={true}
      header="Informationen"
      headerColor="#ff0000"
      {...selectedFeature?.properties}
      noCurrentFeatureTitle="Auf die Karte klicken um Informationen abzurufen"
      noCurrentFeatureContent=""
      secondaryInfoBoxElements={secondaryInfoBoxElements}
      //   links={links}
    />
  );
};

export default FeatureInfoBox;

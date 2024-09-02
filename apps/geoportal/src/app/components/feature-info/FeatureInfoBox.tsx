import InfoBox from "react-cismap/topicmaps/InfoBox";

const FeatureInfoBox = () => {
  return (
    <InfoBox
      pixelwidth={350}
      //   currentFeature={selectedFeature}
      hideNavigator={true}
      header="kjshd"
      headerColor="#ff0000"
      //   {...selectedFeature?.properties}
      noCurrentFeatureTitle="nix da"
      noCurrentFeatureContent="nix da"
      //   links={links}
    />
  );
};

export default FeatureInfoBox;

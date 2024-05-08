// @ts-ignore
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
import FeatureCollection from 'react-cismap/FeatureCollection';
import BPlanInfo from './BPlanInfo';

const Map = () => {
  return (
    <TopicMapComponent
      initialLoadingText="Laden der B-Plan-Daten"
      fullScreenControl
      locatorControl
      gazetteerSearchBox
      gazetteerTopicsList={['pois', 'bplaene', 'adressen']}
      gazetteerSearchPlaceholder=" B-Plan-Nr. | Adresse | POI"
      backgroundlayers={'uwBPlan|wupp-plan-live@20'}
      infoBox={<BPlanInfo pixelwidth={350} />}
    >
      <FeatureCollection></FeatureCollection>
    </TopicMapComponent>
  );
};

export default Map;

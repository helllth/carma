// @ts-ignore
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
import FeatureCollection from 'react-cismap/FeatureCollection';
import {
  FeatureCollectionDisplay,
  FeatureCollectionDisplayWithTooltipLabels,
} from 'react-cismap';
import BPlanInfo from './BPlanInfo';
import { bplanFeatureStyler, bplanLabeler } from '../../utils/styler';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoading,
  getPlanFeatures,
  loadBPlaene,
} from '../../store/slices/bplaene';
import proj4 from 'proj4';
import { proj4crs25832def } from 'react-cismap/constants/gis';

const Map = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const [features, setFeatures] = useState([]);

  const doubleMapClick = (event) => {
    const pos = proj4(proj4.defs('EPSG:4326'), proj4crs25832def, [
      event.latlng.lng,
      event.latlng.lat,
    ]);

    dispatch(
      getPlanFeatures({
        point: { x: pos[0], y: pos[1] },
        done: (hits) => {
          setFeatures(hits);
          console.log('xxx', hits);
        },
      })
    );
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(loadBPlaene());
  }, []);

  return (
    <TopicMapComponent
      initialLoadingText="Laden der B-Plan-Daten"
      fullScreenControl
      pendingLoader={isLoading ? 1 : 0}
      locatorControl
      gazetteerSearchBox
      gazetteerTopicsList={['pois', 'bplaene', 'adressen']}
      gazetteerSearchPlaceholder=" B-Plan-Nr. | Adresse | POI"
      backgroundlayers={'uwBPlan|wupp-plan-live@20'}
      infoBox={<BPlanInfo pixelwidth={350} />}
      applicationMenuTooltipString="Kompaktanleitung anzeigen"
      ondblclick={doubleMapClick}
    >
      <FeatureCollectionDisplayWithTooltipLabels
        featureCollection={features}
        style={bplanFeatureStyler}
        labeler={bplanLabeler}
      />
      {/* <FeatureCollection featureLabeler={bplanLabeler}></FeatureCollection> */}
    </TopicMapComponent>
  );
};

export default Map;

// @ts-ignore
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
import { FeatureCollectionDisplayWithTooltipLabels } from 'react-cismap';
import BPlanInfo from './BPlanInfo';
import { bplanFeatureStyler, bplanLabeler } from '../../utils/styler';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoading,
  getPlanFeatures,
  loadBPlaene,
} from '../../store/slices/bplaene';
import proj4 from 'proj4';
import { proj4crs25832def } from 'react-cismap/constants/gis';
import { getGazData } from '../../utils/gazData';
import GazetteerSearchControl from 'react-cismap/GazetteerSearchControl';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const Map = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const [features, setFeatures] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [boundingBox, setBoundingBox] = useState(null);
  const [gazData, setGazData] = useState([]);
  let refRoutedMap = useRef(null);

  const doubleMapClick = (event) => {
    const pos = proj4(proj4.defs('EPSG:4326'), proj4crs25832def, [
      event.latlng.lng,
      event.latlng.lat,
    ]);

    dispatch(
      // @ts-ignore
      getPlanFeatures({
        point: { x: pos[0], y: pos[1] },
        done: (hits) => {
          hits[0].selected = true;
          setFeatures(hits);
          setSelectedIndex(0);
        },
      })
    );
  };

  const bplanSearchButtonHit = (event) => {
    dispatch(
      // @ts-ignore
      getPlanFeatures({
        boundingBox: boundingBox,
        done: (hits) => {
          hits[0].selected = true;
          setFeatures(hits);
          setSelectedIndex(0);
        },
      })
    );
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(loadBPlaene());
    getGazData(setGazData);
    document.title = `B-Plan-Auskunft Wuppertal`;
  }, []);

  return (
    <TopicMapComponent
      initialLoadingText="Laden der B-Plan-Daten"
      fullScreenControl
      pendingLoader={isLoading ? 1 : 0}
      locatorControl
      ref={refRoutedMap}
      gazetteerSearchControl={false}
      backgroundlayers={'uwBPlan|wupp-plan-live@20'}
      modalMenu={<Modal />}
      infoBox={
        <BPlanInfo
          pixelwidth={350}
          features={features}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setFeatures={setFeatures}
        />
      }
      applicationMenuTooltipString="Kompaktanleitung anzeigen"
      ondblclick={doubleMapClick}
      homeZoom={16}
      applicationMenuIconname="info"
      mappingBoundsChanged={(bbox) => {
        setBoundingBox(bbox);
      }}
    >
      <FeatureCollectionDisplayWithTooltipLabels
        featureCollection={features}
        style={bplanFeatureStyler}
        labeler={bplanLabeler}
      />
      <GazetteerSearchControl
        mapRef={refRoutedMap}
        gazData={gazData}
        enabled={gazData.length > 0}
        pixelwidth={300}
        placeholder="B-Plan-Nr. | Adresse | POI"
        tertiaryAction={bplanSearchButtonHit}
        tertiaryActionIcon={faSearch}
        tertiaryActionTooltip="B-Pläne Suchen"
      />
    </TopicMapComponent>
  );
};

export default Map;

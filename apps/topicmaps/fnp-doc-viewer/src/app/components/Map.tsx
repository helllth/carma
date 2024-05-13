// @ts-ignore
import { useEffect, useState } from 'react';
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
import { FeatureCollectionDisplayWithTooltipLabels } from 'react-cismap';
import GazetteerSearchControl from 'react-cismap/GazetteerSearchControl';
import StyledWMSTileLayer from 'react-cismap/StyledWMSTileLayer';
import { useNavigate, useParams } from 'react-router-dom';

const Map = () => {
  const [boundingBox, setBoundingBox] = useState(null);
  const [features, setFeatures] = useState([]);
  const [gazData, setGazData] = useState([]);
  const [mapMode, setMapMode] = useState({});
  let { mode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    document.title = `FNP-Inspektor Wuppertal`;
  }, []);

  useEffect(() => {
    if (mode !== 'arbeitskarte' && mode !== 'rechtsplan') {
      navigate('/rechtsplan');
      setMapMode({ mode: 'rechtsplan' });
    } else if (mode === 'arbeitskarte') {
      setMapMode({ mode: 'arbeitskarte' });
    } else {
      setMapMode({ mode: 'rechtsplan' });
    }
  }, [mode]);

  return (
    <TopicMapComponent
      initialLoadingText="Laden der B-Plan-Daten"
      fullScreenControl
      //   pendingLoader={isLoading ? 1 : 0}
      locatorControl
      gazetteerSearchControl={false}
      backgroundlayers={'wupp-plan-live'}
      //   modalMenu={<Modal />}
      infoBox={<></>}
      applicationMenuTooltipString="Kompaktanleitung anzeigen"
      applicationMenuIconname="info"
      mappingBoundsChanged={(bbox) => {
        setBoundingBox(bbox);
      }}
    >
      <FeatureCollectionDisplayWithTooltipLabels featureCollection={features} />
      <GazetteerSearchControl
        gazData={gazData}
        enabled={gazData.length > 0}
        pixelwidth={300}
        placeholder="ÄV | BPL | Stadtteil | Adresse | POI"
      />
      <StyledWMSTileLayer
        key={'rechtsplan:aevVisible:'}
        url="https://maps.wuppertal.de/planung?SRS=EPSG:25832"
        layers={'r102:fnp_clip'}
        version="1.1.1"
        transparent="true"
        format="image/png"
        tiled="true"
        styles="default"
        maxZoom={19}
        opacity={1.0}
        caching={true}
      />
    </TopicMapComponent>
  );
};

export default Map;

// @ts-ignore
import { useEffect, useState } from 'react';
import TopicMapComponent from 'react-cismap/topicmaps/TopicMapComponent';
import { FeatureCollectionDisplayWithTooltipLabels } from 'react-cismap';
import GazetteerSearchControl from 'react-cismap/GazetteerSearchControl';
import StyledWMSTileLayer from 'react-cismap/StyledWMSTileLayer';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import AEVInfo from './infos/AEVInfo';
import HNInfo from './infos/HNInfo';
import HN9999Info from './infos/HN9999Info';
import EmptyAEVInfo from './infos/EmptyAEVInfo';
import EmptyHNInfo from './infos/EmptyHNInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadHauptnutzungen,
  searchForHauptnutzungen,
} from '../../store/slices/hauptnutzungen';
import proj4 from 'proj4';
import { proj4crs25832def } from 'react-cismap/constants/gis';
import {
  loadAEVs,
  searchForAEVs,
} from '../../store/slices/aenderungsverfahren';
import { getFeatureCollection } from '../../store/slices/mapping';
import ShowAEVModeButton from './ShowAEVModeButton';

const Map = () => {
  const searchMinZoom = 7;
  const [boundingBox, setBoundingBox] = useState(null);
  const features = useSelector(getFeatureCollection);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const [gazData, setGazData] = useState([]);
  const [mapMode, setMapMode] = useState({ mode: 'rechtsplan' });
  let { mode } = useParams();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let aevVisible = searchParams.get('aevVisible') !== null;
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    document.title = `FNP-Inspektor Wuppertal`;
    // @ts-ignore
    dispatch(loadHauptnutzungen());
    // @ts-ignore
    dispatch(loadAEVs());
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

  let info;

  if (features.length > 0 && (aevVisible || mapMode.mode === 'arbeitskarte')) {
    if (mapMode.mode === 'rechtsplan') {
      info = <AEVInfo />;
    } else if (mapMode.mode === 'arbeitskarte') {
      // @ts-ignore
      if (features[selectedFeatureIndex].properties.os !== '9999') {
        info = <HNInfo />;
      } else {
        info = <HN9999Info />;
      }
    }
  } else {
    if (mapMode.mode === 'rechtsplan') {
      info = <EmptyAEVInfo />;
    } else if (mapMode.mode === 'arbeitskarte') {
      info = <EmptyHNInfo />;
    }
  }

  let titleContent;
  let backgrounds;
  if (mapMode.mode === 'arbeitskarte') {
    titleContent = (
      <div>
        <b>Arbeitskarte: </b> fortgeschriebene Hauptnutzungen (informeller
        FNP-Auszug)
        <div style={{ float: 'right', paddingRight: 10 }}>
          <a href={'/#/rechtsplan?' + searchParams}>
            <FontAwesomeIcon icon={faShuffle} style={{ marginRight: 5 }} />
            zum Rechtsplan
          </a>
        </div>
      </div>
    );

    backgrounds = [
      <StyledWMSTileLayer
        key={'Hauptnutzungen.flaeche:aevVisible:' + aevVisible}
        url="https://maps.wuppertal.de/planung"
        layers={'r102:fnp_haupt_fl'}
        version="1.1.1"
        transparent="true"
        format="image/png"
        tiled="false"
        styles="default"
        maxZoom={19}
        opacity={0.4}
        caching={true}
      />,
    ];
  } else if (mapMode.mode === 'rechtsplan') {
    titleContent = (
      <div>
        <b>Rechtsplan: </b> Flächennutzungsplan (FNP){' '}
        {aevVisible === true ? 'mit Änderungsverfahren (ÄV)' : ''}
        <div style={{ float: 'right', paddingRight: 10 }}>
          <a href={'/#/arbeitskarte?' + searchParams}>
            <FontAwesomeIcon icon={faShuffle} style={{ marginRight: 5 }} /> zur
            Arbeitskarte
          </a>
        </div>
      </div>
    );

    backgrounds = [
      <StyledWMSTileLayer
        key={'rechtsplan:aevVisible:' + aevVisible}
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
      />,
    ];
  }

  let title = <></>;
  title = (
    <table
      style={{
        width: '95%',
        height: '30px',
        position: 'absolute',
        left: 54,
        top: 12,
        zIndex: 555,
      }}
    >
      <tbody>
        <tr>
          <td
            style={{
              textAlign: 'center',
              verticalAlign: 'middle',
              background: '#ffffff',
              color: 'black',
              opacity: '0.9',
              paddingLeft: '10px',
            }}
          >
            {titleContent}
          </td>
        </tr>
      </tbody>
    </table>
  );

  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      // each 'entry' is a [key, value] tupple
      result[key] = value;
    }
    return result;
  }

  const doubleMapClick = (event) => {
    const pos = proj4(proj4.defs('EPSG:4326'), proj4crs25832def, [
      event.latlng.lng,
      event.latlng.lat,
    ]);

    if (mapMode.mode === 'rechtsplan') {
      dispatch(
        // @ts-ignore
        searchForAEVs({
          point: { x: pos[0], y: pos[1] },
        })
      );
    } else if (mapMode.mode === 'arbeitskarte') {
      dispatch(
        // @ts-ignore
        searchForHauptnutzungen({
          point: { x: pos[0], y: pos[1] },
        })
      );
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {title}
      <TopicMapComponent
        initialLoadingText="Laden der B-Plan-Daten"
        fullScreenControl
        //   pendingLoader={isLoading ? 1 : 0}
        locatorControl
        gazetteerSearchControl={false}
        backgroundlayers={'wupp-plan-live'}
        //   modalMenu={<Modal />}
        infoBox={info}
        applicationMenuTooltipString="Kompaktanleitung anzeigen"
        applicationMenuIconname="info"
        mappingBoundsChanged={(bbox) => {
          setBoundingBox(bbox);
        }}
        locationChangedHandler={(location) => {
          const newParams = { ...paramsToObject(searchParams), ...location };
          setSearchParams(newParams);
        }}
        ondblclick={doubleMapClick}
      >
        <ShowAEVModeButton />
        <FeatureCollectionDisplayWithTooltipLabels
          featureCollection={features}
          style={(feature) => {
            const style = {
              color: '#155317',
              weight: 3,
              opacity: 0.8,
              fillColor: '#ffffff',
              fillOpacity: 0.6,
            };
            if (10 >= searchMinZoom) {
              if (feature.properties.status === 'r') {
                style.color = '#155317';
              } else {
                style.color = '#9F111B';
              }
            } else {
              if (feature.properties.status === 'r') {
                style.color = '#155317';
                style.fillColor = '#155317';
                style.opacity = 0.0;
              } else {
                style.color = '#9F111B';
                style.fillColor = '#9F111B';
                style.opacity = 0.0;
              }
            }

            return style;
          }}
          labeler={(feature) => {
            return (
              <h3
                style={{
                  color: '#155317',
                  opacity: 0.7,
                  textShadow:
                    '1px 1px 0px  #000000,-1px 1px 0px  #000000, 1px -1px 0px  #000000, -1px -1px 0px  #000000, 2px 2px 15px #000000',
                }}
              >
                {feature.text}
              </h3>
            );
          }}
        />
        <GazetteerSearchControl
          gazData={gazData}
          enabled={gazData.length > 0}
          pixelwidth={300}
          placeholder="ÄV | BPL | Stadtteil | Adresse | POI"
        />
        {backgrounds}
      </TopicMapComponent>
    </div>
  );
};

export default Map;

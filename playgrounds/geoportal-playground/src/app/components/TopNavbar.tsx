import { Button, Radio, Tooltip, message } from 'antd';
// @ts-ignore
import {
  faB,
  faBars,
  faLandmark,
  faLayerGroup,
  faPrint,
  faRedo,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
// @ts-ignore
import { UIDispatchContext } from 'react-cismap/contexts/UIContextProvider';

import { LayerLib } from '@cismet/layer-lib';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';
import LZString from 'lz-string';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getThumbnails, setThumbnail } from '../store/slices/layers';
import {
  appendLayer,
  getBackgroundLayer,
  getLayers,
  removeLayer,
  setBackgroundLayer,
} from '../store/slices/mapping';
import './switch.css';

const layerMap = {
  amtlich: {
    title: 'Amtlich',
    layers: 'amtlich@90',
    url: 'https://geodaten.metropoleruhr.de/spw2?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=spw2_light&STYLE=default&FORMAT=image/png&TILEMATRIXSET=webmercator_hq&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
  },
  luftbild: {
    title: 'Luftbild',
    layers: 'wupp-plan-live@100|trueOrtho2020@75|rvrSchrift@100',
    url: 'https://maps.wuppertal.de/karten?service=WMS&request=GetMap&layers=R102%3Aluftbild2022',
  },
  topographisch: {
    title: 'Topographisch',
    layers: 'basemap_relief@40',
    url: 'https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_top.json',
  },
};

const TopNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseConfig = {
    layers: [],
    backgroundLayer: {
      title: 'Amtlich',
      id: 'amtlich',
      opacity: 1.0,
      description: '',
      url: 'https://geodaten.metropoleruhr.de/spw2?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=spw2_light&STYLE=default&FORMAT=image/png&TILEMATRIXSET=webmercator_hq&TILEMATRIX=%7Bz%7D&TILEROW=%7By%7D&TILECOL=%7Bx%7D',
      layers: 'amtlich@100',
    },
  };
  const [config, setConfig] = useState(JSON.stringify(baseConfig));
  // @ts-ignore
  const { setAppMenuVisible } = useContext(UIDispatchContext);
  const backgroundLayer = useSelector(getBackgroundLayer);
  const dispatch = useDispatch();
  const thumbnails = useSelector(getThumbnails);
  const activeLayers = useSelector(getLayers);
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [searchParams, setSearchParams] = useSearchParams();

  const [messageApi, contextHolder] = message.useMessage();

  const updateLayers = (layer: any) => {
    const url = layer.url;

    const newLayer: Layer = {
      title: layer.title,
      id: layer.name,
      opacity: 0.7,
      url,
      description: layer.description,
      legend: layer.legend,
    };

    if (activeLayers.find((activeLayer) => activeLayer.id === layer.name)) {
      try {
        dispatch(removeLayer(layer.name));
        messageApi.open({
          type: 'success',
          content: `${layer.title} wurde erfolgreich entfernt.`,
        });
      } catch {
        messageApi.open({
          type: 'error',
          content: `Es gab einen Fehler beim entfernen von ${layer.title}`,
        });
      }
    } else {
      try {
        dispatch(appendLayer(newLayer));
        messageApi.open({
          type: 'success',
          content: `${layer.title} wurde erfolgreich hinzugefügt.`,
        });
      } catch {
        messageApi.open({
          type: 'error',
          content: `Es gab einen Fehler beim hinzufügen von ${layer.title}`,
        });
      }
    }
  };

  return (
    <div className="h-16 w-full flex items-center relative justify-between py-2 px-[12px]">
      {contextHolder}
      <LayerLib
        open={isModalOpen}
        setOpen={setIsModalOpen}
        setAdditionalLayers={updateLayers}
        setThumbnail={(thumbnail) => {
          dispatch(setThumbnail(thumbnail));
        }}
        thumbnails={thumbnails}
        activeLayers={activeLayers}
      />

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <p className="mb-0 font-semibold text-lg">
            DigiTal Zwilling / Geoportal
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 absolute left-1/2 -ml-[62px]">
        <Tooltip title="Refresh">
          <FontAwesomeIcon icon={faRedo} className="text-xl text-gray-300" />
        </Tooltip>
        <Tooltip title="Legende">
          <FontAwesomeIcon
            icon={faLandmark}
            className="text-xl text-gray-300"
          />
        </Tooltip>
        {/* <FontAwesomeIcon icon={faMap} className="text-xl" /> */}
        <Tooltip title="Layer">
          <FontAwesomeIcon
            icon={faLayerGroup}
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="cursor-pointer text-xl"
          />
        </Tooltip>
        <Tooltip title="Blass">
          <FontAwesomeIcon icon={faB} className="text-xl text-gray-300" />
        </Tooltip>
        <Tooltip title="Drucken">
          <FontAwesomeIcon icon={faPrint} className="text-xl text-gray-300" />
        </Tooltip>
        <Tooltip title="Teilen">
          <button
            className="hover:text-gray-600 text-xl"
            onClick={() => {
              const newConfig = {
                backgroundLayer: backgroundLayer,
                layers: activeLayers,
              };
              const jsonString = JSON.stringify(newConfig);
              const compressed =
                LZString.compressToEncodedURIComponent(jsonString);
              try {
                const baseUrl =
                  window.location.origin + window.location.pathname;
                const queryString = new URLSearchParams(
                  searchParams
                ).toString();
                const url = `${baseUrl}#/?data=${compressed}&${queryString}`;
                copyToClipboard(url);
                messageApi.open({
                  type: 'success',
                  content: `Link wurde in die Zwischenablage kopiert.`,
                });
              } catch {
                messageApi.open({
                  type: 'error',
                  content: `Es gab einen Fehler beim kopieren des Links`,
                });
              }
            }}
          >
            <FontAwesomeIcon icon={faShareNodes} />
          </button>
        </Tooltip>
        {/* <Tooltip title="Messungen">
          <FontAwesomeIcon
            icon={faDrawPolygon}
            className="text-xl text-gray-300"
          />
        </Tooltip> */}
      </div>

      <div className="flex items-center gap-6">
        <Radio.Group
          value={backgroundLayer.id}
          onChange={(e) => {
            // setSelectedBackground(e.target.value);
            dispatch(
              setBackgroundLayer({
                id: e.target.value,
                title: layerMap[e.target.value].title,
                opacity: 1.0,
                description: '',
                url: layerMap[e.target.value].url,
                layers: layerMap[e.target.value].layers,
              })
            );
          }}
        >
          <Radio.Button value="amtlich">Amtlich</Radio.Button>
          <Radio.Button value="topographisch">Topographisch</Radio.Button>
          <Radio.Button value="luftbild">Luftbild</Radio.Button>
        </Radio.Group>

        <Button
          onClick={() => {
            setAppMenuVisible(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </div>
    </div>
  );
};

export default TopNavbar;

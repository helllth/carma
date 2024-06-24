import { Button, Popover, Radio, Tooltip, message } from 'antd';
// @ts-ignore
import {
  faB,
  faBars,
  faLandmark,
  faLayerGroup,
  faPrint,
  faRedo,
  faShareNodes,
  faEye,
  faEyeSlash,
  faF,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
// @ts-ignore
import { UIDispatchContext } from 'react-cismap/contexts/UIContextProvider';

import { LayerLib } from '@cismet/layer-lib';
import { Layer } from 'libraries/layer-lib/src/components/LibModal';
import { useDispatch, useSelector } from 'react-redux';
import { getThumbnails, setThumbnail } from '../store/slices/layers';
import {
  appendLayer,
  getBackgroundLayer,
  getFocusMode,
  getLayers,
  removeLayer,
  setBackgroundLayer,
  setFocusMode,
} from '../store/slices/mapping';
import Share from './Share';
import './switch.css';
import { getShowLayerButtons, setShowLayerButtons } from '../store/slices/ui';
import { cn } from '../helper/helper';
import { Item } from 'libraries/layer-lib/src/helper/types';

export const layerMap = {
  amtlich: {
    title: 'Amtlich',
    layers: 'amtlichBasiskarte@90',
    url: 'https://geodaten.metropoleruhr.de/spw2?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=spw2_light&STYLE=default&FORMAT=image/png&TILEMATRIXSET=webmercator_hq&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
  },
  luftbild: {
    title: 'Luftbild',
    layers: 'wupp-plan-live@100|trueOrtho2020@75|rvrSchrift@100',
    url: 'https://maps.wuppertal.de/karten?service=WMS&request=GetMap&layers=R102%3Aluftbild2022',
  },
  stadtplan: {
    title: 'Stadtplan',
    layers: 'amtlich@90',
    url: 'https://geodaten.metropoleruhr.de/spw2?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=spw2_light&STYLE=default&FORMAT=image/png&TILEMATRIXSET=webmercator_hq&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
  },
};

const TopNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // @ts-ignore
  const { setAppMenuVisible } = useContext(UIDispatchContext);
  const backgroundLayer = useSelector(getBackgroundLayer);
  const dispatch = useDispatch();
  const thumbnails = useSelector(getThumbnails);
  const activeLayers = useSelector(getLayers);
  const showLayerButtons = useSelector(getShowLayerButtons);
  const focusMode = useSelector(getFocusMode);

  const [messageApi, contextHolder] = message.useMessage();

  const updateLayers = (layer: Item) => {
    let newLayer: Layer;

    if (layer.type === 'layer') {
      switch (layer.layerType) {
        case 'wmts': {
          newLayer = {
            title: layer.title,
            id: layer.id,
            layerType: 'wmts',
            opacity: 0.7,
            description: layer.description,
            visible: true,
            props: {
              url: layer.props.url,
              legend: layer.props.Style[0].LegendURL,
              name: layer.props.Name,
            },
          };
          break;
        }
        case 'vector': {
          newLayer = {
            title: layer.title,
            id: layer.id,
            layerType: 'vector',
            opacity: 0.7,
            description: layer.description,
            visible: true,
            props: {
              style: layer.props.style,
            },
          };
          break;
        }
      }
    }

    if (activeLayers.find((activeLayer) => activeLayer.id === layer.id)) {
      try {
        dispatch(removeLayer(layer.id));
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
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="text-xl hover:text-gray-600"
          >
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </Tooltip>
        <Tooltip title="Layer">
          <FontAwesomeIcon
            icon={faLayerGroup}
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="cursor-pointer text-xl"
          />
        </Tooltip>
        <Tooltip title="Fokus">
          <button
            className={cn('text-xl', focusMode ? 'text-blue-500' : '')}
            onClick={() => {
              dispatch(setFocusMode(!focusMode));
            }}
          >
            <FontAwesomeIcon icon={faF} />
          </button>
        </Tooltip>
        <Tooltip title="Drucken">
          <FontAwesomeIcon icon={faPrint} className="text-xl text-gray-300" />
        </Tooltip>
        <Tooltip
          title={`Layer Buttons ${
            showLayerButtons ? 'ausblenden' : 'anzeigen'
          }`}
        >
          <button
            className="text-xl hover:text-gray-600"
            onClick={() => {
              dispatch(setShowLayerButtons(!showLayerButtons));
            }}
          >
            <FontAwesomeIcon icon={showLayerButtons ? faEye : faEyeSlash} />
          </button>
        </Tooltip>
        <Tooltip title="Teilen">
          <Popover trigger="click" placement="bottom" content={<Share />}>
            <button className="hover:text-gray-600 text-xl">
              <FontAwesomeIcon icon={faShareNodes} />
            </button>
          </Popover>
        </Tooltip>
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
                layerType: 'wmts',
                visible: true,
                props: {
                  name: '',
                  url: layerMap[e.target.value].url,
                },
                layers: layerMap[e.target.value].layers,
              })
            );
          }}
        >
          <Radio.Button value="amtlich">Amtlich</Radio.Button>
          <Radio.Button value="stadtplan">Stadtplan</Radio.Button>
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

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
import {
  TopicMapStylingContext,
  TopicMapStylingDispatchContext,
} from 'react-cismap/contexts/TopicMapStylingContextProvider';

import './switch.css';
import { LayerLib } from '@cismet/layer-lib';
import { useDispatch, useSelector } from 'react-redux';
import { getThumbnails, setThumbnail } from '../store/slices/layers';
import {
  appendLayer,
  getLayers,
  removeLayer,
  setBackgroundLayer,
} from '../store/slices/mapping';

const layerMap = {
  amtlich: 'Amtlich',
  luftbild: 'Luftbild',
  topographisch: 'Topographisch',
};

const TopNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // @ts-ignore
  const { setAppMenuVisible } = useContext(UIDispatchContext);
  // @ts-ignore
  const { setSelectedBackground } = useContext(TopicMapStylingDispatchContext);
  // @ts-ignore
  const { selectedBackground } = useContext(TopicMapStylingContext);
  const dispatch = useDispatch();
  const thumbnails = useSelector(getThumbnails);
  const activeLayers = useSelector(getLayers);

  const [messageApi, contextHolder] = message.useMessage();

  const updateLayers = (layer: any) => {
    const url = layer.url;

    const newLayer = {
      title: layer.title,
      initialActive: true,
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

      <div className="flex items-center gap-6 absolute left-1/2 -ml-60">
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
          <FontAwesomeIcon
            icon={faShareNodes}
            className="text-xl text-gray-300"
          />
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
          value={selectedBackground}
          onChange={(e) => {
            setSelectedBackground(e.target.value);
            dispatch(
              setBackgroundLayer({
                id: e.target.value,
                title: layerMap[e.target.value],
                initialActive: true,
                opacity: 1.0,
                description: '',
                url: '',
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

import { Button, Input, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import {
  faB,
  faBars,
  faLandmark,
  faLayerGroup,
  faMap,
  faPrint,
  faRedo,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
// @ts-ignore
import { getMode } from './../store/slices/ui';
// @ts-ignore
import { UIDispatchContext } from 'react-cismap/contexts/UIContextProvider';

import './switch.css';
import { LayerLib } from '@cismet/layer-lib';

const { Search } = Input;

interface NavProps {
  setAdditionalLayers: any;
}

const TopNavbar = ({ setAdditionalLayers }: NavProps) => {
  const dispatch = useDispatch();
  const mode = useSelector(getMode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // @ts-ignore
  const { setAppMenuVisible } = useContext(UIDispatchContext);

  return (
    <div className="h-16 w-full flex items-center relative justify-between py-2 px-[12px]">
      <LayerLib
        open={isModalOpen}
        setOpen={setIsModalOpen}
        setAdditionalLayers={setAdditionalLayers}
      />

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <p className="mb-0 font-semibold text-lg">Geoportal</p>
        </div>
      </div>

      <div className="flex items-center gap-6 absolute left-1/2 -ml-60">
        <FontAwesomeIcon icon={faRedo} className="text-xl" />
        <FontAwesomeIcon icon={faLandmark} className="text-xl" />
        <FontAwesomeIcon icon={faMap} className="text-xl" />
        <FontAwesomeIcon
          icon={faLayerGroup}
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="cursor-pointer text-xl"
        />
        <FontAwesomeIcon icon={faB} className="text-xl" />
        <FontAwesomeIcon icon={faPrint} className="text-xl" />
        <FontAwesomeIcon icon={faShareNodes} className="text-xl" />
      </div>

      <div className="flex items-center gap-6">
        <Radio.Group value={'standard'}>
          <Radio.Button value="standard">Standard</Radio.Button>
          <Radio.Button value="hybrid">Hybrid</Radio.Button>
          <Radio.Button value="satellit">Satellit</Radio.Button>
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

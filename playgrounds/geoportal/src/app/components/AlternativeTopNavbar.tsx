import { Button, Input } from 'antd';
// @ts-ignore
import {
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
import { UIDispatchContext } from 'react-cismap/contexts/UIContextProvider';
import LibModal from './Modals/LibModal';
import './switch.css';

const { Search } = Input;

const AlternativeTopNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // @ts-ignore
  const { setAppMenuVisible } = useContext(UIDispatchContext);

  return (
    <div className="h-16 w-full flex items-center relative justify-between py-2 px-[12px]">
      <LibModal open={isModalOpen} setOpen={setIsModalOpen} />

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <p className="mb-0 font-semibold text-lg">Geoportal</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
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
      </div>

      <div className="flex items-center gap-6">
        <FontAwesomeIcon icon={faPrint} className="text-xl" />
        <FontAwesomeIcon icon={faShareNodes} className="text-xl" />

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

export default AlternativeTopNavbar;

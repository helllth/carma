import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { getMode, setMode } from './../store/slices/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faLayerGroup,
  faMap,
  faPrint,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
// @ts-ignore
import { UIDispatchContext } from 'react-cismap/contexts/UIContextProvider';
import LibModal from './Modals/LibModal';

const { Search } = Input;

const TopNavbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector(getMode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // @ts-ignore
  const { setAppMenuVisible } = useContext(UIDispatchContext);

  return (
    <div className="h-16 w-full flex items-center justify-between py-2 px-[12px]">
      <LibModal open={isModalOpen} setOpen={setIsModalOpen} />
      {/* <Button
        onClick={() => {
          dispatch(setMode(mode === 'normal' ? 'map' : 'normal'));
        }}
      >
        Change Mode
      </Button> */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <p className="mb-0 font-semibold text-lg">Geoportal</p>
        </div>
        <FontAwesomeIcon icon={faRedo} />
      </div>

      <div className="flex items-center gap-6">
        <Button
          icon={<FontAwesomeIcon icon={faLayerGroup} />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Layer
        </Button>
        {/* <Search placeholder="Suche nach Themen" className="w-96" /> */}
        <FontAwesomeIcon icon={faPrint} />

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

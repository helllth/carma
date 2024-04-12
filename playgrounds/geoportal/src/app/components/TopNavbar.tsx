import { Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { getMode, setMode } from './../store/slices/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faPrint,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
// @ts-ignore
import { UIDispatchContext } from 'react-cismap/contexts/UIContextProvider';

const TopNavbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector(getMode);
  // @ts-ignore
  const { setAppMenuVisible } = useContext(UIDispatchContext);

  return (
    <div className="h-24 w-full flex items-center justify-between p-2">
      {/* <Button
        onClick={() => {
          dispatch(setMode(mode === 'normal' ? 'map' : 'normal'));
        }}
      >
        Change Mode
      </Button> */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHome} />
          <p className="mb-0 font-semibold text-lg">Geoportal</p>
        </div>
        <Select placeholder="Layer" />
        <FontAwesomeIcon icon={faRedo} />
      </div>

      <div className="flex items-center gap-6">
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

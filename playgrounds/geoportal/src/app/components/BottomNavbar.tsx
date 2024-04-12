import { useSelector } from 'react-redux';
// @ts-ignore
import { getMode } from './../store/slices/ui';
import { Button, Radio, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faLandmark,
  faLightbulb,
  faMap,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import './switch.css';

const BottomNavbar = () => {
  const mode = useSelector(getMode);

  return (
    <div
      className={`${
        mode === 'map' && 'hidden'
      } h-16 w-full flex items-center justify-between py-2 px-[12px] gap-6 relative`}
    >
      <p className="mb-0 text-gray-400">Geoportal Wuppertal</p>

      <div className="flex items-center gap-1 absolute left-1/2">
        <span>Blass</span>
        <Switch />
      </div>

      <div className="flex items-center gap-4">
        <p className="mb-0 text-gray-400">1 : 20 000</p>
        <Button icon={<FontAwesomeIcon icon={faLandmark} />}>Legende</Button>
        <Button icon={<FontAwesomeIcon icon={faMap} />}>Modus</Button>
        <Button icon={<FontAwesomeIcon icon={faBookmark} />}>Teilen</Button>
        {/* <FontAwesomeIcon icon={faMap} />
        <FontAwesomeIcon icon={faBookmark} /> */}
        <Radio.Group value={'standard'}>
          <Radio.Button value="standard">Standard</Radio.Button>
          <Radio.Button value="hybrid">Hybrid</Radio.Button>
          <Radio.Button value="satellit">Satellit</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default BottomNavbar;

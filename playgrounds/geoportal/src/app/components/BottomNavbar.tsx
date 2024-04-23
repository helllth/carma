import { useSelector } from 'react-redux';
// @ts-ignore
import { Radio, Switch } from 'antd';
// @ts-ignore
import { getMode } from './../store/slices/ui';
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

      <div className="flex items-center gap-1 absolute left-1/2 -ml-6">
        <span>Blass</span>
        <Switch />
      </div>

      <div className="flex items-center gap-4">
        <p className="mb-0 text-gray-400">1 : 20 000</p>
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

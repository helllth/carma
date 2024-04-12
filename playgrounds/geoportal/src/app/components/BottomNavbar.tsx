import { useSelector } from 'react-redux';
// @ts-ignore
import { getMode } from './../store/slices/ui';
import { Button, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

const BottomNavbar = () => {
  const mode = useSelector(getMode);

  return (
    <div
      className={`${
        mode === 'map' && 'hidden'
      } h-24 w-full flex items-center justify-between p-2 gap-6`}
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <Button>Hintergrund 1</Button>
          <Button>Hintergrund 2</Button>
          <Button>Hintergrund 3</Button>
        </div>
        <div className="flex items-center gap-1">
          <Switch />
          <span>Blass</span>
        </div>
        <div>Legende</div>
        <div>Messen</div>
      </div>
      <FontAwesomeIcon icon={faShare} />
    </div>
  );
};

export default BottomNavbar;

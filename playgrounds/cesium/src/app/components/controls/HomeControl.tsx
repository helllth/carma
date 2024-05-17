import { ReactNode, MouseEvent, useContext } from 'react';
import { useCesium } from 'resium';
import OnMapButton from './OnMapButton';
import { Cartesian3, BoundingSphere } from 'cesium';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { SimpleAppState } from '../../App';

type HomeProps = {
  home: Cartesian3;
  children?: ReactNode;
};

const HomeControl = (props: HomeProps) => {
  const { home } = props;
  const { viewer } = useCesium();
  const { setIsAnimating } = useContext(SimpleAppState);

  const handleHomeClick = (e: MouseEvent) => {
    e.preventDefault();
    if (viewer) {
      setIsAnimating(false);
      const boundingSphere = new BoundingSphere(home, 400);
      viewer.camera.flyToBoundingSphere(boundingSphere);
    }
  };

  return (
    <OnMapButton
      icon={faHouseUser}
      onClick={handleHomeClick}
      title="Startposition"
    />
  );
};

export default HomeControl;

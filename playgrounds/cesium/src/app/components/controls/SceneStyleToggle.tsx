import { MouseEvent, ReactNode } from 'react';
import {
  faCube,
  faCubes,
  faMountain,
  faTreeCity,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OnMapButton from './OnMapButton';
import { useSceneStyleToggle } from '../CustomViewer/components/baseTileset.hook';
import { SceneStyles, useShowPrimaryTileset } from '../../store/slices/viewer';

type SceneStyleToggleProps = {
  children?: ReactNode;
  initialStyle?: keyof SceneStyles;
};

export const SceneStyleToggle = (props: SceneStyleToggleProps) => {
  const toggleSceneStyle = useSceneStyleToggle(props.initialStyle);
  const isPrimaryStyle = useShowPrimaryTileset() === true;

  const handleToggle = (e: MouseEvent) => {
    e.preventDefault();
    toggleSceneStyle();
    // You can add additional functionality here if needed
  };

  return (
    <OnMapButton title="Toggle Terrain" onClick={handleToggle}>
      <FontAwesomeIcon
        icon={isPrimaryStyle ? faCubes : faTreeCity}
      ></FontAwesomeIcon>
    </OnMapButton>
  );
};

export default SceneStyleToggle;

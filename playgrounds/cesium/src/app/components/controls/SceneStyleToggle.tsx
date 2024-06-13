import { MouseEvent, ReactNode, useEffect } from 'react';
import { faCubes, faTreeCity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OnMapButton from './OnMapButton';
import { useSceneStyleToggle } from '../CustomViewer/components/baseTileset.hook';
import { SceneStyles, useShowPrimaryTileset } from '../../store/slices/viewer';

type SceneStyleToggleProps = {
  children?: ReactNode;
  initialStyle?: keyof SceneStyles;
};

export const SceneStyleToggle = (props: SceneStyleToggleProps) => {
  const { initialStyle } = props;
  const toggleSceneStyle = useSceneStyleToggle(initialStyle);
  const isPrimaryStyle = useShowPrimaryTileset() === true;
  const handleToggle = (e: MouseEvent) => {
    e.preventDefault();
    toggleSceneStyle();
  };

  useEffect(() => {
    // set the initial style
    console.log('HOOK: SceneStyleToggle: initialStyle', initialStyle);
    toggleSceneStyle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialStyle]);

  return (
    <OnMapButton title="Toggle Terrain" onClick={handleToggle}>
      <FontAwesomeIcon
        icon={isPrimaryStyle ? faCubes : faTreeCity}
      ></FontAwesomeIcon>
    </OnMapButton>
  );
};

export default SceneStyleToggle;

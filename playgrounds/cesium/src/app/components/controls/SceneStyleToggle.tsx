import React, { MouseEvent, ReactNode } from 'react';
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

  return (
    <OnMapButton
      title={
        isPrimaryStyle
          ? 'Wechsel zur vereinfachten Ansicht'
          : 'Wechsel zur realistischen Ansicht'
      }
      onClick={handleToggle}
    >
      <FontAwesomeIcon
        icon={isPrimaryStyle ? faCubes : faTreeCity}
      ></FontAwesomeIcon>
    </OnMapButton>
  );
};

export default SceneStyleToggle;

import { MouseEvent, ReactNode } from "react";
import { faCubes, faTreeCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OnMapButton from "./OnMapButton";
import { useShowPrimaryTileset } from "../../../CustomViewerContextProvider/slices/viewer";
import { SceneStyles } from "../../../..";
import { useSceneStyleToggle } from "../baseTileset.hook";

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
          ? "Wechsel zur vereinfachten Ansicht"
          : "Wechsel zur realistischen Ansicht"
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

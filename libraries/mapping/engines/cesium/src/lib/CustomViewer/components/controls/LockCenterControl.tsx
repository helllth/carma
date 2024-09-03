import { MouseEvent, ReactNode } from "react";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCesium } from "resium";
import { lockPosition, unlockPosition } from "./lockCenterControl.utils";
import OnMapButton from "./OnMapButton";
import { DebugModelMatrixPrimitive, Viewer } from "cesium";

type LockCenterControlProps = {
  children?: ReactNode;
};

const LockCenterControl = (props: LockCenterControlProps) => {
  const { viewer } = useCesium();
  const [lockCenter, setLockCenter] = useState(false);

  const handleLockCenter = (e: MouseEvent) => {
    e.preventDefault();
    console.log("TODO: lockCenter functionality not implemented");
    if (lockCenter === false) {
      setLockCenter(true);
      viewer && lockPosition(viewer);
    } else {
      unlockPosition(
        viewer as Viewer & { debugPrimitive?: DebugModelMatrixPrimitive },
      );
      setLockCenter(false);
    }
  };

  return (
    <OnMapButton
      title="Sperren/Entsprerren um den Mittelpunkt"
      onClick={handleLockCenter}
    >
      <FontAwesomeIcon
        icon={lockCenter ? faLock : faLockOpen}
      ></FontAwesomeIcon>
    </OnMapButton>
  );
};

export default LockCenterControl;

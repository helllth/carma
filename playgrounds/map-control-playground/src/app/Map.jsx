import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Control,
  ControlButtonStyler,
  ControlLayout,
  Main,
} from "@carma-mapping/map-controls-layout";
import {
  faCompress,
  faExpand,
  faHouseChimney,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import GazetteerSearchComponent from "react-cismap/GazetteerSearchComponent";
import { TopicMapContext } from "react-cismap/contexts/TopicMapContextProvider";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent";

const Map = () => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [layoutHeight, setLayoutHeight] = useState(null);

  const { routedMapRef } = useContext(TopicMapContext);

  useEffect(() => {
    if (containerRef) {
      setContainerWidth({
        width: `100%`,
        height: `${containerRef.current?.clientHeight}px`,
      });
    }
  }, [containerRef, layoutHeight]);

  return (
    <ControlLayout onHeightResize={setLayoutHeight} ifStorybook={false}>
      <Control position="topleft" order={10}>
        <ControlButtonStyler
          onClick={() => {
            routedMapRef.leafletMap.leafletElement.zoomIn();
          }}
        >
          <PlusOutlined />
        </ControlButtonStyler>
        <ControlButtonStyler
          onClick={() => {
            routedMapRef.leafletMap.leafletElement.zoomOut();
          }}
        >
          <MinusOutlined />
        </ControlButtonStyler>
      </Control>
      <Control position="topleft" order={20}>
        <ControlButtonStyler
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              document.documentElement.requestFullscreen();
            }
          }}
        >
          <FontAwesomeIcon
            icon={document.fullscreenElement ? faCompress : faExpand}
          />
        </ControlButtonStyler>
      </Control>
      <Control position="topleft" order={30}>
        <ControlButtonStyler>
          <FontAwesomeIcon icon={faLocationArrow} />
        </ControlButtonStyler>
      </Control>
      <Control position="topleft" order={40}>
        <ControlButtonStyler
          onClick={() =>
            routedMapRef.leafletMap.leafletElement.flyTo(
              [51.272570027476256, 7.199918031692506],
              14,
            )
          }
        >
          <FontAwesomeIcon icon={faHouseChimney} />
        </ControlButtonStyler>
      </Control>
      <Control position="bottomleft" order={10} fullCollapseWidth={true}>
        <GazetteerSearchComponent />
      </Control>
      <Main ref={containerRef}>
        <TopicMapComponent
          locatorControl={false}
          gazetteerSearchControl={false}
          hamburgerMenu={false}
          zoomControls={false}
          fullScreenControl={false}
          mapStyle={containerWidth}
        />
      </Main>
    </ControlLayout>
  );
};

export default Map;

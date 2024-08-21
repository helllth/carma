import { useContext, useEffect, useRef, useState } from "react";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent";
import {
  ControlLayout,
  Control,
  Main,
  ControlButtonStyler,
} from "@carma-mapping/map-controls-layout";
import {
  MenuOutlined,
  MinusOutlined,
  PlusOutlined,
  SettingFilled,
  ShrinkOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import GazetteerSearchComponent from "react-cismap/GazetteerSearchComponent";
import { TopicMapContext } from "react-cismap/contexts/TopicMapContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";

const iconPadding = {
  backgroundColor: "#fff",
  border: "2px solid rgba(0, 0, 0, .23)",
  borderRadius: "4px",
  width: "34px",
  height: "34px",
  textAlign: "center",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
};

const Map = () => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [layoutHeight, setLayoutHeight] = useState(null);
  const [resonsiveCollapse, setResonsiveCollapse] = useState(null);

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
    <ControlLayout
      onResponsiveCollapse={(collapseEvent) => {
        setResonsiveCollapse(collapseEvent);
      }}
      onHeightResize={setLayoutHeight}
      ifStorybook={false}
    >
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
            // make full screen
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
      <Control position="topright" order={30}>
        <ControlButtonStyler>
          <MenuOutlined />
        </ControlButtonStyler>
      </Control>
      <Control position="bottomleft" order={10} fullCollapseWidth={true}>
        <GazetteerSearchComponent />
      </Control>
      <Control position="bottomright" order={10} fullCollapseWidth={true}>
        <div
          style={{
            width: "300px",
            background: "white",
            height: "80px",
            padding: "4px",
            fontSize: "12px",
            opacity: "0.9",
          }}
        >
          Info Box
        </div>
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

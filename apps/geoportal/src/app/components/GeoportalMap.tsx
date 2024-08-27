import { useContext, useEffect, useRef, useState } from "react";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent";
import { useSelector } from "react-redux";
import { getGazData, paramsToObject } from "../helper/helper.ts";
import {
  getBackgroundLayer,
  getFocusMode,
  getLayers,
  getShowFullscreenButton,
  getShowHamburgerMenu,
  getShowLocatorButton,
} from "../store/slices/mapping.ts";
import LayerWrapper from "./layers/LayerWrapper.tsx";
import InfoBoxMeasurement from "./map-measure/InfoBoxMeasurement.jsx";
import PaleOverlay from "react-cismap/PaleOverlay";
import StyledWMSTileLayer from "react-cismap/StyledWMSTileLayer";
import { useSearchParams } from "react-router-dom";
import { getBackgroundLayers } from "../helper/layer.tsx";
import { getMode, getShowLayerButtons } from "../store/slices/ui.ts";
import CismapLayer from "react-cismap/CismapLayer";
import { namedStyles, defaultLayerConfig } from "../config/index.ts";
import {
  Control,
  ControlButtonStyler,
  ControlLayout,
  Main,
} from "@carma-mapping/map-controls-layout";
import { TopicMapContext } from "react-cismap/contexts/TopicMapContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompress,
  faExpand,
  faHouseChimney,
  faLocationArrow,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import type LocateControl from "leaflet.locatecontrol";

export const GeoportalMap = () => {
  const [gazData, setGazData] = useState([]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const layers = useSelector(getLayers);
  const backgroundLayer = useSelector(getBackgroundLayer);
  const mode = useSelector(getMode);
  const showLayerButtons = useSelector(getShowLayerButtons);
  const showFullscreenButton = useSelector(getShowFullscreenButton);
  const showLocatorButton = useSelector(getShowLocatorButton);
  const showHamburgerMenu = useSelector(getShowHamburgerMenu);
  const focusMode = useSelector(getFocusMode);
  const [urlParams, setUrlParams] = useSearchParams();
  const [layoutHeight, setLayoutHeight] = useState(null);
  const containerRef = useRef(null);
  const { routedMapRef } = useContext<typeof TopicMapContext>(TopicMapContext);
  const [locationProps, setLocationProps] = useState(0);
  const [mapMode, setMapMode] = useState("2D");

  useEffect(() => {
    getGazData(setGazData);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setHeight(wrapperRef.current.clientHeight);
        setWidth(wrapperRef.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ControlLayout onHeightResize={setLayoutHeight} ifStorybook={false}>
      <Control position="topleft" order={10}>
        <div className="flex flex-col">
          <ControlButtonStyler
            onClick={() => {
              routedMapRef.leafletMap.leafletElement.zoomIn();
            }}
            className="!border-b-0 !rounded-b-none"
          >
            <FontAwesomeIcon icon={faPlus} />
          </ControlButtonStyler>
          <ControlButtonStyler
            onClick={() => {
              routedMapRef.leafletMap.leafletElement.zoomOut();
            }}
            className="!rounded-t-none"
          >
            <FontAwesomeIcon icon={faMinus} />
          </ControlButtonStyler>
        </div>
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
        <ControlButtonStyler
          onClick={() => setLocationProps((prev) => prev + 1)}
        >
          <FontAwesomeIcon icon={faLocationArrow} />
        </ControlButtonStyler>
        <LocateControlComponent startLocate={locationProps} />
      </Control>
      <Control position="topleft" order={40}>
        <ControlButtonStyler
          onClick={() =>
            routedMapRef.leafletMap.leafletElement.flyTo(
              [51.272570027476256, 7.199918031692506],
              18,
            )
          }
        >
          <FontAwesomeIcon icon={faHouseChimney} />
        </ControlButtonStyler>
      </Control>
      <Control position="topleft" order={50}>
        <ControlButtonStyler>
          <img src="measure.png" alt="Measure" className="w-6" />
        </ControlButtonStyler>
      </Control>
      <Control position="topleft" order={60}>
        <ControlButtonStyler
          onClick={() => {
            setMapMode(mapMode === "2D" ? "3D" : "2D");
          }}
        >
          {mapMode === "2D" ? "3D" : "2D"}
        </ControlButtonStyler>
      </Control>
      <Main ref={wrapperRef}>
        <TopicMapComponent
          gazData={gazData}
          hamburgerMenu={showHamburgerMenu}
          locatorControl={false}
          fullScreenControl={false}
          zoomControls={false}
          mapStyle={{ width, height }}
          leafletMapProps={{ editable: true }}
          minZoom={5}
          backgroundlayers="empty"
          mappingBoundsChanged={(boundingbox) => {
            // console.log('xxx bbox', createWMSBbox(boundingbox));
          }}
          locationChangedHandler={(location) => {
            const newParams = { ...paramsToObject(urlParams), ...location };
            setUrlParams(newParams);
          }}
          gazetteerSearchPlaceholder="Stadtteil | Adresse | POI"
          infoBox={
            mode === "measurement" ? (
              <InfoBoxMeasurement key={mode} />
            ) : (
              <div></div>
            )
          }
        >
          {getBackgroundLayers({ layerString: backgroundLayer.layers })}
          {focusMode && <PaleOverlay />}
          {showLayerButtons && <LayerWrapper />}
          {layers.map((layer, i) => {
            if (layer.visible) {
              switch (layer.layerType) {
                case "wmts":
                  return (
                    <CismapLayer
                      key={`${focusMode}_${i}_${layer.id}`}
                      url={layer.props.url}
                      maxZoom={26}
                      layers={layer.props.name}
                      format="image/png"
                      tiled={true}
                      transparent="true"
                      pane="additionalLayers1"
                      opacity={layer.opacity.toFixed(1) || 0.7}
                      type={"wmts"}
                    />
                  );
                case "vector":
                  return (
                    <CismapLayer
                      key={`${focusMode}_${i}_${layer.id}_${layer.opacity}`}
                      style={layer.props.style}
                      maxZoom={26}
                      pane={`additionalLayers${i}`}
                      opacity={layer.opacity || 0.7}
                      type="vector"
                    />
                  );
              }
            } else {
              return <></>;
            }
          })}
        </TopicMapComponent>
      </Main>
    </ControlLayout>
  );
};

export default GeoportalMap;

const LocateControlComponent = ({ startLocate = 0 }) => {
  const { routedMapRef } = useContext<typeof TopicMapContext>(
    TopicMapContext,
  ) as any;
  const [locationInstance, setLocationInstance] =
    useState<LocateControl | null>(null);

  useEffect(() => {
    if (!locationInstance && routedMapRef) {
      const mapExample = routedMapRef.leafletMap.leafletElement;
      const lc = (L.control as LocateControl)
        .locate({
          position: "topright",
          strings: {
            title: "demo location",
          },
          flyTo: true,
          drawMarker: false,
          icon: "custom_icon",
        })
        .addTo(mapExample);
      setLocationInstance(lc);
    }

    // return () => {
    //   lc.remove();
    // };
  }, [routedMapRef]);

  useEffect(() => {
    if (startLocate && locationInstance) {
      locationInstance.start();
    }
  }, [startLocate]);

  return null;
};

import { useContext, useEffect, useState } from "react";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent";
import { getGazData } from "./helper/helper";
import { Badge } from "react-bootstrap";
import topoBG from "../assets/map-bg/topo.png";
import citymapBG from "../assets/map-bg/citymap.png";
import mixedBG from "../assets/map-bg/mixed.png";
import {
  removeQueryPart,
  modifyQueryPart,
} from "react-cismap/tools/routingHelper";

import {
  searchTextPlaceholder,
  MenuTooltip,
} from "@carma-collab/wuppertal/kita-finder";

import ControlInfoBox from "./ControlInfoBox";
import ResponsiveInfoBox from "react-cismap/topicmaps/ResponsiveInfoBox";
import StyledWMSTileLayer from "react-cismap/StyledWMSTileLayer";
import { TopicMapContext } from "react-cismap/contexts/TopicMapContextProvider";

const parseSimulationsFromURL = (search) => {
  const params = new URLSearchParams(search);
  const simulationsParam = params.get("simulations");
  if (simulationsParam) {
    return simulationsParam.split(",").map(Number); // Convert to array of integers
  }
  return [0, 1, 2]; // Default value if not found in URL
};

const parseBackgroundIndexFromURL = (search) => {
  const params = new URLSearchParams(search);
  const bgParam = params.get("bg");
  if (bgParam) {
    return parseInt(bgParam, 10); // Convert to integer
  }
  return 0; // Default value if not found in URL
};

const Hitzekarte = () => {
  const { history } = useContext(TopicMapContext);

  const [gazData, setGazData] = useState([]);
  const [selectedSimulations, setSelectedSimulations] = useState(() => {
    return parseSimulationsFromURL(history.location.search);
  });
  const simulations = [
    {
      layer: "Hitze-Ist",
      debugLayer: "kst_baubloecke",
      debugUrl: "https://maps.wuppertal.de/gebiet",
      longname: "Hitzeinsel im IST-Zustand",
      name: "Hitzebelastung",
      opacity: 0.8,
      subtitle: "",
    },
    {
      debugUrl: "https://maps.wuppertal.de/gebiet",
      debugLayer: "kst_quartiere",
      layer: "Hitze-Stark-Ist",
      longname: "starke Hitzeinsel im IST-Zustand",
      name: "starke Hitzebelastung",
      opacity: 0.8,
      subtitle: "",
    },
    {
      debugUrl: "https://maps.wuppertal.de/gebiet",
      debugLayer: "gitter_500",
      layer: "Hitze-2050",
      longname: "Ausweitung der Hitzeinsel im Zukunftsszenario 2050",
      name: "Zukunftsszenario 2050-2060",
      opacity: 0.8,
      subtitle: "",
    },
  ];
  const [simulationLabels, setSimulationLabels] = useState([]);
  const backgrounds = [
    {
      layerkey: "wupp-plan-live@90",
      src: citymapBG,
      title: "Stadtplan",
    },

    {
      layerkey: "rvrGrundriss@100|trueOrtho2022@75|rvrSchriftNT@100",
      src: mixedBG,
      title: "Luftbildkarte",
    },
    {
      layerkey: "hillshade|bplan_abkg@30|wupp-plan-live@20",
      src: topoBG,
      title: "Top. Karte",
    },
  ];
  const [selectedBackgroundIndex, setSelectedBackgroundIndex] = useState(() => {
    return parseBackgroundIndexFromURL(history.location.search);
  });
  const [minifiedInfoBox, setMinifiedInfoBox] = useState(false);
  const legend = [
    { title: "Hitze", lt: 0.3, bg: "#FFD521" },
    { title: "starke Hitze", lt: 0.4, bg: "#FF3C2E" },
    { title: "2050-2060", lt: 1.0, bg: "#CE1EE8" },
  ];
  useEffect(() => {
    getGazData(setGazData);
  }, []);
  useEffect(() => {
    let simulationLabels = [];
    simulations.forEach((item, index) => {
      let bsStyle;
      if (selectedSimulations.indexOf(index) !== -1) {
        bsStyle = "primary";
      } else {
        bsStyle = "secondary";
      }
      let label = (
        <a
          style={{ textDecoration: "none" }}
          onClick={() => {
            setSelectedSimulations((prevSelected) => {
              let updatedSelection;
              if (prevSelected.includes(index)) {
                updatedSelection = prevSelected.filter(
                  (simIndex) => simIndex !== index,
                );
              } else {
                updatedSelection = [...prevSelected, index];
              }

              // Update the URL with the new selection
              const selectedSimulationsParam = updatedSelection.join(",");
              history.push(
                modifyQueryPart(history.location.search, {
                  simulations: selectedSimulationsParam,
                }),
              );

              return updatedSelection;
            });
          }}
        >
          <Badge variant={bsStyle}>{item.name}</Badge>
        </a>
      );
      simulationLabels.push(label);
    });
    setSimulationLabels(simulationLabels);
  }, [selectedSimulations]);

  // let info = (

  // );
  console.log("xxx render");

  let validBackgroundIndex = selectedBackgroundIndex;
  if (validBackgroundIndex >= backgrounds.length) {
    validBackgroundIndex = 0;
  }
  return (
    <TopicMapComponent
      backgroundlayers={backgrounds[validBackgroundIndex].layerkey}
      infoBox={
        <ControlInfoBox
          pixelwidth={340}
          selectedSimulations={selectedSimulations}
          simulations={simulations}
          simulationLabels={simulationLabels}
          backgrounds={backgrounds}
          selectedBackgroundIndex={selectedBackgroundIndex}
          setBackgroundIndex={(index) => {
            setSelectedBackgroundIndex(index);

            history.push(
              modifyQueryPart(history.location.search, { bg: index }),
            );
          }}
          minified={minifiedInfoBox}
          minify={(minified) => setMinifiedInfoBox(minified)}
          legendObject={legend}
          featureInfoModeActivated={false}
          setFeatureInfoModeActivation={() => {}}
          featureInfoValue={undefined}
          showModalMenu={(section) => {
            // this.props.uiStateActions.showApplicationMenuAndActivateSection(
            //   true,
            //   section,
            // );
          }}
          mapClickListener={() => {}}
          mapRef={undefined}
          mapCursor={undefined}
        />
      }
      gazData={gazData}
      modalMenu={<div />}
      locatorControl={true}
      gazetteerSearchPlaceholder={searchTextPlaceholder}
      gazetteerHitTrigger={(hits) => {
        if ((Array.isArray(hits) && hits[0]?.more?.pid) || hits[0]?.more?.kid) {
          const gazId = hits[0]?.more?.pid || hits[0]?.more?.kid;
          setSelectedFeatureByPredicate(
            (feature) => feature.properties.id === gazId,
          );
        }
      }}
      applicationMenuTooltipString={<MenuTooltip />}
    >
      {selectedSimulations.map((simulationIndex) => {
        const selSimString = JSON.stringify(selectedSimulations);
        return (
          <StyledWMSTileLayer
            // ref={(c) => (this.modelLayer = c)}
            key={
              "heatmap.bgMap" +
              selectedBackgroundIndex +
              "." +
              "heatmap.simlayer" +
              simulations[simulationIndex].layer +
              "heatmap.selSims" +
              selSimString
            }
            url={
              simulations[simulationIndex].debugUrl ||
              "https://maps.wuppertal.de/umwelt"
            }
            layers={
              simulations[simulationIndex].debugLayer ||
              simulations[simulationIndex].layer
            }
            version="1.1.1"
            transparent="true"
            format="image/png"
            tiled="true"
            styles="default"
            maxZoom={19}
            opacity={simulations[simulationIndex].opacity}
          />
        );
      })}
    </TopicMapComponent>
  );
};

export default Hitzekarte;

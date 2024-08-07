import React, { useContext, useMemo } from "react";
import CustomizationContextProvider from "react-cismap/contexts/CustomizationContextProvider";
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from "react-cismap/contexts/FeatureCollectionContextProvider";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
import ModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";
import Section from "react-cismap/topicmaps/menu/Section";
import DefaultSettingsPanel from "react-cismap/topicmaps/menu/DefaultSettingsPanel";
import FilterUI from "./FilterUI";
import { TopicMapDispatchContext } from "react-cismap/contexts/TopicMapContextProvider";
import { getSymbolSVG } from "./helper/helper";
import {
  KompaktanleitungSection,
  MenuIntroduction,
} from "@carma-collab/wuppertal/e-auto-ladestation";
import {
  MenuFooter,
  GenericDigitalTwinReferenceTextComponent,
} from "@carma-collab/wuppertal/commons";
import { getApplicationVersion } from "../version";

const Menu = () => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);
  const { filteredItems, shownFeatures, filterState, itemsDictionary } =
    useContext(FeatureCollectionContext);
  const { setFilterState } = useContext(FeatureCollectionDispatchContext);
  const { zoomToFeature } = useContext(TopicMapDispatchContext);

  const onlineSVG = getSymbolSVG(24, "#003B80", "pr", "onlineSVGinHELP");
  const offlineSVG = getSymbolSVG(24, "#888A87", "pr", "offlineSVGinHELP");

  const getFilterHeader = () => {
    const count = filteredItems?.length || 0;

    let term;
    if (count === 1) {
      term = "Ladestation";
    } else {
      term = "Ladestationen";
    }

    return `Filter (${count} ${term} gefunden, davon ${
      shownFeatures?.length || "0"
    } in der Karte)`;
  };

  const steckertypes = useMemo(
    () => itemsDictionary?.steckerverbindungen || [],
    [itemsDictionary],
  );

  return (
    <CustomizationContextProvider customizations={{}}>
      <ModalApplicationMenu
        menuIcon={"bars"}
        menuTitle={"Filter, Einstellungen und Kompaktanleitung"}
        menuFooter={
          <MenuFooter
            version={getApplicationVersion()}
            setAppMenuActiveMenuSection={setAppMenuActiveMenuSection}
          />
        }
        menuIntroduction={
          <MenuIntroduction
            setAppMenuActiveMenuSection={setAppMenuActiveMenuSection}
          />
        }
        menuSections={[
          <Section
            key="filter"
            sectionKey="filter"
            sectionTitle={getFilterHeader()}
            sectionBsStyle="primary"
            sectionContent={
              <FilterUI
                filter={filterState}
                setFilter={setFilterState}
                steckertypes={steckertypes}
              />
            }
          />,
          <DefaultSettingsPanel key="settings" />,
          <KompaktanleitungSection
            onlineSVG={onlineSVG}
            offlineSVG={offlineSVG}
          />,
          <Section
            key="digiTal"
            sectionKey="digiTal"
            sectionTitle={"DigiTal Zwilling"}
            sectionBsStyle="warning"
            sectionContent={<GenericDigitalTwinReferenceTextComponent />}
          ></Section>,
        ]}
      />
    </CustomizationContextProvider>
  );
};
export default Menu;
const NW = (props) => {
  return <span style={{ whiteSpace: "nowrap" }}>{props.children}</span>;
};

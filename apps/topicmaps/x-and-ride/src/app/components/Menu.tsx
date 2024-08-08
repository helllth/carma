import { useContext } from "react";
import CustomizationContextProvider from "react-cismap/contexts/CustomizationContextProvider";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";
import ModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";
import Section from "react-cismap/topicmaps/menu/Section";
import DefaultSettingsPanel from "react-cismap/topicmaps/menu/DefaultSettingsPanel";
import FilterUI from "./menu/FilterUI";
import { GenericDigitalTwinReferenceTextComponent } from "@carma-collab/wuppertal/commons";
import {
  MenuTitle,
  MenuIntroduction,
  KompaktanleitungSection,
  Footer,
} from "@carma-collab/wuppertal/x-and-ride";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
import { getApplicationVersion } from "../../version";

const Menu = () => {
  const { filteredItems, shownFeatures } = useContext<
    typeof FeatureCollectionContext
  >(FeatureCollectionContext);
  const { setAppMenuActiveMenuSection } =
    useContext<typeof UIDispatchContext>(UIDispatchContext);

  const getFilterHeader = () => {
    const count = filteredItems?.length || 0;

    let term;
    if (count === 1) {
      term = "Angebot";
    } else {
      term = "Angebote";
    }

    return `Filtern (${count} ${term} gefunden, davon ${
      shownFeatures?.length || "0"
    } in der Karte)`;
  };

  return (
    <CustomizationContextProvider customizations={{}}>
      <ModalApplicationMenu
        menuIcon={"bars"}
        menuTitle={<MenuTitle />}
        menuFooter={
          <Footer
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
            sectionContent={<FilterUI />}
          />,
          <DefaultSettingsPanel key="settings" />,
          <KompaktanleitungSection
            setAppMenuActiveMenuSection={setAppMenuActiveMenuSection}
          />,
          <Section
            key="digiTal"
            sectionKey="digiTal"
            sectionTitle={"Urbaner Digitaler Zwilling"}
            sectionBsStyle="warning"
            sectionContent={<GenericDigitalTwinReferenceTextComponent />}
          ></Section>,
        ]}
      />
    </CustomizationContextProvider>
  );
};

export default Menu;

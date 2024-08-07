import React, { useContext } from "react";
import CustomizationContextProvider from "react-cismap/contexts/CustomizationContextProvider";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
import DefaultSettingsPanel from "react-cismap/topicmaps/menu/DefaultSettingsPanel";
import ModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";
import { Link } from "react-scroll";
import { getBadSVG } from "./helper/helper";
import { getColorForProperties } from "./helper/styler";
import { KompaktanleitungSection } from "@carma-collab/wuppertal/baederkarte";
import {
  MenuFooter,
  GenericDigitalTwinReferenceTextComponent,
} from "@carma-collab/wuppertal/commons";
import Section from "react-cismap/topicmaps/menu/Section";
import { getApplicationVersion } from "../version";

const Menu = () => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);

  const helpSVGSize = 18;
  const hallenBadSVG = getBadSVG(
    helpSVGSize,
    "#565B5E",
    "Hallenbad",
    "helpTextSVG0",
  );
  const freibadBadSVG = getBadSVG(
    helpSVGSize,
    "#565B5E",
    "Freibad",
    "helpTextSVG1",
  );

  const staedtischesFreibadSVG = getBadSVG(
    helpSVGSize,
    "#1A4860",
    "Freibad",
    "helpTextSVG2",
  );
  const oeffentlichesVereinsbadSVG = getBadSVG(
    helpSVGSize,
    getColorForProperties({
      more: { zugang: "öffentlich", betreiber: "Verein" },
      mainlocationtype: { lebenslagen: ["Freizeit", "Sport"] },
    }),
    "Freibad",
    "helpTextSVG3",
  );
  const nichtOeffentlichesVereinsbadSVG = getBadSVG(
    helpSVGSize,
    getColorForProperties({
      more: { zugang: "nicht öffentlich", betreiber: "Verein" },
      mainlocationtype: { lebenslagen: ["Freizeit", "Sport"] },
    }),
    "Freibad",
    "helpTextSVG4",
  );

  return (
    <CustomizationContextProvider customizations={{}}>
      <ModalApplicationMenu
        menuIcon={"bars"}
        menuTitle={"Einstellungen und Kompaktanleitung"}
        menuFooter={
          <MenuFooter
            version={getApplicationVersion()}
            title="Bäderkarte Wuppertal"
            setAppMenuActiveMenuSection={setAppMenuActiveMenuSection}
          />
        }
        menuIntroduction={
          <span>
            Über{" "}
            <Link
              className="useAClassNameToRenderProperLink"
              to="filter"
              containerId="myMenu"
              smooth={true}
              delay={100}
              onClick={() => setAppMenuActiveMenuSection("settings")}
            >
              Einstellungen
            </Link>{" "}
            können Sie die Darstellung der Hintergrundfkarte und der Bäder an
            Ihre Vorlieben anpassen. Wählen Sie{" "}
            <Link
              className="useAClassNameToRenderProperLink"
              to="settings"
              containerId="myMenu"
              smooth={true}
              delay={100}
              onClick={() => setAppMenuActiveMenuSection("help")}
            >
              Kompaktanleitung
            </Link>{" "}
            für detailliertere Bedienungsinformationen.
          </span>
        }
        menuSections={[
          <DefaultSettingsPanel key="settings" />,
          <KompaktanleitungSection
            hallenBadSVG={hallenBadSVG}
            freibadBadSVG={freibadBadSVG}
            staedtischesFreibadSVG={staedtischesFreibadSVG}
            oeffentlichesVereinsbadSVG={oeffentlichesVereinsbadSVG}
            nichtOeffentlichesVereinsbadSVG={nichtOeffentlichesVereinsbadSVG}
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
